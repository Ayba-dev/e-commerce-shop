import {apiBase} from "../../api.ts";
import {IProduct} from "./types.ts";


export const productApi = apiBase.injectEndpoints?.({
    endpoints: (builder) => ({
        addProducts: builder.mutation<IProduct, IProduct>({
            query: (body) => ({
                url: '/products',
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['Posts'], // После создания поста кеш с тегом 'Posts' будет сброшен

        }),
        getProducts: builder.query<IProduct[], void>({
            query: () => ({
                url: '/products',
                method: 'GET'
            }),
            providesTags: ['Posts'], // Посты будут иметь тег 'Posts'
            transformResponse: (response: { products: IProduct[] }) => response.products,
        }),
        deleteProduct: builder.mutation<void, string>({
            query: (id) => ({
                url: `/products/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Posts'], // После удаления поста кеш с тегом 'Posts' будет сброшен

        }),
        getProductByCategory: builder.query<IProduct[], string>({
            query: (category) => ({
                url: `/products/category/${category}`,
                method: 'GET'
            }),
        }),
        featuredProducts: builder.query<{ _id: string, image: string, name: string, price: number }, void>({
            query: () => ({
                url: '/products/featured',
                method: 'GET'
            }),
            providesTags: ['Posts'],
        }),
        toggleFeaturedProduct: builder.mutation({
            query: ( productId) => ({
                url: `/products/${productId}`,
                method: 'PATCH',
            }),
            invalidatesTags: ['Posts'],
            // async onQueryStarted({ productId }, { dispatch, queryFulfilled }) {
            //     try {
            //         const {data} = queryFulfilled;
            //         dispatch(
            //             productApi.util.updateQueryData('getProducts', undefined, (draft) => {
            //                 const  product = draft.find((product) => product._id === productId);
            //                 if (product){
            //                     product.isFeatured = data.isFeatured
            //                 }
            //             })
            //         )
            //     }catch (error){
            //         console.error('Failed to toggle featured product:', error);
            //     }
            // }
        }),
    }),

})


export const {
    useAddProductsMutation,
    useGetProductsQuery,
    useDeleteProductMutation,
    useGetProductByCategoryQuery,
    useToggleFeaturedProductMutation,
    useFeaturedProductsQuery
} = productApi