import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const accent = '#4af0c8'
const orange = '#f0a84a'
const border = 'rgba(255,255,255,0.08)'
const surface = 'rgba(255,255,255,0.03)'

const tracks = [
  {
    id: 'scripting',
    name: 'Scripting',
    emoji: '⌨️',
    color: accent,
    desc: 'Learn Python and Bash from the ground up. Write your first scripts and automate real tasks.',
    lessons: [
      { id: 1, title: 'What is a script?',         points: 20, completed: true  },
      { id: 2, title: 'Your first Bash command',   points: 25, completed: true  },
      { id: 3, title: 'Variables in Python',        points: 30, completed: false },
      { id: 4, title: 'User input and output',      points: 30, completed: false },
      { id: 5, title: 'Conditionals (if/else)',     points: 35, completed: false },
      { id: 6, title: 'Loops in Python',            points: 35, completed: false },
      { id: 7, title: 'Functions',                  points: 40, completed: false },
      { id: 8, title: 'Reading files with Python',  points: 40, completed: false },
    ],
  },
  {
    id: 'networking',
    name: 'Networking',
    emoji: '🌐',
    color: orange,
    desc: 'Understand how the internet works — from IP addresses and DNS to protocols and security basics.',
    lessons: [
      { id: 4, title: 'What is an IP address?',    points: 20, completed: true  },
      { id: 5, title: 'How DNS works',             points: 25, completed: false },
      { id: 6, title: 'TCP vs UDP',                points: 30, completed: false },
      { id: 7, title: 'What is a router?',         points: 30, completed: false },
      { id: 8, title: 'HTTP and HTTPS',            points: 35, completed: false },
      { id: 9, title: 'Ports and protocols',       points: 35, completed: false },
      { id: 10, title: 'Firewalls explained',      points: 40, completed: false },
      { id: 11, title: 'VPNs and encryption',      points: 40, completed: false },
    ],
  },
]

export default function Learn() {
  const navigate = useNavigate()
  const [activeTrack, setActiveTrack] = useState('scripting')
  const track = tracks.find(t => t.id === activeTrack)
  const completed = track.lessons.filter(l => l.completed).length
  const pct = Math.round((completed / track.lessons.length) * 100)
  const nextLesson = track.lessons.find(l => !l.completed)

  return (
    <div style={{ background: '#060612', minHeight: '100vh', color: '#f0f0f0', fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />

      {/* NAV */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2.5rem', borderBottom: `1px solid ${border}`, background: 'rgba(6,6,18,0.9)', backdropFilter: 'blur(12px)' }}>
        <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '1.4rem', fontWeight: 700, color: accent }}>
          TechQuest 🚀
        </span>
        <button onClick={() => navigate('/dashboard')}
          style={{ background: 'transparent', border: 'none', color: '#555', cursor: 'pointer', fontSize: '0.875rem' }}
          onMouseEnter={e => e.currentTarget.style.color = '#f0f0f0'}
          onMouseLeave={e => e.currentTarget.style.color = '#555'}>
          ← Dashboard
        </button>
      </nav>

      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '7rem 2rem 4rem' }}>

        {/* Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: accent, marginBottom: '0.75rem' }}>
            Learning Tracks
          </div>
          <h1 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 700, marginBottom: '0.5rem' }}>
            Choose your track
          </h1>
          <p style={{ color: '#555', fontSize: '0.95rem' }}>
            Select a track to view your lessons and continue where you left off.
          </p>
        </div>

        {/* Track Tabs */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2.5rem' }}>
          {tracks.map(t => (
            <button key={t.id} onClick={() => setActiveTrack(t.id)}
              style={{ flex: 1, padding: '1rem', borderRadius: '10px', border: `1px solid ${activeTrack === t.id ? t.color : border}`, background: activeTrack === t.id ? `${t.color}10` : surface, color: activeTrack === t.id ? t.color : '#555', cursor: 'pointer', fontFamily: "'Fredoka', sans-serif", fontSize: '1rem', fontWeight: 600, transition: 'all 0.2s' }}>
              {t.emoji} {t.name}
            </button>
          ))}
        </div>

        {/* Track Info */}
        <div style={{ padding: '1.5rem', borderRadius: '12px', border: `1px solid ${track.color}22`, background: `${track.color}06`, marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div>
              <h2 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.3rem', color: '#f0f0f0' }}>
                {track.emoji} {track.name}
              </h2>
              <p style={{ fontSize: '0.875rem', color: '#666', maxWidth: '480px', lineHeight: 1.6 }}>
                {track.desc}
              </p>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '1.5rem', fontWeight: 700, color: track.color }}>{pct}%</div>
              <div style={{ fontSize: '0.75rem', color: '#555' }}>{completed}/{track.lessons.length} lessons</div>
            </div>
          </div>
          <div style={{ height: '6px', background: border, borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${pct}%`, background: track.color, borderRadius: '3px', transition: 'width 0.5s ease' }} />
          </div>
          {nextLesson && (
            <button onClick={() => navigate(`/lesson/${nextLesson.id}`)}
              style={{ marginTop: '1.25rem', padding: '0.7rem 1.5rem', borderRadius: '8px', border: 'none', background: track.color, color: '#060612', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 700 }}>
              Continue: {nextLesson.title} →
            </button>
          )}
          {!nextLesson && (
            <div style={{ marginTop: '1rem', fontSize: '0.875rem', color: track.color }}>
              🎉 Track complete! Well done.
            </div>
          )}
        </div>

        {/* Lesson List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          <div style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#444', marginBottom: '0.5rem' }}>
            All Lessons
          </div>
          {track.lessons.map((lesson, index) => {
            const isLocked = index > 0 && !track.lessons[index - 1].completed && !lesson.completed
            return (
              <div key={lesson.id}
                onClick={() => !isLocked && !lesson.completed && navigate(`/lesson/${lesson.id}`)}
                style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.25rem', borderRadius: '10px', border: `1px solid ${lesson.completed ? `${track.color}33` : border}`, background: lesson.completed ? `${track.color}06` : surface, cursor: isLocked ? 'not-allowed' : lesson.completed ? 'default' : 'pointer', opacity: isLocked ? 0.35 : 1, transition: 'all 0.2s' }}
                onMouseEnter={e => { if (!isLocked && !lesson.completed) e.currentTarget.style.borderColor = track.color }}
                onMouseLeave={e => { if (!lesson.completed) e.currentTarget.style.borderColor = border }}>

                {/* Status icon */}
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', border: `1px solid ${lesson.completed ? track.color : isLocked ? border : border}`, background: lesson.completed ? `${track.color}20` : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', flexShrink: 0, color: lesson.completed ? track.color : '#555' }}>
                  {lesson.completed ? '✓' : isLocked ? '🔒' : index + 1}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.95rem', fontWeight: 500, color: lesson.completed ? '#888' : '#f0f0f0', marginBottom: '0.15rem' }}>
                    {lesson.title}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#444' }}>
                    {lesson.completed ? 'Completed' : isLocked ? 'Complete previous lesson to unlock' : 'Not started'}
                  </div>
                </div>

                <div style={{ fontSize: '0.8rem', color: lesson.completed ? track.color : '#444', fontWeight: lesson.completed ? 600 : 400 }}>
                  {lesson.completed ? `+${lesson.points} pts` : `${lesson.points} pts`}
                </div>
              </div>
            )
          })}
        </div>

      </main>
    </div>
  )
}