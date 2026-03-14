import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const tracks = [
  {
    icon: '⌨️',
    title: 'Scripting',
    subtitle: 'Python & Bash',
    desc: 'Learn to automate tasks, write your first scripts, and think like a developer.',
    color: '#4af0c8',
    lessons: 24,
  },
  {
    icon: '🌐',
    title: 'Networking',
    subtitle: 'Fundamentals',
    desc: 'Understand how the internet works, from IP addresses to protocols and beyond.',
    color: '#f0a84a',
    lessons: 20,
  },
]

const steps = [
  { number: '01', title: 'Pick Your Track', desc: 'Choose Scripting, Networking, or both. Learn at your own pace.' },
  { number: '02', title: 'Set Your Goal', desc: 'Commit to 10, 30, or 60 minutes a day. Every minute counts.' },
  { number: '03', title: 'Earn Rewards', desc: 'Complete lessons, collect badges, and earn vouchers toward certification exams.' },
]

const tiers = [
  { name: 'Explorer', age: 'Ages 8–12', emoji: '🚀', desc: 'Visual, fun, and beginner friendly' },
  { name: 'Builder',  age: 'Ages 13–17', emoji: '🔧', desc: 'Practical and project-based' },
  { name: 'Pro',      age: 'Adult',      emoji: '⚡', desc: 'Direct and exam-focused' },
]

export default function Landing() {
  const navigate = useNavigate()
  const heroRef = useRef(null)

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const items = el.querySelectorAll('[data-reveal]')
    items.forEach((item, i) => {
      item.style.opacity = '0'
      item.style.transform = 'translateY(28px)'
      item.style.transition = `opacity 0.6s ease ${i * 0.15}s, transform 0.6s ease ${i * 0.15}s`
      requestAnimationFrame(() => {
        item.style.opacity = '1'
        item.style.transform = 'translateY(0)'
      })
    })
  }, [])

  return (
    <div style={{ background: '#060612', minHeight: '100vh', color: '#f0f0f0', fontFamily: "'DM Sans', sans-serif", overflowX: 'hidden' }}>

      {/* Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />

      {/* NAV */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(6,6,18,0.85)', backdropFilter: 'blur(12px)' }}>
        <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '1.5rem', fontWeight: 700, color: '#4af0c8', letterSpacing: '-0.01em' }}>
          TechQuest 🚀
        </span>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={() => navigate('/login')} style={{ padding: '0.5rem 1.25rem', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.15)', background: 'transparent', color: '#f0f0f0', cursor: 'pointer', fontSize: '0.875rem' }}>
            Log In
          </button>
          <button onClick={() => navigate('/register')} style={{ padding: '0.5rem 1.25rem', borderRadius: '6px', border: 'none', background: '#4af0c8', color: '#060612', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 600 }}>
            Get Started
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section ref={heroRef} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '8rem 2rem 4rem', position: 'relative' }}>

        {/* Background glow */}
        <div style={{ position: 'absolute', width: '700px', height: '700px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(74,240,200,0.07) 0%, transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }} />

        {/* Dot grid */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)', backgroundSize: '32px 32px', maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)', pointerEvents: 'none' }} />

        <div data-reveal style={{ display: 'inline-block', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#4af0c8', border: '1px solid rgba(74,240,200,0.3)', padding: '0.3rem 1rem', borderRadius: '20px', marginBottom: '1.5rem' }}>
          Free to learn · Earn real rewards
        </div>

        <h1 data-reveal style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 'clamp(3rem, 9vw, 6.5rem)', fontWeight: 700, lineHeight: 1, letterSpacing: '-0.02em', marginBottom: '1.5rem', maxWidth: '800px' }}>
          Learn Tech.<br />
          <span style={{ color: '#4af0c8' }}>Level Up.</span><br />
          Get Certified.
        </h1>

        <p data-reveal style={{ fontSize: '1.1rem', color: '#888', maxWidth: '480px', marginBottom: '2.5rem', lineHeight: 1.7 }}>
          A Duolingo-style learning platform for beginners of all ages. Master scripting and networking fundamentals — one lesson at a time.
        </p>

        <div data-reveal style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button onClick={() => navigate('/register')} style={{ padding: '0.875rem 2rem', borderRadius: '8px', border: 'none', background: '#4af0c8', color: '#060612', cursor: 'pointer', fontSize: '1rem', fontWeight: 700, transition: 'transform 0.2s' }}
            onMouseEnter={e => e.target.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.target.style.transform = 'translateY(0)'}>
            Start Learning Free →
          </button>
          <button onClick={() => navigate('/login')} style={{ padding: '0.875rem 2rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)', background: 'transparent', color: '#f0f0f0', cursor: 'pointer', fontSize: '1rem' }}>
            I have an account
          </button>
        </div>
      </section>

      {/* TIERS */}
      <section style={{ padding: '5rem 2rem', maxWidth: '900px', margin: '0 auto' }}>
        <p style={{ textAlign: 'center', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#4af0c8', marginBottom: '1rem' }}>Who is it for?</p>
        <h2 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 700, textAlign: 'center', marginBottom: '3rem' }}>
          Built for every level
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          {tiers.map(t => (
            <div key={t.name} style={{ padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)', textAlign: 'center', transition: 'border-color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(74,240,200,0.3)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{t.emoji}</div>
              <div style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.25rem' }}>{t.name}</div>
              <div style={{ fontSize: '0.78rem', color: '#4af0c8', marginBottom: '0.75rem', letterSpacing: '0.05em' }}>{t.age}</div>
              <div style={{ fontSize: '0.875rem', color: '#666' }}>{t.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: '5rem 2rem', maxWidth: '900px', margin: '0 auto' }}>
        <p style={{ textAlign: 'center', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#f0a84a', marginBottom: '1rem' }}>The process</p>
        <h2 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 700, textAlign: 'center', marginBottom: '3rem' }}>
          How TechQuest works
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {steps.map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
              <div style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '2rem', fontWeight: 700, color: '#f0a84a', lineHeight: 1, flexShrink: 0 }}>{s.number}</div>
              <div>
                <div style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.4rem' }}>{s.title}</div>
                <div style={{ fontSize: '0.9rem', color: '#666', lineHeight: 1.6 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TRACKS */}
      <section style={{ padding: '5rem 2rem', maxWidth: '900px', margin: '0 auto' }}>
        <p style={{ textAlign: 'center', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#4af0c8', marginBottom: '1rem' }}>What you'll learn</p>
        <h2 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 700, textAlign: 'center', marginBottom: '3rem' }}>
          Choose your track
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {tracks.map(t => (
            <div key={t.title} style={{ padding: '2rem', borderRadius: '12px', border: `1px solid ${t.color}22`, background: `${t.color}08`, transition: 'transform 0.2s, box-shadow 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 20px 40px ${t.color}15` }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{t.icon}</div>
              <div style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.25rem' }}>{t.title}</div>
              <div style={{ fontSize: '0.78rem', color: t.color, marginBottom: '1rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{t.subtitle}</div>
              <p style={{ fontSize: '0.9rem', color: '#666', lineHeight: 1.6, marginBottom: '1.5rem' }}>{t.desc}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.78rem', color: '#555' }}>{t.lessons} lessons</span>
                <button onClick={() => navigate('/register')} style={{ padding: '0.4rem 1rem', borderRadius: '6px', border: `1px solid ${t.color}44`, background: 'transparent', color: t.color, cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}>
                  Start →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA FOOTER */}
      <section style={{ padding: '6rem 2rem', textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, marginBottom: '1rem' }}>
          Ready to start your<br /><span style={{ color: '#4af0c8' }}>tech journey?</span>
        </h2>
        <p style={{ color: '#666', marginBottom: '2rem', fontSize: '1rem' }}>Free to start. No credit card required.</p>
        <button onClick={() => navigate('/register')} style={{ padding: '1rem 2.5rem', borderRadius: '8px', border: 'none', background: '#4af0c8', color: '#060612', cursor: 'pointer', fontSize: '1.1rem', fontWeight: 700 }}>
          Create Free Account →
        </button>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '1.5rem 2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
        <span style={{ fontFamily: "'Fredoka', sans-serif", color: '#4af0c8', fontWeight: 700 }}>TechQuest 🚀</span>
        <span style={{ fontSize: '0.8rem', color: '#444' }}>© 2026 · Built for learners everywhere</span>
      </footer>

    </div>
  )
}