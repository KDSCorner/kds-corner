/* eslint-disable @next/next/no-img-element */
'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useAuth } from '../../lib/auth-context'
import { useRouter } from 'next/navigation'
import OnboardingSlider from '../../components/OnboardingSlider'
import styles from './login.module.css'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const { signIn, user, userRole } = useAuth()
  const router = useRouter()
  
  // Redirect if already logged in
  useEffect(() => {
    if (user && userRole) {
      if (userRole === 'admin') {
        router.push('/admin/dashboard')
      } else if (userRole === 'seller') {
        router.push('/seller/dashboard')
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
    <div className={styles.loginContainer}>
      {/* Left side - Login Form */}
      <div className={styles.loginLeft}>
        <div className={styles.loginFormWrapper}>
          <div className={styles.loginHeader}>
            <h1 className={styles.loginTitle}>Welcome back!</h1>
            <p className={styles.loginSubtitle}>
              Simplify your workflow and boost your productivity
              <br />
              with <strong>KDS Corner</strong>. Get started for free.
            </p>
          </div>

          {error && (
            <div className={styles.errorMessage}>
              <i className="fas fa-exclamation-triangle"></i>
              <span>{error}</span>
            </div>
          )}

          <form className={styles.loginForm} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <input 
                type="email" 
                name="email" 
                placeholder="Username" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.formInput}
                required 
              />
            </div>
            
            <div className={`${styles.inputGroup} ${styles.passwordGroup}`}>
              <input 
                type={showPassword ? "text" : "password"}
                name="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.formInput}
                required 
              />
              <button 
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>

            <div className={styles.loginOptions}>
              <label className={styles.rememberCheckbox}>
                <input type="checkbox" />
                <span className="checkmark"></span>
                <span>Remember me</span>
              </label>
              <Link href="#" className={styles.forgotLink}>Forgot Password?</Link>
            </div>

            <button type="submit" className={styles.loginButton} disabled={loading}>
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  <span>Logging in...</span>
                </>
              ) : (
                'Login'
              )}
            </button>

            <div className={styles.divider}>
              <span>or continue with</span>
            </div>

            <div className={styles.socialLogin}>
              <button type="button" className={`${styles.socialButton} ${styles.google}`}>
                <i className="fab fa-google"></i>
              </button>
              <button type="button" className={`${styles.socialButton} ${styles.apple}`}>
                <i className="fab fa-apple"></i>
              </button>
              <button type="button" className={`${styles.socialButton} ${styles.facebook}`}>
                <i className="fab fa-facebook-f"></i>
              </button>
            </div>

            <div className={styles.registerLink}>
              <span>Not a member? </span>
              <Link href="/register">Register now</Link>
            </div>
          </form>
        </div>
      </div>

      {/* Right side - Onboarding Slider */}
      <div className={styles.loginRight}>
        <OnboardingSlider autoPlayInterval={5000} />
      </div>
    </div>
  )
}
