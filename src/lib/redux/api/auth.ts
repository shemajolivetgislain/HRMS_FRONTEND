import { hrmsApi } from "./index";

export const authApi = hrmsApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),
    initiateResetPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/initiate-reset-password",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "PATCH",
        body: data, // email, otp, newPassword
      }),
    }),
    verifyEmail: builder.mutation({
      query: (data) => ({
        url: "/auth/verify-email",
        method: "POST",
        body: data, // email, otp
      }),
    }),
    sendOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/send-otp",
        method: "POST",
        body: data, // email, type
      }),
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useInitiateResetPasswordMutation,
  useResetPasswordMutation,
  useVerifyEmailMutation,
  useSendOtpMutation,
  useChangePasswordMutation,
} = authApi;
