import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react'
import type { QuestionnaireState, UserPreferences } from '@/types'
import { useAuth } from './AuthContext'
import { supabase } from '@/services/supabase'

const STORAGE_KEY = 'spec-nexa-questionnaire'
const TOTAL_STEPS = 8

const defaultPreferences: Partial<UserPreferences> = {}

const defaultState: QuestionnaireState = {
  step: 1,
  preferences: defaultPreferences,
  completed: false,
}

interface QuestionnaireContextValue {
  state: QuestionnaireState
  totalSteps: number
  progress: number // 0-100
  updatePreferences: (updates: Partial<UserPreferences>) => void
  nextStep: () => void
  prevStep: () => void
  goToStep: (step: number) => void
  resetQuestionnaire: () => void
  completeQuestionnaire: () => Promise<void>
  canGoNext: boolean
  canGoPrev: boolean
}

const QuestionnaireContext = createContext<QuestionnaireContextValue | undefined>(undefined)

// Local storage helpers
const loadLocal = (): QuestionnaireState => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState
    return { ...defaultState, ...JSON.parse(raw) }
  } catch {
    return defaultState
  }
}

const saveLocal = (state: QuestionnaireState) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // ignore
  }
}

const clearLocal = () => {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // ignore
  }
}

export const QuestionnaireProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth()
  const [state, setState] = useState<QuestionnaireState>(loadLocal)

  // Persist to localStorage on every state change
  useEffect(() => {
    saveLocal(state)
  }, [state])

  // If user logs in mid-questionnaire, sync the current local state to Supabase
  useEffect(() => {
    if (!user || !state.completed) return

    const sync = async () => {
      await supabase.from('user_preferences').upsert({
        user_id: user.id,
        preferences: state.preferences,
        updated_at: new Date().toISOString(),
      })
    }
    sync()
  }, [user, state.completed, state.preferences])

  const updatePreferences = useCallback((updates: Partial<UserPreferences>) => {
    setState((prev) => ({
      ...prev,
      preferences: { ...prev.preferences, ...updates },
    }))
  }, [])

  const nextStep = useCallback(() => {
    setState((prev) => ({
      ...prev,
      step: Math.min(prev.step + 1, TOTAL_STEPS),
    }))
  }, [])

  const prevStep = useCallback(() => {
    setState((prev) => ({
      ...prev,
      step: Math.max(prev.step - 1, 1),
    }))
  }, [])

  const goToStep = useCallback((step: number) => {
    if (step >= 1 && step <= TOTAL_STEPS) {
      setState((prev) => ({ ...prev, step }))
    }
  }, [])

  const resetQuestionnaire = useCallback(() => {
    setState(defaultState)
    clearLocal()
  }, [])

  const completeQuestionnaire = useCallback(async () => {
    setState((prev) => ({ ...prev, completed: true }))

    if (user) {
      try {
        await supabase.from('user_preferences').upsert({
          user_id: user.id,
          preferences: state.preferences,
          updated_at: new Date().toISOString(),
        })
      } catch {
        // Silently fail — results still work from local state
      }
    }
  }, [user, state.preferences])

  const progress = Math.round((state.step / TOTAL_STEPS) * 100)

  const value = useMemo<QuestionnaireContextValue>(
    () => ({
      state,
      totalSteps: TOTAL_STEPS,
      progress,
      updatePreferences,
      nextStep,
      prevStep,
      goToStep,
      resetQuestionnaire,
      completeQuestionnaire,
      canGoNext: state.step < TOTAL_STEPS,
      canGoPrev: state.step > 1,
    }),
    [
      state,
      progress,
      updatePreferences,
      nextStep,
      prevStep,
      goToStep,
      resetQuestionnaire,
      completeQuestionnaire,
    ]
  )

  return (
    <QuestionnaireContext.Provider value={value}>{children}</QuestionnaireContext.Provider>
  )
}

export const useQuestionnaire = (): QuestionnaireContextValue => {
  const ctx = useContext(QuestionnaireContext)
  if (!ctx) throw new Error('useQuestionnaire must be used within a QuestionnaireProvider')
  return ctx
}
