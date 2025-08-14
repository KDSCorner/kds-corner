/* eslint-disable @next/next/no-img-element */
'use client'

import Link from 'next/link'
import Script from 'next/script'

export default function AboutPage() {
  return (
    <>
      {/* Legacy scripts from public/scripts */}
      <Script src="/scripts/main.js" strategy="afterInteractive" />

      {/* Navigation */}
      <nav className="navbar" id="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <Link href="/">
              <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="18" stroke="url(#logoGradient)" strokeWidth="2" fill="none" />
                <path d="M12 16L20 24L28 16" stroke="url(#logoGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="20" cy="20" r="3" fill="url(#logoGradient)" />
                <defs>
                  <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))' }} />
                    <stop offset="100%" style={{ stopColor: 'hsl(var(--secondary))' }} />
                  </linearGradient>
                </defs>
              </svg>
              <span>Wawan</span>
            </Link>
          </div>
          
          <div className="nav-center">
            <ul className="nav-menu" id="nav-menu">
              <li className="nav-item"><Link href="/" className="nav-link">Home</Link></li>
              <li className="nav-item"><Link href="/about" className="nav-link active">About</Link></li>
              <li className="nav-item"><Link href="/services" className="nav-link">Services</Link></li>
              <li className="nav-item"><Link href="/portfolio" className="nav-link">Portfolio</Link></li>
              <li className="nav-item"><Link href="/contact" className="nav-link">Contact</Link></li>
            </ul>
            
            <div className="nav-auth">
              <Link href="/login" className="btn btn-secondary">Login</Link>
            </div>
          </div>
          
          <div className="nav-toggle" id="nav-toggle">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </div>
      </nav>

      {/* About Section */}
      <section className="about" style={{ paddingTop: '120px' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Tentang Saya</h2>
            <p className="section-subtitle">Kenali lebih dekat denganku!</p>
          </div>
          <div className="about-content">
            <div className="about-text">
              <h3>Saya seorang pemimpi yang ingin jadi seorang developer</h3>
              <p>
                Saya adalah seorang lulusan SMA, memiliki pengalaman bekerja sebagai Crew Outlet di Restoran CFC dan sebagai Crew di Restoran CFC saya juga pernah Magang di Pemerintahan Desa sebagai Administrasi. Saya adalah seorang pemula dan selalu bersemangat dan berdedikasi untuk menjadi seorang developer.
              </p>
              <div className="about-stats">
                <div className="stat">
                  <div className="stat-number">50+</div>
                  <div className="stat-label">Projects Completed in my dream</div>
                </div>
                <div className="stat">
                  <div className="stat-number">30+</div>
                  <div className="stat-label">Happy Clients in my dream</div>
                </div>
                <div className="stat">
                  <div className="stat-number">5+</div>
                  <div className="stat-label">Years Experience in my dream</div>
                </div>
              </div>
            </div>
            <div className="about-skills">
              <h4>Skills & Expertise</h4>
              <div className="skills-grid">
                <div className="skill-item"><i className="fab fa-html5"></i><span>Website Development</span></div>
                <div className="skill-item"><i className="fab fa-android"></i><span>App Developer</span></div>
                <div className="skill-item"><i className="fas fa-mobile-alt"></i><span>Responsive Design</span></div>
                <div className="skill-item"><i className="fas fa-user-tie"></i><span>Administration</span></div>
                <div className="skill-item"><i className="fab fa-microsoft"></i><span>Microsoft Office</span></div>
                <div className="skill-item"><i className="fas fa-clock"></i><span>Time Management</span></div>
                <div className="skill-item"><i className="fas fa-language"></i><span>Etika Bahasa</span></div>
                <div className="skill-item"><i className="fas fa-user-friends"></i><span>Teamwork</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-bg"><div className="footer-pattern"></div></div>
        <div className="container">
          <div className="footer-content">
            <div className="footer-main">
              <div className="footer-brand">
                <div className="footer-logo">
                  <svg width="50" height="50" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="18" stroke="url(#footerLogoGradient)" strokeWidth="2" fill="none" />
                    <path d="M12 16L20 24L28 16" stroke="url(#footerLogoGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="20" cy="20" r="3" fill="url(#footerLogoGradient)" />
                    <defs>
                      <linearGradient id="footerLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#ffffff' }} />
                        <stop offset="100%" style={{ stopColor: '#e2e8f0' }} />
                      </linearGradient>
                    </defs>
                  </svg>
                  <h3>Kurniawan Dwi Saputra</h3>
                </div>
                <p className="footer-description">Seorang pemula yang sedang belajar pemrograman web dan pemrograman mobile apps.</p>
                <div className="footer-social">
                  <a href="https://www.instagram.com/kurdwisap04/" className="social-link"><i className="fab fa-instagram"></i></a>
                  <a href="https://wa.me/6282134528638" className="social-link"><i className="fab fa-whatsapp"></i></a>
                  <a href="https://github.com/Tiveey" className="social-link"><i className="fab fa-github"></i></a>
                  <a href="https://www.linkedin.com/in/kurniawan-dwi-saputra-b20000200/" className="social-link"><i className="fab fa-linkedin"></i></a>
                  <a href="https://www.facebook.com/tiveey/" className="social-link"><i className="fab fa-facebook"></i></a>
                </div>
              </div>
              <div className="footer-nav">
                <div className="footer-section">
                  <h4>Navigation</h4>
                  <ul>
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/about">About</Link></li>
                    <li><Link href="/services">Services</Link></li>
                    <li><Link href="/portfolio">Portfolio</Link></li>
                    <li><Link href="/contact">Contact</Link></li>
                  </ul>
                </div>
                <div className="footer-section">
                  <h4>Services</h4>
                  <ul>
                    <li><Link href="/services">Web Development</Link></li>
                    <li><Link href="/services">Android App Developer</Link></li>
                    <li><Link href="/services">Joki Tugas</Link></li>
                  </ul>
                </div>
                <div className="footer-section">
                  <h4>Contact Info</h4>
                  <ul className="contact-info">
                    <li><i className="fas fa-envelope"></i><span>kurdwisap04@gmail.com</span></li>
                    <li><i className="fab fa-whatsapp"></i><span>+6282134528638</span></li>
                    <li><i className="fas fa-map-marker-alt"></i><span>Brebes, Indonesia</span></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              <div className="footer-copyright">
                <p>&copy; 2025 Kurniawan Dwi Saputra. All rights reserved.</p>
              </div>
              <div className="footer-privacy">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
