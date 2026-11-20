import React from 'react'

const benefits = [
  {
    id: 1,
    icon: 'bi-gem',
    title: 'Premium Quality',
    text: 'Thoughtfully selected products',
  },
  {
    id: 2,
    icon: 'bi-shield-check',
    title: 'Secure Payment',
    text: 'A smooth, secure checkout',
  },
  {
    id: 3,
    icon: 'bi-truck',
    title: 'Fast Delivery',
    text: 'Delivery across India',
  },
  {
    id: 4,
    icon: 'bi-headset',
    title: 'Helpful Support',
    text: "We're here when you need us",
  },
  
]

const WhyChoose = () => {
  return (
    <section className="benefits section-space" id="about">
      <div className="container">
        <div className="text-center mb-4">
          <div className="section-kicker">The ANAVAYA promise</div>
          <h2 className="section-title mb-0">Why Choose ANAVAYA?</h2>
          <div className="gold-line"></div>
        </div>

        <div className="row g-3">
          {benefits.map((item) => (
            <div key={item.id} className="col-6 col-lg-3">
              <div className="benefit-item">
                <i className={`bi ${item.icon} benefit-icon`} />
                <h5>{item.title}</h5>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChoose