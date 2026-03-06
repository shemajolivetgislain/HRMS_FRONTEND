import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthUser } from "@/types";

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  activeCompanyId: string | null;
}

const loadInitialState = (): AuthState => {
  if (typeof window === "undefined") {
    return {
      user: null,
      token: null,
      isAuthenticated: false,
      isInitialized: false,
      activeCompanyId: null,
    };
  }

  try {
    const token = localStorage.getItem("auth_token");
    const userStr = localStorage.getItem("auth_user");
    const user = userStr ? (JSON.parse(userStr) as AuthUser) : null;
    const activeCompanyId = localStorage.getItem("active_company_id");

    if (token && user) {
      return {
        user,
        token,
        isAuthenticated: true,
        isInitialized: true,
        activeCompanyId: activeCompanyId || user.company?.id || null,
      };
    }
  } catch (error) {
    console.error("Failed to restore auth state", error);
  }

  return {
    user: null,
    token: null,
    isAuthenticated: false,
    isInitialized: true,
    activeCompanyId: null,
  };
};

const initialState: AuthState = loadInitialState();

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: AuthUser; token: string }>,
    ) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      state.activeCompanyId = user.company?.id || null;

      // Sync with localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("auth_token", token);
        localStorage.setItem("auth_user", JSON.stringify(user));
        if (state.activeCompanyId) {
          localStorage.setItem("active_company_id", state.activeCompanyId);
        }
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.activeCompanyId = null;

      // Clear localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_user");
        localStorage.removeItem("active_company_id");
      }
    },
    updateUser: (state, action: PayloadAction<Partial<AuthUser>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };

        if (action.payload.company) {
          state.activeCompanyId = action.payload.company.id;
          localStorage.setItem("active_company_id", state.activeCompanyId);
        }

        // Sync with localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("auth_user", JSON.stringify(state.user));
        }
      }
    },
    setActiveCompany: (state, action: PayloadAction<string>) => {
      state.activeCompanyId = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("active_company_id", action.payload);
      }
    },
  },
});

export const { setCredentials, logout, updateUser, setActiveCompany } =
  authSlice.actions;
export default authSlice.reducer;
