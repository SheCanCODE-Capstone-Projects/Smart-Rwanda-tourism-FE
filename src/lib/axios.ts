import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string || 'http://localhost:8080',
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
})

// Attach token to every request
api.interceptors.request.use((config: any) => {
  const token = localStorage.getItem('auth_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Handle 401 globally
api.interceptors.response.use(
  (res: any) => res,
  (err: any) => {
    if (err.response?.status === 401) {
      const onAdminRoute = window.location.pathname.startsWith('/admin')
      if (onAdminRoute) {
        localStorage.removeItem('auth_token')
        localStorage.removeItem('admin_user')
        window.location.href = '/admin/login'
      } else {
        localStorage.removeItem('auth_token')
        localStorage.removeItem('rw_session_user')
        window.dispatchEvent(new Event('rw-auth-change'))
        window.location.href = '/login'
      }
    }
    return Promise.reject(err)
  }
)

export default api
