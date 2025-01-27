
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { BASE_URL } from '../../../constants'
import { LoadingSpinner } from '../loadingSpinner/LoadingSpinner'
import { ProductCard } from '../productCard/ProductCard'


interface IProductRecommendation {
  _id: string;
  category?: string;
  name: string,
  description?: string,
  price: number,
  image: string,
  isFeatured?: boolean,
}
export const PeopleAlsoBought = () => {
  const [recommendations, setRecommendations] = useState<IProductRecommendation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch(`${BASE_URL}/products/recommendations`)
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`)
        }
        const data = await response.json()
        setRecommendations(data)
      } catch (error) {
        toast.error(error.response.data.message || 'An error occurred while fetching recommendations')

      } finally {
        setLoading(false)
      }
    }
    fetchRecommendations()
  }, [])

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold text-emerald-400">People also bought</h3>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg: grid-col-3">
        {
          recommendations?.map((recommendation) => (
            <ProductCard key={recommendation._id} product={recommendation} />
          ))
        }
      </div>
    </div>
  )
}