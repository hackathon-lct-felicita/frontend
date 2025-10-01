import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, ShoppingCart, Heart, Star, Package, Weight, Calendar } from 'lucide-react'
import { getProductById } from '../services/api'

const ProductDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true)
        // TODO: Implement getProductById API call
        // const productData = await getProductById(id)
        // setProduct(productData)
        
        // Mock data for now
        setProduct({
          plu: id,
          name: 'Молоко Простоквашино 3.2% 1л',
          image_links: {},
          uom: 'шт',
          step: '1',
          rating: 4.5,
          prices: { 'default': '89.90' },
          labels: [],
          property_clarification: 'Пастеризованное',
          is_available: true
        })
      } catch (err) {
        setError('Ошибка при загрузке товара')
      } finally {
        setIsLoading(false)
      }
    }

    if (id) {
      fetchProduct()
    }
  }, [id])

  const handleAddToCart = () => {
    // TODO: Implement add to cart functionality
    console.log('Add to cart:', product.plu)
  }

  const handleToggleFavorite = () => {
    // TODO: Implement favorite functionality
    console.log('Toggle favorite:', product.plu)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-pyaterochka-red border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка товара...</p>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="text-center py-12">
        <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Товар не найден</h2>
        <p className="text-gray-600 mb-4">{error || 'Запрашиваемый товар не существует'}</p>
        <button
          onClick={() => navigate('/')}
          className="btn-primary"
        >
          Вернуться к поиску
        </button>
      </div>
    )
  }

  const getMainImage = () => {
    if (product.image_links && Object.keys(product.image_links).length > 0) {
      const firstKey = Object.keys(product.image_links)[0]
      const images = product.image_links[firstKey]
      return images && images.length > 0 ? images[0] : null
    }
    return null
  }

  const mainImage = getMainImage()

  return (
    <div className="max-w-6xl mx-auto">
      {/* Навигация */}
      <button
        onClick={() => navigate('/')}
        className="flex items-center space-x-2 text-gray-600 hover:text-pyaterochka-red transition-colors mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Вернуться к поиску</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Изображение товара */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
            {mainImage ? (
              <img
                src={mainImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Package className="w-24 h-24 text-gray-400" />
              </div>
            )}
          </div>
        </div>

        {/* Информация о товаре */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            
            {/* Рейтинг */}
            {product.rating && (
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">{product.rating.toFixed(1)}</span>
              </div>
            )}
          </div>

          {/* Цена */}
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                {product.prices && Object.keys(product.prices).length > 0 ? (
                  Object.entries(product.prices).map(([key, price]) => (
                    <div key={key} className="text-3xl font-bold text-pyaterochka-red">
                      {price} ₽
                    </div>
                  ))
                ) : (
                  <div className="text-3xl font-bold text-gray-400">
                    Цена не указана
                  </div>
                )}
              </div>
              
              {product.uom && (
                <span className="text-gray-500">за {product.uom}</span>
              )}
            </div>

            {/* Кнопки действий */}
            <div className="flex space-x-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 btn-primary flex items-center justify-center space-x-2 py-3"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>В корзину</span>
              </button>
              
              <button
                onClick={handleToggleFavorite}
                className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Heart className="w-5 h-5 text-gray-400 hover:text-red-500" />
              </button>
            </div>
          </div>

          {/* Дополнительная информация */}
          <div className="space-y-4">
            {product.property_clarification && (
              <div className="flex items-center space-x-3">
                <Package className="w-5 h-5 text-gray-400" />
                <div>
                  <span className="text-sm text-gray-500">Описание:</span>
                  <p className="text-gray-900">{product.property_clarification}</p>
                </div>
              </div>
            )}

            {product.uom && (
              <div className="flex items-center space-x-3">
                <Weight className="w-5 h-5 text-gray-400" />
                <div>
                  <span className="text-sm text-gray-500">Единица измерения:</span>
                  <p className="text-gray-900">{product.uom}</p>
                </div>
              </div>
            )}

            {product.step && (
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <span className="text-sm text-gray-500">Шаг:</span>
                  <p className="text-gray-900">{product.step}</p>
                </div>
              </div>
            )}

            {product.stock_limit && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <p className="text-orange-800">
                  <strong>Осталось:</strong> {product.stock_limit}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
