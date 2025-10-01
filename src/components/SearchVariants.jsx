import React from 'react'
import { Tag, Droplets, Percent, Palette, DollarSign, TrendingUp, Sparkles } from 'lucide-react'

const SearchVariants = ({ 
  variants = [], 
  onSelectVariant,
  isLoading = false 
}) => {
  if (!variants || variants.length === 0) {
    return null
  }

  // Функция для получения иконки по типу варианта
  const getVariantIcon = (type) => {
    switch (type) {
      case 'Модификатор':
        return <Tag className="w-4 h-4" />
      case 'Объем':
        return <Droplets className="w-4 h-4" />
      case 'Жирность':
        return <Percent className="w-4 h-4" />
      case 'Цвет':
        return <Palette className="w-4 h-4" />
      case 'Цена':
        return <DollarSign className="w-4 h-4" />
      case 'Популярный':
        return <TrendingUp className="w-4 h-4" />
      default:
        return <Sparkles className="w-4 h-4" />
    }
  }

  // Функция для получения стилей по типу
  const getVariantStyles = (type) => {
    switch (type) {
      case 'Модификатор':
        return 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
      case 'Объем':
        return 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'
      case 'Жирность':
        return 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100'
      case 'Цвет':
        return 'bg-pink-50 text-pink-700 border-pink-200 hover:bg-pink-100'
      case 'Цена':
        return 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
      case 'Популярный':
        return 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100'
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
    }
  }

  return (
    <div className="mt-3">
      <div className="flex flex-wrap gap-1.5">
        {variants.map((variant, index) => (
          <button
            key={index}
            onClick={() => onSelectVariant(variant)}
            disabled={isLoading}
            className={`
              inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full 
              border transition-all duration-200 text-xs font-medium
              ${getVariantStyles(variant.type)}
              ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-105'}
            `}
          >
            {getVariantIcon(variant.type)}
            <span>{variant.text}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default SearchVariants
