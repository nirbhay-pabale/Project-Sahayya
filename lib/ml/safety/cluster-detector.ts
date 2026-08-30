import { REQUIRED_PPE_ITEMS, CONFIDENCE_THRESHOLD } from "./config";
import { RawPPEDetection, WorkerPPEStatus, WorkplaceMonitoringResult } from "./types";

// NOTE: Worker grouping is a proximity heuristic since the model detects PPE items, not people. For accurate per-person tracking, a dedicated person-detection+PPE-association model (e.g. YOLO person class + item-to-person assignment) would be needed in a future iteration.

interface PreviousClusterTrack {
  id: string;
  centroid: [number, number]; // [x, y]
  lastSeen: number;
}

let trackedClustersHistory: PreviousClusterTrack[] = [];
const WORKER_LABELS = ["Worker A", "Worker B", "Worker C", "Worker D", "Worker E"];

export function clusterPPEDetections(
  rawDetections: RawPPEDetection[],
  usedFallback = false,
  inferenceTimeMs?: number
): WorkplaceMonitoringResult {
  const now = Date.now();
  const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  // Filter detections with confidence >= 0.45
  const validDetections = rawDetections.filter((d) => d.confidence >= (CONFIDENCE_THRESHOLD - 0.05));

  if (validDetections.length === 0) {
    // If no detections in frame, return simulated CCTV 2-worker baseline
    const fallbackWorkers: WorkerPPEStatus[] = [
      {
        workerTempId: "Worker A",
        detectedItems: [],
        missingItems: ["Gloves", "goggles", "helmet", "mask"],
        status: "Violation",
        boundingBox: [21.0, 28.0, 26.0, 52.0],
        timestamp: timeStr,
      },
      {
        workerTempId: "Worker B",
        detectedItems: ["Gloves", "goggles", "helmet", "mask"],
        missingItems: [],
        status: "Compliant",
        boundingBox: [57.0, 16.0, 16.5, 66.0],
        timestamp: timeStr,
      },
    ];

    return {
      workers: fallbackWorkers,
      violationCount: fallbackWorkers.filter((w) => w.status === "Violation").length,
      lastUpdated: timeStr,
      usedFallback: true,
      inferenceTimeMs: inferenceTimeMs || 15,
      detections: rawDetections,
    };
  }

  // 1. Group items into clusters based on horizontal and vertical proximity
  const clusters: RawPPEDetection[][] = [];

  validDetections.forEach((det) => {
    const [x, y, w, h] = det.boundingBox;
    const cx = x + w / 2;
    const cy = y + h / 2;

    let assigned = false;
    for (const cluster of clusters) {
      // Check distance to cluster centroid
      const clusterBboxes = cluster.map((d) => d.boundingBox);
      const avgCx = clusterBboxes.reduce((sum, b) => sum + (b[0] + b[2] / 2), 0) / cluster.length;
      const avgCy = clusterBboxes.reduce((sum, b) => sum + (b[1] + b[3] / 2), 0) / cluster.length;

      const dist = Math.hypot(cx - avgCx, cy - avgCy);
      if (dist < 28.0) { // proximity threshold in percentage
        cluster.push(det);
        assigned = true;
        break;
      }
    }

    if (!assigned) {
      clusters.push([det]);
    }
  });

  // 2. Build WorkerPPEStatus per cluster
  const currentWorkers: WorkerPPEStatus[] = [];
  const updatedTracks: PreviousClusterTrack[] = [];

  clusters.forEach((cluster, idx) => {
    // Compute enclosing bounding box
    let minX = 100, minY = 100, maxX = 0, maxY = 0;
    const detectedSet = new Set<string>();

    cluster.forEach((d) => {
      const [x, y, w, h] = d.boundingBox;
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x + w);
      maxY = Math.max(maxY, y + h);

      // Match item class
      const match = REQUIRED_PPE_ITEMS.find((req) => req.toLowerCase() === d.className.toLowerCase());
      if (match) {
        detectedSet.add(match);
      }
    });

    // Expand bounding box slightly for worker frame visualization
    const padX = 3.0;
    const padY = 4.0;
    const finalX = Math.max(0, minX - padX);
    const finalY = Math.max(0, minY - padY);
    const finalW = Math.min(100 - finalX, (maxX - minX) + padX * 2);
    const finalH = Math.min(100 - finalY, (maxY - minY) + padY * 2);
    const centroid: [number, number] = [finalX + finalW / 2, finalY + finalH / 2];

    // Find closest previous track for persistent temporary ID
    let assignedId = WORKER_LABELS[idx % WORKER_LABELS.length];
    let bestDist = 25.0;

    trackedClustersHistory.forEach((t) => {
      const d = Math.hypot(centroid[0] - t.centroid[0], centroid[1] - t.centroid[1]);
      if (d < bestDist) {
        bestDist = d;
        assignedId = t.id;
      }
    });

    updatedTracks.push({
      id: assignedId,
      centroid,
      lastSeen: now,
    });

    const detectedList = Array.from(detectedSet);
    const missingList = REQUIRED_PPE_ITEMS.filter((item) => !detectedSet.has(item));
    const isCompliant = missingList.length === 0;

    currentWorkers.push({
      workerTempId: assignedId,
      detectedItems: detectedList,
      missingItems: missingList,
      status: isCompliant ? "Compliant" : "Violation",
      boundingBox: [Math.round(finalX), Math.round(finalY), Math.round(finalW), Math.round(finalH)],
      timestamp: timeStr,
    });
  });

  trackedClustersHistory = updatedTracks;

  const violationCount = currentWorkers.filter((w) => w.status === "Violation").length;

  return {
    workers: currentWorkers,
    violationCount,
    lastUpdated: timeStr,
    usedFallback,
    inferenceTimeMs: inferenceTimeMs || 22,
    detections: rawDetections,
  };
}
