// Check if a number is valid in a given position
export const isValid = (board, row, col, num) => {
  // Check row
  for (let x = 0; x < 9; x++) {
    if (board[row][x] === num) return false
  }
  
  // Check column
  for (let x = 0; x < 9; x++) {
    if (board[x][col] === num) return false
  }
  
  // Check 3x3 box
  const startRow = Math.floor(row / 3) * 3
  const startCol = Math.floor(col / 3) * 3
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i + startRow][j + startCol] === num) return false
    }
  }
  
  return true
}

// Backtracking algorithm (improved version from reference)
export const solveSudoku = async (board, setBoard) => {
  const solve = async (board, i, j, n) => {
    if (i === n) {
      return true // Solution found
    }

    if (j === n) {
      return solve(board, i + 1, 0, n)
    }

    if (board[i][j] !== 0) {
      return solve(board, i, j + 1, n)
    }

    for (let num = 1; num <= 9; num++) {
      if (isValid(board, i, j, num)) {
        board[i][j] = num
        
        // Update UI with delay for visualization
        setBoard([...board])
        await new Promise(resolve => setTimeout(resolve, 50))
        
        const subAns = await solve(board, i, j + 1, n)
        if (subAns) {
          return true
        }
        
        board[i][j] = 0 // Backtrack
        setBoard([...board])
        await new Promise(resolve => setTimeout(resolve, 50))
      }
    }
    return false // No solution found
  }

  return await solve(board, 0, 0, 9)
}

// Fetch puzzle from API
export const fetchPuzzle = async (difficulty) => {
  try {
    const response = await fetch(`https://sugoku.onrender.com/board?difficulty=${difficulty}`)
    const data = await response.json()
    return data.board
  } catch (error) {
    console.error('Error fetching puzzle:', error)
    // Fallback to sample puzzle if API fails
    return getSamplePuzzle()
  }
}

// Sample puzzle for new game
export const getSamplePuzzle = () => [
  [5,3,0,0,7,0,0,0,0],
  [6,0,0,1,9,5,0,0,0],
  [0,9,8,0,0,0,0,6,0],
  [8,0,0,0,6,0,0,0,3],
  [4,0,0,8,0,3,0,0,1],
  [7,0,0,0,2,0,0,0,6],
  [0,6,0,0,0,0,2,8,0],
  [0,0,0,4,1,9,0,0,5],
  [0,0,0,0,8,0,0,7,9]
]

// Create empty board
export const createEmptyBoard = () => Array(9).fill().map(() => Array(9).fill(0))

// Check if puzzle is solved
export const isPuzzleSolved = (board) => {
  // Check if all cells are filled
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === 0) return false
    }
  }
  
  // Check if solution is valid
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const num = board[i][j]
      board[i][j] = 0
      if (!isValid(board, i, j, num)) {
        board[i][j] = num
        return false
      }
      board[i][j] = num
    }
  }
  
  return true
}
