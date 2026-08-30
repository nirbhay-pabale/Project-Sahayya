export interface UserSession {
  fullName: string;
  identifier: string; // email, MSME ID, or phone number used to log in
  loginMethod: "email" | "phone";
  businessName?: string; // populate if/when available, otherwise omit or show a sensible fallback
  initials: string; // derive from fullName, e.g. "Priya Deshmukh" -> "PD"
  plan: "free" | "pro";
  category?: string;
  location?: string;
  isLoggedIn: boolean;
  createdAt?: string;
}

export function computeInitials(fullName: string): string {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "U";
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
