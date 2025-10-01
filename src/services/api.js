import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor для обработки ошибок
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Сервер ответил с кодом ошибки
      const message = error.response.data?.detail || error.response.data?.message || 'Ошибка сервера'
      throw new Error(message)
    } else if (error.request) {
      // Запрос был отправлен, но ответа не получено
      throw new Error('Сервер недоступен. Проверьте подключение к интернету.')
    } else {
      // Что-то пошло не так при настройке запроса
      throw new Error('Ошибка при выполнении запроса')
    }
  }
)

// API для поиска товаров
export const searchProducts = async (query) => {
  try {
    const response = await api.get('/search', {
      params: { q: query }
    })
    return response.data
  } catch (error) {
    console.error('Search products error:', error)
    throw error
  }
}

// API для извлечения сущностей
export const extractEntities = async (text) => {
  try {
    const response = await api.get('/api/v1/entities', {
      params: { text }
    })
    return response.data
  } catch (error) {
    console.error('Extract entities error:', error)
    throw error
  }
}

// API для получения поисковых терминов из сущностей
export const getSearchTermsFromEntities = async (text) => {
  try {
    const response = await api.get('/api/v1/entities/search-terms', {
      params: { text }
    })
    return response.data
  } catch (error) {
    console.error('Get search terms error:', error)
    throw error
  }
}

// API для получения товара по ID
export const getProductById = async (id) => {
  try {
    const response = await api.get(`/product/${id}`)
    return response.data
  } catch (error) {
    console.error('Get product by ID error:', error)
    throw error
  }
}

// API для получения всех товаров (для отладки)
export const getAllProducts = async (limit = 20) => {
  try {
    const response = await api.get('/products', {
      params: { limit }
    })
    return response.data
  } catch (error) {
    console.error('Get all products error:', error)
    throw error
  }
}

export default api
