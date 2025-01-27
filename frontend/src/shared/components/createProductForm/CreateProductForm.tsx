import React from 'react'
import { Loader, PlusCircle, Upload } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAddProductsMutation } from '../../../services/productApi'
import { toast } from 'react-toastify'
import { handleImageChange } from '../../lib/imageChange'

export interface INewProduct {
  name: string,
  description: string,
  price: number,
  category: string,
  image: string | ArrayBuffer,
}

const categories = ['jeans', 't-shirts', 'shoes', 'glasses', 'jackets', 'suits', 'bags']

export const CreateProductForm = () => {

  const [addProduct, { isLoading }] = useAddProductsMutation()
  const [newProduct, setNewProduct] = React.useState<INewProduct>({
    name: '',
    description: '',
    price: 0,
    category: '',
    image: '',
  })


  const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target
    setNewProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }))
    console.log(newProduct)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      await addProduct(newProduct).unwrap()
      toast.success('Product Added')
      setNewProduct({
        name: '',
        description: '',
        price: 0,
        category: '',
        image: '',
      })
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div>
      <motion.div
        className="bg-gray-800 shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl font-semibold mb-6 text-emerald-300">Create New Product</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={newProduct.name}
              onChange={handleChange}
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2
						 px-3 text-white focus:outline-none focus:ring-2
						focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={newProduct.description}
              onChange={handleChange}
              rows={Number('3')}
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm
						 py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500
						 focus:border-emerald-500"
              required
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-300">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={newProduct.price}
              onChange={handleChange}
              step="0.01"
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm
						py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500
						 focus:border-emerald-500"
              required
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-300">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={newProduct.category}
              onChange={handleChange}
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md
						 shadow-sm py-2 px-3 text-white focus:outline-none
						 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              required
            >
              <option>Select a category</option>
              {categories.map((category) => (
                <option value={category} key={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="mt-1 flex items-center">
            <input onChange={(event) => handleImageChange(event, setNewProduct)} type="file" id="image"
                   className="sr-only" accept="image/*" />
            <label
              htmlFor="image"
              className="cursor-pointer bg-gray-700 py-2 px-3 border border-gray-600 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              <Upload className="h-5 w-5 inline-block mr-2" />
              Upload Image
            </label>
            {newProduct.image && <span className="ml-3 text-sm text-gray-400">Image uploaded </span>}
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md
					shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700
					focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50"
            disabled={false}>
            {isLoading ? (
              <>
                <Loader className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
                Loading...
              </>

            ) : (
              <>
                <PlusCircle className="mr-2 h-5 w-5" />
                Create Product
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  )
}


