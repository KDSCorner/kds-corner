'use client'

import { useEffect } from 'react'
import { useAuth } from '../../../lib/auth-context'
import { useDarkMode } from '../../../lib/dark-mode-context'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function BuyerDashboard() {
  const { user, userRole, loading, signOut } = useAuth()
  const { isDarkMode } = useDarkMode()
  const router = useRouter()

  useEffect(() => {
    if (!loading && (!user || userRole !== 'buyer')) {
      router.push('/login')
    }
  }, [user, userRole, loading, router])

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <div>Loading...</div>
      </div>
    )
  }

  if (!user || userRole !== 'buyer') {
    return null // Will redirect in useEffect
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const theme = {
    cardBg: isDarkMode ? '#1e293b' : 'white',
    cardBorder: isDarkMode ? '#374151' : '#e5e7eb',
    cardShadow: isDarkMode ? '0 1px 3px rgba(0, 0, 0, 0.3)' : '0 1px 3px rgba(0, 0, 0, 0.1)',
    textPrimary: isDarkMode ? '#e2e8f0' : '#000000',
    textSecondary: isDarkMode ? '#94a3b8' : '#6b7280',
    buttonBg: isDarkMode ? '#334155' : '#f8fafc',
    buttonBorder: isDarkMode ? '#475569' : '#e2e8f0',
    itemBg: isDarkMode ? '#334155' : '#f9fafb',
    imageBg: isDarkMode ? '#475569' : '#f3f4f6',
    imageIcon: isDarkMode ? '#64748b' : '#9ca3af',
  }

  return (
    <div style={{ 
      padding: '24px',
      minHeight: '100%'
    }}>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        {/* Stats Cards */}
        <div style={{
          backgroundColor: theme.cardBg,
          padding: '24px',
          borderRadius: '12px',
          boxShadow: theme.cardShadow,
          border: `1px solid ${theme.cardBorder}`
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              backgroundColor: '#3b82f6',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <i className="fas fa-shopping-bag" style={{ color: 'white', fontSize: '20px' }}></i>
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: theme.textPrimary }}>12</h3>
              <p style={{ margin: '4px 0 0 0', color: theme.textSecondary, fontSize: '14px' }}>Total Orders</p>
            </div>
          </div>
        </div>

        <div style={{
          backgroundColor: theme.cardBg,
          padding: '24px',
          borderRadius: '12px',
          boxShadow: theme.cardShadow,
          border: `1px solid ${theme.cardBorder}`
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              backgroundColor: '#10b981',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <i className="fas fa-heart" style={{ color: 'white', fontSize: '20px' }}></i>
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: theme.textPrimary }}>8</h3>
              <p style={{ margin: '4px 0 0 0', color: theme.textSecondary, fontSize: '14px' }}>Wishlist Items</p>
            </div>
          </div>
        </div>

        <div style={{
          backgroundColor: theme.cardBg,
          padding: '24px',
          borderRadius: '12px',
          boxShadow: theme.cardShadow,
          border: `1px solid ${theme.cardBorder}`
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              backgroundColor: '#f59e0b',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <i className="fas fa-dollar-sign" style={{ color: 'white', fontSize: '20px' }}></i>
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: theme.textPrimary }}>{formatCurrency(12340000)}</h3>
              <p style={{ margin: '4px 0 0 0', color: theme.textSecondary, fontSize: '14px' }}>Total Spent</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{
        backgroundColor: theme.cardBg,
        padding: '24px',
        borderRadius: '12px',
        boxShadow: theme.cardShadow,
        border: `1px solid ${theme.cardBorder}`,
        marginBottom: '30px'
      }}>
        <h2 style={{ margin: '0 0 20px 0', fontSize: '20px', fontWeight: 'bold', color: theme.textPrimary }}>
          Quick Actions
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px'
        }}>
          <button style={{
            padding: '16px',
            backgroundColor: theme.buttonBg,
            border: `2px solid ${theme.buttonBorder}`,
            borderRadius: '8px',
            cursor: 'pointer',
            textAlign: 'left',
            transition: 'all 0.2s',
            color: theme.textPrimary
          }}
          onMouseOver={(e) => e.currentTarget.style.borderColor = '#3b82f6'}
          onMouseOut={(e) => e.currentTarget.style.borderColor = theme.buttonBorder}
          >
            <i className="fas fa-search" style={{ fontSize: '20px', color: '#3b82f6', marginBottom: '8px' }}></i>
            <div style={{ fontSize: '16px', fontWeight: 'semibold', marginBottom: '4px' }}>
              Browse Products
            </div>
            <div style={{ fontSize: '14px', color: theme.textSecondary }}>
              Discover new items and deals
            </div>
          </button>

          <button style={{
            padding: '16px',
            backgroundColor: theme.buttonBg,
            border: `2px solid ${theme.buttonBorder}`,
            borderRadius: '8px',
            cursor: 'pointer',
            textAlign: 'left',
            transition: 'all 0.2s',
            color: theme.textPrimary
          }}
          onMouseOver={(e) => e.currentTarget.style.borderColor = '#10b981'}
          onMouseOut={(e) => e.currentTarget.style.borderColor = theme.buttonBorder}
          >
            <i className="fas fa-shopping-cart" style={{ fontSize: '20px', color: '#10b981', marginBottom: '8px' }}></i>
            <div style={{ fontSize: '16px', fontWeight: 'semibold', marginBottom: '4px' }}>
              View Cart
            </div>
            <div style={{ fontSize: '14px', color: theme.textSecondary }}>
              Check items in your cart
            </div>
          </button>

          <button style={{
            padding: '16px',
            backgroundColor: theme.buttonBg,
            border: `2px solid ${theme.buttonBorder}`,
            borderRadius: '8px',
            cursor: 'pointer',
            textAlign: 'left',
            transition: 'all 0.2s',
            color: theme.textPrimary
          }}
          onMouseOver={(e) => e.currentTarget.style.borderColor = '#f59e0b'}
          onMouseOut={(e) => e.currentTarget.style.borderColor = theme.buttonBorder}
          >
            <i className="fas fa-list" style={{ fontSize: '20px', color: '#f59e0b', marginBottom: '8px' }}></i>
            <div style={{ fontSize: '16px', fontWeight: 'semibold', marginBottom: '4px' }}>
              Order History
            </div>
            <div style={{ fontSize: '14px', color: theme.textSecondary }}>
              View your past orders
            </div>
          </button>

          <button style={{
            padding: '16px',
            backgroundColor: theme.buttonBg,
            border: `2px solid ${theme.buttonBorder}`,
            borderRadius: '8px',
            cursor: 'pointer',
            textAlign: 'left',
            transition: 'all 0.2s',
            color: theme.textPrimary
          }}
          onMouseOver={(e) => e.currentTarget.style.borderColor = '#8b5cf6'}
          onMouseOut={(e) => e.currentTarget.style.borderColor = theme.buttonBorder}
          >
            <i className="fas fa-user" style={{ fontSize: '20px', color: '#8b5cf6', marginBottom: '8px' }}></i>
            <div style={{ fontSize: '16px', fontWeight: 'semibold', marginBottom: '4px' }}>
              Profile Settings
            </div>
            <div style={{ fontSize: '14px', color: theme.textSecondary }}>
              Update your information
            </div>
          </button>
        </div>
      </div>

      {/* Recent Orders */}
      <div style={{
        backgroundColor: theme.cardBg,
        padding: '24px',
        borderRadius: '12px',
        boxShadow: theme.cardShadow,
        border: `1px solid ${theme.cardBorder}`,
        marginBottom: '30px'
      }}>
        <h2 style={{ margin: '0 0 20px 0', fontSize: '20px', fontWeight: 'bold', color: theme.textPrimary }}>
          Recent Orders
        </h2>
        <div style={{ space: '16px' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '16px',
            backgroundColor: theme.itemBg,
            borderRadius: '8px',
            marginBottom: '12px'
          }}>
            <div>
              <div style={{ fontWeight: 'semibold', marginBottom: '4px', color: theme.textPrimary }}>Order #12345</div>
              <div style={{ fontSize: '14px', color: theme.textSecondary }}>MacBook Pro 14" + Accessories</div>
              <div style={{ fontSize: '14px', color: theme.textSecondary }}>January 15, 2025</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 'semibold', marginBottom: '4px', color: theme.textPrimary }}>{formatCurrency(62475000)}</div>
              <span style={{ 
                padding: '4px 8px', 
                backgroundColor: '#10b981', 
                color: 'white', 
                borderRadius: '12px',
                fontSize: '12px'
              }}>
                Delivered
              </span>
            </div>
          </div>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '16px',
            backgroundColor: theme.itemBg,
            borderRadius: '8px',
            marginBottom: '12px'
          }}>
            <div>
              <div style={{ fontWeight: 'semibold', marginBottom: '4px', color: theme.textPrimary }}>Order #12344</div>
              <div style={{ fontSize: '14px', color: theme.textSecondary }}>Wireless Headphones</div>
              <div style={{ fontSize: '14px', color: theme.textSecondary }}>January 12, 2025</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 'semibold', marginBottom: '4px', color: theme.textPrimary }}>{formatCurrency(4999000)}</div>
              <span style={{ 
                padding: '4px 8px', 
                backgroundColor: '#f59e0b', 
                color: 'white', 
                borderRadius: '12px',
                fontSize: '12px'
              }}>
                Shipping
              </span>
            </div>
          </div>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '16px',
            backgroundColor: theme.itemBg,
            borderRadius: '8px'
          }}>
            <div>
              <div style={{ fontWeight: 'semibold', marginBottom: '4px', color: theme.textPrimary }}>Order #12343</div>
              <div style={{ fontSize: '14px', color: theme.textSecondary }}>Gaming Mouse + Mousepad</div>
              <div style={{ fontSize: '14px', color: theme.textSecondary }}>January 10, 2025</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 'semibold', marginBottom: '4px', color: theme.textPrimary }}>{formatCurrency(2247000)}</div>
              <span style={{ 
                padding: '4px 8px', 
                backgroundColor: '#10b981', 
                color: 'white', 
                borderRadius: '12px',
                fontSize: '12px'
              }}>
                Delivered
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Wishlist Preview */}
      <div style={{
        backgroundColor: theme.cardBg,
        padding: '24px',
        borderRadius: '12px',
        boxShadow: theme.cardShadow,
        border: `1px solid ${theme.cardBorder}`
      }}>
        <h2 style={{ margin: '0 0 20px 0', fontSize: '20px', fontWeight: 'bold', color: theme.textPrimary }}>
          Your Wishlist
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px'
        }}>
          <div style={{
            border: `1px solid ${theme.cardBorder}`,
            borderRadius: '8px',
            overflow: 'hidden',
            backgroundColor: theme.cardBg
          }}>
            <div style={{
              height: '120px',
              backgroundColor: theme.imageBg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <i className="fas fa-image" style={{ fontSize: '24px', color: theme.imageIcon }}></i>
            </div>
            <div style={{ padding: '12px' }}>
              <div style={{ fontWeight: 'semibold', marginBottom: '4px', fontSize: '14px', color: theme.textPrimary }}>
                iPhone 15 Pro
              </div>
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#3b82f6' }}>
                {formatCurrency(24999000)}
              </div>
            </div>
          </div>

          <div style={{
            border: `1px solid ${theme.cardBorder}`,
            borderRadius: '8px',
            overflow: 'hidden',
            backgroundColor: theme.cardBg
          }}>
            <div style={{
              height: '120px',
              backgroundColor: theme.imageBg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <i className="fas fa-image" style={{ fontSize: '24px', color: theme.imageIcon }}></i>
            </div>
            <div style={{ padding: '12px' }}>
              <div style={{ fontWeight: 'semibold', marginBottom: '4px', fontSize: '14px', color: theme.textPrimary }}>
                AirPods Pro
              </div>
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#3b82f6' }}>
                {formatCurrency(6249000)}
              </div>
            </div>
          </div>

          <div style={{
            border: `1px solid ${theme.cardBorder}`,
            borderRadius: '8px',
            overflow: 'hidden',
            backgroundColor: theme.cardBg
          }}>
            <div style={{
              height: '120px',
              backgroundColor: theme.imageBg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <i className="fas fa-image" style={{ fontSize: '24px', color: theme.imageIcon }}></i>
            </div>
            <div style={{ padding: '12px' }}>
              <div style={{ fontWeight: 'semibold', marginBottom: '4px', fontSize: '14px', color: theme.textPrimary }}>
                iPad Air
              </div>
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#3b82f6' }}>
                {formatCurrency(14999000)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
