'use client'

import { useState, useEffect } from 'react'

interface OnboardingSlide {
  id: number
  image: string
  title: string
  description: string
}

const onboardingSlides: OnboardingSlide[] = [
  {
    id: 1,
    image: '/assets/onboard/onboard_one.png',
    title: 'Boost Your Productivity',
    description: 'Streamline your workflow with powerful tools designed to help you achieve more in less time.'
  },
  {
    id: 2,
    image: '/assets/onboard/onboard_two.png',
    title: 'Collaborate Seamlessly',
    description: 'Work together with your team effortlessly, share ideas, and bring projects to life.'
  },
  {
    id: 3,
    image: '/assets/onboard/onboard_three.png',
    title: 'Track Your Progress',
    description: 'Monitor your achievements and stay motivated with detailed analytics and insights.'
  }
]

interface OnboardingSliderProps {
  className?: string
  autoPlayInterval?: number
}

export default function OnboardingSlider({ 
  className = '',
  autoPlayInterval = 4000 
}: OnboardingSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set())
  const [imagesLoaded, setImagesLoaded] = useState<Set<number>>(new Set())

  // Auto play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % onboardingSlides.length)
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [autoPlayInterval, isAutoPlaying])

  const goToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex)
    setIsAutoPlaying(false) // Pause auto play when user manually navigates
    
    // Resume auto play after 5 seconds
    setTimeout(() => {
      setIsAutoPlaying(true)
    }, 5000)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % onboardingSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + onboardingSlides.length) % onboardingSlides.length)
  }

  const handleImageLoad = (index: number) => {
    setImagesLoaded(prev => new Set([...prev, index]))
  }

  const handleImageError = (index: number) => {
    setImageErrors(prev => new Set([...prev, index]))
    console.error(`Failed to load image: ${onboardingSlides[index].image}`)
  }

  return (
    <div className={`onboarding-slider ${className}`}>
      <div className="slider-container">
        {/* Main Image Container */}
        <div className="image-container">
          <div 
            className="slides-wrapper"
            style={{
              transform: `translateX(-${currentSlide * 33.333}%)`,
              transition: 'transform 0.5s ease-in-out'
            }}
          >
            {onboardingSlides.map((slide, index) => (
              <div key={slide.id} className="slide">
                <div className="image-wrapper">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="slide-image"
                    onLoad={() => handleImageLoad(index)}
                    onError={() => handleImageError(index)}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      display: imageErrors.has(index) ? 'none' : 'block'
                    }}
                  />
                  {imageErrors.has(index) && (
                    <div className="image-fallback">
                      <div className="fallback-icon">📷</div>
                      <p>Image not found</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button 
          className="nav-arrow nav-arrow-left"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <button 
          className="nav-arrow nav-arrow-right"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>

      {/* Slide Content */}
      <div className="slide-content">
        <h3 className="slide-title">
          {onboardingSlides[currentSlide].title}
        </h3>
        <p className="slide-description">
          {onboardingSlides[currentSlide].description}
        </p>
      </div>

      {/* Dots Indicator */}
      <div className="dots-indicator">
        {onboardingSlides.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          >
            <span className="dot-inner"></span>
          </button>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{
            width: `${((currentSlide + 1) / onboardingSlides.length) * 100}%`,
            transition: 'width 0.3s ease'
          }}
        ></div>
      </div>

      <style jsx>{`
        .onboarding-slider {
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 500px;
          width: 100%;
        }

        .slider-container {
          position: relative;
          width: 100%;
          margin-bottom: 2rem;
        }

        .image-container {
          width: 100%;
          height: 350px;
          overflow: hidden;
          position: relative;
        }

        .slides-wrapper {
          display: flex;
          width: 300%;
          height: 100%;
        }

        .slide {
          width: 33.333%;
          height: 100%;
          flex-shrink: 0;
        }


        .image-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          padding: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .slide-image {
          border-radius: 0.5rem;
        }

        .image-fallback {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          color: #6b7280;
        }

        .fallback-icon {
          font-size: 3rem;
          margin-bottom: 0.5rem;
        }

        .image-fallback p {
          margin: 0;
          font-size: 0.875rem;
        }

        .nav-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: none;
          background: rgba(255, 255, 255, 0.9);
          color: #374151;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 2;
          font-size: 0.875rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .nav-arrow:hover {
          background: white;
          transform: translateY(-50%) scale(1.1);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }

        .nav-arrow-left {
          left: 10px;
        }

        .nav-arrow-right {
          right: 10px;
        }

        .slide-content {
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .slide-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 0.75rem;
          transition: all 0.3s ease;
        }

        .slide-description {
          font-size: 1rem;
          color: #6b7280;
          line-height: 1.6;
          max-width: 400px;
          margin: 0 auto;
          transition: all 0.3s ease;
        }

        .dots-indicator {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .dot {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .dot-inner {
          display: block;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #d1d5db;
          transition: all 0.3s ease;
        }

        .dot.active .dot-inner {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          transform: scale(1.2);
        }

        .dot:hover .dot-inner {
          background: #9ca3af;
          transform: scale(1.1);
        }

        .dot.active:hover .dot-inner {
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
        }

        .progress-bar {
          width: 100%;
          height: 4px;
          background: #e5e7eb;
          border-radius: 2px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #6366f1, #8b5cf6);
          border-radius: 2px;
          transition: width 0.3s ease;
        }

        /* Animation for slide content changes */
        .slide-title,
        .slide-description {
          animation: fadeInUp 0.5s ease;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Mobile responsiveness */
        @media (max-width: 768px) {
          .onboarding-slider {
            max-width: 100%;
            width: 100%;
            padding: 0;
          }

          .slider-container {
            margin-bottom: var(--spacing-lg, 1.5rem);
            width: 100%;
            max-width: 100%;
          }

          .image-container {
            height: 220px;
            width: 100%;
            max-width: 100%;
            overflow: hidden;
            border-radius: 0.75rem;
          }

          .image-wrapper {
            padding: 0.75rem;
          }

          .slide-image {
            width: 100%;
            height: 100%;
            object-fit: contain;
            object-position: center;
            border-radius: 0.5rem;
            max-width: 100%;
            max-height: 100%;
          }

          .slide-content {
            margin-bottom: var(--spacing-md, 1rem);
            padding: 0 var(--spacing-sm, 0.5rem);
          }

          .slide-title {
            font-size: clamp(1.125rem, 4vw, 1.375rem);
            line-height: 1.3;
            margin-bottom: var(--spacing-sm, 0.5rem);
          }

          .slide-description {
            font-size: clamp(0.8rem, 3.5vw, 0.9rem);
            line-height: 1.5;
            max-width: 100%;
          }

          .nav-arrow {
            width: 32px;
            height: 32px;
            font-size: 0.75rem;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
          }

          .nav-arrow-left {
            left: 4px;
          }

          .nav-arrow-right {
            right: 4px;
          }

          .dots-indicator {
            gap: var(--spacing-sm, 0.5rem);
            margin-bottom: var(--spacing-sm, 0.5rem);
          }

          .progress-bar {
            height: 3px;
          }
        }

        @media (max-width: 480px) {
          .onboarding-slider {
            max-width: 100%;
            padding: 0;
          }

          .image-container {
            height: 180px;
            border-radius: 0.5rem;
          }

          .image-wrapper {
            padding: 0.5rem;
          }

          .slide-content {
            padding: 0 var(--spacing-xs, 0.25rem);
            margin-bottom: var(--spacing-sm, 0.5rem);
          }

          .slide-title {
            font-size: clamp(1rem, 4vw, 1.25rem);
            line-height: 1.2;
            margin-bottom: var(--spacing-xs, 0.25rem);
          }

          .slide-description {
            font-size: clamp(0.75rem, 3vw, 0.85rem);
            line-height: 1.4;
          }

          .nav-arrow {
            width: 28px;
            height: 28px;
            font-size: 0.65rem;
          }

          .nav-arrow-left {
            left: 2px;
          }

          .nav-arrow-right {
            right: 2px;
          }

          .dots-indicator {
            gap: var(--spacing-xs, 0.25rem);
            margin-bottom: var(--spacing-xs, 0.25rem);
          }

          .dot-inner {
            width: 7px;
            height: 7px;
          }

          .progress-bar {
            height: 2px;
          }
        }

        @media (max-width: 360px) {
          .image-container {
            height: 160px;
          }

          .image-wrapper {
            padding: 0.375rem;
          }

          .slide-title {
            font-size: clamp(0.95rem, 3.5vw, 1.125rem);
          }

          .slide-description {
            font-size: clamp(0.7rem, 2.8vw, 0.8rem);
          }

          .nav-arrow {
            width: 24px;
            height: 24px;
            font-size: 0.6rem;
          }

          .dot-inner {
            width: 6px;
            height: 6px;
          }
        }

        /* Pause animation on hover */
        .onboarding-slider:hover .progress-fill {
          animation-play-state: paused;
        }

      `}</style>
    </div>
  )
}
