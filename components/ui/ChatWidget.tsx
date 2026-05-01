'use client'

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useId,
  type KeyboardEvent,
  type FormEvent,
} from 'react'
import { cn } from '@/lib/utils'
import type { ChatMessage } from '@/lib/types'

// ── Constants ─────────────────────────────────────────────────────────────────

const INITIAL_MESSAGE: ChatMessage = {
  id: 'aria-greeting',
  role: 'assistant',
  content:
    "Hi, I'm ARIA — Flowithm's AI assistant. What business challenge are you trying to solve?",
}

// ── Typing indicator ──────────────────────────────────────────────────────────

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2.5" aria-label="ARIA is typing" role="status">
      <div className="w-7 h-7 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0 text-[10px] font-display font-bold text-primary">
        A
      </div>
      <div className="bg-surface-2 border border-border-subtle rounded-2xl rounded-bl-sm px-4 py-3">
        <span className="flex gap-1 items-center h-4" aria-hidden="true">
          {[0, 150, 300].map((delay) => (
            <span
              key={delay}
              className="w-1.5 h-1.5 rounded-full bg-text-muted animate-bounce"
              style={{ animationDelay: `${delay}ms`, animationDuration: '900ms' }}
            />
          ))}
        </span>
      </div>
    </div>
  )
}

// ── Message bubble ────────────────────────────────────────────────────────────

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user'
  return (
    <div
      className={cn('flex items-end gap-2.5', isUser && 'flex-row-reverse')}
      role="article"
      aria-label={isUser ? 'Your message' : 'ARIA message'}
    >
      {/* Avatar */}
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0 text-[10px] font-display font-bold text-primary">
          A
        </div>
      )}

      {/* Bubble */}
      <div
        className={cn(
          'max-w-[78%] rounded-2xl px-4 py-2.5 text-sm font-body leading-relaxed',
          isUser
            ? 'bg-primary text-white rounded-br-sm'
            : 'bg-surface-2 border border-border-subtle text-text-primary rounded-bl-sm'
        )}
      >
        {message.content}
      </div>
    </div>
  )
}

// ── Toggle button ─────────────────────────────────────────────────────────────

function ToggleButton({
  isOpen,
  onClick,
  hasMessages,
}: {
  isOpen: boolean
  onClick: () => void
  hasMessages: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isOpen ? 'Close ARIA chat' : 'Open ARIA chat assistant'}
      aria-expanded={isOpen}
      aria-controls="aria-chat-panel"
      className={cn(
        'w-14 h-14 rounded-full bg-primary flex items-center justify-center',
        'shadow-glow-orange transition-all duration-300 hover:shadow-glow-orange-lg',
        'hover:scale-105 active:scale-95 focus-visible:outline focus-visible:outline-2',
        'focus-visible:outline-primary focus-visible:outline-offset-2',
        !isOpen && hasMessages && 'animate-pulse-glow'
      )}
    >
      {isOpen ? (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      ) : (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
        </svg>
      )}
    </button>
  )
}

// ── Chat panel ────────────────────────────────────────────────────────────────

function ChatPanel({
  messages,
  isStreaming,
  input,
  onInputChange,
  onSubmit,
  onClear,
  onClose,
  messagesEndRef,
  inputRef,
  panelId,
}: {
  messages: ChatMessage[]
  isStreaming: boolean
  input: string
  onInputChange: (v: string) => void
  onSubmit: () => void
  onClear: () => void
  onClose: () => void
  messagesEndRef: React.RefObject<HTMLDivElement>
  inputRef: React.RefObject<HTMLTextAreaElement>
  panelId: string
}) {
  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSubmit()
    }
  }

  return (
    <div
      id={panelId}
      role="dialog"
      aria-modal="false"
      aria-label="ARIA — Flowithm AI assistant"
      className={cn(
        // Desktop: fixed panel above button
        'fixed bottom-20 right-4 md:right-6',
        'w-[calc(100vw-2rem)] max-w-sm md:w-96',
        // Mobile: full screen overlay
        'max-md:inset-0 max-md:bottom-0 max-md:right-0 max-md:w-full max-md:max-w-none',
        // Panel styling
        'flex flex-col rounded-2xl max-md:rounded-none',
        'bg-surface border border-border-subtle shadow-[0_24px_64px_rgba(0,0,0,0.6)]',
        'overflow-hidden z-40',
        // Height
        'h-[520px] max-md:h-screen'
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border-subtle bg-surface-2 flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-xs font-display font-bold text-primary">
              A
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-secondary border-2 border-surface-2" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-display font-bold text-text-primary leading-none">ARIA</p>
            <p className="text-[10px] text-text-muted font-body mt-0.5">Flowithm AI Assistant</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {/* Clear chat */}
          <button
            type="button"
            onClick={onClear}
            aria-label="Clear chat history"
            className="w-8 h-8 rounded-lg text-text-muted hover:text-text-primary hover:bg-white/5 flex items-center justify-center transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
          </button>

          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close chat"
            className="w-8 h-8 rounded-lg text-text-muted hover:text-text-primary hover:bg-white/5 flex items-center justify-center transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4 scroll-smooth"
        aria-live="polite"
        aria-relevant="additions"
        role="log"
      >
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        {isStreaming && <TypingIndicator />}
        <div ref={messagesEndRef} aria-hidden="true" />
      </div>

      {/* Input area */}
      <form
        onSubmit={(e: FormEvent) => { e.preventDefault(); onSubmit() }}
        className="flex-shrink-0 border-t border-border-subtle p-3 flex gap-2 items-end bg-surface-2"
      >
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message…"
          rows={1}
          disabled={isStreaming}
          aria-label="Chat message input"
          className={cn(
            'flex-1 bg-surface border border-border-subtle rounded-xl px-3 py-2.5',
            'text-sm font-body text-text-primary placeholder:text-text-muted',
            'resize-none outline-none transition-all duration-150 max-h-32 overflow-y-auto',
            'focus:border-primary/40 focus:shadow-[0_0_0_3px_rgba(255,106,0,0.08)]',
            'disabled:opacity-50'
          )}
          style={{ height: 'auto' }}
          onInput={(e) => {
            const el = e.currentTarget
            el.style.height = 'auto'
            el.style.height = `${el.scrollHeight}px`
          }}
        />
        <button
          type="submit"
          disabled={isStreaming || !input.trim()}
          aria-label="Send message"
          className={cn(
            'w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0',
            'bg-primary text-white transition-all duration-150',
            'hover:bg-orange-500 active:scale-95',
            'disabled:opacity-40 disabled:pointer-events-none',
            'focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2'
          )}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.269 20.876L5.999 12zm0 0h7.5" />
          </svg>
        </button>
      </form>
    </div>
  )
}

// ── Main widget ───────────────────────────────────────────────────────────────

export function ChatWidget() {
  const panelId = useId()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE])
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isStreaming])

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen])

  const handleClear = useCallback(() => {
    setMessages([INITIAL_MESSAGE])
    setInput('')
  }, [])

  const handleSubmit = useCallback(async () => {
    const text = input.trim()
    if (!text || isStreaming) return

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
    }

    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput('')
    setIsStreaming(true)

    // Reset textarea height
    if (inputRef.current) {
      inputRef.current.style.height = 'auto'
    }

    const assistantId = `assistant-${Date.now()}`

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map(({ role, content }) => ({ role, content })),
        }),
      })

      if (!res.ok || !res.body) {
        const err = await res.json().catch(() => ({ error: 'Something went wrong.' }))
        setMessages((prev) => [
          ...prev,
          { id: assistantId, role: 'assistant', content: err.error ?? 'Something went wrong. Please try again.' },
        ])
        return
      }

      // Add empty assistant message, then stream into it
      setMessages((prev) => [...prev, { id: assistantId, role: 'assistant', content: '' }])

      const reader = res.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, content: m.content + chunk } : m
          )
        )
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: assistantId,
          role: 'assistant',
          content: "Sorry, I couldn't connect. Please try again or email us at hello@flowithm.io",
        },
      ])
    } finally {
      setIsStreaming(false)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [input, isStreaming, messages])

  return (
    <>
      {/* Chat panel */}
      {isOpen && (
        <ChatPanel
          messages={messages}
          isStreaming={isStreaming}
          input={input}
          onInputChange={setInput}
          onSubmit={handleSubmit}
          onClear={handleClear}
          onClose={() => setIsOpen(false)}
          messagesEndRef={messagesEndRef}
          inputRef={inputRef}
          panelId={panelId}
        />
      )}

      {/* Floating toggle button */}
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
        <ToggleButton
          isOpen={isOpen}
          onClick={() => setIsOpen((v) => !v)}
          hasMessages={messages.length > 1}
        />
      </div>
    </>
  )
}
