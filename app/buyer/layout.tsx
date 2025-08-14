'use client'

import { useAuth } from '../../lib/auth-context'
import { useDarkMode } from '../../lib/dark-mode-context'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface BuyerLayoutProps {
  children: React.ReactNode
}

function BuyerLayoutContent({ children }: BuyerLayoutProps) {
  const { user, userRole, loading, signOut } = useAuth()
  const { isDarkMode, toggleDarkMode } = useDarkMode()
  const router = useRouter()
  const [activePage, setActivePage] = useState('dashboard')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

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
        height: '100vh',
        backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc'
      }}>
        <div style={{ fontSize: '18px', color: isDarkMode ? '#e2e8f0' : '#64748b' }}>Loading...</div>
      </div>
    )
  }

  if (!user || userRole !== 'buyer') {
    return null
  }

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'fas fa-tachometer-alt', href: '/buyer/dashboard' },
    { id: 'products', label: 'Browse Products', icon: 'fas fa-search', href: '/buyer/products' },
    { id: 'cart', label: 'Shopping Cart', icon: 'fas fa-shopping-cart', href: '/buyer/cart' },
    { id: 'orders', label: 'My Orders', icon: 'fas fa-list-alt', href: '/buyer/orders' },
    { id: 'wishlist', label: 'Wishlist', icon: 'fas fa-heart', href: '/buyer/wishlist' },
    { id: 'profile', label: 'My Profile', icon: 'fas fa-user', href: '/buyer/profile' },
    { id: 'addresses', label: 'My Addresses', icon: 'fas fa-map-marker-alt', href: '/buyer/addresses' },
    { id: 'payments', label: 'Payment Methods', icon: 'fas fa-credit-card', href: '/buyer/payments' },
  ]

  const theme = {
    background: isDarkMode ? '#0f172a' : '#f1f5f9',
    sidebarBg: isDarkMode ? '#1e293b' : '#6366f1',
    headerBg: isDarkMode ? '#1e293b' : 'white',
    headerText: isDarkMode ? '#e2e8f0' : '#1e293b',
    headerSubtext: isDarkMode ? '#94a3b8' : '#64748b',
    contentBg: isDarkMode ? '#0f172a' : '#f8fafc',
    buttonBg: isDarkMode ? '#334155' : '#f8fafc',
    buttonText: isDarkMode ? '#e2e8f0' : '#475569',
    buttonBorder: isDarkMode ? '#475569' : '#e2e8f0',
    shadow: isDarkMode ? '0 1px 3px rgba(0, 0, 0, 0.3)' : '0 1px 3px rgba(0, 0, 0, 0.1)',
  }

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      backgroundColor: theme.background,
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif'
    }}>
      {/* Sidebar */}
      <div style={{
        width: sidebarCollapsed ? '80px' : '280px',
        backgroundColor: theme.sidebarBg,
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.3s ease',
        boxShadow: isDarkMode ? '2px 0 10px rgba(0, 0, 0, 0.3)' : '2px 0 10px rgba(0, 0, 0, 0.1)',
        position: 'relative',
        zIndex: 100
      }}>
        {/* Logo Header */}
        <div style={{
          padding: '20px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            backgroundColor: 'white',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: theme.sidebarBg
          }}>
            <i className="fas fa-shopping-bag" style={{ fontSize: '20px' }}></i>
          </div>
          {!sidebarCollapsed && (
            <div>
              <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>KDS Corner</h2>
              <p style={{ margin: 0, fontSize: '12px', opacity: 0.8 }}>Shopping Panel</p>
            </div>
          )}
        </div>

        {/* Menu Items */}
        <div style={{ 
          flex: 1, 
          padding: '20px 0',
          overflowY: 'auto',
          overflowX: 'hidden',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}>
          <style>
            {`
              div::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>
          {menuItems.map((item) => (
            <Link 
              key={item.id}
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px 20px',
                margin: '4px 16px',
                borderRadius: '8px',
                color: 'white',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                backgroundColor: activePage === item.id ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                fontSize: '14px',
                fontWeight: '500',
                position: 'relative'
              }}
              onClick={() => setActivePage(item.id)}
              onMouseOver={(e) => {
                if (activePage !== item.id) {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
                }
              }}
              onMouseOut={(e) => {
                if (activePage !== item.id) {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }
              }}
            >
              <i 
                className={item.icon} 
                style={{ 
                  fontSize: '16px',
                  width: '20px',
                  marginRight: sidebarCollapsed ? '0' : '12px'
                }}
              ></i>
              {!sidebarCollapsed && <span>{item.label}</span>}
              {activePage === item.id && (
                <div style={{
                  position: 'absolute',
                  left: '0',
                  top: '0',
                  bottom: '0',
                  width: '4px',
                  backgroundColor: 'white',
                  borderRadius: '0 4px 4px 0'
                }}></div>
              )}
            </Link>
          ))}
        </div>

        {/* User Info & Logout */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '20px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '16px'
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              backgroundColor: 'white',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: theme.sidebarBg
            }}>
              <i className="fas fa-user" style={{ fontSize: '14px' }}></i>
            </div>
            {!sidebarCollapsed && (
              <div>
                <div style={{ fontSize: '14px', fontWeight: '600' }}>
                  {user.displayName || 'Buyer'}
                </div>
                <div style={{ fontSize: '12px', opacity: 0.8 }}>
                  {user.email ? user.email.split('@')[0] : 'Customer'}
                </div>
              </div>
            )}
          </div>
          
          <button
            onClick={handleSignOut}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
              gap: '8px',
              transition: 'all 0.2s ease',
              marginBottom: '10px'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
          >
            <i className="fas fa-sign-out-alt"></i>
            {!sidebarCollapsed && <span>Logout</span>}
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
              gap: '8px',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
          >
            <i className={isDarkMode ? 'fas fa-sun' : 'fas fa-moon'}></i>
            {!sidebarCollapsed && <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>}
          </button>
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          style={{
            position: 'absolute',
            top: '50%',
            right: '-12px',
            width: '24px',
            height: '24px',
            backgroundColor: theme.sidebarBg,
            border: '2px solid white',
            borderRadius: '50%',
            color: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            transform: 'translateY(-50%)',
            transition: 'all 0.2s ease',
            zIndex: 101
          }}
        >
          <i className={`fas fa-chevron-${sidebarCollapsed ? 'right' : 'left'}`}></i>
        </button>
      </div>

      {/* Main Content */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Top Header Bar */}
        <div style={{
          height: '70px',
          backgroundColor: theme.headerBg,
          borderBottom: `1px solid ${isDarkMode ? '#374151' : '#e2e8f0'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 30px',
          boxShadow: theme.shadow
        }}>
          <div>
            <h1 style={{ 
              margin: 0, 
              fontSize: '24px', 
              fontWeight: '600',
              color: theme.headerText
            }}>
              🛒 Welcome to KDS Corner
            </h1>
            <p style={{ 
              margin: 0, 
              fontSize: '14px', 
              color: theme.headerSubtext,
              marginTop: '2px'
            }}>
              Happy shopping, {user.displayName || 'Customer'}! {new Date().toLocaleDateString('id-ID', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })} - {new Date().toLocaleTimeString('id-ID', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })} WIB
            </p>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Dark Mode Toggle Button */}
            <button
              onClick={toggleDarkMode}
              style={{
                padding: '8px 12px',
                backgroundColor: theme.buttonBg,
                color: theme.buttonText,
                borderRadius: '6px',
                border: `1px solid ${theme.buttonBorder}`,
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = isDarkMode ? '#475569' : '#e2e8f0'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = theme.buttonBg
              }}
            >
              <i className={isDarkMode ? 'fas fa-sun' : 'fas fa-moon'}></i>
              {isDarkMode ? 'Light' : 'Dark'}
            </button>

            {/* Cart Icon with Badge */}
            <Link 
              href="/buyer/cart"
              style={{
                padding: '8px 12px',
                backgroundColor: theme.buttonBg,
                color: theme.buttonText,
                borderRadius: '6px',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500',
                border: `1px solid ${theme.buttonBorder}`,
                transition: 'all 0.2s ease',
                position: 'relative'
              }}
            >
              <i className="fas fa-shopping-cart" style={{ marginRight: '8px' }}></i>
              Cart
              <span style={{
                position: 'absolute',
                top: '-5px',
                right: '-5px',
                width: '20px',
                height: '20px',
                backgroundColor: '#ef4444',
                color: 'white',
                borderRadius: '50%',
                fontSize: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold'
              }}>
                3
              </span>
            </Link>

            <Link 
              href="/"
              style={{
                padding: '8px 16px',
                backgroundColor: theme.buttonBg,
                color: theme.buttonText,
                borderRadius: '6px',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500',
                border: `1px solid ${theme.buttonBorder}`,
                transition: 'all 0.2s ease'
              }}
            >
              <i className="fas fa-home" style={{ marginRight: '8px' }}></i>
              Home
            </Link>
          </div>
        </div>

        {/* Content Area */}
        <div style={{
          flex: 1,
          overflow: 'auto',
          backgroundColor: theme.contentBg
        }}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default function BuyerLayout({ children }: BuyerLayoutProps) {
  return (
    <BuyerLayoutContent>
      {children}
    </BuyerLayoutContent>
  )
}
