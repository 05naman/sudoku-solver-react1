import React from 'react'
import { HiClock, HiPause, HiPlay } from 'react-icons/hi'

const Header = ({ gameTime, isPaused, onTogglePause }) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const renderTitle = () => (
    <div>
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-900 mb-2 sm:mb-4">
        Sudoku Solver
      </h1>
      <p className="text-blue-700 text-sm sm:text-base mb-4">
        Challenge yourself with fun Sudoku puzzles
      </p>
    </div>
  )

  const renderTimer = () => (
    <div className="inline-flex items-center bg-white rounded-lg px-4 py-2 shadow-md border border-blue-200">
      <HiClock className="w-5 h-5 text-blue-600 mr-2" />
      <span className="text-lg font-mono font-semibold text-blue-900">
        {formatTime(gameTime)}
      </span>
    </div>
  )

  const renderPauseButton = () => {
    if (gameTime <= 0) return null
    
    return (
      <button
        onClick={onTogglePause}
        className="inline-flex items-center bg-white rounded-lg px-3 py-2 shadow-md border border-blue-200 hover:bg-blue-50 transition-colors"
        title={isPaused ? "Resume Timer" : "Pause Timer"}
      >
        {isPaused ? <HiPlay className="w-5 h-5 text-blue-600" /> : <HiPause className="w-5 h-5 text-blue-600" />}
      </button>
    )
  }

  const renderControls = () => (
    <div className="flex items-center justify-center space-x-4">
      {renderTimer()}
      {renderPauseButton()}
    </div>
  )

  return (
    <div className="text-center mb-2 sm:mb-6 flex-shrink-0">
      {renderTitle()}
      {renderControls()}
    </div>
  )
}

export default Header
