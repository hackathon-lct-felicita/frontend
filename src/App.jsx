import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SearchPage from './pages/SearchPage'
import ProductDetailPage from './pages/ProductDetailPage'
import ErrorBoundary from './components/ErrorBoundary'
import { SearchProvider } from './hooks/useSearch'

function App() {
  return (
    <ErrorBoundary>
      <SearchProvider>
        <Router>
          <div className="min-h-screen bg-white">
            <Routes>
              <Route path="/" element={<SearchPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
            </Routes>
          </div>
        </Router>
      </SearchProvider>
    </ErrorBoundary>
  )
}

export default App
