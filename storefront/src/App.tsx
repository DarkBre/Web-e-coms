import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { AdminPage } from './pages/AdminPage'
import { AuthPage } from './pages/AuthPage'
import { MainPage } from './pages/MainPage'
import {
  fetchCurrentUser,
  login as loginWithApi,
  logout as logoutWithApi,
  register as registerWithApi,
} from './services/authApi'
import type { AuthResult, User } from './types'
import { roleLabels } from './utils/auth'

function App() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    let cancelled = false
    const tabSessionKey = 'novatech_tab_session'

    const bootstrapAuth = async () => {
      const isExistingTabSession = sessionStorage.getItem(tabSessionKey) === '1'
      sessionStorage.setItem(tabSessionKey, '1')

      if (!isExistingTabSession) {
        try {
          await logoutWithApi()
        } catch {
          // ignore errors when there is no server session to clear
        }

        if (!cancelled) {
          setUser(null)
        }
        return
      }

      try {
        const currentUser = await fetchCurrentUser()
        if (!cancelled) {
          setUser(currentUser)
        }
      } catch {
        if (!cancelled) {
          setUser(null)
        }
      }
    }

    bootstrapAuth()

    return () => {
      cancelled = true
    }
  }, [])

  const loginUser = async (email: string, password: string): Promise<AuthResult> => {
    try {
      const result = await loginWithApi(email, password)
      setUser(result.user)

      return {
        ok: true,
        message: `${result.message} Quyền tài khoản: ${roleLabels[result.user.role]}.`,
      }
    } catch (error) {
      return {
        ok: false,
        message: error instanceof Error ? error.message : 'Đăng nhập thất bại.',
      }
    }
  }

  const registerUser = async (name: string, email: string, password: string): Promise<AuthResult> => {
    try {
      const result = await registerWithApi(name, email, password)
      setUser(result.user)

      return {
        ok: true,
        message: `${result.message} Quyền tài khoản: ${roleLabels[result.user.role]}.`,
      }
    } catch (error) {
      return {
        ok: false,
        message: error instanceof Error ? error.message : 'Đăng ký thất bại.',
      }
    }
  }

  const logoutUser = async () => {
    try {
      await logoutWithApi()
    } catch {
      // clear local state even if API logout fails
    }
    setUser(null)
  }

  return (
    <div className="app-shell">
      <Header user={user} />

      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <MainPage user={user} />
            ) : (
              <Navigate
                replace
                to="/auth"
                state={{ redirectReason: 'Vui lòng đăng nhập để truy cập hệ thống.' }}
              />
            )
          }
        />
        <Route
          path="/auth"
          element={
            <AuthPage
              user={user}
              onLogin={loginUser}
              onLogout={logoutUser}
              onRegister={registerUser}
            />
          }
        />
        <Route
          path="/admin"
          element={
            user?.role === 'admin' ? (
              <AdminPage />
            ) : (
              <Navigate
                replace
                to={user ? '/' : '/auth'}
                state={{
                  redirectReason: user
                    ? 'Trang admin chỉ dành cho tài khoản quản trị.'
                    : 'Bạn cần đăng nhập bằng tài khoản quản trị để vào trang admin.',
                }}
              />
            )
          }
        />
        <Route path="*" element={<Navigate replace to={user ? '/' : '/auth'} />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App
