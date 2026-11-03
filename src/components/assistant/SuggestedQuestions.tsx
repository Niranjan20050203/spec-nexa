// ============================================================
// SPEC NEXA - SuggestedQuestions Component
// Chip list of suggested AI prompts with click handler
// ============================================================

import React from 'react'

interface SuggestedQuestionsProps {
  onSelect: (question: string) => void
  compact?: boolean
}

const DEFAULT_SUGGESTIONS = [
  'Which laptop is best for programming under ₹70,000?',
  'Is 16GB RAM enough for video editing?',
  'Best gaming laptop under ₹1 lakh?',
  'ASUS vs Lenovo - which is more durable?',
  'Should I choose Intel or AMD?',
  'Which laptop has the best cooling?',
]

const COMPACT_SUGGESTIONS = [
  'Best laptop for programming under ₹70,000?',
  'Gaming laptop under ₹1 lakh?',
  'Intel or AMD — which is better?',
]

const SuggestedQuestions: React.FC<SuggestedQuestionsProps> = ({
  onSelect,
  compact = false,
}) => {
  const suggestions = compact ? COMPACT_SUGGESTIONS : DEFAULT_SUGGESTIONS

  return (
    <div className="flex flex-wrap gap-2">
      {suggestions.map((q) => (
        <button
          key={q}
          onClick={() => onSelect(q)}
          className={`
            text-left rounded-full border border-[#263449] bg-[#172235]
            text-[#06B6D4] hover:border-[#2563EB] hover:bg-[#1e2d45]
            hover:text-white transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-1
            focus:ring-offset-[#111827]
            ${compact ? 'text-xs px-3 py-1.5' : 'text-sm px-4 py-2'}
          `}
        >
          {q}
        </button>
      ))}
    </div>
  )
}

export default SuggestedQuestions
