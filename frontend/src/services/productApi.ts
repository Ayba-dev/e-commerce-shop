import { apiBase } from './api'
import { IItem, IProduct } from '../features/productSlice/types'


export const productApi = apiBase.injectEndpoints?.({
  endpoints: (builder) => ({
    addProducts: builder.mutation<IProduct, {
      name: string,
      description: string,
      price: number,
      category: string,
      image: string | ArrayBuffer
    }>({
      query: (body) => ({
        url: `/products`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['Posts'],
    }),
    getProducts: builder.query<IProduct[], void>({
      query: () => ({
        url: `/products`,
        method: 'GET',
      }),
      providesTags: ['Posts'],
      transformResponse: (response: { products: IProduct[] }) => response.products,
    }),
    deleteProducts: builder.mutation<void, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Posts'],
    }),
    toggleFeaturedProduct: builder.mutation<void, string>({
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
    getProductByCategory: builder.query<IProduct, string>({
      query: (category) => ({
        url: `/products/category/${category}`,
        method: 'GET'
      }),
    }),
    featuredProducts: builder.query<{ _id: string, image: string, name: string, price: number }[], void>({
      query: () => ({
        url: '/products/featured',
        method: 'GET'
      }),
      providesTags: ['Posts'],
    }),
  }),
})


export const {
  useAddProductsMutation,
  useGetProductsQuery,
  useDeleteProductsMutation,
  useToggleFeaturedProductMutation,
  useGetProductByCategoryQuery,
  useFeaturedProductsQuery,
} = productApi