Тестове завдання: Реалізація таблиці з інтерактивним функціоналом
Стек технологій:

-TypeScript
-React
-Tailwind CSS (або SCSS, якщо буде потрібно)

Ціль:
Реалізувати адаптивну таблицю з можливістю перегляду, пошуку, редагування та видалення даних. Таблиця має відповідати дизайну, наведеному в макеті (Figma зображення). Таблиця може містити будь які стовпці та будь-які дані, які виконавець забажає використати.
Функціональність, яка має бути реалізована:
1. Пагінація:
Класична пагінація під таблицею.
Можливість перемикання сторінок.

2.Пошук по стовпцях:
Кнопка “Search” (іконка чи текст).
При натисканні відкривається модальне вікно з можливістю фільтрувати за колонками (Quote No., Date, Customer, тощо).
Пошук повинен бути інтерактивним (live filter або підтвердженням).

3.Адаптивність:
Горизонтальний скрол таблиці на менших екранах.
Таблиця має залишатися читабельною при зменшенні ширини екрана.

4. Видалення елементів:
Можливість вибору кількох рядків (checkbox).
Кнопка Delete стає активною при наявності вибраних рядків.
Видалення з підтвердженням (можна через modal або confirm).

5.Додавання нового елемента:
Кнопка Add відкриває модальне вікно з формою для додавання нового запису.
Валідація обов’язкових полів.

6.Редагування існуючих даних:
При кліку на рядок таблиці відкривається modal з деталями.
У modal доступне редагування даних.
Після збереження — оновлення в таблиці.

Вимоги до реалізації:
1. Архітектура:
-Компонентний підхід (розділення логіки, UI, модалок, таблиці, фільтрів, форм).

-Використання контексту або zustand/redux (опціонально) для керування станом.

-Роутінг не обов’язковий, але може бути плюсом для масштабованості.

2. Чистота коду:
Типізація через TypeScript.
Мінімізація повторень.
Стилі — через Tailwind або SCSS модулями.

3.UX/UI:
Модальні вікна мають бути адаптивні.
Кнопки неактивні, якщо дія не можлива.
Валідація форм перед сабмітом.

Критерії оцінки:
Якість архітектури та модульність.
Читабельність та чистота коду.
Повнота реалізації функціональності.

Відповідність UI/UX макету.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
