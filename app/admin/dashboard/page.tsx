'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '../../../lib/auth-context'
import { useDarkMode } from '../../../lib/dark-mode-context'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore'
import { db } from '../../../lib/firebase'

interface DashboardStats {
  totalUsers: number
  totalOrders: number
  totalRevenue: number
  lowStockItems: number
  todayOrders: number
  todayRevenue: number
  monthlyRevenue: number
  topProducts: any[]
  recentOrders: any[]
}

export default function AdminDashboard() {
  const { user, userRole, loading, signOut } = useAuth()
  const { isDarkMode } = useDarkMode()
  const router = useRouter()
  
  const theme = {
    background: isDarkMode ? '#1f2937' : '#ffffff',
    surface: isDarkMode ? '#374151' : '#ffffff',
    text: isDarkMode ? '#f9fafb' : '#1f2937',
    textSecondary: isDarkMode ? '#d1d5db' : '#6b7280',
    border: isDarkMode ? '#4b5563' : '#e5e7eb',
    cardBg: isDarkMode ? '#374151' : '#ffffff',
    hoverBg: isDarkMode ? '#4b5563' : '#f8fafc',
    shadow: isDarkMode ? '0 1px 3px rgba(0, 0, 0, 0.3)' : '0 1px 3px rgba(0, 0, 0, 0.1)',
    itemBg: isDarkMode ? '#4b5563' : '#f9fafb',
    buttonBg: isDarkMode ? '#374151' : '#f8fafc',
    buttonBorder: isDarkMode ? '#6b7280' : '#e2e8f0'
  }
  
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    lowStockItems: 0,
    todayOrders: 0,
    todayRevenue: 0,
    monthlyRevenue: 0,
    topProducts: [],
    recentOrders: []
  })
  const [loadingStats, setLoadingStats] = useState(true)

  useEffect(() => {
    if (!loading && (!user || userRole !== 'admin')) {
      router.push('/login')
    } else if (user && userRole === 'admin') {
      loadDashboardStats()
    }
  }, [user, userRole, loading, router])
  
  const loadDashboardStats = async () => {
    try {
      setLoadingStats(true)
      
      // Load users count
      const usersSnapshot = await getDocs(collection(db, 'users'))
      const totalUsers = usersSnapshot.size
      
      // Mock data for demo - in real app you'd load from Firestore
      const mockStats: DashboardStats = {
        totalUsers,
        totalOrders: 1247,
        totalRevenue: 45650000,
        lowStockItems: 8,
        todayOrders: 23,
        todayRevenue: 2350000,
        monthlyRevenue: 15420000,
        topProducts: [
          { id: '1', name: 'MacBook Pro 14"', sales: 45, revenue: 112500000 },
          { id: '2', name: 'iPhone 15 Pro', sales: 38, revenue: 47500000 },
          { id: '3', name: 'AirPods Pro', sales: 92, revenue: 23000000 },
          { id: '4', name: 'iPad Air', sales: 31, revenue: 18600000 },
          { id: '5', name: 'Apple Watch', sales: 67, revenue: 33500000 }
        ],
        recentOrders: [
          { id: 'ORD-001', customer: 'John Doe', amount: 2499000, status: 'completed', date: new Date() },
          { id: 'ORD-002', customer: 'Jane Smith', amount: 1299000, status: 'processing', date: new Date() },
          { id: 'ORD-003', customer: 'Mike Johnson', amount: 599000, status: 'shipped', date: new Date() },
          { id: 'ORD-004', customer: 'Sarah Wilson', amount: 899000, status: 'completed', date: new Date() },
          { id: 'ORD-005', customer: 'David Brown', amount: 1999000, status: 'pending', date: new Date() }
        ]
      }
      
      setStats(mockStats)
    } catch (error) {
      console.error('Error loading dashboard stats:', error)
    } finally {
      setLoadingStats(false)
    }
  }

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        backgroundColor: theme.background,
        color: theme.text
      }}>
        <div>Loading...</div>
      </div>
    )
  }

  if (!user || userRole !== 'admin') {
    return null // Will redirect in useEffect
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div style={{ 
      padding: '24px',
      minHeight: '100%',
      backgroundColor: theme.background
    }}>

      {/* Main Stats Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '20px',
        marginBottom: '24px'
      }}>
        {/* Total Users Card */}
        <div style={{
          backgroundColor: theme.cardBg,
          padding: '24px',
          borderRadius: '12px',
          boxShadow: theme.shadow,
          border: `1px solid ${theme.border}`,
          borderLeft: '4px solid #3b82f6'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '28px', fontWeight: 'bold', color: theme.text }}>
                {loadingStats ? '...' : stats.totalUsers.toLocaleString()}
              </h3>
              <p style={{ margin: '4px 0 0 0', color: theme.textSecondary, fontSize: '14px' }}>Total Users</p>
              <div style={{ marginTop: '8px', fontSize: '12px', color: '#10b981' }}>
                <i className="fas fa-arrow-up"></i> +12% from last month
              </div>
            </div>
            <div style={{
              width: '56px',
              height: '56px',
              backgroundColor: isDarkMode ? '#1e40af' : '#dbeafe',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <i className="fas fa-users" style={{ color: '#3b82f6', fontSize: '24px' }}></i>
            </div>
          </div>
        </div>

        {/* Today's Sales Card */}
        <div style={{
          backgroundColor: theme.cardBg,
          padding: '24px',
          borderRadius: '12px',
          boxShadow: theme.shadow,
          border: `1px solid ${theme.border}`,
          borderLeft: '4px solid #10b981'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '28px', fontWeight: 'bold', color: theme.text }}>
                {loadingStats ? '...' : formatCurrency(stats.todayRevenue)}
              </h3>
              <p style={{ margin: '4px 0 0 0', color: theme.textSecondary, fontSize: '14px' }}>Today's Revenue</p>
              <div style={{ marginTop: '8px', fontSize: '12px', color: '#10b981' }}>
                <i className="fas fa-arrow-up"></i> {loadingStats ? '...' : stats.todayOrders} orders today
              </div>
            </div>
            <div style={{
              width: '56px',
              height: '56px',
              backgroundColor: isDarkMode ? '#047857' : '#d1fae5',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <i className="fas fa-chart-line" style={{ color: '#10b981', fontSize: '24px' }}></i>
            </div>
          </div>
        </div>

        {/* Total Orders Card */}
        <div style={{
          backgroundColor: theme.cardBg,
          padding: '24px',
          borderRadius: '12px',
          boxShadow: theme.shadow,
          border: `1px solid ${theme.border}`,
          borderLeft: '4px solid #8b5cf6'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '28px', fontWeight: 'bold', color: theme.text }}>
                {loadingStats ? '...' : stats.totalOrders.toLocaleString()}
              </h3>
              <p style={{ margin: '4px 0 0 0', color: theme.textSecondary, fontSize: '14px' }}>Total Orders</p>
              <div style={{ marginTop: '8px', fontSize: '12px', color: '#f59e0b' }}>
                <i className="fas fa-exclamation-triangle"></i> {loadingStats ? '...' : stats.lowStockItems} items low stock
              </div>
            </div>
            <div style={{
              width: '56px',
              height: '56px',
              backgroundColor: isDarkMode ? '#6d28d9' : '#ede9fe',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <i className="fas fa-shopping-cart" style={{ color: '#8b5cf6', fontSize: '24px' }}></i>
            </div>
          </div>
        </div>

        {/* Monthly Revenue Card */}
        <div style={{
          backgroundColor: theme.cardBg,
          padding: '24px',
          borderRadius: '12px',
          boxShadow: theme.shadow,
          border: `1px solid ${theme.border}`,
          borderLeft: '4px solid #f59e0b'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '28px', fontWeight: 'bold', color: theme.text }}>
                {loadingStats ? '...' : formatCurrency(stats.monthlyRevenue)}
              </h3>
              <p style={{ margin: '4px 0 0 0', color: theme.textSecondary, fontSize: '14px' }}>Monthly Revenue</p>
              <div style={{ marginTop: '8px', fontSize: '12px', color: '#10b981' }}>
                <i className="fas fa-arrow-up"></i> +8% from last month
              </div>
            </div>
            <div style={{
              width: '56px',
              height: '56px',
              backgroundColor: isDarkMode ? '#d97706' : '#fef3c7',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <i className="fas fa-dollar-sign" style={{ color: '#f59e0b', fontSize: '24px' }}></i>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{
        backgroundColor: theme.cardBg,
        padding: '24px',
        borderRadius: '12px',
        boxShadow: theme.shadow,
        border: `1px solid ${theme.border}`,
        marginBottom: '30px'
      }}>
        <h2 style={{ margin: '0 0 20px 0', fontSize: '20px', fontWeight: 'bold', color: theme.text }}>
          Quick Actions
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px'
        }}>
          {[
            { icon: 'fas fa-users', color: '#3b82f6', title: 'Manage Users', desc: 'Add, edit or remove users' },
            { icon: 'fas fa-shopping-bag', color: '#10b981', title: 'Manage Products', desc: 'Add, edit or remove products' },
            { icon: 'fas fa-chart-bar', color: '#f59e0b', title: 'View Reports', desc: 'Sales and analytics reports' },
            { icon: 'fas fa-cog', color: '#8b5cf6', title: 'Settings', desc: 'System configuration' }
          ].map((action, index) => (
            <button key={index} style={{
              padding: '16px',
              backgroundColor: theme.buttonBg,
              border: `2px solid ${theme.buttonBorder}`,
              borderRadius: '8px',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s',
            }}
            onMouseOver={(e) => e.currentTarget.style.borderColor = action.color}
            onMouseOut={(e) => e.currentTarget.style.borderColor = theme.buttonBorder}
            >
              <i className={action.icon} style={{ fontSize: '20px', color: action.color, marginBottom: '8px' }}></i>
              <div style={{ fontSize: '16px', fontWeight: 'semibold', marginBottom: '4px', color: theme.text }}>
                {action.title}
              </div>
              <div style={{ fontSize: '14px', color: theme.textSecondary }}>
                {action.desc}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Analytics and Data Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '24px',
        marginBottom: '24px'
      }}>
        {/* Top Products */}
        <div style={{
          backgroundColor: theme.cardBg,
          padding: '24px',
          borderRadius: '12px',
          boxShadow: theme.shadow,
          border: `1px solid ${theme.border}`
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <i className="fas fa-trophy" style={{ color: '#f59e0b', marginRight: '12px', fontSize: '20px' }}></i>
            <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: theme.text }}>Top Selling Products</h2>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {loadingStats ? (
              <div style={{ color: theme.text }}>Loading...</div>
            ) : (
              stats.topProducts.map((product, index) => (
                <div key={product.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px',
                  backgroundColor: index === 0 ? (isDarkMode ? '#92400e' : '#fef3c7') : theme.itemBg,
                  borderRadius: '8px',
                  border: index === 0 ? '1px solid #f59e0b' : `1px solid ${theme.border}`
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      backgroundColor: index === 0 ? '#f59e0b' : theme.textSecondary,
                      color: 'white',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                      fontWeight: 'bold'
                    }}>
                      {index + 1}
                    </div>
                    <div>
                      <div style={{ fontWeight: 'semibold', fontSize: '16px', color: theme.text }}>{product.name}</div>
                      <div style={{ fontSize: '14px', color: theme.textSecondary }}>{product.sales} units sold</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 'bold', color: '#10b981' }}>
                      {formatCurrency(product.revenue)}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Orders Summary */}
        <div style={{
          backgroundColor: theme.cardBg,
          padding: '24px',
          borderRadius: '12px',
          boxShadow: theme.shadow,
          border: `1px solid ${theme.border}`
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <i className="fas fa-clock" style={{ color: '#8b5cf6', marginRight: '12px', fontSize: '20px' }}></i>
            <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: theme.text }}>Recent Orders</h2>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {loadingStats ? (
              <div style={{ color: theme.text }}>Loading...</div>
            ) : (
              stats.recentOrders.map((order) => (
                <div key={order.id} style={{
                  padding: '12px',
                  backgroundColor: theme.itemBg,
                  borderRadius: '8px',
                  border: `1px solid ${theme.border}`
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontWeight: 'semibold', fontSize: '14px', marginBottom: '4px', color: theme.text }}>
                        {order.id}
                      </div>
                      <div style={{ fontSize: '12px', color: theme.textSecondary, marginBottom: '4px' }}>
                        {order.customer}
                      </div>
                      <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#10b981' }}>
                        {formatCurrency(order.amount)}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '10px',
                        fontWeight: '500',
                        backgroundColor: 
                          order.status === 'completed' ? '#d1fae5' :
                          order.status === 'processing' ? '#fef3c7' :
                          order.status === 'shipped' ? '#dbeafe' : '#fef2f2',
                        color: 
                          order.status === 'completed' ? '#065f46' :
                          order.status === 'processing' ? '#92400e' :
                          order.status === 'shipped' ? '#1e40af' : '#991b1b'
                      }}>
                        {order.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Stock Alert and System Info */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '24px'
      }}>
        {/* Stock Alerts */}
        <div style={{
          backgroundColor: theme.cardBg,
          padding: '24px',
          borderRadius: '12px',
          boxShadow: theme.shadow,
          border: `1px solid ${theme.border}`
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <i className="fas fa-exclamation-triangle" style={{ color: '#f59e0b', marginRight: '12px', fontSize: '20px' }}></i>
            <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: '#f59e0b' }}>Stock Alerts</h2>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { name: 'iPhone 15 Pro - Space Black', status: 'Only 3 units remaining', type: 'warning' },
              { name: 'MacBook Air M2', status: 'Only 5 units remaining', type: 'warning' },
              { name: 'AirPods Max', status: 'Out of stock', type: 'danger' }
            ].map((item, index) => (
              <div key={index} style={{
                padding: '12px',
                backgroundColor: item.type === 'danger' ? '#fef2f2' : '#fef3c7',
                borderRadius: '8px',
                border: item.type === 'danger' ? '1px solid #ef4444' : '1px solid #f59e0b'
              }}>
                <div style={{ fontWeight: 'semibold', marginBottom: '4px', color: theme.text }}>{item.name}</div>
                <div style={{ fontSize: '14px', color: item.type === 'danger' ? '#991b1b' : '#92400e' }}>{item.status}</div>
              </div>
            ))}
          </div>
        </div>

        {/* System Activity */}
        <div style={{
          backgroundColor: theme.cardBg,
          padding: '24px',
          borderRadius: '12px',
          boxShadow: theme.shadow,
          border: `1px solid ${theme.border}`
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <i className="fas fa-bell" style={{ color: '#3b82f6', marginRight: '12px', fontSize: '20px' }}></i>
            <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: theme.text }}>Recent Activity</h2>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { icon: 'fas fa-user-plus', color: '#10b981', title: 'New user registered', desc: 'john.doe@example.com • 2 min ago' },
              { icon: 'fas fa-check-circle', color: '#10b981', title: 'Order completed', desc: `Order #12345 - ${formatCurrency(2499000)} • 5 min ago` },
              { icon: 'fas fa-edit', color: '#f59e0b', title: 'Product updated', desc: 'MacBook Pro 14" - Price updated • 15 min ago' },
              { icon: 'fas fa-truck', color: '#3b82f6', title: 'Order shipped', desc: 'Order #12340 shipped to customer • 1 hour ago' },
              { icon: 'fas fa-warehouse', color: '#8b5cf6', title: 'Stock replenished', desc: 'iPhone 15 Pro +50 units added • 2 hours ago' }
            ].map((activity, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 0' }}>
                <i className={activity.icon} style={{ color: activity.color, fontSize: '14px' }}></i>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 'semibold', color: theme.text }}>{activity.title}</div>
                  <div style={{ fontSize: '12px', color: theme.textSecondary }}>{activity.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
