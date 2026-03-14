import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const accent = '#4af0c8'
const orange = '#f0a84a'
const border = 'rgba(255,255,255,0.08)'
const surface = 'rgba(255,255,255,0.03)'

// Mock user data — will be replaced with real backend data later
const mockUser = {
  name: 'Alex',
  tier: 'Builder',
  emoji: '🔧',
  points: 340,
  streak: 5,
  goal: 30,
  minutesToday: 18,
  tracks: [
    {
      id: 'scripting',
      name: 'Scripting',
      emoji: '⌨️',
      color: accent,
      lessonsComplete: 6,
      lessonsTotal: 24,
    },
    {
      id: 'networking',
      name: 'Networking',
      emoji: '🌐',
      color: orange,
      lessonsComplete: 3,
      lessonsTotal: 20,
    },
  ],
  badges: [
    { id: 1, emoji: '🔥', name: 'On Fire',      desc: '5 day streak',         earned: true  },
    { id: 2, emoji: '⭐', name: 'First Steps',  desc: 'Complete first lesson', earned: true  },
    { id: 3, emoji: '🏆', name: 'Track Master', desc: 'Complete a full track', earned: false },
    { id: 4, emoji: '💎', name: 'Dedicated',    desc: '30 day streak',         earned: false },
    { id: 5, emoji: '🎓', name: 'Certified',    desc: 'Earn a voucher',        earned: false },
  ],
  recentLessons: [
    { id: 1, title: 'What is a script?',       track: 'Scripting',   points: 20, completed: true  },
    { id: 2, title: 'Your first Bash command', track: 'Scripting',   points: 25, completed: true  },
    { id: 3, title: 'Variables in Python',     track: 'Scripting',   points: 30, completed: false },
    { id: 4, title: 'What is an IP address?',  track: 'Networking',  points: 20, completed: true  },
    { id: 5, title: 'How DNS works',           track: 'Networking',  points: 25, completed: false },
  ],
}

function ProgressBar({ value, max, color }) {
  const pct = Math.min(Math.round((value / max) * 100), 100)
  return (
    <div style={{ height: '6px', background: border, borderRadius: '3px', overflow: 'hidden' }}>
      <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: '3px', transition: 'width 0.6s ease' }} />
    </div>
  )
}

export default function Dashboard() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTab = searchParams.get('tab') || 'overview'
  const user = mockUser
  const goalPct = Math.min(Math.round((user.minutesToday / user.goal) * 100), 100)

  function setActiveTab(tab) {
    setSearchParams({ tab })
  }

  return (
    <div style={{ background: '#060612', minHeight: '100vh', color: '#f0f0f0', fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />

      {/* NAV */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2.5rem', borderBottom: `1px solid ${border}`, background: 'rgba(6,6,18,0.9)', backdropFilter: 'blur(12px)' }}>
        <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '1.4rem', fontWeight: 700, color: accent }}>
          TechQuest 🚀
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <span style={{ fontSize: '0.85rem', color: '#555' }}>
            🔥 {user.streak} day streak
          </span>
          <span style={{ fontSize: '0.85rem', color: accent, fontWeight: 600 }}>
            ⚡ {user.points} pts
          </span>
          <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: `${accent}20`, border: `1px solid ${accent}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', cursor: 'pointer' }}>
            {user.emoji}
          </div>
        </div>
      </nav>

      {/* MAIN */}
      <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '7rem 2rem 4rem' }}>

        {/* Welcome */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h1 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 700, marginBottom: '0.3rem' }}>
            Welcome back, {user.name} {user.emoji}
          </h1>
          <p style={{ color: '#555', fontSize: '0.95rem' }}>
            {goalPct < 100
              ? `You're ${goalPct}% through your daily goal. Keep going!`
              : `Daily goal complete! 🎉 You're on a ${user.streak} day streak.`}
          </p>
        </div>

        {/* STAT CARDS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
          {[
            { label: 'Total Points',   value: user.points,        unit: 'pts', color: accent,   emoji: '⚡' },
            { label: 'Day Streak',     value: user.streak,        unit: 'days', color: '#f05050', emoji: '🔥' },
            { label: 'Daily Goal',     value: `${goalPct}%`,      unit: 'done', color: orange,   emoji: '🎯' },
            { label: 'Badges Earned',  value: user.badges.filter(b => b.earned).length, unit: `/ ${user.badges.length}`, color: '#c084fc', emoji: '🏅' },
          ].map(s => (
            <div key={s.label} style={{ padding: '1.25rem', borderRadius: '12px', border: `1px solid ${border}`, background: surface }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{s.emoji}</div>
              <div style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '1.75rem', fontWeight: 700, color: s.color, lineHeight: 1 }}>
                {s.value}
                <span style={{ fontSize: '0.85rem', color: '#555', fontFamily: "'DM Sans', sans-serif", fontWeight: 400, marginLeft: '0.25rem' }}>{s.unit}</span>
              </div>
              <div style={{ fontSize: '0.78rem', color: '#555', marginTop: '0.25rem' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* TABS */}
        <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '2rem', borderBottom: `1px solid ${border}`, paddingBottom: '0' }}>
          {['overview', 'lessons', 'badges'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              style={{ padding: '0.6rem 1.25rem', background: 'transparent', border: 'none', borderBottom: `2px solid ${activeTab === tab ? accent : 'transparent'}`, color: activeTab === tab ? accent : '#555', cursor: 'pointer', fontSize: '0.875rem', fontWeight: activeTab === tab ? 600 : 400, textTransform: 'capitalize', transition: 'all 0.2s', marginBottom: '-1px' }}>
              {tab}
            </button>
          ))}
        </div>

        {/* TAB — OVERVIEW */}
        {activeTab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>

            {/* Daily goal progress */}
            <div style={{ padding: '1.5rem', borderRadius: '12px', border: `1px solid ${border}`, background: surface }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '1.05rem', fontWeight: 600 }}>Today's Goal</span>
                <span style={{ fontSize: '0.8rem', color: orange }}>{user.minutesToday} / {user.goal} min</span>
              </div>
              <ProgressBar value={user.minutesToday} max={user.goal} color={orange} />
              <p style={{ fontSize: '0.8rem', color: '#555', marginTop: '0.75rem' }}>
                {user.goal - user.minutesToday > 0
                  ? `${user.goal - user.minutesToday} minutes left to hit your goal`
                  : 'Goal complete! Great work today 🎉'}
              </p>
            </div>

            {/* Track progress */}
            {user.tracks.map(t => (
              <div key={t.id} style={{ padding: '1.5rem', borderRadius: '12px', border: `1px solid ${border}`, background: surface }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '1.05rem', fontWeight: 600 }}>
                    {t.emoji} {t.name}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: t.color }}>{t.lessonsComplete} / {t.lessonsTotal} lessons</span>
                </div>
                <ProgressBar value={t.lessonsComplete} max={t.lessonsTotal} color={t.color} />
                <button onClick={() => navigate('/learn')}
                  style={{ marginTop: '1rem', width: '100%', padding: '0.6rem', borderRadius: '8px', border: `1px solid ${t.color}44`, background: 'transparent', color: t.color, cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}>
                  Continue →
                </button>
              </div>
            ))}

            {/* Points to voucher */}
            <div style={{ padding: '1.5rem', borderRadius: '12px', border: `1px solid rgba(192,132,252,0.2)`, background: 'rgba(192,132,252,0.05)' }}>
              <div style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                🎓 Certification Voucher
              </div>
              <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '1rem', lineHeight: 1.6 }}>
                Earn 1000 points to unlock a voucher toward a certification exam fee.
              </p>
              <ProgressBar value={user.points} max={1000} color='#c084fc' />
              <div style={{ fontSize: '0.78rem', color: '#555', marginTop: '0.5rem' }}>
                {user.points} / 1000 points — {1000 - user.points} to go
              </div>
            </div>

          </div>
        )}

        {/* TAB — LESSONS */}
        {activeTab === 'lessons' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {user.recentLessons.map(lesson => (
              <div key={lesson.id}
                style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.25rem', borderRadius: '10px', border: `1px solid ${border}`, background: surface, cursor: lesson.completed ? 'default' : 'pointer', opacity: lesson.completed ? 0.6 : 1, transition: 'border-color 0.2s' }}
                onMouseEnter={e => { if (!lesson.completed) e.currentTarget.style.borderColor = accent }}
                onMouseLeave={e => e.currentTarget.style.borderColor = border}
                onClick={() => !lesson.completed && navigate(`/lesson/${lesson.id}`)}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: lesson.completed ? `${accent}20` : `${border}`, border: `1px solid ${lesson.completed ? accent : border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', flexShrink: 0 }}>
                  {lesson.completed ? '✓' : '▶'}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.95rem', fontWeight: 500, marginBottom: '0.2rem' }}>{lesson.title}</div>
                  <div style={{ fontSize: '0.78rem', color: '#555' }}>{lesson.track}</div>
                </div>
                <div style={{ fontSize: '0.8rem', color: accent, fontWeight: 600 }}>+{lesson.points} pts</div>
                {lesson.completed && <div style={{ fontSize: '0.75rem', color: '#444', marginLeft: '0.5rem' }}>Done</div>}
              </div>
            ))}
          </div>
        )}

        {/* TAB — BADGES */}
        {activeTab === 'badges' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '1rem' }}>
            {user.badges.map(badge => (
              <div key={badge.id}
                style={{ padding: '1.5rem', borderRadius: '12px', border: `1px solid ${badge.earned ? `${accent}33` : border}`, background: badge.earned ? `${accent}08` : surface, textAlign: 'center', opacity: badge.earned ? 1 : 0.45, transition: 'transform 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                <div style={{ fontSize: '2.25rem', marginBottom: '0.75rem', filter: badge.earned ? 'none' : 'grayscale(1)' }}>{badge.emoji}</div>
                <div style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.25rem' }}>{badge.name}</div>
                <div style={{ fontSize: '0.75rem', color: '#555' }}>{badge.desc}</div>
                {badge.earned && <div style={{ marginTop: '0.75rem', fontSize: '0.7rem', color: accent, letterSpacing: '0.05em' }}>EARNED ✓</div>}
              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  )
}