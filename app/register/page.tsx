/* eslint-disable @next/next/no-img-element */
'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useAuth } from '../../lib/auth-context'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'admin' | 'buyer'>('buyer')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { signUp } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await signUp(email, password, name, role)
      // Redirect berdasarkan role
      if (role === 'admin') {
        router.push('/admin/dashboard')
      } else {
        router.push('/buyer/dashboard')
      }
    } catch (error: any) {
      setError(error.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="auth-page">

      <div className="auth-card">
        {/* Left form (Registration) */}
        <section className="auth-main">
          <div style={{ marginBottom: '16px' }}>
            <Link href="/" className="auth-link" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <i className="fas fa-arrow-left"></i>
              <span>Back to Home</span>
            </Link>
          </div>
          <h1 className="auth-title">Registration</h1>
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
                type="text" 
                name="name" 
                placeholder="Full Name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required 
              />
              <i className="fas fa-user"></i>
            </label>
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
            
            <label className="auth-input">
              <select 
                name="role" 
                value={role}
                onChange={(e) => setRole(e.target.value as 'admin' | 'buyer')}
                required
                style={{
                  width: '100%',
                  padding: '12px 16px 12px 44px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '16px',
                  backgroundColor: 'white',
                  appearance: 'none',
                  backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 4 5\'><path fill=\'%23666\' d=\'M2 0L0 2h4zm0 5L0 3h4z\'/></svg>")',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 12px center',
                  backgroundSize: '12px'
                }}
              >
                <option value="buyer">Buyer</option>
                <option value="admin">Admin</option>
              </select>
              <i className="fas fa-user-tag"></i>
            </label>

            <div className="auth-actions">
              <Link href="/login" className="auth-link">Already have an account?</Link>
              <button type="submit" className="auth-submit" disabled={loading}>
                {loading ? 'Registering...' : 'Register'}
              </button>
            </div>

            <div style={{ marginTop: 12, color: 'hsl(var(--text-muted))', fontSize: 14 }}>or register with social platforms</div>
            <div className="auth-social">
              <button aria-label="Register with Google"><i className="fab fa-google"></i></button>
              <button aria-label="Register with Facebook"><i className="fab fa-facebook-f"></i></button>
              <button aria-label="Register with GitHub"><i className="fab fa-github"></i></button>
              <button aria-label="Register with LinkedIn"><i className="fab fa-linkedin-in"></i></button>
            </div>
          </form>
        </section>

        {/* Right aside */}
        <aside className="auth-aside">
          <h2>Welcome Back!</h2>
          <p>Already have an account?</p>
          <Link href="/login" className="aside-action">
            <span>Login</span>
            <i className="fas fa-arrow-right"></i>
          </Link>
        </aside>
      </div>
    </main>
  )
}