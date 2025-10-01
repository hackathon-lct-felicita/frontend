# Установка и запуск Frontend

## Требования

- Node.js 18+ 
- npm или yarn

## Установка

1. Перейдите в директорию frontend:
```bash
cd frontend
```

2. Установите зависимости:
```bash
npm install
```

3. Создайте файл окружения:
```bash
# Создайте .env файл в корне frontend директории
echo "VITE_API_URL=http://localhost:8000" > .env
echo "VITE_DEV_MODE=true" >> .env
```

4. Или отредактируйте .env файл вручную:
```bash
# API Configuration
VITE_API_URL=http://localhost:8000
VITE_DEV_MODE=true
```

## Запуск

### Режим разработки
```bash
npm run dev
```

Приложение будет доступно по адресу: http://localhost:3000

### Сборка для продакшена
```bash
npm run build
```

### Предварительный просмотр сборки
```bash
npm run preview
```

## Структура

```
frontend/
├── src/
│   ├── components/     # React компоненты
│   ├── pages/         # Страницы приложения
│   ├── hooks/         # React хуки
│   ├── services/      # API сервисы
│   └── styles/        # Стили
├── public/            # Статические файлы
├── package.json       # Зависимости и скрипты
├── vite.config.js     # Конфигурация Vite
├── tailwind.config.js # Конфигурация Tailwind
└── README.md          # Документация
```

## Интеграция с Backend

Frontend автоматически подключается к backend API:
- Поиск товаров: `GET /search?q={query}`
- Извлечение сущностей: `GET /api/v1/entities?text={text}`
- Поисковые термины: `GET /api/v1/entities/search-terms?text={text}`

## Возможности

- ✅ Умный поиск с NER
- ✅ Адаптивный дизайн
- ✅ Дизайн в стиле Пятерочки
- ✅ Быстрая загрузка
- ✅ Обработка ошибок
- ✅ Анимации и переходы
