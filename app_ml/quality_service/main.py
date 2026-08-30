from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import datetime

app = FastAPI(title="Sahayya Product Quality Anomaly Microservice", version="1.0.0")

class QualityAnalysisRequest(BaseModel):
    image: Optional[str] = ""
    batchId: Optional[str] = "BATCH-2025-05-B"
    avgBatchValue: Optional[float] = 42000.0
    monthlyVolume: Optional[int] = 12

@app.get("/health")
def health():
    return {"status": "ok", "service": "quality-anomaly-detection", "model": "cnn-anomaly-v2"}

@app.post("/analyze")
def analyze_quality(req: QualityAnalysisRequest):
    defects = [
        {
            "id": "DEF-1",
            "type": "Packaging Heat Seal Micro-Gap",
            "severity": "Medium",
            "confidence": 0.94,
            "location": "Top Seam (2.1mm discontinuity)",
            "suggestedCorrectiveAction": "Increase thermal sealer temperature to 180°C and check silicone belt pressure.",
        },
        {
            "id": "DEF-2",
            "type": "Surface Discoloration / Oxidation Spot",
            "severity": "Low",
            "confidence": 0.88,
            "location": "Lower Left Flange",
            "suggestedCorrectiveAction": "Verify anti-rust spray coverage during post-wash stage.",
        },
    ]

    defect_percent = 6.5
    quality_score = 88
    monthly_loss = round((defect_percent / 100.0) * req.avgBatchValue * req.monthlyVolume)

    compliance_grade = "Grade B (Standard)"
    if quality_score >= 95:
        compliance_grade = "Grade A (Zero Defect)"
    elif quality_score < 75:
        compliance_grade = "Grade C (Sub-optimal)"

    return {
        "qualityScore": quality_score,
        "defectPercent": defect_percent,
        "defects": defects,
        "batchId": req.batchId,
        "estimatedMonthlyLoss": monthly_loss,
        "complianceGrade": compliance_grade,
        "timestamp": datetime.datetime.now().strftime("%I:%M %p"),
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8002)
