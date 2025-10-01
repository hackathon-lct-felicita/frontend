import React, { useState } from 'react'
import { Search, X, Loader2 } from 'lucide-react'

const SearchBar = ({ onSearch, isLoading, placeholder = "Поиск товаров..." }) => {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim())
    }
  }

  const handleClear = () => {
    setQuery('')
    onSearch('')
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="input-field pl-12 pr-12 py-4 text-lg w-full"
            disabled={isLoading}
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="btn-primary absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            'Найти'
          )}
        </button>
      </form>
      
      {/* Подсказки для поиска */}
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="text-sm text-gray-500">Попробуйте:</span>
        {['молоко', 'хлеб', 'яйца', 'сыр', 'колбаса'].map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => {
              setQuery(suggestion)
              onSearch(suggestion)
            }}
            className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  )
}

export default SearchBar
