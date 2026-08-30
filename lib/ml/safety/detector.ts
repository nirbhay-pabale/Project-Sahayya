import { PPEDetectionResult } from "./types";

export interface PersonPPEDetector {
  detect(frameData: string | Blob, temperature?: number, gasPpm?: number): Promise<PPEDetectionResult>;
}
