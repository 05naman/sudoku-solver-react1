# 🧩 Sudoku Solver React App

A modern, interactive Sudoku solver built with React that demonstrates the backtracking algorithm with visual step-by-step solving animation. Features puzzle fetching from external APIs, manual solving capabilities, and a beautiful responsive UI.

## ✨ Features

### 🎮 Game Features
- **Interactive Sudoku Grid**: Click to select cells and input numbers using keyboard
- **Multiple Difficulty Levels**: Easy, Medium, Hard, and Random puzzles
- **Real-time Validation**: Visual feedback for correct/incorrect number placement
- **Timer with Pause/Resume**: Track your solving time with pause functionality
- **Best Time Tracking**: Local storage of personal best times per difficulty
- **Success Celebration**: Modal with completion time and new record notifications

### 🤖 Solver Features
- **Visual Backtracking Algorithm**: Watch the AI solve puzzles step-by-step
- **API Integration**: Fetch fresh puzzles from external Sudoku API
- **Sample Puzzles**: Built-in puzzles for immediate play
- **Manual Solving**: Solve puzzles yourself or let the AI do it
- **Solution Validation**: Verify if manually solved puzzles are correct

### 🎨 UI/UX Features
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern Interface**: Clean, intuitive design with Tailwind CSS
- **Visual Feedback**: Color-coded cells for selection, validation, and solving states
- **Accessibility**: Keyboard navigation and screen reader support
- **Loading States**: Smooth loading indicators for API calls and solving

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sudoku-solver-1
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the app for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## 🏗️ Project Structure

```
sudoku-solver-1/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # App header with timer and pause controls
│   │   ├── SudokuGrid.jsx      # Interactive 9x9 Sudoku grid component
│   │   ├── Controls.jsx        # Game controls and difficulty selection
│   │   ├── Status.jsx          # Status messages and notifications
│   │   └── SudokuSolver.jsx    # Main application component
│   ├── utils/
│   │   └── sudokuUtils.js      # Core Sudoku logic and algorithms
│   ├── App.jsx                 # Root application component
│   ├── App.css                 # Global styles
│   ├── index.css               # Base styles and Tailwind imports
│   └── main.jsx                # Application entry point
├── public/
│   └── vite.svg                # Vite logo
├── package.json                # Dependencies and scripts
├── vite.config.js              # Vite configuration
├── eslint.config.js            # ESLint configuration
└── README.md                   # This file
```

## 🧠 Core Algorithm

The app implements a **backtracking algorithm** to solve Sudoku puzzles:

1. **Validation**: Checks if a number can be placed in a specific cell
2. **Recursive Solving**: Tries numbers 1-9 in empty cells
3. **Backtracking**: Undoes moves when no valid solution is found
4. **Visualization**: Updates the UI in real-time to show the solving process

### Key Functions in `sudokuUtils.js`:

- `isValid(board, row, col, num)` - Validates number placement
- `solveSudoku(board, setBoard)` - Main solving algorithm with visualization
- `fetchPuzzle(difficulty)` - Fetches puzzles from external API
- `isPuzzleSolved(board)` - Validates completed puzzles

## 🎯 How to Play

### Manual Solving
1. **Get a Puzzle**: Select difficulty and click "Get Puzzle"
2. **Select Cells**: Click on empty cells to select them
3. **Input Numbers**: Use keyboard (1-9) to enter numbers
4. **Clear Cells**: Press Delete/Backspace to clear a cell
5. **Get Help**: Click "Solve Puzzle" to see the AI solution

### Using the Solver
1. **Load a Puzzle**: Get any puzzle from the API or use sample puzzles
2. **Watch the Magic**: Click "Solve Puzzle" to see the backtracking algorithm
3. **Learn**: Observe how the algorithm explores and backtracks through possibilities

## 🛠️ Technologies Used

- **React 19.1.1** - Modern React with hooks and functional components
- **Vite 7.1.2** - Fast build tool and development server
- **Tailwind CSS 4.1.12** - Utility-first CSS framework
- **React Icons 5.5.0** - Beautiful icon library
- **ESLint** - Code linting and quality assurance

## 🌐 API Integration

The app integrates with the **Sugoku API** (`https://sugoku.onrender.com/`) to fetch:
- Easy, Medium, Hard, and Random difficulty puzzles
- Fresh puzzles for each game session
- Fallback to sample puzzles if API is unavailable

## 📱 Responsive Design

- **Mobile-First**: Optimized for touch devices
- **Adaptive Layout**: Different layouts for mobile and desktop
- **Touch-Friendly**: Large touch targets and intuitive gestures
- **Cross-Platform**: Works on all modern browsers and devices

## 🎨 UI Components

### Header Component
- App title and description
- Timer display with pause/resume functionality
- Clean, centered layout

### SudokuGrid Component
- Interactive 9x9 grid with visual feedback
- Color-coded cells for different states:
  - **Blue**: Selected cell
  - **Light Blue**: Related cells (same row/column/box)
  - **Black**: Original puzzle numbers
  - **Blue**: Correct user input
  - **Red**: Incorrect user input

### Controls Component
- Difficulty selection dropdown
- Action buttons with loading states
- Game instructions and help text

### Status Component
- Success notifications
- Solving progress indicators
- Best time achievements

## 🔧 Customization

### Adding New Features
- **New Difficulty Levels**: Modify the difficulty options in `Controls.jsx`
- **Custom Themes**: Update Tailwind classes throughout components
- **Additional APIs**: Extend `fetchPuzzle` function in `sudokuUtils.js`
- **Sound Effects**: Add audio feedback for user interactions

### Styling
The app uses Tailwind CSS for styling. Key color scheme:
- **Primary**: Blue tones (`blue-600`, `blue-700`, `blue-900`)
- **Success**: Green tones (`emerald-600`, `emerald-700`)
- **Warning**: Amber tones (`amber-600`, `amber-700`)
- **Danger**: Red tones (`red-600`, `red-700`)

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify
```bash
npm run build
# Upload the 'dist' folder to Netlify
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Sugoku API** for providing puzzle data
- **React Icons** for the beautiful icon set
- **Tailwind CSS** for the utility-first styling approach
- **Vite** for the lightning-fast development experience

---

**Happy Sudoku Solving! 🧩✨**
