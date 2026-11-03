// ============================================================
// SPEC NEXA - ChatMessage Component
// Individual chat message bubble with markdown-lite formatting
// ============================================================

import React from 'react'
import type { ChatMessage as ChatMessageType } from '@/types'

interface ChatMessageProps {
  message: ChatMessageType
  isLoading?: boolean
}

// Very lightweight markdown renderer for bold, bullets, code spans
function renderMarkdownLite(text: string): React.ReactNode[] {
  const lines = text.split('\n')
  return lines.map((line, lineIdx) => {
    // Bullet list
    if (line.match(/^[-*]\s+/)) {
      const content = line.replace(/^[-*]\s+/, '')
      return (
        <li key={lineIdx} className="ml-4 list-disc">
          {inlineFormat(content)}
        </li>
      )
    }
    // Numbered list
    if (line.match(/^\d+\.\s+/)) {
      const content = line.replace(/^\d+\.\s+/, '')
      return (
        <li key={lineIdx} className="ml-4 list-decimal">
          {inlineFormat(content)}
        </li>
      )
    }
    // Empty line → spacer
    if (line.trim() === '') {
      return <span key={lineIdx} className="block h-2" />
    }
    // Normal line
    return (
      <span key={lineIdx} className="block">
        {inlineFormat(line)}
      </span>
    )
  })
}

function inlineFormat(text: string): React.ReactNode {
  // Split on **bold**, `code`, or *italic* patterns
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={i}
          className="bg-black/30 text-[#06B6D4] text-xs px-1 py-0.5 rounded font-mono"
        >
          {part.slice(1, -1)}
        </code>
      )
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={i} className="italic">{part.slice(1, -1)}</em>
    }
    return <React.Fragment key={i}>{part}</React.Fragment>
  })
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
}

// Skeleton / loading version for AI message
const LoadingSkeleton: React.FC = () => (
  <div className="flex gap-3 justify-start">
    {/* Avatar */}
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#2563EB] to-[#06B6D4] flex items-center justify-center text-white text-xs font-bold shadow-md shadow-blue-500/20">
      AI
    </div>
    {/* Bubble */}
    <div className="max-w-[80%] rounded-2xl rounded-tl-none px-4 py-3 bg-[#172235] border border-[#263449] space-y-2">
      <div className="flex gap-1 items-center h-5">
        <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-bounce [animation-delay:0ms]" />
        <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-bounce [animation-delay:150ms]" />
        <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-bounce [animation-delay:300ms]" />
      </div>
    </div>
  </div>
)

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isLoading = false }) => {
  const isUser = message.role === 'user'

  if (isLoading || message.is_loading) {
    return <LoadingSkeleton />
  }

  if (isUser) {
    return (
      <div className="flex gap-3 justify-end">
        <div className="flex flex-col items-end gap-1 max-w-[80%]">
          <div className="rounded-2xl rounded-tr-none px-4 py-3 bg-[#2563EB] text-white text-sm shadow-md shadow-blue-500/20">
            {renderMarkdownLite(message.content)}
          </div>
          <span className="text-xs text-[#4b5563] select-none">
            {formatTime(message.timestamp instanceof Date ? message.timestamp : new Date(message.timestamp))}
          </span>
        </div>
        {/* User avatar */}
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#263449] border border-[#2563EB]/40 flex items-center justify-center text-white text-xs font-bold">
          You
        </div>
      </div>
    )
  }

  // AI message
  return (
    <div className="flex gap-3 justify-start">
      {/* SPEC NEXA AI avatar */}
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#2563EB] to-[#06B6D4] flex items-center justify-center text-white text-[10px] font-bold shadow-md shadow-blue-500/20 select-none">
        AI
      </div>
      <div className="flex flex-col items-start gap-1 max-w-[80%]">
        <div className="rounded-2xl rounded-tl-none px-4 py-3 bg-[#172235] border border-[#263449] text-sm text-gray-200 leading-relaxed">
          {renderMarkdownLite(message.content)}
        </div>
        <span className="text-xs text-[#4b5563] select-none">
          SPEC NEXA AI ·{' '}
          {formatTime(message.timestamp instanceof Date ? message.timestamp : new Date(message.timestamp))}
        </span>
      </div>
    </div>
  )
}

export default ChatMessage
