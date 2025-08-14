/* eslint-disable @next/next/no-img-element */
'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useAuth } from '../../lib/auth-context'
import { useRouter } from 'next/navigation'
import OnboardingSlider from '../../components/OnboardingSlider'
import styles from './register.module.css'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'admin' | 'buyer' | 'seller'>('buyer')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [countdown, setCountdown] = useState(0)
  const [showPassword, setShowPassword] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const { signUp } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    
    if (!acceptTerms) {
      setError('Please accept the terms and conditions')
      return
    }
    
    setLoading(true)

    try {
      await signUp(email, password, name, role)
      // Show success message
      setSuccess('🎉 Registration successful! Please login to continue.')
      setCountdown(3)
      
      // Start countdown timer
      let timeLeft = 3
      const timer = setInterval(() => {
        timeLeft -= 1
        setCountdown(timeLeft)
        
        if (timeLeft <= 0) {
          clearInterval(timer)
          router.push('/login')
        }
      }, 1000)
    } catch (error: any) {
      setError(error.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.registerContainer}>
      {/* Left side - Registration Form */}
      <div className={styles.registerLeft}>
        <div className={styles.registerFormWrapper}>
          <div className={styles.registerHeader}>
            <h1 className={styles.registerTitle}>Create your account</h1>
            <p className={styles.registerSubtitle}>
              Join <strong>KDS Corner</strong> today and start boosting your productivity
              <br />
              with our powerful workflow tools.
            </p>
          </div>

          {error && (
            <div className={styles.errorMessage}>
              <i className="fas fa-exclamation-triangle"></i>
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className={styles.successMessage}>
              <i className="fas fa-check-circle"></i>
              <div>
                <div>{success}</div>
                {countdown > 0 && (
                  <div style={{ 
                    fontSize: '12px', 
                    marginTop: '4px',
                    opacity: 0.8,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <i className="fas fa-clock"></i>
                    Redirecting in {countdown}s...
                  </div>
                )}
              </div>
            </div>
          )}

          <form className={styles.registerForm} onSubmit={handleSubmit} style={success ? {opacity: 0.7, pointerEvents: 'none'} : {}}>
            <div className={styles.inputGroup}>
              <input 
                type="text" 
                name="name" 
                placeholder="Full Name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={styles.formInput}
                required 
              />
            </div>
            
            <div className={styles.inputGroup}>
              <input 
                type="email" 
                name="email" 
                placeholder="Email Address" 
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

            <div className={styles.inputGroup}>
              <select 
                name="role" 
                value={role}
                onChange={(e) => setRole(e.target.value as 'admin' | 'buyer' | 'seller')}
                className={styles.formSelect}
                required
              >
                <option value="buyer">🛒 Buyer Account - Shop products</option>
                <option value="seller">🏪 Seller Account - Sell your products</option>
                <option value="admin">👑 Admin Account - Manage platform</option>
              </select>
              <i className={`fas fa-user-tag ${styles.selectIcon}`}></i>
            </div>

            <div className={styles.registerOptions}>
              <label className={styles.termsCheckbox}>
                <input 
                  type="checkbox" 
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                />
                <span className="checkmark"></span>
                <span>
                  I agree to the <Link href="#">Terms of Service</Link> and{' '}
                  <Link href="#">Privacy Policy</Link>
                </span>
              </label>
            </div>

            <button type="submit" className={styles.registerButton} disabled={loading || !acceptTerms}>
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  <span>Creating account...</span>
                </>
              ) : (
                'Create Account'
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

            <div className={styles.loginLink}>
              <span>Already have an account? </span>
              <Link href="/login">Sign in</Link>
            </div>
          </form>
        </div>
      </div>

      {/* Right side - Onboarding Slider */}
      <div className={styles.registerRight}>
        <OnboardingSlider autoPlayInterval={4500} />
      </div>
    </div>
  )
}
