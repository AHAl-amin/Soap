

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://backend.shipmateai.org/", //  Update this with your backend URL
    }),
    endpoints: (builder) => ({

        register: builder.mutation({
            query: (data) => ({
                url: "/signup/", //  Your API endpoint
                method: "POST",
                body: data, //  Sending email & password
            }),
        }),
        login: builder.mutation({
            query: (data) => ({
                url: "/login/", // Your API endpoint
                method: "POST",
                body: data, //  Sending email & password
            }),
        }),

        // registerVerification: builder.mutation({
        //     query: (data) => ({
        //         url: "/users/activate/",
        //         method: "POST",
        //         body: data,
        //     })
        // }),

      


        // resendOtp: builder.mutation({
        //     query: (data) => ({
        //         url: "/users/resend-otp/",
        //         method: "POST",
        //         body: data,
        //     })
        // }),

        // forgetPassword: builder.mutation({
        //     query: (data) => ({
        //         url: "/users/password-reset/",
        //         method: "POST",
        //         body: data,
        //     })
        // }),
        // forgetPasswordVerification: builder.mutation({
        //     query: (data) => ({
        //         url: "/users/reset-request-activate/",
        //         method: "POST",
        //         body: data,
        //     })
        // }),
        // ConfirmPassword: builder.mutation({
        //     query: (data) => ({
        //         url: "/users/reset-password/",
        //         method: "POST",
        //         body: data,
        //     })
        // }),
       
    }),
});

//  Destructure the auto-generated hook
export const { 
    useRegisterMutation,useLoginMutation,
 } = authApi;
export default authApi;
