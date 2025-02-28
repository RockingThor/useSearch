import { useState, useEffect } from 'react'
import './App.css'
import useSearch from './hooks/useSearch'
import { search } from './utils/search'
import { paginate } from './utils/paginate'

// Sample data for demonstration
const sampleData = [
  {
    title: "JavaScript Fundamentals",
    url: "https://example.com/javascript",
    description: "Learn the fundamentals of JavaScript programming language, including variables, functions, and objects."
  },
  {
    title: "React Hooks Tutorial",
    url: "https://example.com/react-hooks",
    description: "A comprehensive guide to using React Hooks for state management and side effects in functional components."
  },
  {
    title: "TypeScript for Beginners",
    url: "https://example.com/typescript",
    description: "Get started with TypeScript and learn how to add static typing to your JavaScript projects."
  },
  {
    title: "CSS Grid Layout",
    url: "https://example.com/css-grid",
    description: "Master CSS Grid Layout to create complex web layouts with ease and flexibility."
  },
  {
    title: "Node.js API Development",
    url: "https://example.com/nodejs",
    description: "Build robust APIs with Node.js, Express, and MongoDB for your web applications."
  },
  {
    title: "Python Data Science",
    url: "https://example.com/python",
    description: "Explore data science with Python using libraries like NumPy, Pandas, and Matplotlib."
  },
  {
    title: "GraphQL vs REST",
    url: "https://example.com/graphql",
    description: "Compare GraphQL and REST API architectures and learn when to use each approach."
  },
  {
    title: "Docker Containers",
    url: "https://example.com/docker",
    description: "Learn how to containerize your applications with Docker for consistent deployment."
  },
  {
    title: "AWS Cloud Services",
    url: "https://example.com/aws",
    description: "An overview of Amazon Web Services and how to leverage cloud computing for your projects."
  },
  {
    title: "Machine Learning Basics",
    url: "https://example.com/ml",
    description: "Introduction to machine learning concepts, algorithms, and practical applications."
  },
  {
    title: "Git Version Control",
    url: "https://example.com/git",
    description: "Master Git for version control and collaboration in software development projects."
  },
  {
    title: "UI/UX Design Principles",
    url: "https://example.com/ui-ux",
    description: "Learn the principles of user interface and user experience design for creating better products."
  }
];

interface SearchResult {
  title: string;
  url: string;
  description: string;
}

function App() {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [matchType, setMatchType] = useState<'contains' | 'fuzzySearch'>('contains')
  const [isTyping, setIsTyping] = useState(false)
  const pageSize = 5

  // Set document title
  useEffect(() => {
    document.title = query ? `${query} - Doodle Search` : 'Doodle Search'
  }, [query])

  // Apply both search and pagination filters with our custom hook
  const results = useSearch<SearchResult>(
    sampleData,
    query,
    search({
      fields: ["title", "description"],
      matchType: matchType,
      threshold: matchType === 'fuzzySearch' ? 0.3 : 0.5, // Lower threshold for fuzzy search
    }),
    paginate({ page, pageSize })
  )

  // Compute total pages based on filtered results (without pagination)
  const filteredData = search({ 
    fields: ["title", "description"], 
    matchType: matchType,
    threshold: matchType === 'fuzzySearch' ? 0.3 : 0.5,
  })(sampleData, query)
  
  const totalPages = Math.ceil(filteredData.length / pageSize)
  const isSearching = isTyping
  const hasResults = query && filteredData.length > 0 && !isSearching

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // The search is already reactive thanks to the hook, so we don't need to do anything here
  }

  // Handle input change with typing indicator
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTyping(true)
    setQuery(e.target.value)
    setPage(1) // Reset to first page on new search
    
    // Clear typing indicator after the debounce period
    setTimeout(() => {
      setIsTyping(false)
    }, 600) // Slightly longer than the debounce delay
  }

  return (
    <div className="search-container">
      <a href="https://github.com/RockingThor" target="_blank" rel="noopener noreferrer" className="github-link">
        <svg className="github-logo" height="32" viewBox="0 0 16 16" width="32">
          <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
        </svg>
      </a>
      <div className={`search-section ${hasResults ? 'has-results' : ''}`}>
        <h1 className="search-logo">
          <span>D</span><span>o</span><span>o</span><span>d</span><span>l</span><span>e</span>
        </h1>
        
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-input-container">
            <svg className="search-icon" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
            </svg>
            <input 
              type="text" 
              value={query} 
              onChange={handleInputChange}
              className="search-input"
              placeholder="Search with Doodle"
              autoFocus
            />
            {query && (
              <button 
                type="button" 
                className="clear-button"
                onClick={() => {
                  setQuery('')
                  setPage(1)
                }}
              >
                ✕
              </button>
            )}
          </div>
          <div className="search-buttons">
            <button type="submit" className="search-button">
              Doodle Search
            </button>
            <a href="https://me.rohitnandi.com/" target="_blank" rel="noopener noreferrer" className="search-button hire-me-button">
              Hire Me
            </a>
          </div>
        </form>
        
        <div className="search-options">
          <label>
            <input
              type="radio"
              name="matchType"
              checked={matchType === 'contains'}
              onChange={() => setMatchType('contains')}
            />
            Normal Search
          </label>
          <label>
            <input
              type="radio"
              name="matchType"
              checked={matchType === 'fuzzySearch'}
              onChange={() => setMatchType('fuzzySearch')}
            />
            Fuzzy Search
          </label>
        </div>
      </div>

      {isSearching && (
        <div className="search-results-loading">
          <div className="loading-spinner"></div>
          <p>Searching...</p>
        </div>
      )}

      {filteredData.length > 0 && !isSearching && (
        <div className="search-results">
          <p className="results-stats">
            About {filteredData.length} Doodle results
            {query && ` for "${query}"`}
          </p>
          
          {results.map((result, index) => (
            <div key={index} className="result-item">
              <div className="result-url">{result.url}</div>
              <a href={result.url} className="result-title">{result.title}</a>
              <div className="result-description">{result.description}</div>
            </div>
          ))}
          
          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="pagination-button"
              >
                Previous
              </button>
              <span className="page-info">Page {page} of {totalPages}</span>
              <button
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={page >= totalPages}
                className="pagination-button"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
      
      {query && filteredData.length === 0 && !isSearching && (
        <div className="no-results">
          <p>No results found for "{query}"</p>
          <p>Try different keywords or use fuzzy search for typo tolerance</p>
        </div>
      )}
    </div>
  )
}

export default App
