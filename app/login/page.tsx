/* eslint-disable @next/next/no-img-element */
'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useAuth } from '../../lib/auth-context'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { signIn, user, userRole } = useAuth()
  const router = useRouter()
  
  // Redirect if already logged in
  useEffect(() => {
    if (user && userRole) {
      if (userRole === 'admin') {
        router.push('/admin/dashboard')
      } else if (userRole === 'buyer') {
        router.push('/buyer/dashboard')
      }
    }
  }, [user, userRole, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await signIn(email, password)
      // Redirect will be handled by useEffect above
    } catch (error: any) {
      setError(error.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="auth-page">

      <div className="auth-card">
        {/* Left aside */}
        <aside className="auth-aside">
          <h2>Hello, Welcome!</h2>
          <p>Don't have an account?</p>
          <Link href="/register" className="aside-action">
            <span>Register</span>
            <i className="fas fa-arrow-right"></i>
          </Link>
        </aside>

        {/* Main form */}
        <section className="auth-main">
          <div style={{ marginBottom: '16px' }}>
            <Link href="/" className="auth-link" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <i className="fas fa-arrow-left"></i>
              <span>Back to Home</span>
            </Link>
          </div>
          <h1 className="auth-title">Login</h1>
          {error && (
            <div style={{ 
              color: '#ef4444', 
              backgroundColor: '#fef2f2', 
              padding: '12px', 
              borderRadius: '8px', 
              marginBottom: '16px',
              border: '1px solid #fecaca'
            }}>
              {error}
            </div>
          )}
          <form className="auth-form" onSubmit={handleSubmit}>
            <label className="auth-input">
              <input 
                type="email" 
                name="email" 
                placeholder="Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
              <i className="fas fa-envelope"></i>
            </label>
            <label className="auth-input">
              <input 
                type="password" 
                name="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
              <i className="fas fa-lock"></i>
            </label>

            <div className="auth-actions">
              <a href="#" className="auth-link">Forgot password?</a>
              <button type="submit" className="auth-submit" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </div>

            <div style={{ marginTop: 12, color: 'hsl(var(--text-muted))', fontSize: 14 }}>or login with social platforms</div>
            <div className="auth-social">
              <button aria-label="Login with Google"><i className="fab fa-google"></i></button>
              <button aria-label="Login with Facebook"><i className="fab fa-facebook-f"></i></button>
              <button aria-label="Login with GitHub"><i className="fab fa-github"></i></button>
              <button aria-label="Login with LinkedIn"><i className="fab fa-linkedin-in"></i></button>
            </div>
          </form>
        </section>
      </div>
    </main>
  )
}