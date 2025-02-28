# Doodle Search

A powerful and customizable search interface built with React and TypeScript, featuring fuzzy search capabilities, debounced queries, and a Google-inspired UI.

![Doodle Search Screenshot](https://media.licdn.com/dms/image/v2/D5622AQGLxpvA27uqAg/feedshare-shrink_800/B56ZVNkzvgGoAg-/0/1740763252185?e=1743638400&v=beta&t=kfNpoWw675f_Y3QB9Dq3o-C2G-tK5p9dbxhev8CBoqU)

## 🚀 Live Demo

Check out the live demo: [Doodle Search Demo](https://doodle.rohitnandi.com/)

## ✨ Features

- **Flexible Search Engine**: Search across multiple fields with various matching strategies
- **Fuzzy Search**: Find results even with typos using n-gram based fuzzy matching
- **Debounced Queries**: Optimized performance with debounced search input
- **Pagination**: Built-in pagination support for large result sets
- **Responsive UI**: Clean, Google-inspired interface that works on all devices
- **TypeScript Support**: Fully typed codebase for better developer experience

## 🛠️ Technical Implementation

### Core Search Hook

The core of the application is the `useSearch` custom hook that provides a flexible and efficient way to search through data:

```typescript
function useSearch<T>(
  data: T | T[],
  query: string,
  ...filters: FilterFunction<T>[]
);
```

This hook accepts:

- A data array or single item
- A search query string
- Multiple filter functions that can be composed together

### Search Features

The search functionality is implemented with several composable utilities:

1. **Field Selection**: Search across specific fields or all fields
2. **Match Types**:

   - `exact`: Exact match (case-insensitive)
   - `startsWith`: String starts with query
   - `endsWith`: String ends with query
   - `contains`: String contains query
   - `fuzzySearch`: Fuzzy matching using n-gram algorithm

3. **Fuzzy Search Algorithm**:
   - Uses n-gram based similarity scoring
   - Adjustable threshold for match sensitivity
   - Optimized for short queries

### Performance Optimizations

- **Debounced Input**: Prevents excessive searches while typing
- **Memoized Results**: Uses React's `useMemo` to cache results
- **Adaptive Matching**: Switches to simpler matching for very short queries

## 🧰 Tech Stack

- **React 19**: Latest React version with improved performance
- **TypeScript**: For type safety and better developer experience
- **Vite**: For fast development and optimized builds
- **CSS Modules**: For component-scoped styling

## 📦 Project Structure

```
src/
├── hooks/
│   ├── useDebounce.ts     # Debounced input hook
│   └── useSearch.ts       # Main search hook
├── utils/
│   ├── convertToString.ts # String conversion utility
│   ├── getAllKeys.ts      # Object key extraction
│   ├── getFieldValue.ts   # Field value accessor
│   ├── nGramFuzzySearch.ts # Fuzzy search algorithm
│   ├── paginate.ts        # Pagination utility
│   └── search.ts          # Main search function
├── App.tsx                # Main application component
├── App.css                # Application styles
├── index.css              # Global styles
└── main.tsx               # Application entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/RockingThor/doodle-search.git
   cd doodle-search
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## 🔧 API Reference

### useSearch Hook

```typescript
function useSearch<T>(
  data: T | T[],
  query: string,
  ...filters: FilterFunction<T>[]
): T[];
```

### search Function

```typescript
function search(options: {
  fields?: string | string[];
  matchType: "exact" | "startsWith" | "endsWith" | "contains" | "fuzzySearch";
  threshold?: number;
}): (data: any[], query: string) => any[];
```

### paginate Function

```typescript
function paginate(options: {
  page?: number;
  pageSize?: number;
}): (data: any[], query: string) => any[];
```

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**Rohit Nandi**

- Website: [rohitnandi.com](https://me.rohitnandi.com/)
- GitHub: [@RockingThor](https://github.com/RockingThor)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/amazing-feature`)
3. Commit your Changes (`git commit -m 'Add some amazing feature'`)
4. Push to the Branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
