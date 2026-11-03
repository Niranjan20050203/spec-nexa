import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react'
import type { Laptop, ComparisonItem } from '@/types'
import { showToast } from '@/components/ui/Toast'

const MAX_COMPARE = 4
const STORAGE_KEY = 'spec-nexa-comparison'

interface ComparisonContextValue {
  items: ComparisonItem[]
  addToCompare: (laptop: Laptop) => void
  removeFromCompare: (laptopId: string) => void
  clearComparison: () => void
  isInComparison: (laptopId: string) => boolean
  isFull: boolean
  count: number
}

const ComparisonContext = createContext<ComparisonContextValue | undefined>(undefined)

const loadFromSession = (): ComparisonItem[] => {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as ComparisonItem[]
  } catch {
    return []
  }
}

const saveToSession = (items: ComparisonItem[]) => {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch {
    // ignore
  }
}

export const ComparisonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<ComparisonItem[]>(loadFromSession)

  // Persist on every change
  useEffect(() => {
    saveToSession(items)
  }, [items])

  const addToCompare = useCallback((laptop: Laptop) => {
    setItems((prev) => {
      if (prev.length >= MAX_COMPARE) {
        showToast({
          type: 'error',
          message: `You can compare up to ${MAX_COMPARE} laptops at a time.`,
        })
        return prev
      }
      if (prev.some((i) => i.laptop.id === laptop.id)) {
        showToast({ type: 'info', message: `${laptop.brand} ${laptop.model} is already in comparison.` })
        return prev
      }
      showToast({ type: 'success', message: `${laptop.brand} ${laptop.model} added to comparison.` })
      return [...prev, { laptop }]
    })
  }, [])

  const removeFromCompare = useCallback((laptopId: string) => {
    setItems((prev) => prev.filter((i) => i.laptop.id !== laptopId))
  }, [])

  const clearComparison = useCallback(() => {
    setItems([])
    try {
      sessionStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
  }, [])

  const isInComparison = useCallback(
    (laptopId: string) => items.some((i) => i.laptop.id === laptopId),
    [items]
  )

  const value = useMemo<ComparisonContextValue>(
    () => ({
      items,
      addToCompare,
      removeFromCompare,
      clearComparison,
      isInComparison,
      isFull: items.length >= MAX_COMPARE,
      count: items.length,
    }),
    [items, addToCompare, removeFromCompare, clearComparison, isInComparison]
  )

  return <ComparisonContext.Provider value={value}>{children}</ComparisonContext.Provider>
}

export const useComparison = (): ComparisonContextValue => {
  const ctx = useContext(ComparisonContext)
  if (!ctx) throw new Error('useComparison must be used within a ComparisonProvider')
  return ctx
}
