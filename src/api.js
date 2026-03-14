const BASE_URL = 'http://localhost:3001/api'

function getToken() {
  return localStorage.getItem('token')
}

async function request(path, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  const token = getToken()
  if (token) headers['Authorization'] = `Bearer ${token}`

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  })

  const data = await res.json()

  if (!res.ok) throw new Error(data.error || 'Something went wrong')

  return data
}

export const api = {
  // Auth
  register: (body) => request('/auth/register', { method: 'POST', body: JSON.stringify(body) }),
  login:    (body) => request('/auth/login',    { method: 'POST', body: JSON.stringify(body) }),

  // User
  getUser:  () => request('/user'),
  updateUser: (body) => request('/user', { method: 'PUT', body: JSON.stringify(body) }),

  // Progress
  getProgress:  () => request('/progress'),
  saveProgress: (body) => request('/progress', { method: 'POST', body: JSON.stringify(body) }),
}