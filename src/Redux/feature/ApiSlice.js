

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://192.168.10.208:5500',

//     const accessToken = localStorage.getItem('access_token');
//     // const token = getState().auth?.token || accessToken;

//     // Do NOT set Authorization for the `ai` endpoint
//     if (endpoint !== 'ai' && accessToken) {
//       headers.set('Authorization', `Bearer ${accessToken}`);
//     }

//     //  Avoid setting 'Content-Type' for FormData (used in AI requests)
//     if (endpoint !== 'ai') {
//       headers.set('Content-Type', 'application/json');
//     }

//     return headers;
//   },

prepareHeaders: (headers) => {

            const token = localStorage.getItem("access_token");

            if (token) {

                headers.set("Authorization", `Bearer ${token}`);

            }

            return headers;

        },
 
});

export const ApiSlice = createApi({
  reducerPath: 'ApiSlice',
  baseQuery,
  tagTypes: ['Profile', 'UserDashboard', 'Project', 'Employees', 'AI'],
  endpoints: (builder) => ({
    ai: builder.mutation({
      query: (data) => ({
        url: '/part-recog/',
        method: 'POST',
        body: data, // FormData for image + message
      }),
    }),

    updateProfile: builder.mutation({
      query: (profileData) => ({
        url: '/update-profile/',
        method: 'PUT',
        body: profileData, // This will be the JSON data like { "username": "newUsername" }
      }),
      invalidatesTags: ['Profile'], // Refetch profile-related data after update
    }),
    // Add other endpoints here if needed
  }),
});

export const { useAiMutation, useUpdateProfileMutation } = ApiSlice;

export default ApiSlice;
