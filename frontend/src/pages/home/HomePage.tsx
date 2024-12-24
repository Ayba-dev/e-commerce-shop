import {CategoryItem} from "../../components/categoryItem/CategoryItem.tsx";


const categories = [
    { href: "/jeans", name: "Jeans", imageUrl: "https://github.com/burakorkmez/mern-ecommerce/blob/master/frontend/public/jeans.jpg?raw=true" },
    { href: "/t-shirts", name: "T-shirts", imageUrl: "https://github.com/burakorkmez/mern-ecommerce/blob/master/frontend/public/tshirts.jpg?raw=true" },
    { href: "/shoes", name: "Shoes", imageUrl: "https://github.com/burakorkmez/mern-ecommerce/blob/master/frontend/public/shoes.jpg?raw=true" },
    { href: "/glasses", name: "Glasses", imageUrl: "https://github.com/burakorkmez/mern-ecommerce/blob/master/frontend/public/glasses.png?raw=true" },
    { href: "/jackets", name: "Jackets", imageUrl: "https://github.com/burakorkmez/mern-ecommerce/blob/master/frontend/public/jackets.jpg?raw=true" },
    { href: "/suits", name: "Suits", imageUrl: "https://github.com/burakorkmez/mern-ecommerce/blob/master/frontend/public/suits.jpg?raw=true" },
    { href: "/bags", name: "Bags", imageUrl: "https://github.com/burakorkmez/mern-ecommerce/blob/master/frontend/public/bags.jpg?raw=true" },
];

const HomePage = () => {

    return (
        <div className='relative min-h-screen  text-white overflow-hidden'>
            <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
                <h1 className='text-center text-5xl sm:text-6xl font-bold text-emerald-400 mb-4'>
                    Explore Our Categories
                </h1>
                <p className='text-center text-xl text-gray-300 mb-12'>
                    Discover the latest trends in eco-friendly fashion
                </p>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {
                        categories?.map((category) => (
                            <CategoryItem category={category} key={category.name} />
                        ))
                    }
                </div>

                {/*{!isLoading && products.length > 0 && <FeaturedProducts featuredProducts={products} />}*/}
            </div>

        </div>
    );
};
export default HomePage;