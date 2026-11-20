import React from 'react'

const Testimonials = () => {
    const reviews = [
  {
    name: "Rohit Sharma",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    text: "Great product quality and a smooth shopping experience. The packaging was lovely too.",
  },
  {
    name: "Priya Singh",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    text: "Easy to browse, easy to order, and my purchase arrived on time. I will shop again.",
  },
  {
    name: "Aman Verma",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
    text: "A clean website with a nice collection. The overall experience felt premium.",
  },
];
  return (
    <>
     <section className="section-space">
      <div className="container">
        <div className="text-center mb-5">
          <div className="section-kicker">Kind words</div>
          <h2 className="section-title mb-0">What Our Customers Say</h2>
          <div className="gold-line"></div>
        </div>

        <div className="row g-4">
          {reviews.map((review) => (
            <div className="col-md-4" key={review.name}>
              <article className="review-card h-100">
                <div className="d-flex align-items-center gap-3">
                  <img
                    className="review-avatar"
                    src={review.image}
                    alt=""
                    width="56"
                    height="56"
                    loading="lazy"
                  />
                  <div>
                    <div className="review-name">{review.name}</div>
                    <div
                      className="rating"
                      role="img"
                      aria-label="5 out of 5 stars"
                    >
                      ★★★★★
                    </div>
                  </div>
                </div>
                <blockquote>“{review.text}”</blockquote>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  )
}

export default Testimonials