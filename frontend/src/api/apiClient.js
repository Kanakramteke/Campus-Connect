
const API_BASE_URL = `${(import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/+$/, '')}/api`

export const getToken = () => localStorage.getItem('cc_token')

export const setToken = (token) => localStorage.setItem('cc_token', token)

export const removeToken = () => localStorage.removeItem('cc_token')

export const apiClient = async (endpoint, options = {}) => {
  const token = getToken()

  const headers = {
    ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {})
  }

  const config = {
    ...options,
    headers
  }

  if (
    options.body &&
    typeof options.body === 'object' &&
    !(options.body instanceof FormData)
  ) {
    config.body = JSON.stringify(options.body)
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config)

    if (response.status === 204) {
      return null
    }

    const contentType = response.headers.get('content-type') || ''

    let data

    if (contentType.includes('application/json')) {
      data = await response.json()
    } else {
      const text = await response.text()

      throw new Error(
        `Expected JSON but received ${contentType || 'unknown response'} from ${endpoint}. Check your backend URL and API routes.`
      )
    }

    if (!response.ok) {
      throw new Error(
        data?.detail || data?.message || 'API request failed'
      )
    }

    return data

  } catch (err) {
    console.warn(`[API Warning] ${endpoint}:`, err.message)
    throw err
  }
}

// Upload file helper
export const uploadFile = async (file) => {
  const token = getToken()

  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: 'POST',
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: formData
  })

  if (!response.ok) {
    throw new Error('Image upload failed')
  }

  return await response.json()
}
