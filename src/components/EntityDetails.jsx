import React, { useState, useEffect } from 'react'
import { 
  Package, 
  Award, 
  Droplets, 
  Percent, 
  Tag, 
  Star, 
  Info, 
  ChevronDown, 
  ChevronUp,
  Sparkles,
  Target,
  Zap
} from 'lucide-react'

const EntityDetails = ({ entities }) => {
  const [expandedEntity, setExpandedEntity] = useState(null)
  const [animationPhase, setAnimationPhase] = useState('entering')

  useEffect(() => {
    setAnimationPhase('entering')
    const timer = setTimeout(() => setAnimationPhase('entered'), 300)
    return () => clearTimeout(timer)
  }, [entities])

  if (!entities || entities.length === 0) {
    return null
  }

  const getEntityIcon = (type) => {
    const iconClass = "w-5 h-5"
    switch (type) {
      case 'TYPE':
        return <Package className={iconClass} />
      case 'BRAND':
        return <Award className={iconClass} />
      case 'VOLUME':
        return <Droplets className={iconClass} />
      case 'PERCENT':
        return <Percent className={iconClass} />
      case 'PRICE':
        return <Tag className={iconClass} />
      case 'COLOR':
        return <Star className={iconClass} />
      default:
        return <Info className={iconClass} />
    }
  }

  const getEntityColor = (type) => {
    switch (type) {
      case 'TYPE':
        return {
          bg: 'bg-gradient-to-br from-blue-50 to-blue-100',
          border: 'border-blue-300',
          text: 'text-blue-800',
          accent: 'bg-blue-500'
        }
      case 'BRAND':
        return {
          bg: 'bg-gradient-to-br from-purple-50 to-purple-100',
          border: 'border-purple-300',
          text: 'text-purple-800',
          accent: 'bg-purple-500'
        }
      case 'VOLUME':
        return {
          bg: 'bg-gradient-to-br from-green-50 to-green-100',
          border: 'border-green-300',
          text: 'text-green-800',
          accent: 'bg-green-500'
        }
      case 'PERCENT':
        return {
          bg: 'bg-gradient-to-br from-orange-50 to-orange-100',
          border: 'border-orange-300',
          text: 'text-orange-800',
          accent: 'bg-orange-500'
        }
      case 'PRICE':
        return {
          bg: 'bg-gradient-to-br from-red-50 to-red-100',
          border: 'border-red-300',
          text: 'text-red-800',
          accent: 'bg-red-500'
        }
      case 'COLOR':
        return {
          bg: 'bg-gradient-to-br from-pink-50 to-pink-100',
          border: 'border-pink-300',
          text: 'text-pink-800',
          accent: 'bg-pink-500'
        }
      default:
        return {
          bg: 'bg-gradient-to-br from-gray-50 to-gray-100',
          border: 'border-gray-300',
          text: 'text-gray-800',
          accent: 'bg-gray-500'
        }
    }
  }

  const getEntityInfo = (type, text) => {
    switch (type) {
      case 'TYPE':
        return {
          title: 'Категория товара',
          description: `Товар относится к категории "${text}". Это поможет найти похожие продукты.`,
          examples: ['молоко', 'хлеб', 'мясо', 'овощи']
        }
      case 'BRAND':
        return {
          title: 'Бренд',
          description: `Бренд "${text}" - это производитель товара. У каждого бренда свой стиль и качество.`,
          examples: ['Простоквашино', 'Домик в деревне', 'Активиа']
        }
      case 'VOLUME':
        return {
          title: 'Объем/Вес',
          description: `Объем "${text}" указывает на количество продукта в упаковке.`,
          examples: ['1л', '500мл', '1кг', '250г']
        }
      case 'PERCENT':
        return {
          title: 'Жирность/Содержание',
          description: `Процент "${text}" показывает содержание жира или других веществ в продукте.`,
          examples: ['3.2%', '0.5%', '6%']
        }
      case 'PRICE':
        return {
          title: 'Ценовая категория',
          description: `"${text}" указывает на ценовую категорию товара - бюджетный, премиум или акционный.`,
          examples: ['красная цена', 'выгодно', 'премиум']
        }
      case 'COLOR':
        return {
          title: 'Цвет',
          description: `Цвет "${text}" может указывать на вкус, тип или особенность продукта.`,
          examples: ['красный', 'белый', 'зеленый']
        }
      default:
        return {
          title: 'Сущность',
          description: `Распознанная сущность "${text}" из вашего запроса.`,
          examples: []
        }
    }
  }

  const getEntityTypeName = (type) => {
    switch (type) {
      case 'TYPE': return 'Категория'
      case 'BRAND': return 'Бренд'
      case 'VOLUME': return 'Объем'
      case 'PERCENT': return 'Жирность'
      case 'PRICE': return 'Цена'
      case 'COLOR': return 'Цвет'
      default: return 'Сущность'
    }
  }

  const toggleExpanded = (index) => {
    setExpandedEntity(expandedEntity === index ? null : index)
  }

  return (
    <div className={`space-y-6 transition-all duration-500 ${animationPhase === 'entering' ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
      {/* Заголовок с анимацией */}
      <div className="text-center">
        <div className="inline-flex items-center space-x-2 mb-3">
          <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse-slow" />
          <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Найденные сущности
          </h3>
          <Target className="w-6 h-6 text-green-500 animate-bounce-slow" />
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          ИИ-система распознала <span className="font-semibold text-blue-600">{entities.length}</span> сущностей в вашем запросе. 
          Каждая сущность помогает точнее найти нужный товар.
        </p>
      </div>

      {/* Карточки сущностей */}
      <div className="grid gap-4">
        {entities.map((entity, index) => {
          const type = entity.entity.includes('-') ? entity.entity.split('-')[1] : entity.entity
          const colors = getEntityColor(type)
          const info = getEntityInfo(type, entity.text)
          const isExpanded = expandedEntity === index
          
          return (
            <div
              key={index}
              className={`${colors.bg} ${colors.border} border-2 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 ${animationPhase === 'entering' ? 'animate-slideInUp' : ''}`}
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Основная информация */}
              <div 
                className="p-4 cursor-pointer"
                onClick={() => toggleExpanded(index)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${colors.accent} text-white`}>
                      {getEntityIcon(type)}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className={`font-bold text-lg ${colors.text}`}>
                          {entity.text}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full bg-white/70 ${colors.text}`}>
                          {getEntityTypeName(type)}
                        </span>
                      </div>
                      <p className={`text-sm ${colors.text} opacity-80`}>
                        {info.title}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    {/* Кнопка развернуть */}
                    <div className={`p-2 rounded-lg bg-white/50 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>
              </div>

              {/* Детальная информация */}
              {isExpanded && (
                <div className="border-t border-white/50 bg-white/30 p-4 animate-fadeIn">
                  <div className="space-y-4">
                    <p className={`${colors.text} text-sm leading-relaxed`}>
                      {info.description}
                    </p>
                    
                    {info.examples.length > 0 && (
                      <div>
                        <h4 className={`font-semibold ${colors.text} mb-2 flex items-center space-x-1`}>
                          <Zap className="w-4 h-4" />
                          <span>Примеры:</span>
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {info.examples.map((example, idx) => (
                            <span 
                              key={idx}
                              className={`px-3 py-1 rounded-full text-xs font-medium bg-white/70 ${colors.text}`}
                            >
                              {example}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between pt-2 border-t border-white/50">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className={`text-xs ${colors.text} opacity-80`}>
                          Распознано ИИ-системой
                        </span>
                      </div>
                      <div className={`text-xs ${colors.text} opacity-60`}>
                        Позиция: {entity.start_index}-{entity.end_index}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Статистика внизу */}
      <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-xl p-6 border border-blue-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">
              {entities.length}
            </div>
            <div className="text-blue-600 font-medium">сущностей найдено</div>
            <div className="text-xs text-gray-500 mt-1">в вашем запросе</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">
              {new Set(entities.map(e => e.entity.includes('-') ? e.entity.split('-')[1] : e.entity)).size}
            </div>
            <div className="text-purple-600 font-medium">типов сущностей</div>
            <div className="text-xs text-gray-500 mt-1">различных категорий</div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default EntityDetails
