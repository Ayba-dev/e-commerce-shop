import {ChevronLeft, ChevronRight, ShoppingCart} from "lucide-react";
import {toast} from "react-toastify";

interface IFeature {
  _id: string
  image?: string;
  name?: string;
  price?: number;
}

interface Props  {
  featuredProducts: IFeature[]
}

export const FeaturedProduct = ({featuredProducts } : Props) => {

  return (
    <div className='py-12'>
      <div className='container mx-auto px-4'>
        <h2 className='text-center text-5xl sm:text-6xl font-bold text-emerald-400 mb-4'>Featured</h2>
        <div className='relative'>
          <div className='overflow-hidden'>
            <div
              className='flex transition-transform duration-300 ease-in-out'
              // style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
            >
              {featuredProducts?.map((product) => (
                <div key={product._id} className='w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 flex-shrink-0 px-2'>
                  <div className='bg-white bg-opacity-10 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden h-full transition-all duration-300 hover:shadow-xl border border-emerald-500/30'>
                    <div className='overflow-hidden'>
                      <img
                        src={product.image}
                        alt={product.name}
                        className='w-full h-48 object-cover transition-transform duration-300 ease-in-out hover:scale-110'
                      />
                    </div>
                    <div className='p-4'>
                      <h3 className='text-lg font-semibold mb-2 text-white'>{product.name}</h3>
                      <p className='text-emerald-300 font-medium mb-4'>
                        ${product.price.toFixed(2)}
                      </p>
                      <button
                        // onClick={() => handleAddToCard(product)}
                        className='w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2 px-4 rounded transition-colors duration-300
												flex items-center justify-center'
                      >
                        <ShoppingCart className='w-5 h-5 mr-2' />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button>
            <ChevronLeft className='w-6 h-6' />
          </button>

          <button>
            <ChevronRight className='w-6 h-6' />
          </button>
        </div>
      </div>
    </div>
  );
}