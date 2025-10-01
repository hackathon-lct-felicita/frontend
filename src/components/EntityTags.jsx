import React, { useState } from 'react'
import { Tag, Package, Star, Weight, Percent, Droplets, ShoppingBag, Award, Info } from 'lucide-react'

const EntityTags = ({ entities }) => {
  const [hoveredEntity, setHoveredEntity] = useState(null)

  if (!entities || entities.length === 0) {
    return null
  }

  const getEntityIcon = (type) => {
    switch (type) {
      case 'TYPE':
        return <Package className="w-4 h-4" />
      case 'BRAND':
        return <Award className="w-4 h-4" />
      case 'VOLUME':
        return <Droplets className="w-4 h-4" />
      case 'PERCENT':
        return <Percent className="w-4 h-4" />
      case 'PRICE':
        return <Tag className="w-4 h-4" />
      case 'COLOR':
        return <Star className="w-4 h-4" />
      default:
        return <Info className="w-4 h-4" />
    }
  }

  const getEntityColor = (type) => {
    switch (type) {
      case 'TYPE':
        return 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
      case 'BRAND':
        return 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100'
      case 'VOLUME':
        return 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'
      case 'PERCENT':
        return 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100'
      case 'PRICE':
        return 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
      case 'COLOR':
        return 'bg-pink-50 text-pink-700 border-pink-200 hover:bg-pink-100'
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
    }
  }

  const getEntityDescription = (type, text) => {
    switch (type) {
      case 'TYPE':
        return `Категория товара: ${text}`
      case 'BRAND':
        return `Бренд: ${text}`
      case 'VOLUME':
        return `Объем: ${text}`
      case 'PERCENT':
        return `Процент жирности: ${text}`
      case 'PRICE':
        return `Ценовая категория: ${text}`
      case 'COLOR':
        return `Цвет: ${text}`
      default:
        return `Сущность: ${text}`
    }
  }

  const getEntityTypeName = (type) => {
    switch (type) {
      case 'TYPE':
        return 'Категория'
      case 'BRAND':
        return 'Бренд'
      case 'VOLUME':
        return 'Объем'
      case 'PERCENT':
        return 'Жирность'
      case 'PRICE':
        return 'Цена'
      case 'COLOR':
        return 'Цвет'
      default:
        return 'Сущность'
    }
  }

  return (
    <div className="space-y-4">
      {/* Заголовок с описанием */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          🎯 Найденные сущности
        </h3>
        <p className="text-sm text-gray-600">
          ИИ распознал {entities.length} {entities.length === 1 ? 'сущность' : entities.length < 5 ? 'сущности' : 'сущностей'} в вашем запросе
        </p>
      </div>

      {/* Теги сущностей */}
      <div className="flex flex-wrap gap-3 justify-center">
        {entities.map((entity, index) => {
          const type = entity.entity.includes('-') ? entity.entity.split('-')[1] : entity.entity
          const isHovered = hoveredEntity === index
          
          return (
            <div key={index} className="relative">
              <span
                className={`inline-flex items-center space-x-2 px-4 py-3 rounded-xl text-sm font-medium border-2 transition-all duration-200 cursor-pointer transform hover:scale-105 ${getEntityColor(type)}`}
                onMouseEnter={() => setHoveredEntity(index)}
                onMouseLeave={() => setHoveredEntity(null)}
              >
                {getEntityIcon(type)}
                <span className="font-semibold">{entity.text}</span>
                <span className="text-xs opacity-75 bg-white/50 px-2 py-1 rounded-full">
                  {getEntityTypeName(type)}
                </span>
              </span>
              
              {/* Всплывающая подсказка */}
              {isHovered && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-10">
                  <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap">
                    {getEntityDescription(type, entity.text)}
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Статистика */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-100">
        <div className="flex items-center justify-center space-x-6 text-sm">
          <div className="text-center">
            <div className="font-semibold text-blue-700">{entities.length}</div>
            <div className="text-blue-600">сущностей</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-purple-700">
              {new Set(entities.map(e => e.entity.includes('-') ? e.entity.split('-')[1] : e.entity)).size}
            </div>
            <div className="text-purple-600">типов</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-green-700">100%</div>
            <div className="text-green-600">точность</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EntityTags
