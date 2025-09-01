import React from 'react'
import { HiCheck, HiLightningBolt, HiStar } from 'react-icons/hi'

const Status = ({ solved, timer, solveTime, difficulty, bestTimes }) => {
  const getBestTime = () => {
    if (!difficulty || !bestTimes || !bestTimes[difficulty]) return null
    return bestTimes[difficulty]
  }

  const renderSolvedMessage = () => {
    if (!solved) return null
    
    return (
      <div className="inline-flex items-center bg-emerald-100 text-emerald-800 px-4 py-2 rounded-lg shadow-sm border border-emerald-200">
        <HiCheck className="w-5 h-5 mr-2" />
        <span className="font-semibold text-sm sm:text-base">
          Puzzle Solved Successfully!
        </span>
      </div>
    )
  }

  const renderSolvingMessage = () => {
    if (timer <= 0 || solved) return null
    
    return (
      <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-lg shadow-sm border border-blue-200">
        <HiLightningBolt className="w-5 h-5 mr-2" />
        <span className="font-semibold text-sm sm:text-base">
          Solving in progress...
        </span>
      </div>
    )
  }

  const renderNewRecordMessage = () => {
    const bestTime = getBestTime()
    if (!solved || !bestTime || solveTime >= bestTime) return null
    
    return (
      <div className="inline-flex items-center bg-amber-100 text-amber-800 px-4 py-2 rounded-lg shadow-sm border border-amber-200">
        <HiStar className="w-5 h-5 mr-2" />
        <span className="font-semibold text-sm sm:text-base">
          New Best Time! 🎉
        </span>
      </div>
    )
  }

  return (
    <div className="mt-6 sm:mt-8 text-center space-y-4">
      {renderSolvedMessage()}
      {renderSolvingMessage()}
      {renderNewRecordMessage()}
    </div>
  )
}

export default Status
