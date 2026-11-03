import React, { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from '@/context/ThemeContext'
import { AuthProvider, useAuth } from '@/context/AuthContext'
import { ComparisonProvider } from '@/context/ComparisonContext'
import { QuestionnaireProvider } from '@/context/QuestionnaireContext'
import Layout from '@/components/layout/Layout'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

// Lazy-load all pages for code splitting
const HomePage = lazy(() => import('@/pages/HomePage'))
const FindLaptopPage = lazy(() => import('@/pages/FindLaptopPage'))
const QuestionnairePage = lazy(() => import('@/pages/QuestionnairePage'))
const RecommendationsPage = lazy(() => import('@/pages/RecommendationsPage'))
const ExplorePage = lazy(() => import('@/pages/ExplorePage'))
const LaptopDetailPage = lazy(() => import('@/pages/LaptopDetailPage'))
const ComparePage = lazy(() => import('@/pages/ComparePage'))
const AssistantPage = lazy(() => import('@/pages/AssistantPage'))
const LoginPage = lazy(() => import('@/pages/LoginPage'))
const RegisterPage = lazy(() => import('@/pages/RegisterPage'))
const DashboardPage = lazy(() => import('@/pages/DashboardPage'))
const SavedPage = lazy(() => import('@/pages/SavedPage'))
const AdminPage = lazy(() => import('@/pages/AdminPage'))
const AboutPage = lazy(() => import('@/pages/AboutPage'))
const PrivacyPage = lazy(() => import('@/pages/PrivacyPage'))
const TermsPage = lazy(() => import('@/pages/TermsPage'))

// Lazy-load floating AI assistant
const AIAssistant = lazy(() => import('@/components/assistant/AIAssistant'))

// Page-level suspense wrapper
const PageFallback = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <LoadingSpinner size="lg" />
  </div>
)

// Protected route wrapper
interface ProtectedRouteProps {
  children: React.ReactNode
  adminOnly?: boolean
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <PageFallback />
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (adminOnly && !user.is_admin) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

// Routes that use Layout (Navbar + Footer)
const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        {/* Public routes with Layout */}
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/find-laptop"
          element={
            <Layout>
              <FindLaptopPage />
            </Layout>
          }
        />
        <Route
          path="/questionnaire"
          element={
            <Layout>
              <QuestionnairePage />
            </Layout>
          }
        />
        <Route
          path="/recommendations"
          element={
            <Layout>
              <RecommendationsPage />
            </Layout>
          }
        />
        <Route
          path="/laptops"
          element={
            <Layout>
              <ExplorePage />
            </Layout>
          }
        />
        <Route
          path="/laptops/:id"
          element={
            <Layout>
              <LaptopDetailPage />
            </Layout>
          }
        />
        <Route
          path="/compare"
          element={
            <Layout>
              <ComparePage />
            </Layout>
          }
        />
        <Route
          path="/assistant"
          element={
            <Layout>
              <AssistantPage />
            </Layout>
          }
        />
        <Route
          path="/about"
          element={
            <Layout>
              <AboutPage />
            </Layout>
          }
        />
        <Route
          path="/privacy"
          element={
            <Layout>
              <PrivacyPage />
            </Layout>
          }
        />
        <Route
          path="/terms"
          element={
            <Layout>
              <TermsPage />
            </Layout>
          }
        />

        {/* Auth routes (no layout wrapper — full page) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected routes with Layout */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <DashboardPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/saved"
          element={
            <ProtectedRoute>
              <Layout>
                <SavedPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Admin-only route (no shared layout — full control) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly>
              <AdminPage />
            </ProtectedRoute>
          }
        />

        {/* 404 fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Floating AI assistant — shown on all non-admin pages */}
      <AIAssistant />
    </Suspense>
  )
}

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ComparisonProvider>
          <QuestionnaireProvider>
            <AppRoutes />
          </QuestionnaireProvider>
        </ComparisonProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
