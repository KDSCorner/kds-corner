/* eslint-disable @next/next/no-img-element */
'use client'

import Script from 'next/script'
import Link from 'next/link'
import { AuthProvider } from '../lib/auth-context'
import UserProfile from '../components/UserProfile'

export default function HomePage() {
  return (
    <AuthProvider>
      {/* Legacy scripts from public/scripts */}
      <Script src="/scripts/main.js" strategy="afterInteractive" />
      <Script src="/scripts/animations.js" strategy="afterInteractive" />

      {/* Navigation */}
      <nav className="navbar" id="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <a href="/">
              <img src="/logo.svg" alt="K Logo" width="32" height="32" />
              <span className="logo-text">KDS Corner</span>
            </a>
          </div>
          
          <div className="nav-center">
            <ul className="nav-menu" id="nav-menu">
              <li className="nav-item"><a href="#home" className="nav-link active">Home</a></li>
              <li className="nav-item"><a href="#about" className="nav-link">About</a></li>
              <li className="nav-item"><a href="#services" className="nav-link">Services</a></li>
              <li className="nav-item"><a href="#portfolio" className="nav-link">Portfolio</a></li>
              <li className="nav-item"><a href="#contact" className="nav-link">Contact</a></li>
            </ul>
          </div>
          
          <div className="nav-right">
            <div className="nav-auth">
              <UserProfile />
            </div>
            
            <div className="nav-toggle" id="nav-toggle">
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                <span className="hero-greeting typewriter" id="greeting">Selamat Datang di</span>
                <span className="hero-name" id="heroName" style={{ opacity: 0 }}>KDS Corner</span>
                <span className="hero-role" id="heroRole" style={{ opacity: 0 }}>Your Creative Digital Solutions Partner</span>
              </h1>
              <p className="hero-description">
                KDS Corner adalah tempat di mana kreativitas bertemu dengan teknologi. Kami menghadirkan solusi digital yang inovatif untuk kebutuhan website, aplikasi mobile, dan berbagai layanan kreatif lainnya dengan pendekatan yang ramah dan profesional.
              </p>
              <div className="hero-buttons">
                <a href="#portfolio" className="btn btn-primary">View My Work</a>
                <a href="#contact" className="btn btn-secondary">Get In Touch</a>
              </div>
            </div>
            <div className="hero-image">
              <div className="hero-image-container">
                <div className="hero-image-bg"></div>
                <div className="hero-image-overlay">
                  <img src="/assets/images/hero-image.jpg" alt="Hero Image" />
                </div>
              </div>
            </div>
          </div>
          <div className="hero-scroll">
            <div className="scroll-indicator">
              <span>Scroll Down</span>
              <i className="fas fa-arrow-down"></i>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
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

      {/* Services Section */}
      <section id="services" className="services">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Layanan</h2>
            <p className="section-subtitle">Apa yang bisa saya lakukan untuk Anda</p>
          </div>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon"><i className="fas fa-code"></i></div>
              <h3>Website Development</h3>
              <p>Membuat website yang intuitif dan menarik dengan fokus pada pengalaman pengguna dan kemudahan penggunaan.</p>
              <div className="service-features">
                <span>HTML/CSS/JS</span>
                <span>React/Next.js</span>
                <span>Responsive Design</span>
              </div>
            </div>
            <div className="service-card">
              <div className="service-icon"><i className="fab fa-android"></i></div>
              <h3>Android App Developer</h3>
              <p>Membuat aplikasi android yang menarik interaktif mudah digunakan dengan mengutamakan kenyamanan penggunanya.</p>
              <div className="service-features">
                <span>Mobile UI</span>
                <span>Flutter/Dart</span>
                <span>App Design</span>
              </div>
            </div>
            <div className="service-card">
              <div className="service-icon"><i className="fas fa-desktop"></i></div>
              <h3>Desktop App</h3>
              <p>Membangun aplikasi desktop lintas platform yang cepat, stabil, dan mudah digunakan.</p>
              <div className="service-features">
                <span>Electron/Tauri</span>
                <span>Windows/macOS</span>
                <span>Auto Update</span>
              </div>
            </div>
            <div className="service-card">
              <div className="service-icon"><i className="fas fa-user-tie"></i></div>
              <h3>Joki Tugas</h3>
              <p>Joki tugas adalah jasa yang membantu Anda menyelesaikan tugas sekolah atau kuliah dengan cepat dan efektif untuk kalian yang sibuk dan kepala puyeng.</p>
              <div className="service-features">
                <span>Ramah & Tidak Toxic</span>
                <span>Frendly & Professional</span>
                <span>Murah & Terjangkau</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="portfolio">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Portfolio</h2>
            <p className="section-subtitle">My recent work</p>
          </div>
          <div className="portfolio-empty">
            <div className="empty-icon"><i className="fas fa-box-open"></i></div>
            <h3>Belum ada project</h3>
            <p>Project akan muncul di sini ketika sudah tersedia.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Get In Touch</h2>
            <p className="section-subtitle">Mari berkolaborasi dan wujudkan ide Anda menjadi kenyataan</p>
          </div>
          
          <div className="contact-content-grid">
            {/* Contact Form */}
            <div className="contact-form">
              <form id="contact-form">
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="name">Nama</label>
                    <input type="text" id="name" name="name" placeholder="Nama Anda" />
                    <div className="form-error" id="name-error"></div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="anda@example.com" />
                    <div className="form-error" id="email-error"></div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subjek</label>
                  <input type="text" id="subject" name="subject" placeholder="Bagaimana saya bisa membantu?" />
                  <div className="form-error" id="subject-error"></div>
                </div>
                <div className="form-group">
                  <label htmlFor="message">Pesan</label>
                  <textarea id="message" name="message" rows={5} placeholder="Ceritakan tentang project Anda..."></textarea>
                  <div className="form-error" id="message-error"></div>
                </div>
                <button type="submit" className="btn btn-primary form-submit">
                  <span className="btn-text">Kirim Pesan</span>
                  <span className="btn-loading" style={{ display: 'none' }}>
                    <i className="fas fa-spinner fa-spin"></i>
                    <span style={{ marginLeft: 8 }}>Mengirim...</span>
                  </span>
                </button>
                <div id="form-success" className="form-success" style={{ display: 'none' }}>
                  <i className="fas fa-check-circle"></i>
                  <span>Pesan berhasil terkirim!</span>
                </div>
              </form>
            </div>

            {/* Contact Info */}
            <div className="contact-info">
              <div className="contact-info-card">
                <h3>Informasi Kontak</h3>
                
                <div className="contact-details">
                  <div className="contact-item">
                    <div className="contact-icon">
                      <i className="fas fa-envelope"></i>
                    </div>
                    <div className="contact-text">
                      <div className="contact-label">Email</div>
                      <div className="contact-value">kurdwisap04@gmail.com</div>
                    </div>
                  </div>
                  
                  <div className="contact-item">
                    <div className="contact-icon">
                      <i className="fab fa-whatsapp"></i>
                    </div>
                    <div className="contact-text">
                      <div className="contact-label">WhatsApp</div>
                      <div className="contact-value">+62 821-3452-8638</div>
                    </div>
                  </div>
                  
                  <div className="contact-item">
                    <div className="contact-icon">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <div className="contact-text">
                      <div className="contact-label">Lokasi</div>
                      <div className="contact-value">Brebes, Indonesia</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="contact-social-card">
                <h3>Ikuti Saya</h3>
                
                <div className="contact-social-links">
                  <a href="https://github.com/Tiveey" className="social-contact-link" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github"></i>
                  </a>
                  
                  <a href="https://www.linkedin.com/in/kurniawan-dwi-saputra-b20000200/" className="social-contact-link" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-linkedin"></i>
                  </a>
                  
                  <a href="https://www.instagram.com/kurdwisap04/" className="social-contact-link" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-instagram"></i>
                  </a>
                  
                  <a href="https://www.facebook.com/tiveey/" className="social-contact-link" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-facebook"></i>
                  </a>
                </div>
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
                  <img src="/logo.svg" alt="K Logo" width="50" height="50" style={{ filter: 'brightness(0) invert(1)' }} />
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
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#services">Services</a></li>
                    <li><a href="#portfolio">Portfolio</a></li>
                    <li><a href="#contact">Contact</a></li>
                  </ul>
                </div>
                <div className="footer-section">
                  <h4>Services</h4>
                  <ul>
                    <li><a href="#services">Web Development</a></li>
                    <li><a href="#services">Android App Developer</a></li>
                    <li><a href="#services">Joki Tugas</a></li>
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
            </div>
          </div>
        </div>
      </footer>
    </AuthProvider>
  )
}
