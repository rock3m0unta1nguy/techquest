import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const accent = '#4af0c8'
const orange = '#f0a84a'
const border = 'rgba(255,255,255,0.08)'
const surface = 'rgba(255,255,255,0.03)'

// Mock lesson data — will come from backend later
const lessons = {
  3: {
    id: 3,
    title: 'Variables in Python',
    track: 'Scripting',
    trackColor: accent,
    points: 30,
    concept: {
      heading: 'What is a variable?',
      explanation: `A variable is a named container that stores a value. Think of it like a labeled box — you put something inside it, give it a name, and refer to it later by that name.

In Python, creating a variable is as simple as writing a name, an equals sign, and a value. Python figures out the type automatically.`,
      examples: [
        { code: `name = "Alex"`,         comment: '# stores a string (text)' },
        { code: `age = 14`,              comment: '# stores a number' },
        { code: `is_logged_in = True`,   comment: '# stores a boolean (True/False)' },
        { code: `print(name)`,           comment: '# outputs: Alex' },
      ],
      tip: '💡 Variable names should be lowercase with underscores for spaces. Example: user_name, not UserName or username.',
    },
    practice: {
      heading: 'Fill in the blank',
      instructions: 'Complete the code to store your name in a variable called "username" and print it.',
      lines: [
        { prefix: 'username', editable: false, value: '' },
        { prefix: '=', editable: false, value: '' },
        { prefix: '', editable: true, placeholder: 'type your name here in quotes...', key: 'answer' },
        { prefix: 'print(username)', editable: false, value: '' },
      ],
      hint: 'Remember: text values need to be wrapped in quotes. Example: "Alex"',
      successMessage: 'Nice work! That\'s a valid Python variable assignment. 🎉',
    },
    quiz: [
      {
        id: 1,
        question: 'Which of the following correctly creates a variable in Python?',
        options: [
          'var name = "Alex"',
          'name = "Alex"',
          'string name = "Alex"',
          'name := "Alex"',
        ],
        correct: 1,
        explanation: 'Python doesn\'t need a keyword like "var" or a type like "string". Just write the name, equals sign, and value.',
      },
      {
        id: 2,
        question: 'What will print(score) output if score = 42?',
        options: ['score', '"42"', '42', 'None'],
        correct: 2,
        explanation: 'print() outputs the value stored in the variable, which is the number 42.',
      },
      {
        id: 3,
        question: 'Which variable name follows Python best practices?',
        options: ['UserName', 'username', 'user-name', 'UserName99'],
        correct: 1,
        explanation: 'Python convention (PEP 8) recommends lowercase with underscores for variable names.',
      },
    ],
  },
  5: {
    id: 5,
    title: 'How DNS Works',
    track: 'Networking',
    trackColor: orange,
    points: 25,
    concept: {
      heading: 'The internet\'s phone book',
      explanation: `DNS stands for Domain Name System. It's what converts human-readable domain names like "google.com" into IP addresses like "142.250.80.46" that computers use to find each other.

When you type a website address into your browser, a DNS lookup happens behind the scenes in milliseconds — checking a chain of servers until it finds the right IP address.`,
      examples: [
        { code: `google.com`,        comment: '→ 142.250.80.46' },
        { code: `github.com`,        comment: '→ 140.82.114.4'  },
        { code: `localhost`,         comment: '→ 127.0.0.1 (your own machine)' },
        { code: `nslookup google.com`, comment: '# terminal command to look up DNS' },
      ],
      tip: '💡 Think of DNS like a contact list on your phone. You search "Mom" and your phone finds the number — you never memorize the digits.',
    },
    practice: {
      heading: 'Match the concept',
      instructions: 'What does DNS convert domain names into?',
      lines: [
        { prefix: 'DNS converts', editable: false, value: '' },
        { prefix: '"google.com"  →', editable: true, placeholder: 'enter the type of address...', key: 'answer' },
      ],
      hint: 'Think about what computers use to find each other on a network. It\'s a numeric address.',
      successMessage: 'Correct! DNS translates domain names into IP addresses. 🌐',
    },
    quiz: [
      {
        id: 1,
        question: 'What does DNS stand for?',
        options: [
          'Data Network System',
          'Domain Name System',
          'Digital Node Service',
          'Direct Network Signal',
        ],
        correct: 1,
        explanation: 'DNS stands for Domain Name System — the protocol responsible for translating domain names to IP addresses.',
      },
      {
        id: 2,
        question: 'What does a DNS server return when you look up "google.com"?',
        options: ['The website HTML', 'A username', 'An IP address', 'A password'],
        correct: 2,
        explanation: 'DNS returns an IP address, which your browser then uses to connect to the correct server.',
      },
      {
        id: 3,
        question: 'What IP address always points to your own machine?',
        options: ['192.168.1.1', '0.0.0.0', '255.255.255.255', '127.0.0.1'],
        correct: 3,
        explanation: '127.0.0.1 is the loopback address, always referring to your own machine. Also known as "localhost".',
      },
    ],
  },
}

export default function Lesson() {
  const { id } = useParams()
  const navigate = useNavigate()
  const lesson = lessons[parseInt(id)]

  const [phase, setPhase] = useState('concept')   // concept | practice | quiz | complete
  const [practiceInput, setPracticeInput] = useState('')
  const [practiceChecked, setPracticeChecked] = useState(false)
  const [quizIndex, setQuizIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [quizAnswered, setQuizAnswered] = useState(false)
  const [score, setScore] = useState(0)

  if (!lesson) {
    return (
      <div style={{ background: '#060612', minHeight: '100vh', color: '#f0f0f0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Sans', sans-serif" }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
        <h2 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '1.5rem', marginBottom: '0.5rem' }}>Lesson not found</h2>
        <p style={{ color: '#555', marginBottom: '1.5rem' }}>This lesson doesn't exist yet.</p>
        <button onClick={() => navigate('/dashboard?tab=lessons')}
          style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', border: 'none', background: accent, color: '#060612', cursor: 'pointer', fontWeight: 700 }}>
          Back to Dashboard
        </button>
      </div>
    )
  }

  const currentQuiz = lesson.quiz[quizIndex]
  const totalPhases = 3
  const phaseIndex = { concept: 1, practice: 2, quiz: 3, complete: 3 }[phase]
  const progressPct = (phaseIndex / totalPhases) * 100

  function checkPractice() {
    setPracticeChecked(true)
  }

  function submitQuizAnswer() {
    if (selectedOption === null) return
    setQuizAnswered(true)
    if (selectedOption === currentQuiz.correct) {
      setScore(s => s + 1)
    }
  }

  function nextQuiz() {
    if (quizIndex + 1 < lesson.quiz.length) {
      setQuizIndex(i => i + 1)
      setSelectedOption(null)
      setQuizAnswered(false)
    } else {
      setPhase('complete')
    }
  }

  const earnedPoints = Math.round((score / lesson.quiz.length) * lesson.points)

  return (
    <div style={{ background: '#060612', minHeight: '100vh', color: '#f0f0f0', fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />

      {/* NAV */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2.5rem', borderBottom: `1px solid ${border}`, background: 'rgba(6,6,18,0.9)', backdropFilter: 'blur(12px)' }}>
        <button onClick={() => navigate('/dashboard?tab=lessons')}
          style={{ background: 'transparent', border: 'none', color: '#555', cursor: 'pointer', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          onMouseEnter={e => e.currentTarget.style.color = '#f0f0f0'}
          onMouseLeave={e => e.currentTarget.style.color = '#555'}>
          ← Dashboard
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '0.78rem', color: lesson.trackColor, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{lesson.track}</span>
          <span style={{ fontSize: '0.78rem', color: '#444' }}>·</span>
          <span style={{ fontSize: '0.78rem', color: '#555' }}>+{lesson.points} pts available</span>
        </div>
      </nav>

      {/* PROGRESS BAR */}
      <div style={{ position: 'fixed', top: '57px', left: 0, right: 0, height: '3px', background: border, zIndex: 99 }}>
        <div style={{ height: '100%', width: `${progressPct}%`, background: lesson.trackColor, transition: 'width 0.5s ease' }} />
      </div>

      {/* CONTENT */}
      <main style={{ maxWidth: '680px', margin: '0 auto', padding: '7rem 2rem 4rem' }}>

        {/* ── PHASE: CONCEPT ── */}
        {phase === 'concept' && (
          <div>
            <div style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: lesson.trackColor, marginBottom: '0.75rem' }}>
              Concept
            </div>
            <h1 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 700, marginBottom: '2rem' }}>
              {lesson.title}
            </h1>

            <div style={{ fontSize: '0.95rem', color: '#aaa', lineHeight: 1.8, marginBottom: '2rem', whiteSpace: 'pre-line' }}>
              {lesson.concept.explanation}
            </div>

            {/* Code examples */}
            <div style={{ background: '#0d0d1f', border: `1px solid ${border}`, borderRadius: '10px', padding: '1.5rem', marginBottom: '1.5rem', fontFamily: 'monospace' }}>
              <div style={{ fontSize: '0.7rem', color: '#444', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>Examples</div>
              {lesson.concept.examples.map((ex, i) => (
                <div key={i} style={{ display: 'flex', gap: '1rem', marginBottom: '0.6rem', fontSize: '0.9rem' }}>
                  <span style={{ color: lesson.trackColor }}>{ex.code}</span>
                  <span style={{ color: '#444' }}>{ex.comment}</span>
                </div>
              ))}
            </div>

            {/* Tip */}
            <div style={{ padding: '1rem 1.25rem', borderRadius: '8px', background: `${lesson.trackColor}10`, border: `1px solid ${lesson.trackColor}22`, fontSize: '0.875rem', color: '#888', lineHeight: 1.6, marginBottom: '2.5rem' }}>
              {lesson.concept.tip}
            </div>

            <button onClick={() => setPhase('practice')}
              style={{ width: '100%', padding: '0.875rem', borderRadius: '8px', border: 'none', background: lesson.trackColor, color: '#060612', cursor: 'pointer', fontSize: '1rem', fontWeight: 700 }}>
              Got it — let's practice →
            </button>
          </div>
        )}

        {/* ── PHASE: PRACTICE ── */}
        {phase === 'practice' && (
          <div>
            <div style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: lesson.trackColor, marginBottom: '0.75rem' }}>
              Practice
            </div>
            <h2 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              {lesson.practice.heading}
            </h2>
            <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '2rem', lineHeight: 1.6 }}>
              {lesson.practice.instructions}
            </p>

            {/* Code block with input */}
            <div style={{ background: '#0d0d1f', border: `1px solid ${border}`, borderRadius: '10px', padding: '1.5rem', marginBottom: '1rem', fontFamily: 'monospace', fontSize: '0.95rem' }}>
              {lesson.practice.lines.map((line, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  {line.prefix && <span style={{ color: '#555' }}>{line.prefix}</span>}
                  {line.editable ? (
                    <input
                      value={practiceInput}
                      onChange={e => { setPracticeInput(e.target.value); setPracticeChecked(false) }}
                      placeholder={line.placeholder}
                      disabled={practiceChecked}
                      style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: `1px solid ${practiceChecked ? lesson.trackColor : border}`, borderRadius: '4px', padding: '0.4rem 0.75rem', color: lesson.trackColor, fontFamily: 'monospace', fontSize: '0.9rem', outline: 'none' }}
                    />
                  ) : null}
                </div>
              ))}
            </div>

            {/* Hint */}
            <div style={{ fontSize: '0.8rem', color: '#555', marginBottom: '1.5rem', padding: '0.75rem 1rem', borderRadius: '6px', background: surface, border: `1px solid ${border}` }}>
              💡 {lesson.practice.hint}
            </div>

            {/* Success message */}
            {practiceChecked && (
              <div style={{ padding: '1rem 1.25rem', borderRadius: '8px', background: `${lesson.trackColor}15`, border: `1px solid ${lesson.trackColor}33`, color: lesson.trackColor, fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                {lesson.practice.successMessage}
              </div>
            )}

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={() => setPhase('concept')}
                style={{ flex: 1, padding: '0.875rem', borderRadius: '8px', border: `1px solid ${border}`, background: 'transparent', color: '#f0f0f0', cursor: 'pointer', fontSize: '0.9rem' }}>
                ← Review
              </button>
              {!practiceChecked ? (
                <button onClick={checkPractice} disabled={!practiceInput.trim()}
                  style={{ flex: 2, padding: '0.875rem', borderRadius: '8px', border: 'none', background: practiceInput.trim() ? lesson.trackColor : '#222', color: practiceInput.trim() ? '#060612' : '#444', cursor: practiceInput.trim() ? 'pointer' : 'default', fontSize: '0.9rem', fontWeight: 700 }}>
                  Check Answer
                </button>
              ) : (
                <button onClick={() => setPhase('quiz')}
                  style={{ flex: 2, padding: '0.875rem', borderRadius: '8px', border: 'none', background: lesson.trackColor, color: '#060612', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 700 }}>
                  On to the quiz →
                </button>
              )}
            </div>
          </div>
        )}

        {/* ── PHASE: QUIZ ── */}
        {phase === 'quiz' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <div style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: lesson.trackColor }}>
                Quiz
              </div>
              <div style={{ fontSize: '0.8rem', color: '#555' }}>
                {quizIndex + 1} / {lesson.quiz.length}
              </div>
            </div>

            <h2 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '1.5rem', fontWeight: 700, marginBottom: '2rem', lineHeight: 1.3, color: '#f0f0f0' }}>              
              {currentQuiz.question}
            </h2>

            {/* Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              {currentQuiz.options.map((opt, i) => {
                let borderColor = border
                let bgColor = surface
                let textColor = '#f0f0f0'
                if (quizAnswered) {
                  if (i === currentQuiz.correct) { borderColor = accent; bgColor = `${accent}15`; textColor = accent }
                  else if (i === selectedOption) { borderColor = '#f05050'; bgColor = 'rgba(240,80,80,0.1)'; textColor = '#f05050' }
                } else if (i === selectedOption) {
                  borderColor = lesson.trackColor
                  bgColor = `${lesson.trackColor}10`
                }
                return (
                  <div key={i} onClick={() => !quizAnswered && setSelectedOption(i)}
                    style={{ padding: '1rem 1.25rem', borderRadius: '10px', border: `1px solid ${borderColor}`, background: bgColor, color: textColor, cursor: quizAnswered ? 'default' : 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '26px', height: '26px', borderRadius: '50%', border: `1px solid ${borderColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', flexShrink: 0, fontFamily: "'Fredoka', sans-serif" }}>
                      {quizAnswered && i === currentQuiz.correct ? '✓' : quizAnswered && i === selectedOption ? '✗' : String.fromCharCode(65 + i)}
                    </div>
                    <span style={{ fontSize: '0.95rem', fontFamily: i === selectedOption || quizAnswered ? 'inherit' : 'monospace' }}>{opt}</span>
                  </div>
                )
              })}
            </div>

            {/* Explanation after answer */}
            {quizAnswered && (
              <div style={{ padding: '1rem 1.25rem', borderRadius: '8px', background: `${accent}10`, border: `1px solid ${accent}22`, fontSize: '0.875rem', color: '#aaa', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                <span style={{ color: accent, fontWeight: 600 }}>Explanation: </span>
                {currentQuiz.explanation}
              </div>
            )}

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {!quizAnswered ? (
                <button onClick={submitQuizAnswer} disabled={selectedOption === null}
                  style={{ width: '100%', padding: '0.875rem', borderRadius: '8px', border: 'none', background: selectedOption !== null ? lesson.trackColor : '#222', color: selectedOption !== null ? '#060612' : '#444', cursor: selectedOption !== null ? 'pointer' : 'default', fontSize: '0.95rem', fontWeight: 700 }}>
                  Submit Answer
                </button>
              ) : (
                <button onClick={nextQuiz}
                  style={{ width: '100%', padding: '0.875rem', borderRadius: '8px', border: 'none', background: lesson.trackColor, color: '#060612', cursor: 'pointer', fontSize: '0.95rem', fontWeight: 700 }}>
                  {quizIndex + 1 < lesson.quiz.length ? 'Next Question →' : 'See Results →'}
                </button>
              )}
            </div>
          </div>
        )}

        {/* ── PHASE: COMPLETE ── */}
        {phase === 'complete' && (
          <div style={{ textAlign: 'center', paddingTop: '3rem' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
              {score === lesson.quiz.length ? '🏆' : score >= lesson.quiz.length / 2 ? '⭐' : '📚'}
            </div>
            <h2 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              {score === lesson.quiz.length ? 'Perfect score!' : score >= lesson.quiz.length / 2 ? 'Nice work!' : 'Keep practicing!'}
            </h2>
            <p style={{ color: '#666', marginBottom: '2.5rem', fontSize: '0.95rem' }}>
              You got {score} out of {lesson.quiz.length} questions correct.
            </p>

            {/* Score card */}
            <div style={{ display: 'inline-flex', flexDirection: 'column', gap: '1rem', padding: '2rem 3rem', borderRadius: '16px', border: `1px solid ${lesson.trackColor}33`, background: `${lesson.trackColor}08`, marginBottom: '2.5rem', minWidth: '260px' }}>
              <div>
                <div style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '3rem', fontWeight: 700, color: lesson.trackColor, lineHeight: 1 }}>
                  +{earnedPoints}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#555' }}>points earned</div>
              </div>
              <div style={{ height: '1px', background: border }} />
              <div style={{ fontSize: '0.875rem', color: '#666' }}>
                {score}/{lesson.quiz.length} correct · {lesson.track} track
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '320px', margin: '0 auto' }}>
              <button onClick={() => navigate('/dashboard?tab=lessons')}
                style={{ padding: '0.875rem', borderRadius: '8px', border: 'none', background: lesson.trackColor, color: '#060612', cursor: 'pointer', fontSize: '0.95rem', fontWeight: 700 }}>
                Back to Lessons
              </button>
              <button onClick={() => { setPhase('concept'); setQuizIndex(0); setScore(0); setSelectedOption(null); setQuizAnswered(false); setPracticeChecked(false); setPracticeInput('') }}
                style={{ padding: '0.875rem', borderRadius: '8px', border: `1px solid ${border}`, background: 'transparent', color: '#f0f0f0', cursor: 'pointer', fontSize: '0.95rem' }}>
                Retry Lesson
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  )
}