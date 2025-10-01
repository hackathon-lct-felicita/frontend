import React from 'react'
import { Star, Package, TrendingUp, Award, Zap, Search } from 'lucide-react'

const SearchResults = ({ products, isLoading, error, query }) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-red-100 border-t-red-600 rounded-full animate-spin mx-auto mb-6"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Search className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Ищем товары...</h3>
          <p className="text-gray-600">Анализируем ваш запрос и подбираем лучшие варианты</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Ошибка поиска</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            Попробовать снова
          </button>
        </div>
      </div>
    )
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Товары не найдены</h3>
          <p className="text-gray-600 mb-4">Попробуйте изменить поисковый запрос или использовать подсказки выше</p>
          <div className="flex flex-wrap justify-center gap-2">
            {['молоко', 'хлеб', 'колбаса', 'яблоки'].map((suggestion) => (
              <button
                key={suggestion}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors text-sm"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const getMainImage = (product) => {
    if (product.image_links && Object.keys(product.image_links).length > 0) {
      const firstKey = Object.keys(product.image_links)[0]
      const images = product.image_links[firstKey]
      return images && images.length > 0 ? images[0] : null
    }
    return null
  }


  return (
    <div className="space-y-6">
      {/* Заголовок с результатами */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Найдено товаров: <span className="text-red-600">{products.length}</span>
          </h2>
          <p className="text-gray-600 mt-1">По запросу «{query}»</p>
        </div>
        
        {/* Статистика */}
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <TrendingUp className="w-4 h-4" />
            <span>Популярные</span>
          </div>
          <div className="flex items-center space-x-1">
            <Award className="w-4 h-4" />
            <span>Лучшие цены</span>
          </div>
        </div>
      </div>

      {/* Сетка товаров */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => {
          const mainImage = getMainImage(product)
          
          return (
            <div
              key={product.plu}
              className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:border-red-200 transition-all duration-300 transform hover:-translate-y-1"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'fadeInUp 0.6s ease-out forwards'
              }}
            >
              {/* Изображение с рейтингом */}
              <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                {mainImage ? (
                  <img
                    src={mainImage}
                    alt={product.name}
                    className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'flex'
                    }}
                  />
                ) : null}
                
                {/* Placeholder для отсутствующего изображения */}
                <div 
                  className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100"
                  style={{ display: mainImage ? 'none' : 'flex' }}
                >
                  <Package className="w-16 h-16 text-gray-300" />
                </div>

                {/* Рейтинг на изображении */}
                {product.rating && (
                  <div className="absolute top-4 left-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center space-x-1 shadow-lg">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-semibold text-gray-900">
                        {product.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                )}

                {/* Бейдж акции */}
                {product.promo && (
                  <div className="absolute top-4 right-4">
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg flex items-center space-x-1">
                      <Zap className="w-3 h-3" />
                      <span>Выгодно</span>
                    </div>
                  </div>
                )}

                {/* Градиентный оверлей при наведении */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Информация о товаре */}
              <div className="p-6">
                {/* Название */}
                <h3 className="font-semibold text-gray-900 text-lg mb-3 line-clamp-2 group-hover:text-red-600 transition-colors">
                  {product.name}
                </h3>

              </div>
            </div>
          )
        })}
      </div>

      {/* Подсказка для загрузки еще */}
      {products.length >= 12 && (
        <div className="text-center py-8">
          <button className="px-8 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            Показать еще товары
          </button>
        </div>
      )}
    </div>
  )
}

export default SearchResults
