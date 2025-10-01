import React from 'react'

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-16">
          {/* Логотип Пятерочки */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">5</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Каталог</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
