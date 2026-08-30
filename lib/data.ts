export interface MonthlyCreditData {
  month: string;
  Revenue: number;
  Quality: number;
  Production: number;
}

export const creditEligibilityData: MonthlyCreditData[] = [
  { month: "Jan", Revenue: 340, Quality: 180, Production: 160 },
  { month: "Feb", Revenue: 360, Quality: 190, Production: 180 },
  { month: "Mar", Revenue: 390, Quality: 210, Production: 190 },
  { month: "Apr", Revenue: 420, Quality: 230, Production: 200 },
  { month: "May", Revenue: 460, Quality: 240, Production: 220 },
  { month: "Jun", Revenue: 510, Quality: 260, Production: 230 },
  { month: "Jul", Revenue: 440, Quality: 210, Production: 190 },
  { month: "Aug", Revenue: 450, Quality: 220, Production: 200 },
  { month: "Sep", Revenue: 530, Quality: 270, Production: 250 },
  { month: "Oct", Revenue: 500, Quality: 250, Production: 240 },
  { month: "Nov", Revenue: 540, Quality: 280, Production: 260 },
  { month: "Dec", Revenue: 580, Quality: 290, Production: 270 },
];

export interface DemandForecastPoint {
  month: string;
  demand: number;
  predicted?: number;
}

export const demandForecastData: DemandForecastPoint[] = [
  { month: "Jan", demand: 42 },
  { month: "Feb", demand: 58 },
  { month: "Mar", demand: 55 },
  { month: "Apr", demand: 62 },
  { month: "May", demand: 52 },
  { month: "Jun", demand: 59 },
  { month: "Jul", demand: 70 },
  { month: "Aug", demand: 82 },
];

export interface SparklinePoint {
  val: number;
}

export const growthSparkline: SparklinePoint[] = [
  { val: 40 },
  { val: 45 },
  { val: 42 },
  { val: 56 },
  { val: 62 },
  { val: 58 },
  { val: 72 },
  { val: 78 },
];

export const complianceSparkline: SparklinePoint[] = [
  { val: 65 },
  { val: 70 },
  { val: 68 },
  { val: 75 },
  { val: 78 },
  { val: 82 },
  { val: 80 },
  { val: 85 },
];

export const schemesSparkline: SparklinePoint[] = [
  { val: 2 },
  { val: 2 },
  { val: 3 },
  { val: 3 },
  { val: 4 },
  { val: 4 },
  { val: 5 },
  { val: 5 },
];

export const demandMiniSparkline: SparklinePoint[] = [
  { val: 30 },
  { val: 45 },
  { val: 38 },
  { val: 52 },
  { val: 48 },
  { val: 64 },
  { val: 70 },
  { val: 85 },
];

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  type: "scheme" | "compliance" | "credit" | "market";
  unread?: boolean;
}

export const mockNotifications: NotificationItem[] = [
  {
    id: "1",
    title: "New Scheme Match: PMFME Subsidy",
    description: "Your cluster qualifies for 35% capital subsidy up to ₹10 Lakhs.",
    time: "10m ago",
    type: "scheme",
    unread: true,
  },
  {
    id: "2",
    title: "GST Filing Window Open",
    description: "GSTR-3B due in 4 days. Automated pre-fill is ready.",
    time: "2h ago",
    type: "compliance",
    unread: true,
  },
  {
    id: "3",
    title: "Credit Score Update",
    description: "Quality benchmark rose to 810/1000. Interest concession unlocked.",
    time: "1d ago",
    type: "credit",
    unread: false,
  },
];

export interface SchemeItem {
  id: string;
  name: string;
  department: string;
  subsidy: string;
  eligibilityScore: string;
  status: "Eligible" | "Application Open" | "Expiring Soon";
  deadline: string;
}

export const mockSchemesList: SchemeItem[] = [
  {
    id: "pmegp",
    name: "Prime Minister's Employment Generation Programme (PMEGP)",
    department: "Ministry of MSME",
    subsidy: "Up to 35% Margin Money",
    eligibilityScore: "810/1000 (Matches 98%)",
    status: "Eligible",
    deadline: "31 Mar 2026",
  },
  {
    id: "cgtmse",
    name: "Credit Guarantee Trust for Micro & Small Enterprises (CGTMSE)",
    department: "SIDBI & MoMSME",
    subsidy: "Collateral-free loans up to ₹5 Cr",
    eligibilityScore: "810/1000 (Approved Pre-check)",
    status: "Application Open",
    deadline: "Rolling",
  },
  {
    id: "zed",
    name: "MSME Sustainable (ZED) Certification Scheme",
    department: "Quality Council of India",
    subsidy: "Up to 80% Certification Subsidy",
    eligibilityScore: "Gold Tier Eligible",
    status: "Eligible",
    deadline: "15 Apr 2026",
  },
  {
    id: "pmfme",
    name: "PM Formalisation of Micro food processing Enterprises (PMFME)",
    department: "MoFPI",
    subsidy: "35% Credit-Linked Grant",
    eligibilityScore: "Special Cluster Benefit",
    status: "Expiring Soon",
    deadline: "20 Mar 2026",
  },
];
