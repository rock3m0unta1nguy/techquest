import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const tiers = [
  { id: 'explorer', name: 'Explorer', age: 'Ages 8–12', emoji: '🚀', desc: 'Visual, fun, beginner friendly' },
  { id: 'builder',  name: 'Builder',  age: 'Ages 13–17', emoji: '🔧', desc: 'Practical and project-based' },
  { id: 'pro',      name: 'Pro',      age: 'Adult',      emoji: '⚡', desc: 'Direct and exam-focused' },
]

const tracks = [
  { id: 'scripting',   name: 'Scripting',   emoji: '⌨️', desc: 'Python & Bash fundamentals' },
  { id: 'networking',  name: 'Networking',  emoji: '🌐', desc: 'How the internet works' },
]

const goals = [
  { id: 10,  label: '10 min/day', desc: 'Casual pace' },
  { id: 30,  label: '30 min/day', desc: 'Steady progress' },
  { id: 60,  label: '60 min/day', desc: 'Fast track' },
]

export default function Register() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    tier: '',
    tracks: [],
    goal: '',
  })
  const [error, setError] = useState('')

  const totalSteps = 4

  function toggleTrack(id) {
    setForm(f => ({
      ...f,
      tracks: f.tracks.includes(id)
        ? f.tracks.filter(t => t !== id)
        : [...f.tracks, id]
    }))
  }

  function nextStep() {
    setError('')
    if (step === 1) {
      if (!form.name || !form.email || !form.password) return setError('Please fill in all fields.')
      if (form.password.length < 6) return setError('Password must be at least 6 characters.')
    }
    if (step === 2 && !form.tier) return setError('Please select a tier.')
    if (step === 3 && form.tracks.length === 0) return setError('Please select at least one track.')
    if (step === 4 && !form.goal) return setError('Please select a daily goal.')
    if (step < totalSteps) { setStep(s => s + 1) } else { handleSubmit() }
  }

  function handleSubmit() {
    // TODO: connect to backend
    console.log('Registering:', form)
    navigate('/dashboard')
  }

  const accent = '#4af0c8'
  const bg = '#060612'
  const surface = 'rgba(255,255,255,0.03)'
  const border = 'rgba(255,255,255,0.08)'

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#f0f0f0', fontFamily: "'DM Sans', sans-serif", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>

      <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />

      {/* Logo */}
      <div onClick={() => navigate('/')} style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '1.5rem', fontWeight: 700, color: accent, marginBottom: '2rem', cursor: 'pointer' }}>
        TechQuest 🚀
      </div>

      {/* Card */}
      <div style={{ width: '100%', maxWidth: '480px', background: surface, border: `1px solid ${border}`, borderRadius: '16px', padding: '2.5rem' }}>

        {/* Progress bar */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#555', marginBottom: '0.5rem' }}>
            <span>Step {step} of {totalSteps}</span>
            <span>{Math.round((step / totalSteps) * 100)}% complete</span>
          </div>
          <div style={{ height: '4px', background: border, borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${(step / totalSteps) * 100}%`, background: accent, borderRadius: '2px', transition: 'width 0.4s ease' }} />
          </div>
        </div>

        {/* STEP 1 — Account Info */}
        {step === 1 && (
          <div>
            <h2 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>Create your account</h2>
            <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1.75rem' }}>Free forever. No credit card needed.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { label: 'Name', key: 'name', type: 'text', placeholder: 'Your name' },
                { label: 'Email', key: 'email', type: 'email', placeholder: 'you@email.com' },
                { label: 'Password', key: 'password', type: 'password', placeholder: 'Min. 6 characters' },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#555', display: 'block', marginBottom: '0.4rem' }}>{f.label}</label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    value={form[f.key]}
                    onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                    style={{ width: '100%', background: '#0a0a1a', border: `1px solid ${border}`, borderRadius: '8px', padding: '0.75rem 1rem', color: '#f0f0f0', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }}
                    onFocus={e => e.target.style.borderColor = accent}
                    onBlur={e => e.target.style.borderColor = border}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2 — Tier Selection */}
        {step === 2 && (
          <div>
            <h2 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>Pick your level</h2>
            <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1.75rem' }}>You can change this later in your profile.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {tiers.map(t => (
                <div key={t.id} onClick={() => setForm(f => ({ ...f, tier: t.id }))}
                  style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.25rem', borderRadius: '10px', border: `1px solid ${form.tier === t.id ? accent : border}`, background: form.tier === t.id ? `${accent}10` : surface, cursor: 'pointer', transition: 'all 0.2s' }}>
                  <span style={{ fontSize: '1.75rem' }}>{t.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '1.05rem', fontWeight: 600 }}>{t.name}</div>
                    <div style={{ fontSize: '0.8rem', color: '#555' }}>{t.age} · {t.desc}</div>
                  </div>
                  <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: `2px solid ${form.tier === t.id ? accent : '#333'}`, background: form.tier === t.id ? accent : 'transparent', flexShrink: 0 }} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3 — Track Selection */}
        {step === 3 && (
          <div>
            <h2 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>Choose your tracks</h2>
            <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1.75rem' }}>Pick one or both — you can add more later.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {tracks.map(t => {
                const selected = form.tracks.includes(t.id)
                return (
                  <div key={t.id} onClick={() => toggleTrack(t.id)}
                    style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.25rem', borderRadius: '10px', border: `1px solid ${selected ? accent : border}`, background: selected ? `${accent}10` : surface, cursor: 'pointer', transition: 'all 0.2s' }}>
                    <span style={{ fontSize: '1.75rem' }}>{t.emoji}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '1.05rem', fontWeight: 600 }}>{t.name}</div>
                      <div style={{ fontSize: '0.8rem', color: '#555' }}>{t.desc}</div>
                    </div>
                    <div style={{ width: '18px', height: '18px', borderRadius: '4px', border: `2px solid ${selected ? accent : '#333'}`, background: selected ? accent : 'transparent', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: '#060612', fontWeight: 700 }}>
                      {selected ? '✓' : ''}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* STEP 4 — Daily Goal */}
        {step === 4 && (
          <div>
            <h2 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>Set your daily goal</h2>
            <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1.75rem' }}>Consistency beats intensity. Pick what's realistic.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {goals.map(g => (
                <div key={g.id} onClick={() => setForm(f => ({ ...f, goal: g.id }))}
                  style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.25rem', borderRadius: '10px', border: `1px solid ${form.goal === g.id ? accent : border}`, background: form.goal === g.id ? `${accent}10` : surface, cursor: 'pointer', transition: 'all 0.2s' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '1.05rem', fontWeight: 600 }}>{g.label}</div>
                    <div style={{ fontSize: '0.8rem', color: '#555' }}>{g.desc}</div>
                  </div>
                  <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: `2px solid ${form.goal === g.id ? accent : '#333'}`, background: form.goal === g.id ? accent : 'transparent', flexShrink: 0 }} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div style={{ marginTop: '1rem', padding: '0.75rem 1rem', borderRadius: '8px', background: 'rgba(240,80,80,0.1)', border: '1px solid rgba(240,80,80,0.3)', color: '#f05050', fontSize: '0.85rem' }}>
            {error}
          </div>
        )}

        {/* Navigation buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.75rem' }}>
          {step > 1 && (
            <button onClick={() => setStep(s => s - 1)} style={{ flex: 1, padding: '0.875rem', borderRadius: '8px', border: `1px solid ${border}`, background: 'transparent', color: '#f0f0f0', cursor: 'pointer', fontSize: '0.95rem' }}>
              ← Back
            </button>
          )}
          <button onClick={nextStep} style={{ flex: 2, padding: '0.875rem', borderRadius: '8px', border: 'none', background: accent, color: '#060612', cursor: 'pointer', fontSize: '0.95rem', fontWeight: 700 }}>
            {step === totalSteps ? 'Create Account →' : 'Continue →'}
          </button>
        </div>

        {/* Login link */}
        {step === 1 && (
          <p style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.85rem', color: '#555' }}>
            Already have an account?{' '}
            <span onClick={() => navigate('/login')} style={{ color: accent, cursor: 'pointer' }}>Log in</span>
          </p>
        )}

      </div>
    </div>
  )
}