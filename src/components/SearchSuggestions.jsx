import React from 'react'
import { Search, Clock, TrendingUp, Tag, Droplets, Percent, Palette, DollarSign } from 'lucide-react'

const SearchSuggestions = ({ 
  suggestions = [], 
  isLoading = false, 
  onSelectSuggestion, 
  onClearSuggestions,
  isVisible = false 
}) => {
  if (!isVisible || (!isLoading && suggestions.length === 0)) {
    return null
  }

  // Функция для получения иконки по типу подсказки
  const getSuggestionIcon = (type) => {
    switch (type) {
      case 'Модификатор':
        return <Tag className="w-4 h-4 text-blue-500" />
      case 'Объем':
        return <Droplets className="w-4 h-4 text-green-500" />
      case 'Жирность':
        return <Percent className="w-4 h-4 text-orange-500" />
      case 'Цвет':
        return <Palette className="w-4 h-4 text-pink-500" />
      case 'Цена':
        return <DollarSign className="w-4 h-4 text-red-500" />
      case 'Популярный':
        return <TrendingUp className="w-4 h-4 text-purple-500" />
      default:
        return <Search className="w-4 h-4 text-gray-400" />
    }
  }

  // Функция для получения цвета по типу
  const getSuggestionColor = (type) => {
    switch (type) {
      case 'Модификатор':
        return 'text-blue-600 bg-blue-50'
      case 'Объем':
        return 'text-green-600 bg-green-50'
      case 'Жирность':
        return 'text-orange-600 bg-orange-50'
      case 'Цвет':
        return 'text-pink-600 bg-pink-50'
      case 'Цена':
        return 'text-red-600 bg-red-50'
      case 'Популярный':
        return 'text-purple-600 bg-purple-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto">
      {isLoading ? (
        <div className="p-4 text-center">
          <div className="flex items-center justify-center space-x-2 text-gray-500">
            <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
            <span className="text-sm">Поиск...</span>
          </div>
        </div>
      ) : (
        <div className="py-2">
          {/* Заголовок */}
          {suggestions.length > 0 && (
            <div className="px-4 py-2 border-b border-gray-100">
              <div className="flex items-center space-x-2 text-xs text-gray-500 mb-2">
                <TrendingUp className="w-3 h-3" />
                <span>Варианты поиска</span>
              </div>
            </div>
          )}
          
          {/* Список подсказок */}
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => onSelectSuggestion(suggestion)}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center space-x-3 group"
            >
              {getSuggestionIcon(suggestion.type)}
              <div className="flex-1">
                <div className="text-sm text-gray-900 font-medium">
                  {suggestion.text || suggestion}
                </div>
                {suggestion.modifier && (
                  <div className="text-xs text-gray-500 mt-1">
                    Добавить: {suggestion.modifier}
                  </div>
                )}
              </div>
              {suggestion.type && (
                <span className={`text-xs px-2 py-1 rounded-full ${getSuggestionColor(suggestion.type)}`}>
                  {suggestion.type}
                </span>
              )}
            </button>
          ))}
          
          {/* Кнопка очистки */}
          {suggestions.length > 0 && (
            <div className="px-4 py-2 border-t border-gray-100">
              <button
                onClick={onClearSuggestions}
                className="w-full text-xs text-gray-500 hover:text-gray-700 transition-colors"
              >
                Очистить подсказки
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchSuggestions
