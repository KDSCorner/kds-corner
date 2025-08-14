'use client'

import { useDarkMode } from '../../../lib/dark-mode-context'
import { useAuth } from '../../../lib/auth-context'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface SellerStats {
  totalProducts: number
  totalOrders: number
  pendingOrders: number
  completedOrders: number
  totalRevenue: number
  monthlyRevenue: number
  lowStockProducts: number
  todayOrders: number
}

interface RecentOrder {
  id: string
  customerName: string
  productName: string
  amount: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  date: string
}

export default function SellerDashboard() {
  const { isDarkMode } = useDarkMode()
  const { user } = useAuth()
  const [stats, setStats] = useState<SellerStats>({
    totalProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    totalRevenue: 0,
    monthlyRevenue: 0,
    lowStockProducts: 0,
    todayOrders: 0
  })
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to fetch seller stats
    setTimeout(() => {
      setStats({
        totalProducts: 45,
        totalOrders: 128,
        pendingOrders: 12,
        completedOrders: 98,
        totalRevenue: 25750000,
        monthlyRevenue: 8950000,
        lowStockProducts: 3,
        todayOrders: 7
      })

      setRecentOrders([
        {
          id: '1',
          customerName: 'Ahmad Fadli',
          productName: 'Kemeja Batik Premium',
          amount: 250000,
          status: 'pending',
          date: '2024-08-14'
        },
        {
          id: '2',
          customerName: 'Siti Nurhaliza',
          productName: 'Dress Casual Modern',
          amount: 175000,
          status: 'processing',
          date: '2024-08-14'
        },
        {
          id: '3',
          customerName: 'Budi Santoso',
          productName: 'Sepatu Sneakers',
          amount: 450000,
          status: 'shipped',
          date: '2024-08-13'
        },
        {
          id: '4',
          customerName: 'Maya Indira',
          productName: 'Tas Kulit Asli',
          amount: 320000,
          status: 'delivered',
          date: '2024-08-13'
        },
        {
          id: '5',
          customerName: 'Rifki Hakim',
          productName: 'Jaket Denim',
          amount: 225000,
          status: 'processing',
          date: '2024-08-12'
        }
      ])
      
      setLoading(false)
    }, 1000)
  }, [])

  const theme = {
    background: isDarkMode ? '#0f172a' : '#f8fafc',
    cardBg: isDarkMode ? '#1e293b' : 'white',
    cardHoverBg: isDarkMode ? '#334155' : '#f1f5f9',
    text: isDarkMode ? '#e2e8f0' : '#1e293b',
    textSecondary: isDarkMode ? '#94a3b8' : '#64748b',
    textMuted: isDarkMode ? '#64748b' : '#9ca3af',
    border: isDarkMode ? '#374151' : '#e2e8f0',
    primaryBg: '#059669',
    primaryText: 'white',
    shadow: isDarkMode ? '0 4px 6px rgba(0, 0, 0, 0.3)' : '0 4px 6px rgba(0, 0, 0, 0.1)',
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#f59e0b'
      case 'processing': return '#3b82f6'
      case 'shipped': return '#8b5cf6'
      case 'delivered': return '#10b981'
      case 'cancelled': return '#ef4444'
      default: return theme.textMuted
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Menunggu'
      case 'processing': return 'Diproses'
      case 'shipped': return 'Dikirim'
      case 'delivered': return 'Selesai'
      case 'cancelled': return 'Dibatal'
      default: return status
    }
  }

  if (loading) {
    return (
      <div style={{
        padding: '30px',
        backgroundColor: theme.background,
        minHeight: 'calc(100vh - 70px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ 
          fontSize: '18px', 
          color: theme.textSecondary,
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            width: '20px',
            height: '20px',
            border: '2px solid transparent',
            borderTop: '2px solid #059669',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          Loading dashboard...
        </div>
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    )
  }

  return (
    <div style={{
      padding: typeof window !== 'undefined' && window.innerWidth <= 768 ? '12px' : '30px',
      backgroundColor: theme.background,
      minHeight: 'calc(100vh - 70px)'
    }}>
      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .welcome-section {
          margin-bottom: 30px;
        }
        
        .welcome-title {
          font-size: clamp(20px, 4vw, 28px);
          font-weight: bold;
          color: ${theme.text};
          margin: 0 0 8px 0;
        }
        
        .welcome-subtitle {
          font-size: clamp(14px, 3vw, 16px);
          color: ${theme.textSecondary};
          margin: 0;
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 24px;
          margin-bottom: 40px;
        }
        
        .stats-card {
          background: ${theme.cardBg};
          padding: 24px;
          border-radius: 12px;
          box-shadow: ${theme.shadow};
          border: 1px solid ${theme.border};
          position: relative;
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        
        .stats-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }
        
        .main-content-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 30px;
          margin-bottom: 30px;
        }
        
        .recent-orders-card {
          background: ${theme.cardBg};
          border-radius: 12px;
          box-shadow: ${theme.shadow};
          border: 1px solid ${theme.border};
          overflow: hidden;
        }
        
        .card-header {
          padding: 24px;
          border-bottom: 1px solid ${theme.border};
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }
        
        .order-item {
          padding: 20px 24px;
          border-bottom: 1px solid ${theme.border};
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: background-color 0.2s ease;
        }
        
        .order-item:hover {
          background-color: ${theme.cardHoverBg};
        }
        
        .order-item:last-child {
          border-bottom: none;
        }
        
        .quick-actions-grid {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        
        .action-card {
          background: ${theme.cardBg};
          border-radius: 12px;
          box-shadow: ${theme.shadow};
          border: 1px solid ${theme.border};
          padding: 24px;
          text-decoration: none;
          color: ${theme.text};
          transition: all 0.2s ease;
          display: block;
        }
        
        .action-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }
        
        /* Tablet */
        @media (max-width: 1024px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
          
          .main-content-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }
        
        /* Mobile */
        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: 1fr;
            gap: 16px;
            margin-bottom: 30px;
          }
          
          .main-content-grid {
            gap: 20px;
          }
          
          .card-header {
            padding: 20px;
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
          
          .order-item {
            padding: 16px 20px;
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
          
          .order-details {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 8px;
          }
        }
        
        /* Small mobile */
        @media (max-width: 480px) {
          .stats-card {
            padding: 20px;
          }
          
          .action-card {
            padding: 20px;
          }
          
          .welcome-section {
            margin-bottom: 24px;
          }
        }
        
        /* Extra small mobile */
        @media (max-width: 360px) {
          .stats-card {
            padding: 16px;
          }
          
          .action-card {
            padding: 16px;
          }
        }
      `}</style>
      {/* Welcome Section */}
      <div className="welcome-section">
        <h2 className="welcome-title">
          Welcome back, {user?.displayName || 'Seller'}! 🌟
        </h2>
        <p className="welcome-subtitle">
          Monitor your store performance and manage your business efficiently
        </p>
      </div>

      {/* Stats Cards Grid */}
      <div className="stats-grid">
        {/* Total Revenue Card */}
        <div style={{
          backgroundColor: theme.cardBg,
          padding: '24px',
          borderRadius: '12px',
          boxShadow: theme.shadow,
          border: `1px solid ${theme.border}`,
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #059669, #10b981)'
          }}></div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px'
          }}>
            <h3 style={{
              margin: 0,
              fontSize: '16px',
              fontWeight: '600',
              color: theme.textSecondary
            }}>
              Total Revenue
            </h3>
            <div style={{
              width: '48px',
              height: '48px',
              backgroundColor: 'rgba(5, 150, 105, 0.1)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <i className="fas fa-money-bill-wave" style={{ 
                fontSize: '20px', 
                color: '#059669' 
              }}></i>
            </div>
          </div>
          <div style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: theme.text,
            marginBottom: '8px'
          }}>
            {formatCurrency(stats.totalRevenue)}
          </div>
          <div style={{
            fontSize: '14px',
            color: theme.textMuted
          }}>
            This month: {formatCurrency(stats.monthlyRevenue)}
          </div>
        </div>

        {/* Total Orders Card */}
        <div style={{
          backgroundColor: theme.cardBg,
          padding: '24px',
          borderRadius: '12px',
          boxShadow: theme.shadow,
          border: `1px solid ${theme.border}`,
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #3b82f6, #60a5fa)'
          }}></div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px'
          }}>
            <h3 style={{
              margin: 0,
              fontSize: '16px',
              fontWeight: '600',
              color: theme.textSecondary
            }}>
              Total Orders
            </h3>
            <div style={{
              width: '48px',
              height: '48px',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <i className="fas fa-clipboard-list" style={{ 
                fontSize: '20px', 
                color: '#3b82f6' 
              }}></i>
            </div>
          </div>
          <div style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: theme.text,
            marginBottom: '8px'
          }}>
            {stats.totalOrders}
          </div>
          <div style={{
            fontSize: '14px',
            color: theme.textMuted
          }}>
            Today: {stats.todayOrders} orders
          </div>
        </div>

        {/* Pending Orders Card */}
        <div style={{
          backgroundColor: theme.cardBg,
          padding: '24px',
          borderRadius: '12px',
          boxShadow: theme.shadow,
          border: `1px solid ${theme.border}`,
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #f59e0b, #fbbf24)'
          }}></div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px'
          }}>
            <h3 style={{
              margin: 0,
              fontSize: '16px',
              fontWeight: '600',
              color: theme.textSecondary
            }}>
              Pending Orders
            </h3>
            <div style={{
              width: '48px',
              height: '48px',
              backgroundColor: 'rgba(245, 158, 11, 0.1)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <i className="fas fa-clock" style={{ 
                fontSize: '20px', 
                color: '#f59e0b' 
              }}></i>
            </div>
          </div>
          <div style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: theme.text,
            marginBottom: '8px'
          }}>
            {stats.pendingOrders}
          </div>
          <div style={{
            fontSize: '14px',
            color: theme.textMuted
          }}>
            Need attention
          </div>
        </div>

        {/* Products Card */}
        <div style={{
          backgroundColor: theme.cardBg,
          padding: '24px',
          borderRadius: '12px',
          boxShadow: theme.shadow,
          border: `1px solid ${theme.border}`,
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #8b5cf6, #a78bfa)'
          }}></div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px'
          }}>
            <h3 style={{
              margin: 0,
              fontSize: '16px',
              fontWeight: '600',
              color: theme.textSecondary
            }}>
              Total Products
            </h3>
            <div style={{
              width: '48px',
              height: '48px',
              backgroundColor: 'rgba(139, 92, 246, 0.1)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <i className="fas fa-box" style={{ 
                fontSize: '20px', 
                color: '#8b5cf6' 
              }}></i>
            </div>
          </div>
          <div style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: theme.text,
            marginBottom: '8px'
          }}>
            {stats.totalProducts}
          </div>
          <div style={{
            fontSize: '14px',
            color: theme.textMuted
          }}>
            {stats.lowStockProducts} low stock
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="main-content-grid">
        {/* Recent Orders */}
        <div className="recent-orders-card">
          <div className="card-header">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%'
            }}>
              <h3 style={{
                margin: 0,
                fontSize: '20px',
                fontWeight: '600',
                color: theme.text
              }}>
                Recent Orders
              </h3>
              <Link
                href="/seller/orders"
                style={{
                  color: '#059669',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                View All →
              </Link>
            </div>
          </div>
          
          <div style={{ padding: '0' }}>
            {recentOrders.map((order) => (
              <div 
                key={order.id}
                style={{
                  padding: '20px 24px',
                  borderBottom: `1px solid ${theme.border}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'background-color 0.2s ease',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = theme.cardHoverBg
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: theme.text,
                    marginBottom: '4px'
                  }}>
                    {order.customerName}
                  </div>
                  <div style={{
                    fontSize: '14px',
                    color: theme.textSecondary,
                    marginBottom: '4px'
                  }}>
                    {order.productName}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: theme.textMuted
                  }}>
                    {formatDate(order.date)}
                  </div>
                </div>
                
                <div style={{
                  textAlign: 'right'
                }}>
                  <div style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: theme.text,
                    marginBottom: '6px'
                  }}>
                    {formatCurrency(order.amount)}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    fontWeight: '500',
                    color: getStatusColor(order.status),
                    backgroundColor: getStatusColor(order.status) + '20',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    display: 'inline-block'
                  }}>
                    {getStatusText(order.status)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          {/* Add Product */}
          <Link
            href="/seller/products/add"
            style={{
              backgroundColor: theme.cardBg,
              borderRadius: '12px',
              boxShadow: theme.shadow,
              border: `1px solid ${theme.border}`,
              padding: '24px',
              textDecoration: 'none',
              color: theme.text,
              transition: 'all 0.2s ease',
              display: 'block'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = isDarkMode 
                ? '0 8px 25px rgba(0, 0, 0, 0.4)' 
                : '0 8px 25px rgba(0, 0, 0, 0.15)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0px)'
              e.currentTarget.style.boxShadow = theme.shadow
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '12px'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                backgroundColor: 'rgba(5, 150, 105, 0.1)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <i className="fas fa-plus" style={{ 
                  fontSize: '20px', 
                  color: '#059669' 
                }}></i>
              </div>
              <div>
                <h4 style={{
                  margin: 0,
                  fontSize: '16px',
                  fontWeight: '600',
                  color: theme.text
                }}>
                  Add New Product
                </h4>
                <p style={{
                  margin: 0,
                  fontSize: '14px',
                  color: theme.textSecondary
                }}>
                  Expand your catalog
                </p>
              </div>
            </div>
          </Link>

          {/* Manage Inventory */}
          <Link
            href="/seller/inventory"
            style={{
              backgroundColor: theme.cardBg,
              borderRadius: '12px',
              boxShadow: theme.shadow,
              border: `1px solid ${theme.border}`,
              padding: '24px',
              textDecoration: 'none',
              color: theme.text,
              transition: 'all 0.2s ease',
              display: 'block'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = isDarkMode 
                ? '0 8px 25px rgba(0, 0, 0, 0.4)' 
                : '0 8px 25px rgba(0, 0, 0, 0.15)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0px)'
              e.currentTarget.style.boxShadow = theme.shadow
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '12px'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <i className="fas fa-warehouse" style={{ 
                  fontSize: '20px', 
                  color: '#3b82f6' 
                }}></i>
              </div>
              <div>
                <h4 style={{
                  margin: 0,
                  fontSize: '16px',
                  fontWeight: '600',
                  color: theme.text
                }}>
                  Manage Inventory
                </h4>
                <p style={{
                  margin: 0,
                  fontSize: '14px',
                  color: theme.textSecondary
                }}>
                  Track stock levels
                </p>
              </div>
            </div>
          </Link>

          {/* View Analytics */}
          <Link
            href="/seller/analytics"
            style={{
              backgroundColor: theme.cardBg,
              borderRadius: '12px',
              boxShadow: theme.shadow,
              border: `1px solid ${theme.border}`,
              padding: '24px',
              textDecoration: 'none',
              color: theme.text,
              transition: 'all 0.2s ease',
              display: 'block'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = isDarkMode 
                ? '0 8px 25px rgba(0, 0, 0, 0.4)' 
                : '0 8px 25px rgba(0, 0, 0, 0.15)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0px)'
              e.currentTarget.style.boxShadow = theme.shadow
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '12px'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <i className="fas fa-chart-line" style={{ 
                  fontSize: '20px', 
                  color: '#f59e0b' 
                }}></i>
              </div>
              <div>
                <h4 style={{
                  margin: 0,
                  fontSize: '16px',
                  fontWeight: '600',
                  color: theme.text
                }}>
                  Sales Analytics
                </h4>
                <p style={{
                  margin: 0,
                  fontSize: '14px',
                  color: theme.textSecondary
                }}>
                  View performance
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
