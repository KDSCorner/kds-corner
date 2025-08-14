'use client'

import { useDarkMode } from '../../../lib/dark-mode-context'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Product {
  id: string
  name: string
  description: string
  price: number
  stock: number
  category: string
  images: string[]
  status: 'active' | 'inactive' | 'out_of_stock'
  createdAt: string
  updatedAt: string
}

export default function SellerProducts() {
  const { isDarkMode } = useDarkMode()
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [categories] = useState(['all', 'Electronics', 'Fashion', 'Home & Garden', 'Sports', 'Books', 'Beauty'])

  useEffect(() => {
    // Simulate API call to fetch products
    setTimeout(() => {
      const mockProducts: Product[] = [
        {
          id: '1',
          name: 'Kemeja Batik Premium Motif Parang',
          description: 'Kemeja batik berkualitas tinggi dengan motif parang tradisional. Terbuat dari bahan katun premium yang nyaman dipakai sehari-hari.',
          price: 275000,
          stock: 15,
          category: 'Fashion',
          images: ['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop'],
          status: 'active',
          createdAt: '2024-08-10',
          updatedAt: '2024-08-14'
        },
        {
          id: '2',
          name: 'Wireless Earbuds Pro Max',
          description: 'Earbuds wireless dengan noise cancellation dan audio berkualitas tinggi. Battery life hingga 8 jam dengan case charging.',
          price: 850000,
          stock: 8,
          category: 'Electronics',
          images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop'],
          status: 'active',
          createdAt: '2024-08-08',
          updatedAt: '2024-08-13'
        },
        {
          id: '3',
          name: 'Sepatu Sneakers Classic White',
          description: 'Sepatu sneakers putih classic dengan desain minimalis dan material berkualitas. Cocok untuk gaya kasual dan formal.',
          price: 450000,
          stock: 0,
          category: 'Fashion',
          images: ['https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop'],
          status: 'out_of_stock',
          createdAt: '2024-08-05',
          updatedAt: '2024-08-12'
        },
        {
          id: '4',
          name: 'Smart Watch Series 5',
          description: 'Smartwatch dengan fitur lengkap termasuk heart rate monitor, GPS tracking, dan battery life 2 hari.',
          price: 1200000,
          stock: 25,
          category: 'Electronics',
          images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop'],
          status: 'active',
          createdAt: '2024-08-01',
          updatedAt: '2024-08-11'
        },
        {
          id: '5',
          name: 'Tas Kulit Asli Premium',
          description: 'Tas kulit sapi asli dengan craftsmanship berkualitas tinggi. Desain elegan dan tahan lama.',
          price: 650000,
          stock: 12,
          category: 'Fashion',
          images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop'],
          status: 'active',
          createdAt: '2024-07-28',
          updatedAt: '2024-08-10'
        },
        {
          id: '6',
          name: 'Plant Pot Ceramic Set',
          description: 'Set pot keramik untuk tanaman hias dengan desain modern dan minimalis. Tersedia berbagai ukuran.',
          price: 125000,
          stock: 30,
          category: 'Home & Garden',
          images: ['https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop'],
          status: 'active',
          createdAt: '2024-07-25',
          updatedAt: '2024-08-09'
        }
      ]
      setProducts(mockProducts)
      setFilteredProducts(mockProducts)
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    filterProducts()
  }, [selectedCategory, searchQuery, products])

  const filterProducts = () => {
    let filtered = products

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setFilteredProducts(filtered)
  }

  const theme = {
    background: isDarkMode ? '#0f172a' : '#f8fafc',
    cardBg: isDarkMode ? '#1e293b' : 'white',
    cardHoverBg: isDarkMode ? '#334155' : '#f1f5f9',
    text: isDarkMode ? '#e2e8f0' : '#1e293b',
    textSecondary: isDarkMode ? '#94a3b8' : '#64748b',
    textMuted: isDarkMode ? '#64748b' : '#9ca3af',
    border: isDarkMode ? '#374151' : '#e2e8f0',
    inputBg: isDarkMode ? '#334155' : 'white',
    inputBorder: isDarkMode ? '#475569' : '#d1d5db',
    shadow: isDarkMode ? '0 4px 6px rgba(0, 0, 0, 0.3)' : '0 4px 6px rgba(0, 0, 0, 0.1)',
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10b981'
      case 'inactive': return '#6b7280'
      case 'out_of_stock': return '#ef4444'
      default: return theme.textMuted
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Active'
      case 'inactive': return 'Inactive'
      case 'out_of_stock': return 'Out of Stock'
      default: return status
    }
  }

  const handleDeleteProduct = (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(prev => prev.filter(p => p.id !== productId))
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
          Loading products...
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
      padding: '30px',
      backgroundColor: theme.background,
      minHeight: 'calc(100vh - 70px)'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '30px'
      }}>
        <div>
          <h2 style={{
            margin: 0,
            fontSize: '28px',
            fontWeight: 'bold',
            color: theme.text,
            marginBottom: '8px'
          }}>
            Manage Products
          </h2>
          <p style={{
            margin: 0,
            fontSize: '16px',
            color: theme.textSecondary
          }}>
            Add, edit, and manage your product catalog
          </p>
        </div>
        
        <Link
          href="/seller/products/add"
          style={{
            backgroundColor: '#059669',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#047857'
            e.currentTarget.style.transform = 'translateY(-1px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#059669'
            e.currentTarget.style.transform = 'translateY(0px)'
          }}
        >
          <i className="fas fa-plus"></i>
          Add New Product
        </Link>
      </div>

      {/* Filters */}
      <div style={{
        backgroundColor: theme.cardBg,
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '24px',
        boxShadow: theme.shadow,
        border: `1px solid ${theme.border}`
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 200px',
          gap: '20px',
          alignItems: 'end'
        }}>
          {/* Search */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: theme.text,
              marginBottom: '8px'
            }}>
              Search Products
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Search by name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px 12px 40px',
                  backgroundColor: theme.inputBg,
                  border: `1px solid ${theme.inputBorder}`,
                  borderRadius: '8px',
                  fontSize: '14px',
                  color: theme.text,
                  outline: 'none',
                  transition: 'border-color 0.2s ease'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#059669'
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = theme.inputBorder
                }}
              />
              <i className="fas fa-search" style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: theme.textMuted,
                fontSize: '14px'
              }}></i>
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: theme.text,
              marginBottom: '8px'
            }}>
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                backgroundColor: theme.inputBg,
                border: `1px solid ${theme.inputBorder}`,
                borderRadius: '8px',
                fontSize: '14px',
                color: theme.text,
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="all">All Categories</option>
              {categories.slice(1).map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Products Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '24px'
      }}>
        <div style={{
          backgroundColor: theme.cardBg,
          padding: '20px',
          borderRadius: '8px',
          boxShadow: theme.shadow,
          border: `1px solid ${theme.border}`
        }}>
          <div style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: theme.text,
            marginBottom: '4px'
          }}>
            {products.length}
          </div>
          <div style={{
            fontSize: '14px',
            color: theme.textSecondary
          }}>
            Total Products
          </div>
        </div>

        <div style={{
          backgroundColor: theme.cardBg,
          padding: '20px',
          borderRadius: '8px',
          boxShadow: theme.shadow,
          border: `1px solid ${theme.border}`
        }}>
          <div style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#10b981',
            marginBottom: '4px'
          }}>
            {products.filter(p => p.status === 'active').length}
          </div>
          <div style={{
            fontSize: '14px',
            color: theme.textSecondary
          }}>
            Active Products
          </div>
        </div>

        <div style={{
          backgroundColor: theme.cardBg,
          padding: '20px',
          borderRadius: '8px',
          boxShadow: theme.shadow,
          border: `1px solid ${theme.border}`
        }}>
          <div style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#ef4444',
            marginBottom: '4px'
          }}>
            {products.filter(p => p.status === 'out_of_stock').length}
          </div>
          <div style={{
            fontSize: '14px',
            color: theme.textSecondary
          }}>
            Out of Stock
          </div>
        </div>

        <div style={{
          backgroundColor: theme.cardBg,
          padding: '20px',
          borderRadius: '8px',
          boxShadow: theme.shadow,
          border: `1px solid ${theme.border}`
        }}>
          <div style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: theme.text,
            marginBottom: '4px'
          }}>
            {filteredProducts.length}
          </div>
          <div style={{
            fontSize: '14px',
            color: theme.textSecondary
          }}>
            Filtered Results
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '24px'
      }}>
        {filteredProducts.map((product) => (
          <div 
            key={product.id}
            style={{
              backgroundColor: theme.cardBg,
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: theme.shadow,
              border: `1px solid ${theme.border}`,
              transition: 'all 0.2s ease'
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
            {/* Product Image */}
            <div style={{
              height: '200px',
              backgroundImage: `url(${product.images[0]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative'
            }}>
              {/* Status Badge */}
              <div style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                backgroundColor: getStatusColor(product.status),
                color: 'white',
                padding: '4px 8px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: '500'
              }}>
                {getStatusText(product.status)}
              </div>

              {/* Stock Badge */}
              <div style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                backgroundColor: product.stock > 10 ? '#10b981' : product.stock > 0 ? '#f59e0b' : '#ef4444',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: '500'
              }}>
                Stock: {product.stock}
              </div>
            </div>

            {/* Product Info */}
            <div style={{ padding: '20px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                marginBottom: '12px'
              }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    margin: 0,
                    fontSize: '18px',
                    fontWeight: '600',
                    color: theme.text,
                    marginBottom: '4px',
                    lineHeight: '1.3'
                  }}>
                    {product.name}
                  </h3>
                  <div style={{
                    fontSize: '12px',
                    color: theme.textMuted,
                    marginBottom: '8px'
                  }}>
                    {product.category}
                  </div>
                </div>
              </div>

              <p style={{
                margin: 0,
                fontSize: '14px',
                color: theme.textSecondary,
                lineHeight: '1.5',
                marginBottom: '16px',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>
                {product.description}
              </p>

              <div style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: theme.text,
                marginBottom: '16px'
              }}>
                {formatCurrency(product.price)}
              </div>

              {/* Action Buttons */}
              <div style={{
                display: 'flex',
                gap: '8px'
              }}>
                <Link
                  href={`/seller/products/edit/${product.id}`}
                  style={{
                    flex: 1,
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    padding: '10px 16px',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: '500',
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    transition: 'background-color 0.2s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#2563eb'
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#3b82f6'
                  }}
                >
                  <i className="fas fa-edit"></i>
                  Edit
                </Link>

                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  style={{
                    backgroundColor: '#ef4444',
                    color: 'white',
                    padding: '10px 16px',
                    borderRadius: '6px',
                    border: 'none',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    transition: 'background-color 0.2s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#dc2626'
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#ef4444'
                  }}
                >
                  <i className="fas fa-trash"></i>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Products Found */}
      {filteredProducts.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          color: theme.textSecondary
        }}>
          <div style={{
            fontSize: '48px',
            marginBottom: '16px',
            opacity: 0.5
          }}>
            📦
          </div>
          <h3 style={{
            margin: 0,
            fontSize: '18px',
            fontWeight: '600',
            marginBottom: '8px'
          }}>
            No Products Found
          </h3>
          <p style={{
            margin: 0,
            fontSize: '14px',
            marginBottom: '20px'
          }}>
            {searchQuery || selectedCategory !== 'all' 
              ? 'Try adjusting your filters or search terms.'
              : 'Start by adding your first product to your catalog.'
            }
          </p>
          <Link
            href="/seller/products/add"
            style={{
              backgroundColor: '#059669',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <i className="fas fa-plus"></i>
            Add New Product
          </Link>
        </div>
      )}
    </div>
  )
}
