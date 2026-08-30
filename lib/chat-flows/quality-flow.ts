import { ChatFlow } from "./types";
import { activeAnalyzer as qualityAnalyzer } from "../analyzers/quality";

export const qualityFlow: ChatFlow = {
  id: "quality",
  department: "Quality Inspection & ZED Certification (PS5)",
  title: "AI Quality Check & Defect Audit",
  initialStep: "upload_product_photo",
  steps: {
    upload_product_photo: {
      id: "upload_product_photo",
      message: "🔬 **AI Quality Inspection & ZED Audit (PS5)**\n\nUpload a photo of your product to get started with the batch defect and ZED certification inspection.",
      inputType: "upload",
      options: [],
    },
    q1_surface: {
      id: "q1_surface",
      message: "Question 1 (Surface Defects): Are sample pieces free of surface cracks, burrs, roughness, or dimensional warpage?",
      options: [
        { label: "✅ 0 visible surface defects", value: "surface_pass", nextStep: "q2_packaging" },
        { label: "⚠️ Minor surface roughness observed", value: "surface_fail", nextStep: "q2_packaging" },
      ],
    },
    q2_packaging: {
      id: "q2_packaging",
      message: "Question 2 (Packaging & Labeling): Does the packaging pass moisture sealing, impact durability, and BIS/ISI batch label requirements?",
      options: [
        { label: "✅ Sealed, barcoded & compliant", value: "pack_pass", nextStep: "q3_tolerance" },
        { label: "❌ Missing batch label / Plain wrap", value: "pack_fail", nextStep: "q3_tolerance" },
      ],
    },
    q3_tolerance: {
      id: "q3_tolerance",
      message: "Question 3 (Dimensional Tolerance): Did sample lot weights and dimensions test within ±2% of client blueprint tolerances?",
      options: [
        { label: "✅ Exact tolerance achieved (±2%)", value: "tol_pass", nextStep: "calc_quality_result" },
        { label: "⚠️ Variation observed in 5%+ batch", value: "tol_fail", nextStep: "calc_quality_result" },
      ],
    },
    calc_quality_result: {
      id: "calc_quality_result",
      message: "Evaluating batch quality grade & ZED certification level...",
      isFinal: true,
      options: [
        { label: "🚀 Upgrade to Pro for Live Computer Vision QC", value: "upgrade", isUpgrade: true },
        { label: "🔄 Test Another Product Batch", value: "restart", nextStep: "upload_product_photo" },
      ],
    },
  },
};
