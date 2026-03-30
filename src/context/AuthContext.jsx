import { createContext, useContext, useState, useEffect } from 'react'
import { api } from '../api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
  const token = localStorage.getItem('token')
  if (token) {
    api.getUser()
      .then(data => setUser(data))
      .catch(err => {
        console.error('Session restore failed:', err.message)
        // Only remove token if it's actually invalid (401)
        if (err.message.includes('401') || err.message.includes('Invalid')) {
          localStorage.removeItem('token')
        }
      })
      .finally(() => setLoading(false))
  } else {
    setLoading(false)
  }
}, [])

  function login(token, userData) {
    localStorage.setItem('token', token)
    setUser(userData)
  }

async function refreshUser() {
  try {
    const data = await api.getUser()
    setUser(data)
  } catch (err) {
    console.error('Failed to refresh user:', err.message)
    // Don't clear user on refresh failure — keep existing session
  }
}

return (
  <AuthContext.Provider value={{ user, setUser, login, logout, loading, refreshUser }}>
    {!loading && children}
  </AuthContext.Provider>
)

  function logout() {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}