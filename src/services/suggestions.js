// Словарь модификаторов для разных категорий товаров
const categoryModifiers = {
  // Молочные продукты
  'молоко': [
    'безлактозное', 'обезжиренное', 'цельное', 'пастеризованное', 
    'ультрапастеризованное', 'отборное', 'домашнее', 'козье', 'коровье'
  ],
  'кефир': [
    'обезжиренный', 'жирный', 'био', 'с бифидобактериями', 
    'натуральный', 'фруктовый', 'ванильный'
  ],
  'йогурт': [
    'натуральный', 'фруктовый', 'греческий', 'питьевой', 
    'обезжиренный', 'с пробиотиками', 'ванильный'
  ],
  'сыр': [
    'твердый', 'мягкий', 'плавленый', 'творожный', 'козий', 
    'овечий', 'с плесенью', 'копченый'
  ],
  'творог': [
    'обезжиренный', 'жирный', 'зерненый', 'мягкий', 
    'домашний', 'с изюмом', 'с зеленью'
  ],
  'сметана': [
    'жирная', 'обезжиренная', 'домашняя', 'с зеленью', 
    'с чесноком', 'термизированная'
  ],

  // Мясные продукты
  'колбаса': [
    'вареная', 'копченая', 'сырокопченая', 'докторская', 
    'сервелат', 'салями', 'охотничья', 'молочная'
  ],
  'сосиски': [
    'молочные', 'охотничьи', 'детские', 'диетические', 
    'с сыром', 'с травами'
  ],
  'мясо': [
    'говядина', 'свинина', 'баранина', 'курица', 'индейка', 
    'свежее', 'замороженное', 'фарш'
  ],

  // Хлеб и выпечка
  'хлеб': [
    'белый', 'черный', 'ржаной', 'цельнозерновой', 'бородинский', 
    'бездрожжевой', 'с отрубями', 'с семечками'
  ],
  'булочки': [
    'сдобные', 'с маком', 'с кунжутом', 'с корицей', 
    'с изюмом', 'мини', 'для гамбургеров'
  ],

  // Овощи и фрукты
  'яблоки': [
    'красные', 'зеленые', 'желтые', 'сладкие', 'кислые', 
    'сорт гренни смит', 'сорт голден', 'сорт фуджи'
  ],
  'бананы': [
    'спелые', 'зеленые', 'мини', 'детские', 'сорт кавендиш'
  ],
  'помидоры': [
    'черри', 'сливовидные', 'розовые', 'желтые', 
    'на ветке', 'тепличные', 'полевые'
  ],
  'огурцы': [
    'тепличные', 'полевые', 'корнишоны', 'длинные', 
    'с пупырышками', 'без горечи'
  ],

  // Напитки
  'сок': [
    'яблочный', 'апельсиновый', 'виноградный', 'томатный', 
    'мультифрукт', 'с мякотью', 'осветленный', 'нектар'
  ],
  'вода': [
    'минеральная', 'газированная', 'негазированная', 
    'питьевая', 'родниковая', 'артезианская'
  ],

  // Ценовые категории
  'красная цена': [
    'молоко', 'хлеб', 'яйца', 'масло', 'сыр', 'колбаса'
  ],
  'выгодно': [
    'акция', 'скидка', 'распродажа', 'специальная цена'
  ],
  'премиум': [
    'высокое качество', 'органический', 'эко', 'био'
  ]
}

// Объемы и веса
const volumeModifiers = [
  '1л', '500мл', '250мл', '1.5л', '2л', '330мл',
  '1кг', '500г', '250г', '100г', '50г'
]

// Процент жирности
const fatModifiers = [
  '0.5%', '1%', '2.5%', '3.2%', '3.6%', '4%', '6%', '9%', '15%', '20%'
]

// Цвета
const colorModifiers = [
  'красный', 'белый', 'зеленый', 'желтый', 'оранжевый', 'фиолетовый'
]

// Функция для извлечения базовой категории из запроса
const extractBaseCategory = (query) => {
  const lowerQuery = query.toLowerCase()
  
  // Ищем точные совпадения
  for (const [category, modifiers] of Object.entries(categoryModifiers)) {
    if (lowerQuery.includes(category)) {
      return category
    }
  }
  
  // Ищем частичные совпадения
  const words = lowerQuery.split(/\s+/)
  for (const word of words) {
    for (const [category] of Object.entries(categoryModifiers)) {
      if (word.includes(category) || category.includes(word)) {
        return category
      }
    }
  }
  
  return null
}

// Функция для определения типа варианта через ИИ (на основе сущностей)
const determineVariantType = (variant, entities = []) => {
  const lowerVariant = variant.toLowerCase()
  
  // Анализируем сущности для определения типа
  const entityTypes = entities.map(e => e.type || e.entity)
  
  // Если есть сущность VOLUME, это объем
  if (entityTypes.includes('VOLUME') || lowerVariant.match(/\d+[млкгл]/)) {
    return 'Объем'
  }
  
  // Если есть сущность PERCENT, это жирность
  if (entityTypes.includes('PERCENT') || lowerVariant.match(/\d+\.?\d*%/)) {
    return 'Жирность'
  }
  
  // Если есть сущность COLOR, это цвет
  if (entityTypes.includes('COLOR') || colorModifiers.some(color => lowerVariant.includes(color))) {
    return 'Цвет'
  }
  
  // Если есть сущность PRICE, это цена
  if (entityTypes.includes('PRICE') || lowerVariant.includes('красная цена') || lowerVariant.includes('выгодно')) {
    return 'Цена'
  }
  
  // Если есть сущность BRAND, это модификатор
  if (entityTypes.includes('BRAND')) {
    return 'Модификатор'
  }
  
  // По умолчанию - модификатор
  return 'Модификатор'
}

// Функция для генерации вариантов поиска
export const generateSearchVariants = (query, entities = []) => {
  if (!query || query.length < 2) {
    return []
  }

  const variants = []
  const lowerQuery = query.toLowerCase()
  
  // Извлекаем базовую категорию
  const baseCategory = extractBaseCategory(query)
  
  // Генерируем варианты на основе категории
  if (baseCategory && categoryModifiers[baseCategory]) {
    const modifiers = categoryModifiers[baseCategory]
    
    // Фильтруем модификаторы, которые еще не использованы
    const unusedModifiers = modifiers.filter(modifier => 
      !lowerQuery.includes(modifier.toLowerCase())
    )
    
    // Добавляем модификаторы как варианты
    unusedModifiers.slice(0, 4).forEach(modifier => {
      const variantText = `${query} ${modifier}`
      variants.push({
        text: variantText,
        type: determineVariantType(variantText, entities),
        category: baseCategory,
        modifier: modifier
      })
    })
  }
  
  // Добавляем варианты по объему, если их нет в запросе
  if (!lowerQuery.match(/\d+[млкгл]/)) {
    volumeModifiers.slice(0, 3).forEach(volume => {
      const variantText = `${query} ${volume}`
      variants.push({
        text: variantText,
        type: determineVariantType(variantText, entities),
        volume: volume
      })
    })
  }
  
  // Добавляем варианты по жирности для молочных продуктов
  if (baseCategory && ['молоко', 'кефир', 'йогурт', 'творог', 'сметана'].includes(baseCategory)) {
    if (!lowerQuery.match(/\d+\.?\d*%/)) {
      fatModifiers.slice(0, 3).forEach(fat => {
        const variantText = `${query} ${fat}`
        variants.push({
          text: variantText,
          type: determineVariantType(variantText, entities),
          fat: fat
        })
      })
    }
  }
  
  // Добавляем варианты по цвету для фруктов/овощей
  if (baseCategory && ['яблоки', 'помидоры', 'бананы'].includes(baseCategory)) {
    if (!colorModifiers.some(color => lowerQuery.includes(color))) {
      colorModifiers.slice(0, 2).forEach(color => {
        const variantText = `${query} ${color}`
        variants.push({
          text: variantText,
          type: determineVariantType(variantText, entities),
          color: color
        })
      })
    }
  }
  
  // Добавляем ценовые варианты
  if (!lowerQuery.includes('красная цена') && !lowerQuery.includes('выгодно') && !lowerQuery.includes('премиум')) {
    const variantText = `${query} красная цена`
    variants.push({
      text: variantText,
      type: determineVariantType(variantText, entities),
      priceCategory: 'красная цена'
    })
  }
  
  return variants.slice(0, 8) // Ограничиваем количество вариантов
}

// Оставляем старую функцию для совместимости
export const generateSearchSuggestions = generateSearchVariants

// Функция для получения популярных запросов
export const getPopularSuggestions = () => {
  return [
    { text: 'молоко 3.2%', type: 'Популярный' },
    { text: 'хлеб бородинский', type: 'Популярный' },
    { text: 'яйца куриные', type: 'Популярный' },
    { text: 'колбаса докторская', type: 'Популярный' },
    { text: 'сыр твердый', type: 'Популярный' }
  ]
}

export default {
  generateSearchSuggestions,
  getPopularSuggestions,
  categoryModifiers,
  volumeModifiers,
  fatModifiers,
  colorModifiers
}
