import { PersonPPEDetector } from "./detector";
import { realPPEAnalyzer } from "./real-analyzer";

export const activeSafetyDetector: PersonPPEDetector = realPPEAnalyzer;
