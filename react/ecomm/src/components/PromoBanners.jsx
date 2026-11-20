import React from 'react'

const banners = [
  {
    id: 1,
    className: 'promo-arrivals',
    kicker: 'Just dropped',
    title: 'New Arrivals',
    text: 'Be the first to discover the latest trends.',
    button: 'Explore More',
    link: '#trending',
  },
  {
    id: 2,
    className: 'promo-sale',
    kicker: 'Limited time offer',
    title: 'Up to 50% OFF',
    text: 'Refresh your fashion and lifestyle favourites.',
    button: 'Shop Offers',
    link: '#trending',
  },
]

const PromoBanners = () => {
  return (
    <section className="pb-5" id="new-arrivals">
      <div className="container">
        <div className="row g-3">
          {banners.map((banner) => (
            <div key={banner.id} className="col-lg-6">
              <div className={`promo-banner ${banner.className}`}>
                <div className="promo-content">
                  <div className="section-kicker text-warning">{banner.kicker}</div>
                  <h3>{banner.title}</h3>
                  <p className="mb-3">{banner.text}</p>
                  <a href={banner.link} className="btn btn-gold">
                    {banner.button} <i className="bi bi-arrow-right ms-1" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PromoBanners