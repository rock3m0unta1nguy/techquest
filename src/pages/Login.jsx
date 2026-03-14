import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const accent = '#4af0c8'
  const border = 'rgba(255,255,255,0.08)'
  const { login } = useAuth()

  async function handleLogin() {
  setError('')
  if (!form.email || !form.password) return setError('Please fill in all fields.')
  try {
    const { token, user } = await api.login({
      email: form.email,
      password: form.password,
    })
    login(token, user)
    navigate('/dashboard')
  } catch (err) {
    setError(err.message)
  }
}

  return (
    <div style={{ background: '#060612', minHeight: '100vh', color: '#f0f0f0', fontFamily: "'DM Sans', sans-serif", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>

      <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />

      {/* Logo */}
      <div onClick={() => navigate('/')} style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '1.5rem', fontWeight: 700, color: accent, marginBottom: '2rem', cursor: 'pointer' }}>
        TechQuest 🚀
      </div>

      {/* Card */}
      <div style={{ width: '100%', maxWidth: '420px', background: 'rgba(255,255,255,0.03)', border: `1px solid ${border}`, borderRadius: '16px', padding: '2.5rem' }}>

        <h2 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          Welcome back
        </h2>
        <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1.75rem' }}>
          Pick up right where you left off.
        </p>

        {/* Fields */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[
            { label: 'Email', key: 'email', type: 'email', placeholder: 'you@email.com' },
            { label: 'Password', key: 'password', type: 'password', placeholder: 'Your password' },
          ].map(f => (
            <div key={f.key}>
              <label style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#555', display: 'block', marginBottom: '0.4rem' }}>
                {f.label}
              </label>
              <input
                type={f.type}
                placeholder={f.placeholder}
                value={form[f.key]}
                onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                style={{ width: '100%', background: '#0a0a1a', border: `1px solid ${border}`, borderRadius: '8px', padding: '0.75rem 1rem', color: '#f0f0f0', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }}
                onFocus={e => e.target.style.borderColor = accent}
                onBlur={e => e.target.style.borderColor = border}
              />
            </div>
          ))}
        </div>

        {/* Forgot password */}
        <div style={{ textAlign: 'right', marginTop: '0.5rem' }}>
          <span style={{ fontSize: '0.8rem', color: '#555', cursor: 'pointer' }}
            onMouseEnter={e => e.target.style.color = accent}
            onMouseLeave={e => e.target.style.color = '#555'}>
            Forgot password?
          </span>
        </div>

        {/* Error */}
        {error && (
          <div style={{ marginTop: '1rem', padding: '0.75rem 1rem', borderRadius: '8px', background: 'rgba(240,80,80,0.1)', border: '1px solid rgba(240,80,80,0.3)', color: '#f05050', fontSize: '0.85rem' }}>
            {error}
          </div>
        )}

        {/* Submit */}
        <button onClick={handleLogin}
          style={{ width: '100%', marginTop: '1.5rem', padding: '0.875rem', borderRadius: '8px', border: 'none', background: accent, color: '#060612', cursor: 'pointer', fontSize: '0.95rem', fontWeight: 700 }}
          onMouseEnter={e => e.target.style.opacity = '0.9'}
          onMouseLeave={e => e.target.style.opacity = '1'}>
          Log In →
        </button>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1.5rem 0' }}>
          <div style={{ flex: 1, height: '1px', background: border }} />
          <span style={{ fontSize: '0.75rem', color: '#444' }}>or</span>
          <div style={{ flex: 1, height: '1px', background: border }} />
        </div>

        {/* Register link */}
        <p style={{ textAlign: 'center', fontSize: '0.85rem', color: '#555' }}>
          Don't have an account?{' '}
          <span onClick={() => navigate('/register')} style={{ color: accent, cursor: 'pointer' }}>
            Sign up free
          </span>
        </p>

      </div>
    </div>
  )
}