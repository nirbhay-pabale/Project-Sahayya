# Sahayya ML Model Weights

Place the two trained YOLO checkpoint files in this directory:
1. `app_ml/models/ppe-kit-detection.pt` (Ultralytics YOLOv8 for PPE items: Gloves, Vest, goggles, helmet, mask)
2. `app_ml/models/factory-defect-detection.pt` (Ultralytics YOLOv8 for factory defects: capsule_defect, metal_nut_defect, pcb_missing_hole, scratches, screw_defect, tile_defect, transistor_defect)

Note: Model `.pt` files are excluded from git via `.gitignore`.
When the FastAPI inference service (`app_ml/inference_service/main.py`) boots, it checks for these files and loads them into memory for instant inference. If not found locally, the service boots in development mode with simulated detections.
