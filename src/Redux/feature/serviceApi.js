

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const seviceApi = createApi({
    reducerPath: "seviceApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://192.168.10.208:5500", //  Update this with your backend URL
    }),
    endpoints: (builder) => ({


        ai: builder.mutation({
            query: (data) => ({
                url: "/parts-recog/",
                method: "POST",
                body: data,
            })
        }),
       
    }),
});

//  Destructure the auto-generated hook
export const { 
    useAi,
 } = seviceApi;
export default seviceApi;

        
