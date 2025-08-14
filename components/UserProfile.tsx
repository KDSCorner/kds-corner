'use client'

import { useState, useRef, useEffect } from 'react'
import { useAuth } from '../lib/auth-context'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface UserProfileProps {
  className?: string
}

export default function UserProfile({ className = '' }: UserProfileProps) {
  const { user, userRole, signOut } = useAuth()
  const router = useRouter()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close dropdown when pressing Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  const handleSignOut = async () => {
    try {
      await signOut()
      setIsDropdownOpen(false)
      router.push('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const getDashboardUrl = () => {
    if (userRole === 'admin') return '/admin/dashboard'
    if (userRole === 'buyer') return '/buyer/dashboard'
    return '/dashboard'
  }

  // Generate avatar from name initials
  const getAvatarInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  // Generate background color from name
  const getAvatarColor = (name: string) => {
    const colors = [
      '#3b82f6', '#10b981', '#f59e0b', '#ef4444', 
      '#8b5cf6', '#06b6d4', '#84cc16', '#f97316'
    ]
    let hash = 0
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash)
    }
    return colors[Math.abs(hash) % colors.length]
  }

  if (!user) {
    return (
      <Link href="/login" className={`btn btn-secondary ${className}`}>
        Login
      </Link>
    )
  }

  const userName = user.displayName || user.email?.split('@')[0] || 'User'
  const avatarColor = getAvatarColor(userName)

  return (
    <div className={`user-profile-dropdown ${className}`} ref={dropdownRef}>
      <button
        className="user-profile-trigger"
        onClick={toggleDropdown}
        aria-label="User menu"
        aria-expanded={isDropdownOpen}
      >
        <div 
          className="user-avatar"
          style={{ backgroundColor: avatarColor }}
        >
          {getAvatarInitials(userName)}
        </div>
        <span className="user-name">{userName}</span>
        <i className={`fas fa-chevron-down dropdown-icon ${isDropdownOpen ? 'rotated' : ''}`}></i>
      </button>

      {isDropdownOpen && (
        <div className="user-dropdown-menu">
          <div className="dropdown-header">
            <div 
              className="dropdown-avatar"
              style={{ backgroundColor: avatarColor }}
            >
              {getAvatarInitials(userName)}
            </div>
            <div className="dropdown-user-info">
              <div className="dropdown-name">{userName}</div>
              <div className="dropdown-email">{user.email}</div>
              {userRole && (
                <div className="dropdown-role">
                  {userRole === 'admin' ? 'Administrator' : 'Buyer'}
                </div>
              )}
            </div>
          </div>

          <div className="dropdown-divider"></div>

          <div className="dropdown-menu-items">
            <Link
              href={getDashboardUrl()}
              className="dropdown-item"
              onClick={() => setIsDropdownOpen(false)}
            >
              <i className="fas fa-tachometer-alt"></i>
              <span>Dashboard</span>
            </Link>
            
            <div className="dropdown-item-divider"></div>

            {userRole === 'buyer' && (
              <>
                <Link
                  href="/buyer/orders"
                  className="dropdown-item"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <i className="fas fa-shopping-bag"></i>
                  <span>My Orders</span>
                </Link>
                
                <div className="dropdown-item-divider"></div>
                
                <Link
                  href="/buyer/profile"
                  className="dropdown-item"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <i className="fas fa-user"></i>
                  <span>Profile</span>
                </Link>
              </>
            )}

            {userRole === 'admin' && (
              <>
                <Link
                  href="/admin/users"
                  className="dropdown-item"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <i className="fas fa-users"></i>
                  <span>Manage Users</span>
                </Link>
                
                <div className="dropdown-item-divider"></div>
                
                <Link
                  href="/admin/products"
                  className="dropdown-item"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <i className="fas fa-box"></i>
                  <span>Manage Products</span>
                </Link>
              </>
            )}
          </div>

          <div className="dropdown-divider"></div>

          <button
            className="dropdown-item logout-item"
            onClick={handleSignOut}
          >
            <i className="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </button>
        </div>
      )}

      <style jsx>{`
        .user-profile-dropdown {
          position: relative;
          display: inline-block;
        }

        .user-profile-trigger {
          display: flex;
          align-items: center;
          gap: 10px;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1));
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 25px;
          padding: 8px 16px;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 14px;
          backdrop-filter: blur(10px);
        }

        .user-profile-trigger:hover {
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.2));
          border-color: rgba(255, 255, 255, 0.3);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .user-avatar, .dropdown-avatar {
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          flex-shrink: 0;
          border: 2px solid rgba(255, 255, 255, 0.2);
        }

        .user-avatar {
          width: 32px;
          height: 32px;
          font-size: 12px;
        }

        .dropdown-avatar {
          width: 50px;
          height: 50px;
          font-size: 18px;
          border: 3px solid rgba(255, 255, 255, 0.3);
        }

        .user-name {
          font-weight: 600;
          max-width: 120px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }

        .dropdown-icon {
          font-size: 10px;
          transition: transform 0.3s ease;
          opacity: 0.8;
        }

        .dropdown-icon.rotated {
          transform: rotate(180deg);
        }

        .user-dropdown-menu {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          background: linear-gradient(145deg, #1f2937 0%, #374151 100%);
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4), 0 8px 25px rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.1);
          min-width: 380px;
          width: 380px;
          z-index: 1000;
          animation: dropdownSlide 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
          backdrop-filter: blur(20px);
        }

        @keyframes dropdownSlide {
          from {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .dropdown-header {
          padding: 24px;
          display: flex;
          align-items: center;
          gap: 16px;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1));
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          position: relative;
        }

        .dropdown-header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, #6366f1, #8b5cf6);
        }

        .dropdown-user-info {
          flex: 1;
          min-width: 0;
        }

        .dropdown-name {
          font-weight: 700;
          color: #f9fafb;
          font-size: 17px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-bottom: 4px;
        }

        .dropdown-email {
          color: #d1d5db;
          font-size: 13px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          opacity: 0.9;
        }

        .dropdown-role {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 10px;
          font-weight: 600;
          display: inline-block;
          margin-top: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
        }

        .dropdown-divider {
          height: 1px;
          background: rgba(255, 255, 255, 0.1);
          margin: 0;
        }

        .dropdown-item-divider {
          height: 1px;
          background: rgba(255, 255, 255, 0.08);
          margin: 8px 24px;
          opacity: 0.6;
        }

        .dropdown-menu-items {
          padding: 24px 0;
          display: flex;
          flex-direction: column;
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 20px 24px;
          color: #f3f4f6;
          text-decoration: none;
          transition: all 0.2s ease;
          border: none;
          background: none;
          width: 100%;
          text-align: left;
          font-size: 14px;
          cursor: pointer;
          position: relative;
          font-weight: 500;
          margin-bottom: 12px;
          border-radius: 8px;
          min-height: 56px;
          flex-shrink: 0;
        }

        .dropdown-item:last-child {
          margin-bottom: 0;
        }

        .dropdown-item::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          transform: scaleY(0);
          transition: transform 0.2s ease;
        }

        .dropdown-item:hover {
          background: rgba(255, 255, 255, 0.05);
          color: white;
          transform: translateX(4px);
        }

        .dropdown-item:hover::before {
          transform: scaleY(1);
        }

        .dropdown-item i {
          width: 18px;
          color: #9ca3af;
          font-size: 16px;
          transition: color 0.2s ease;
        }

        .dropdown-item:hover i {
          color: #6366f1;
        }

        .logout-item {
          color: #fca5a5;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          margin-top: 8px;
          padding-top: 20px;
        }

        .logout-item i {
          color: #f87171;
        }

        .logout-item:hover {
          background: rgba(239, 68, 68, 0.1);
          color: #fecaca;
        }

        .logout-item:hover i {
          color: #ef4444;
        }

        .logout-item:hover::before {
          background: linear-gradient(135deg, #ef4444, #dc2626);
        }

        /* Mobile responsiveness */
        @media (max-width: 768px) {
          .user-profile-trigger {
            padding: 6px 10px;
            gap: 6px;
          }
          
          .user-name {
            display: none;
          }
          
          .user-avatar {
            width: 28px;
            height: 28px;
            font-size: 11px;
          }
          
          .dropdown-icon {
            font-size: 9px;
          }
          
          .user-dropdown-menu {
            min-width: 300px;
            right: -15px;
            width: 300px;
          }
          
          .dropdown-header {
            padding: 18px;
          }
          
          .dropdown-item {
            padding: 14px 18px;
            min-height: 48px;
          }
        }
      `}</style>
    </div>
  )
}
