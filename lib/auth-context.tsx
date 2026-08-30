"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { UserSession, computeInitials } from "@/lib/types/user";

export * from "@/lib/types/user";

interface AuthContextType {
  user: UserSession | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: {
    fullName: string;
    identifier: string;
    loginMethod: "email" | "phone";
    businessName?: string;
    plan?: "free" | "pro";
  }) => void;
  signup: (details: {
    fullName: string;
    enterprise: string;
    contact: string;
    category?: string;
    location?: string;
    plan?: "free" | "pro";
  }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = "sahayya_auth_session";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize session from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        const parsed: any = JSON.parse(stored);
        if (parsed && parsed.isLoggedIn) {
          const fullName = parsed.fullName || parsed.name || "Enterprise User";
          const initials = parsed.initials || computeInitials(fullName);
          const normalizedSession: UserSession = {
            fullName,
            identifier: parsed.identifier || parsed.contact || "",
            loginMethod: parsed.loginMethod || "phone",
            businessName: parsed.businessName || parsed.enterprise || "",
            initials,
            plan: parsed.plan || "free",
            category: parsed.category,
            location: parsed.location,
            isLoggedIn: true,
            createdAt: parsed.createdAt || new Date().toISOString(),
          };
          setUser(normalizedSession);
        }
      }
    } catch (e) {
      console.error("Failed to load auth session", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (credentials: {
    fullName: string;
    identifier: string;
    loginMethod: "email" | "phone";
    businessName?: string;
    plan?: "free" | "pro";
  }) => {
    const fullName = credentials.fullName.trim() || "Enterprise User";
    const initials = computeInitials(fullName);

    const session: UserSession = {
      fullName,
      identifier: credentials.identifier.trim(),
      loginMethod: credentials.loginMethod,
      businessName: credentials.businessName?.trim() || undefined,
      initials,
      plan: credentials.plan || "free",
      isLoggedIn: true,
      createdAt: new Date().toISOString(),
    };

    setUser(session);
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
    } catch (e) {
      console.error("Failed to save auth session", e);
    }
  };

  const signup = (details: {
    fullName: string;
    enterprise: string;
    contact: string;
    category?: string;
    location?: string;
    plan?: "free" | "pro";
  }) => {
    const fullName = details.fullName.trim() || "Enterprise User";
    const initials = computeInitials(fullName);

    const session: UserSession = {
      fullName,
      identifier: details.contact.trim(),
      loginMethod: "phone",
      businessName: details.enterprise.trim(),
      category: details.category || "Agro & Food Processing Cluster",
      location: details.location || "Maharashtra",
      initials,
      plan: details.plan || "free",
      isLoggedIn: true,
      createdAt: new Date().toISOString(),
    };

    setUser(session);
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
    } catch (e) {
      console.error("Failed to save auth session", e);
    }
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (e) {
      console.error("Failed to clear auth session", e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user?.isLoggedIn,
        isLoading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
