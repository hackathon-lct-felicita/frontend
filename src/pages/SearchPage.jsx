import React, { useState, useRef } from 'react'
import { Search, X } from 'lucide-react'
import SearchResults from '../components/SearchResults'
import EntityDetails from '../components/EntityDetails'
import SearchVariants from '../components/SearchVariants'
import useAutoSearch from '../hooks/useAutoSearch'

const SearchPage = () => {
  const searchInputRef = useRef(null)
  
  const {
    query,
    suggestions,
    isLoading,
    entities,
    products,
    error,
    updateQuery,
    clearSearch,
    selectSuggestion,
    clearSuggestions
  } = useAutoSearch(300) // 300ms debounce

  const handleInputChange = (e) => {
    const value = e.target.value
    updateQuery(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      // Поиск уже выполняется автоматически
    }
  }

  const handleClear = () => {
    clearSearch()
    searchInputRef.current?.focus()
  }

  const handleSelectVariant = (variant) => {
    selectSuggestion(variant)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Поисковая строка по центру */}
      <div className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-center">
            <div className="w-full max-w-2xl relative">
              <form onSubmit={handleSubmit} className="relative">
                <div className="relative">
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    placeholder="Поиск товаров..."
                    className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    autoComplete="off"
                  />
                  {query && (
                    <button
                      type="button"
                      onClick={handleClear}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-600 text-white p-2 rounded-md hover:bg-red-700"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Варианты поиска */}
        {suggestions.length > 0 && (
          <div className="max-w-2xl mx-auto mb-8">
            <SearchVariants
              variants={suggestions}
              onSelectVariant={handleSelectVariant}
              isLoading={isLoading}
            />
          </div>
        )}

        {/* Найденные сущности */}
        {entities.length > 0 && (
          <div className="mb-8">
            <EntityDetails entities={entities} />
          </div>
        )}

        {/* Результаты поиска */}
        {query && (
          <SearchResults
            products={products}
            isLoading={isLoading}
            error={error}
            query={query}
          />
        )}

        {/* Приветственный экран */}
        {!query && (
          <div className="text-center py-12">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Добро пожаловать!
              </h2>
              <p className="text-gray-600 mb-8">
                Начните печатать для автоматического поиска товаров с подсказками.
              </p>
              
              {/* Популярные категории */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: 'Молочные продукты', query: 'молоко' },
                  { name: 'Хлеб и выпечка', query: 'хлеб' },
                  { name: 'Мясо и колбасы', query: 'колбаса' },
                  { name: 'Овощи и фрукты', query: 'яблоки' }
                ].map((category) => (
                  <button
                    key={category.name}
                    onClick={() => updateQuery(category.query)}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors text-left"
                  >
                    <h3 className="font-medium text-gray-900 mb-1">{category.name}</h3>
                    <p className="text-sm text-gray-500">Нажмите для поиска</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchPage
