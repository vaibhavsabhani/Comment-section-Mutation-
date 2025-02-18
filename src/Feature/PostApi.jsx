import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const PostApi = createApi({
    reducerPath : "PostApi",
    baseQuery: fetchBaseQuery({baseUrl:"https://jsonplaceholder.typicode.com/"}),
    endpoints:(builder)=>({
       getComments : builder.query({
        query: ()=> "comments"
       }),
       addComment :builder.mutation({
        query : (comment)=>({
            url: "comments",
            method: "post",
            body: comment,
            
        })
       }),
       updateComment :builder.mutation({
        query:(id,body)=>({
           url:`comments/${id}`,
           method:"PUT",
           body: {body} 
        })
       }),
       deleteComment : builder.mutation({
        query : (id)=>({
            url:`comments/${id}`,
            method:"DELETE",
        })
       })
    })

})

export const{useGetCommentsQuery,useAddCommentMutation,useUpdateCommentMutation,useDeleteCommentMutation} = PostApi

