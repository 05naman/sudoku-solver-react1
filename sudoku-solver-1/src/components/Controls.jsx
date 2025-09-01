import React, { useState } from 'react'
import { HiRefresh } from 'react-icons/hi'

const Controls = ({ 
  onSolve, 
  onNewGame, 
  onClear, 
  onGetPuzzle,
  isSolving,
  isFetching
}) => {
  const [difficulty, setDifficulty] = useState('')

  const handleGetPuzzle = () => {
    if (!difficulty) {
      alert("Please select a difficulty level.")
      return
    }
    onGetPuzzle(difficulty)
  }

  const renderDifficultySelect = () => (
    <div className="mb-4">
      <label htmlFor="difficultySelect" className="block text-sm font-semibold text-blue-800 mb-2">
        Select Difficulty
      </label>
      <select
        id="difficultySelect"
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
        className="w-full p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
        aria-label="Select puzzle difficulty"
        disabled={isFetching}
      >
        <option value="" disabled>Select Difficulty</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
        <option value="random">Random</option>
      </select>
    </div>
  )

  const renderLoadingSpinner = () => (
    <HiRefresh className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
  )

  const renderLoadingButton = ({ onClick, disabled, isLoading, loadingText, normalText, bgColor, hoverColor }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full ${bgColor} text-white py-3 px-4 rounded-lg font-semibold ${hoverColor} disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center shadow-sm`}
    >
      {isLoading ? (
        <>
          {renderLoadingSpinner()}
          {loadingText}
        </>
      ) : (
        normalText
      )}
    </button>
  )

  const renderGetPuzzleButton = () => (
    renderLoadingButton({
      onClick: handleGetPuzzle,
      disabled: isSolving || isFetching || !difficulty,
      isLoading: isFetching,
      loadingText: 'Fetching...',
      normalText: 'Get Puzzle',
      bgColor: 'bg-emerald-600',
      hoverColor: 'hover:bg-emerald-700'
    })
  )

  const renderSolveButton = () => (
    renderLoadingButton({
      onClick: onSolve,
      disabled: isSolving || isFetching,
      isLoading: isSolving,
      loadingText: 'Solving...',
      normalText: 'Solve Puzzle',
      bgColor: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-700'
    })
  )

  const renderActionButtons = () => (
    <div className="space-y-3">
      {renderGetPuzzleButton()}
      {renderSolveButton()}
      
      <button
        onClick={onNewGame}
        disabled={isSolving || isFetching}
        className="w-full bg-amber-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
      >
        New Game
      </button>
      
      <button
        onClick={onClear}
        disabled={isSolving || isFetching}
        className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
      >
        Clear Board
      </button>
    </div>
  )

  const renderInstructions = () => (
    <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
      <h4 className="text-sm font-semibold text-blue-900 mb-2">How to Play</h4>
      <ul className="text-xs text-blue-800 space-y-1">
        <li>• Select difficulty and click "Get Puzzle" to fetch a new puzzle</li>
        <li>• Click on any empty cell to select it</li>
        <li>• Use keyboard (1-9) to input numbers</li>
        <li>• Press Delete/Backspace to clear a cell</li>
        <li>• Click "Solve Puzzle" to see the backtracking algorithm in action</li>
      </ul>
    </div>
  )

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">Controls</h3>
        
        {renderDifficultySelect()}
        {renderActionButtons()}
        {renderInstructions()}
      </div>
    </div>
  )
}

export default Controls
