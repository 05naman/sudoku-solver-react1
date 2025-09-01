import React, { useState, useEffect } from 'react'
import { HiCheck } from 'react-icons/hi'

// Import components
import Header from './Header'
import SudokuGrid from './SudokuGrid'
import Controls from './Controls'
import Status from './Status'

// Import utilities
import { solveSudoku, getSamplePuzzle, createEmptyBoard, fetchPuzzle, isPuzzleSolved } from '../utils/sudokuUtils'

const SudokuSolver = () => {
  const [board, setBoard] = useState(createEmptyBoard())
  const [originalBoard, setOriginalBoard] = useState(createEmptyBoard())
  const [selectedCell, setSelectedCell] = useState(null)
  const [isSolving, setIsSolving] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const [solved, setSolved] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [gameTime, setGameTime] = useState(0)
  const [solveTime, setSolveTime] = useState(0)
  const [isGameTimerRunning, setIsGameTimerRunning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [currentDifficulty, setCurrentDifficulty] = useState('')
  const [bestTimes, setBestTimes] = useState({})

  // Load best times from localStorage
  useEffect(() => {
    const savedBestTimes = localStorage.getItem('sudokuBestTimes')
    if (savedBestTimes) {
      setBestTimes(JSON.parse(savedBestTimes))
    }
  }, [])

  // Save best times to localStorage
  useEffect(() => {
    localStorage.setItem('sudokuBestTimes', JSON.stringify(bestTimes))
  }, [bestTimes])

  // Game timer effect
  useEffect(() => {
    let interval = null
    if (isGameTimerRunning && !isPaused) {
      interval = setInterval(() => {
        setGameTime(gameTime => gameTime + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isGameTimerRunning, isPaused])

  // Check if puzzle is solved manually
  useEffect(() => {
    if (!isSolving && !solved && board.some(row => row.some(cell => cell !== 0))) {
      const isComplete = board.every(row => row.every(cell => cell !== 0))
      if (isComplete && isPuzzleSolved(board)) {
        setSolved(true)
        setShowSuccessModal(true)
        setIsGameTimerRunning(false)
        
        // Check for new best time
        if (currentDifficulty && (!bestTimes[currentDifficulty] || gameTime < bestTimes[currentDifficulty])) {
          setBestTimes(prev => ({
            ...prev,
            [currentDifficulty]: gameTime
          }))
        }
      }
    }
  }, [board, isSolving, solved, gameTime, currentDifficulty, bestTimes])

  // Handle cell click
  const handleCellClick = (row, col) => {
    if (originalBoard[row][col] === 0 && !isSolving && !isFetching) {
      setSelectedCell({ row, col })
    }
  }

  // Handle number input
  const handleNumberInput = (num) => {
    if (selectedCell && originalBoard[selectedCell.row][selectedCell.col] === 0) {
      const newBoard = [...board]
      newBoard[selectedCell.row][selectedCell.col] = num
      setBoard(newBoard)
      setSelectedCell(null)
    }
  }

  // Handle key press
  const handleKeyPress = (e) => {
    if (selectedCell) {
      if (e.key >= '1' && e.key <= '9') {
        handleNumberInput(parseInt(e.key))
      } else if (e.key === 'Backspace' || e.key === 'Delete') {
        handleNumberInput(0)
      }
    }
  }

  // Toggle pause/resume
  const handleTogglePause = () => {
    setIsPaused(!isPaused)
  }

  // Close success modal
  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false)
  }

  // Get puzzle from API
  const handleGetPuzzle = async (difficulty) => {
    setIsFetching(true)
    try {
      const puzzleBoard = await fetchPuzzle(difficulty)
      setBoard(puzzleBoard.map(row => [...row]))
      setOriginalBoard(puzzleBoard.map(row => [...row]))
      setSelectedCell(null)
      setSolved(false)
      setShowSuccessModal(false)
      setGameTime(0)
      setSolveTime(0)
      setIsGameTimerRunning(true)
      setIsPaused(false)
      setCurrentDifficulty(difficulty)
    } catch (error) {
      console.error('Error getting puzzle:', error)
      alert('Failed to fetch puzzle. Please try again.')
    } finally {
      setIsFetching(false)
    }
  }

  // Solve the puzzle
  const handleSolve = async () => {
    setIsSolving(true)
    setSolved(false)
    setSolveTime(0)
    
    const startTime = Date.now()
    const boardCopy = board.map(row => [...row])
    const success = await solveSudoku(boardCopy, setBoard)
    const endTime = Date.now()
    
    setIsSolving(false)
    setSolved(success)
    
    if (success) {
      const solveTimeSeconds = Math.floor((endTime - startTime) / 1000)
      setSolveTime(solveTimeSeconds)
      
      // Check for new best time
      if (currentDifficulty && (!bestTimes[currentDifficulty] || solveTimeSeconds < bestTimes[currentDifficulty])) {
        setBestTimes(prev => ({
          ...prev,
          [currentDifficulty]: solveTimeSeconds
        }))
      }
    } else {
      alert("No solution exists")
    }
  }

  // Clear the board
  const handleClear = () => {
    setBoard(createEmptyBoard())
    setOriginalBoard(createEmptyBoard())
    setSelectedCell(null)
    setSolved(false)
    setShowSuccessModal(false)
    setGameTime(0)
    setSolveTime(0)
    setIsGameTimerRunning(false)
    setIsPaused(false)
    setCurrentDifficulty('')
  }

  // Generate a new puzzle
  const handleNewGame = () => {
    const samplePuzzle = getSamplePuzzle()
    setBoard(samplePuzzle.map(row => [...row]))
    setOriginalBoard(samplePuzzle.map(row => [...row]))
    setSelectedCell(null)
    setSolved(false)
    setShowSuccessModal(false)
    setGameTime(0)
    setSolveTime(0)
    setIsGameTimerRunning(true)
    setIsPaused(false)
    setCurrentDifficulty('sample')
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getBestTime = () => {
    if (!currentDifficulty || !bestTimes || !bestTimes[currentDifficulty]) return null
    return bestTimes[currentDifficulty]
  }

  const bestTime = getBestTime()
  const isNewRecord = bestTime && gameTime < bestTime

  const renderMobileLayout = () => (
    <div className="lg:hidden flex-1 flex flex-col space-y-3 min-h-0">
      <div className="flex-1 flex items-center justify-center min-h-0 px-1">
        <SudokuGrid
          board={board}
          originalBoard={originalBoard}
          selectedCell={selectedCell}
          onCellClick={handleCellClick}
          onKeyPress={handleKeyPress}
        />
      </div>
      <div className="flex-shrink-0 px-1">
        <Controls
          onSolve={handleSolve}
          onNewGame={handleNewGame}
          onClear={handleClear}
          onGetPuzzle={handleGetPuzzle}
          isSolving={isSolving}
          isFetching={isFetching}
        />
      </div>
    </div>
  )

  const renderDesktopLayout = () => (
    <div className="hidden lg:flex lg:flex-1 lg:gap-6 min-h-0 items-start">
      <div className="flex-1 flex items-center justify-center min-h-0">
        <SudokuGrid
          board={board}
          originalBoard={originalBoard}
          selectedCell={selectedCell}
          onCellClick={handleCellClick}
          onKeyPress={handleKeyPress}
        />
      </div>
      <div className="w-96 flex items-start justify-center pt-10 pr-10">
        <div className="w-full">
          <Controls
            onSolve={handleSolve}
            onNewGame={handleNewGame}
            onClear={handleClear}
            onGetPuzzle={handleGetPuzzle}
            isSolving={isSolving}
            isFetching={isFetching}
          />
        </div>
      </div>
    </div>
  )

  const renderSuccessModal = () => {
    if (!showSuccessModal) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 text-center">
          <div className="mb-4">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <HiCheck className="w-8 h-8 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Congratulations!</h2>
            <p className="text-gray-600 mb-4">You solved the puzzle successfully!</p>
          </div>

          <div className="space-y-3 mb-6">
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="text-sm text-blue-600 font-medium">Time</div>
              <div className="text-xl font-mono font-bold text-blue-900">{formatTime(gameTime)}</div>
            </div>
            
            {isNewRecord && (
              <div className="bg-amber-50 rounded-lg p-3">
                <div className="text-sm text-amber-600 font-medium">New Best Time! 🎉</div>
                <div className="text-lg font-mono font-bold text-amber-900">{formatTime(gameTime)}</div>
              </div>
            )}
          </div>

          <div className="flex space-x-3">
            <button
              onClick={handleCloseSuccessModal}
              className="flex-1 bg-gray-100 text-gray-800 py-2 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              Continue Playing
            </button>
            <button
              onClick={() => {
                handleCloseSuccessModal()
                handleGetPuzzle(currentDifficulty)
              }}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              New Puzzle
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex flex-col overflow-hidden">
      <div className="max-w-6xl mx-auto w-full h-full flex flex-col px-2 py-2 sm:px-4 sm:py-6">
        <Header 
          gameTime={gameTime} 
          isPaused={isPaused} 
          onTogglePause={handleTogglePause} 
        />

        <div className="flex-1 flex flex-col lg:flex-row gap-4 lg:gap-8 min-h-0">
          {renderMobileLayout()}
          {renderDesktopLayout()}
        </div>

        <Status 
          solved={solved} 
          timer={0} 
          solveTime={solveTime}
          difficulty={currentDifficulty}
          bestTimes={bestTimes}
        />

        {renderSuccessModal()}
      </div>
    </div>
  )
}

export default SudokuSolver
