import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react'
import { Session } from '@supabase/supabase-js'
import { supabase, isSupabaseConfigured } from '@/services/supabase'
import type { User } from '@/types'

interface AuthContextValue {
  user: User | null
  session: Session | null
  loading: boolean
  isGuest: boolean
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  signUp: (
    email: string,
    password: string,
    name?: string
  ) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{ error: string | null }>
  updateProfile: (updates: Partial<Pick<User, 'name' | 'avatar_url'>>) => Promise<{ error: string | null }>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

/** Map a Supabase auth user to our User type */
async function fetchProfile(userId: string): Promise<User | null> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, email, name, avatar_url, is_admin, created_at')
      .eq('id', userId)
      .single()

    if (error || !data) return null
    return data as User
  } catch {
    return null
  }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  // Bootstrap: read existing session
  useEffect(() => {
    let mounted = true

    if (!isSupabaseConfigured) {
      setLoading(false)
      return
    }

    const init = async () => {
      try {
        const { data } = await supabase.auth.getSession()
        if (!mounted) return

        const sess = data.session ?? null
        setSession(sess)

        if (sess?.user) {
          const profile = await fetchProfile(sess.user.id)
          if (mounted) {
            setUser(
              profile ?? {
                id: sess.user.id,
                email: sess.user.email ?? '',
                is_admin: false,
                created_at: sess.user.created_at,
              }
            )
          }
        }
      } catch (err) {
        console.warn('Auth initialization skipped:', err)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    init()

    // Listen to auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange(async (event, sess) => {
      if (!mounted) return
      setSession(sess)

      if (sess?.user) {
        const profile = await fetchProfile(sess.user.id)
        setUser(
          profile ?? {
            id: sess.user.id,
            email: sess.user.email ?? '',
            is_admin: false,
            created_at: sess.user.created_at,
          }
        )
      } else {
        setUser(null)
      }

      if (event === 'SIGNED_OUT') {
        setUser(null)
        setSession(null)
      }

      setLoading(false)
    })

    return () => {
      mounted = false
      listener?.subscription?.unsubscribe()
    }
  }, [])

  const signIn = useCallback(
    async (email: string, password: string): Promise<{ error: string | null }> => {
      setLoading(true)
      try {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        return { error: error?.message ?? null }
      } finally {
        setLoading(false)
      }
    },
    []
  )

  const signUp = useCallback(
    async (
      email: string,
      password: string,
      name?: string
    ): Promise<{ error: string | null }> => {
      setLoading(true)
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { name } },
        })
        if (error) return { error: error.message }

        // Create profile row
        if (data.user) {
          await supabase.from('profiles').upsert({
            id: data.user.id,
            email,
            name: name ?? null,
            is_admin: false,
          })
        }

        return { error: null }
      } finally {
        setLoading(false)
      }
    },
    []
  )

  const signOut = useCallback(async () => {
    await supabase.auth.signOut()
    setUser(null)
    setSession(null)
  }, [])

  const resetPassword = useCallback(
    async (email: string): Promise<{ error: string | null }> => {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })
      return { error: error?.message ?? null }
    },
    []
  )

  const updateProfile = useCallback(
    async (
      updates: Partial<Pick<User, 'name' | 'avatar_url'>>
    ): Promise<{ error: string | null }> => {
      if (!user) return { error: 'Not authenticated' }
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
      if (!error) {
        setUser((prev) => (prev ? { ...prev, ...updates } : prev))
      }
      return { error: error?.message ?? null }
    },
    [user]
  )

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      session,
      loading,
      isGuest: !user,
      signIn,
      signUp,
      signOut,
      resetPassword,
      updateProfile,
    }),
    [user, session, loading, signIn, signUp, signOut, resetPassword, updateProfile]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
