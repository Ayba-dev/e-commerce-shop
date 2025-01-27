import React from 'react';
import {motion} from "framer-motion";
import {useParams} from "react-router-dom";
import {useGetProductByCategoryQuery} from "../../store/slices/productSlice/productApi.ts";
import ProductCard from "../../components/productCard/ProductCard.tsx";

export const CategoryPage = () => {

    const {category} = useParams<{category?: string}>()
    const {data, isLoading, error} = useGetProductByCategoryQuery(category)
    const products = data?.products || [];

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error occurred: {error.message}</p>;

    return (
        <div className='min-h-screen'>
            <div className='relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
                <motion.h1
                    className='text-center text-4xl sm:text-5xl font-bold text-emerald-400 mb-8'
                    initial={{opacity: 0, y: -20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.8}}
                >
                    {category?.charAt(0).toUpperCase() + category?.slice(1)}
                </motion.h1>

                <motion.div
                    className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center'
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.8, delay: 0.2}}
                >
                    {
                        products?.length === 0 && (
                            <h2 className='text-3xl font-semibold text-gray-300 text-center col-span-full'>
                                No products found
                            </h2>
                        )
                    }

                    {products?.map((product) => (
                        <ProductCard key={product._id} product={product}/>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

