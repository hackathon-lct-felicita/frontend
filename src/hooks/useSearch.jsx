import React, { createContext, useContext, useState, useCallback } from 'react'
import { searchProducts } from '../services/api'

const SearchContext = createContext()

export const useSearch = () => {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider')
  }
  return context
}

export const SearchProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [lastQuery, setLastQuery] = useState('')

  const searchProductsHandler = useCallback(async (query) => {
    if (!query.trim()) {
      setProducts([])
      setError(null)
      setLastQuery('')
      return
    }

    setIsLoading(true)
    setError(null)
    setLastQuery(query)

    try {
      const results = await searchProducts(query)
      setProducts(results)
    } catch (err) {
      setError(err.message || 'Ошибка при поиске товаров')
      setProducts([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  const clearSearch = useCallback(() => {
    setProducts([])
    setError(null)
    setLastQuery('')
  }, [])

  const value = {
    products,
    isLoading,
    error,
    lastQuery,
    searchProducts: searchProductsHandler,
    clearSearch
  }

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  )
}
