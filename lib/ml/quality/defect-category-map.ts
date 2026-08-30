export interface DefectCategoryInfo {
  displayLabel: string;
  description: string;
  severity: "Low" | "Medium" | "High";
}

export const DEFECT_CATEGORY_MAP: Record<string, DefectCategoryInfo> = {
  scratches: {
    displayLabel: "Surface Defect",
    description: "Visible scratch or surface damage detected",
    severity: "Low",
  },
  metal_nut_defect: {
    displayLabel: "Component Defect",
    description: "Irregularity detected in a component/part",
    severity: "Medium",
  },
  screw_defect: {
    displayLabel: "Component Defect",
    description: "Irregularity detected in a fastener/part",
    severity: "Medium",
  },
  pcb_missing_hole: {
    displayLabel: "Missing Element",
    description: "An expected feature or element appears to be missing",
    severity: "High",
  },
  tile_defect: {
    displayLabel: "Surface/Panel Defect",
    description: "Surface or panel irregularity detected",
    severity: "Medium",
  },
  capsule_defect: {
    displayLabel: "Shape/Form Defect",
    description: "Shape or form irregularity detected",
    severity: "Medium",
  },
  transistor_defect: {
    displayLabel: "Component Defect",
    description: "Irregularity detected in a small component",
    severity: "High",
  },
};

export function mapRawDefectClass(rawClass: string): DefectCategoryInfo {
  const normalized = rawClass.toLowerCase().trim();
  if (DEFECT_CATEGORY_MAP[normalized]) {
    return DEFECT_CATEGORY_MAP[normalized];
  }
  return {
    displayLabel: "Material Discrepancy",
    description: `Optical anomaly detected (${rawClass})`,
    severity: "Medium",
  };
}
