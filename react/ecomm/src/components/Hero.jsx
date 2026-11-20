import React, { useState, useEffect } from 'react'

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=2000&q=85',
    eyebrow: 'Welcome to ANAVAYA',
    title: 'Discover Your ',
    highlight: 'Elegance.',
    text: 'Premium fashion. Thoughtful essentials. A better lifestyle — all in one place.',
    button: 'Shop Now',
    link: '#trending',
  },
  {
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=2000&q=85',
    eyebrow: 'Smart Electronics',
    title: 'Tech That ',
    highlight: 'Inspires.',
    text: 'Earbuds, gadgets and everyday tech designed to fit your style.',
    button: 'Explore Tech',
    link: '#categories',
  },
  {
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=2000&q=85',
    eyebrow: 'Accessories',
    title: 'Details That ',
    highlight: 'Define.',
    text: 'Watches, bags and accessories that complete every look.',
    button: 'Shop Accessories',
    link: '#trending',
  },
  {
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=2000&q=85',
    eyebrow: 'Limited Time Offer',
    title: 'Up to ',
    highlight: '50% Off.',
    text: 'Step into the season with footwear and fashion favourites.',
    button: 'Shop Offers',
    link: '#new-arrivals',
  },
]

const Hero = () => {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  // Auto-play every 5 seconds (pauses on hover; restarts when a dot is clicked)
  useEffect(() => {
    if (paused) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [paused, current])

  return (
    <section
      className="hero"
      id="home"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background images */}
      <div className="hero-bgs">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`hero-bg ${i === current ? 'active' : ''}`}
            style={{ '--bg': `url("${slide.image}")` }}
          />
        ))}
      </div>

      <div className="container hero-content">
        <div className="col-lg-7">
          {/* Text slides */}
          <div className="hero-text-stack">
            {slides.map((slide, i) => (
              <div key={i} className={`hero-text ${i === current ? 'active' : ''}`}>
                <div className="hero-eyebrow">{slide.eyebrow}</div>
                <h1>
                  {slide.title}
                  <span>{slide.highlight}</span>
                </h1>
                <p>{slide.text}</p>
                <a href={slide.link} className="btn btn-gold mt-3">
                  {slide.button} <i className="bi bi-arrow-right ms-2" />
                </a>
              </div>
            ))}
          </div>

          {/* Dots (below the button) */}
          <div className="hero-dots" role="tablist" aria-label="Hero slides">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`hero-dot ${i === current ? 'active' : ''}`}
                aria-label={`Slide ${i + 1}`}
                aria-selected={i === current}
                onClick={() => setCurrent(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero