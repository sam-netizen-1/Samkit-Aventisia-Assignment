import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="max-w-5xl mx-auto p-8 text-center">
      <div className="flex justify-center gap-8">
        <a href="https://vite.dev" target="_blank" className="group">
          <img
            src={viteLogo}
            className="h-24 p-6 transition-all duration-300 group-hover:drop-shadow-[0_0_2em_rgba(100,108,255,0.67)]"
            alt="Vite logo"
          />
        </a>
        <a href="https://react.dev" target="_blank" className="group">
          <img
            src={reactLogo}
            className="h-24 p-6 transition-all duration-300 animate-[spin_20s_linear_infinite] group-hover:drop-shadow-[0_0_2em_rgba(97,218,251,0.67)]"
            alt="React logo"
          />
        </a>
      </div>
      <h1 className="text-5xl font-bold my-8">Vite + React + Tailwind</h1>
      <div className="p-8 mb-8">
        <button
          onClick={() => setCount((count) => count + 1)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
        >
          count is {count}
        </button>
        <p className="mt-4">
          Edit <code className="bg-gray-200 dark:bg-gray-800 px-1 py-0.5 rounded">src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="text-gray-500">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
