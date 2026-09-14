const API_BASE_URL = 'http://localhost:5000/api'

export const getToken = () => localStorage.getItem('cc_token')
export const setToken = (token) => localStorage.setItem('cc_token', token)
export const removeToken = () => localStorage.removeItem('cc_token')

export const apiClient = async (endpoint, options = {}) => {
  const token = getToken()
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {})
  }

  const config = {
    ...options,
    headers
  }

  if (options.body && typeof options.body === 'object' && !(options.body instanceof FormData)) {
    config.body = JSON.stringify(options.body)
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config)
    if (response.status === 204) {
      return null
    }

    const data = await response.json()
    if (!response.ok) {
      const errorMsg = data?.detail || data?.message || 'API request failed'
      throw new Error(errorMsg)
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
