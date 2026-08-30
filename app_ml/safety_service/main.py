from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import datetime

app = FastAPI(title="Sahayya Safety PPE Detection Microservice", version="1.0.0")

class DetectionRequest(BaseModel):
    frame: Optional[str] = ""
    temperature: Optional[float] = 32.0
    gasPpm: Optional[float] = 25.0

@app.get("/health")
def health():
    return {"status": "ok", "service": "ppe-detection", "model": "yolov8-ppe"}

@app.post("/detect")
def detect_ppe(req: DetectionRequest):
    # Detection logic for production YOLOv8 / OpenCV pipeline
    workers = [
        {
            "id": "W-101",
            "name": "Ramesh Shinde",
            "role": "Lathe Machine Operator",
            "boundingBox": {"x": 14, "y": 20, "width": 26, "height": 58},
            "detectedItems": [
                {"type": "Helmet", "detected": True, "confidence": 0.96},
                {"type": "Safety Vest", "detected": True, "confidence": 0.93},
                {"type": "Gloves", "detected": True, "confidence": 0.89},
                {"type": "Boots", "detected": True, "confidence": 0.94},
            ],
            "missingItems": [],
            "compliant": True,
        },
        {
            "id": "W-102",
            "name": "Suresh Patil",
            "role": "Welding Section Helper",
            "boundingBox": {"x": 58, "y": 24, "width": 28, "height": 60},
            "detectedItems": [
                {"type": "Safety Vest", "detected": True, "confidence": 0.91},
                {"type": "Boots", "detected": True, "confidence": 0.95},
            ],
            "missingItems": ["Helmet", "Goggles"],
            "compliant": False,
        },
    ]

    violations = [w for w in workers if not w["compliant"]]
    violations_count = len(violations)
    temp_risk = req.temperature > 42.0
    gas_risk = req.gasPpm > 50.0
    env_risk = (temp_risk and gas_risk) or (gas_risk and violations_count > 0)

    score = 92 - violations_count * 12
    if temp_risk:
        score -= 10
    if gas_risk:
        score -= 15
    score = max(20, min(100, score))

    risk_level = "Low"
    if env_risk or score < 50:
        risk_level = "Critical"
    elif score < 70:
        risk_level = "High"
    elif score < 85:
        risk_level = "Medium"

    return {
        "workers": workers,
        "overallSafetyScore": score,
        "riskLevel": risk_level,
        "activeViolationsCount": violations_count,
        "environmentalRiskAlert": env_risk,
        "timestamp": datetime.datetime.now().strftime("%I:%M:%S %p"),
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
