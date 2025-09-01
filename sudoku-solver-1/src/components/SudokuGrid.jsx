import React from 'react'

const SudokuGrid = ({ 
  board, 
  originalBoard, 
  selectedCell, 
  onCellClick, 
  onKeyPress 
}) => {
  // Function to check if a number is valid in its position
  const isValidNumber = (row, col, num) => {
    if (num === 0) return true
    
    // Check row
    for (let x = 0; x < 9; x++) {
      if (x !== col && board[row][x] === num) return false
    }
    
    // Check column
    for (let x = 0; x < 9; x++) {
      if (x !== row && board[x][col] === num) return false
    }
    
    // Check 3x3 box
    const startRow = Math.floor(row / 3) * 3
    const startCol = Math.floor(col / 3) * 3
    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
        if ((i !== row || j !== col) && board[i][j] === num) return false
      }
    }
    
    return true
  }

  // Function to get cell styling based on its state
  const getCellStyling = (row, col, cell) => {
    const isSelected = selectedCell?.row === row && selectedCell?.col === col
    const isOriginal = originalBoard[row][col] !== 0
    const isInSameRow = selectedCell?.row === row
    const isInSameCol = selectedCell?.col === col
    const isInSameBox = Math.floor(row / 3) === Math.floor(selectedCell?.row / 3) && 
                      Math.floor(col / 3) === Math.floor(selectedCell?.col / 3)
    const isUserInput = !isOriginal && cell !== 0
    const isWrongInput = isUserInput && !isValidNumber(row, col, cell)

    let baseClasses = 'aspect-square flex items-center justify-center text-sm sm:text-xl font-semibold cursor-pointer transition-all duration-200 min-w-0'
    
    // Background colors
    if (isSelected) {
      baseClasses += ' bg-blue-600 text-white shadow-md'
    } else if (isInSameRow || isInSameCol || isInSameBox) {
      baseClasses += ' bg-blue-50'
    } else {
      baseClasses += ' bg-white hover:bg-blue-50'
    }

    // Text colors - only apply if cell has content
    if (cell !== 0) {
      if (isSelected) {
        // Selected cell text is already white from background styling
      } else if (isOriginal) {
        baseClasses += ' text-black font-bold' // Prefilled numbers in black
      } else if (isWrongInput) {
        baseClasses += ' text-red-600 font-semibold' // Wrong user input in red
      } else if (isUserInput) {
        baseClasses += ' text-blue-700' // Correct user input in blue
      }
    } else {
      // Empty cell - make text transparent
      baseClasses += ' text-transparent'
    }

    return baseClasses
  }

  const renderCell = (rowIndex, colIndex, cell) => (
    <div
      key={`${rowIndex}-${colIndex}`}
      className={getCellStyling(rowIndex, colIndex, cell)}
      onClick={() => onCellClick(rowIndex, colIndex)}
      onKeyDown={onKeyPress}
      tabIndex={0}
    >
      {cell !== 0 ? cell : ''}
    </div>
  )

  const renderGrid = () => (
    <div className="grid grid-cols-9 gap-0.5 bg-blue-200 p-1 rounded-lg max-w-full overflow-hidden">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => renderCell(rowIndex, colIndex, cell))
      )}
    </div>
  )

  return (
    <div className="bg-white rounded-xl shadow-lg p-3 sm:p-6">
      {renderGrid()}
    </div>
  )
}

export default SudokuGrid
