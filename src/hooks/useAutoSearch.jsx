import { useState, useEffect, useCallback, useRef } from 'react'
import { searchProducts, extractEntities } from '../services/api'
import { generateSearchVariants, getPopularSuggestions } from '../services/suggestions'

const useAutoSearch = (delay = 300) => {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [entities, setEntities] = useState([])
  const [products, setProducts] = useState([])
  const [error, setError] = useState(null)
  
  const debounceTimer = useRef(null)
  const abortController = useRef(null)

  // Функция для выполнения поиска
  const performSearch = useCallback(async (searchQuery) => {
    if (!searchQuery.trim()) {
      setSuggestions([])
      setEntities([])
      setProducts([])
      setError(null)
      return
    }

    // Отменяем предыдущий запрос
    if (abortController.current) {
      abortController.current.abort()
    }
    
    abortController.current = new AbortController()
    setIsLoading(true)
    setError(null)

    try {
      // Параллельно выполняем поиск товаров и извлечение сущностей
      const [productsResponse, entitiesResponse] = await Promise.allSettled([
        searchProducts(searchQuery),
        extractEntities(searchQuery)
      ])

      // Обрабатываем результаты поиска товаров
      if (productsResponse.status === 'fulfilled') {
        const productsData = productsResponse.value
        setProducts(productsData.products || productsData || [])
      }

      // Обрабатываем результаты извлечения сущностей
      if (entitiesResponse.status === 'fulfilled') {
        const entityData = entitiesResponse.value
        if (entityData && !entityData.error) {
          const extractedEntities = []
          Object.entries(entityData).forEach(([type, entityList]) => {
            if (Array.isArray(entityList)) {
              entityList.forEach(entity => {
                extractedEntities.push({
                  ...entity,
                  type,
                  text: searchQuery.substring(entity.start_index, entity.end_index)
                })
              })
            }
          })
          setEntities(extractedEntities)
          
          // Генерируем варианты поиска на основе сущностей
          const searchVariants = generateSearchVariants(searchQuery, extractedEntities)
          setSuggestions(searchVariants)
        }
      }

      // Обрабатываем ошибки
      if (productsResponse.status === 'rejected') {
        console.error('Products search error:', productsResponse.reason)
        setError(productsResponse.reason.message || 'Ошибка поиска товаров')
      }
      
      if (entitiesResponse.status === 'rejected') {
        console.error('Entities extraction error:', entitiesResponse.reason)
        // Не показываем ошибку для сущностей, так как это не критично
      }

    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Search error:', error)
        setError(error.message || 'Ошибка при выполнении поиска')
      }
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Debounced поиск
  const debouncedSearch = useCallback((searchQuery) => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }
    
    debounceTimer.current = setTimeout(() => {
      performSearch(searchQuery)
    }, delay)
  }, [performSearch, delay])

  // Обновление запроса
  const updateQuery = useCallback((newQuery) => {
    setQuery(newQuery)
    
    if (newQuery.trim()) {
      debouncedSearch(newQuery)
    } else {
      // Показываем популярные подсказки при пустом запросе
      setSuggestions(getPopularSuggestions())
      setEntities([])
      setProducts([])
      setError(null)
    }
  }, [debouncedSearch])

  // Очистка поиска
  const clearSearch = useCallback(() => {
    setQuery('')
    setSuggestions([])
    setEntities([])
    setProducts([])
    setError(null)
    setIsLoading(false)
    
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }
    
    if (abortController.current) {
      abortController.current.abort()
    }
  }, [])

  // Выбор подсказки
  const selectSuggestion = useCallback((suggestion) => {
    const suggestionText = suggestion.text || suggestion
    setQuery(suggestionText)
    performSearch(suggestionText)
    setSuggestions([])
  }, [performSearch])

  // Очистка подсказок
  const clearSuggestions = useCallback(() => {
    setSuggestions([])
  }, [])

  // Очистка при размонтировании
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current)
      }
      if (abortController.current) {
        abortController.current.abort()
      }
    }
  }, [])

  return {
    query,
    suggestions,
    isLoading,
    entities,
    products,
    error,
    updateQuery,
    clearSearch,
    selectSuggestion,
    clearSuggestions,
    performSearch
  }
}

export default useAutoSearch
