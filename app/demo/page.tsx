'use client'

import { useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db } from '../../lib/firebase'

export default function DemoPage() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const createTestUser = async (email: string, password: string, name: string, role: 'admin' | 'buyer') => {
    try {
      setLoading(true)
      setMessage(`Creating ${role} user...`)
      
      const result = await createUserWithEmailAndPassword(auth, email, password)
      
      if (result.user) {
        await updateProfile(result.user, { displayName: name })
        
        await setDoc(doc(db, 'users', result.user.uid), {
          name: name,
          email: email,
          role: role,
          createdAt: new Date().toISOString(),
        })
        
        setMessage(`✅ ${role} user created successfully: ${email}`)
      }
    } catch (error: any) {
      setMessage(`❌ Error creating ${role} user: ${error.message}`)
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const createAdminUser = () => {
    createTestUser('admin@test.com', 'admin123', 'Admin User', 'admin')
  }

  const createBuyerUser = () => {
    createTestUser('buyer@test.com', 'buyer123', 'Buyer User', 'buyer')
  }

  return (
    <div style={{ 
      padding: '40px', 
      maxWidth: '600px', 
      margin: '0 auto',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h1 style={{ marginBottom: '30px', textAlign: 'center' }}>Demo Test Users</h1>
      
      <div style={{ 
        backgroundColor: '#f8fafc',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '30px',
        border: '1px solid #e2e8f0'
      }}>
        <h3 style={{ margin: '0 0 15px 0' }}>Test Credentials:</h3>
        <div style={{ marginBottom: '10px' }}>
          <strong>Admin:</strong> admin@test.com / admin123
        </div>
        <div>
          <strong>Buyer:</strong> buyer@test.com / buyer123
        </div>
      </div>

      <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
        <button
          onClick={createAdminUser}
          disabled={loading}
          style={{
            flex: 1,
            padding: '12px 20px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            opacity: loading ? 0.6 : 1
          }}
        >
          Create Admin User
        </button>
        
        <button
          onClick={createBuyerUser}
          disabled={loading}
          style={{
            flex: 1,
            padding: '12px 20px',
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            opacity: loading ? 0.6 : 1
          }}
        >
          Create Buyer User
        </button>
      </div>

      {message && (
        <div style={{
          padding: '12px',
          backgroundColor: message.includes('❌') ? '#fef2f2' : '#f0fdf4',
          color: message.includes('❌') ? '#dc2626' : '#166534',
          borderRadius: '6px',
          border: `1px solid ${message.includes('❌') ? '#fecaca' : '#bbf7d0'}`,
          marginBottom: '20px'
        }}>
          {message}
        </div>
      )}

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <a href="/login" style={{
          display: 'inline-block',
          padding: '10px 20px',
          backgroundColor: '#6b7280',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '6px'
        }}>
          Go to Login
        </a>
      </div>
    </div>
  )
}
