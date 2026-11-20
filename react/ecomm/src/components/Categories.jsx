import React, { useEffect, useState } from 'react'
import { getAllCategory } from '../services/CategoriesServise';
const Categories = () => {
  const [categories, setCategories] = useState([]);
  useEffect(()=>{
    const allCategories=async ()=>
    {
      try{
        const response=await getAllCategory();
        setCategories(response.data);
        console.log(categories)
      }catch(error)
      {
        console.error("Failed to fetch categories:", error);
      }
    };
    allCategories();
  },[]);
  return (
    <section className="section-space" id="categories">
      <div className="container">
        <div className="text-center mb-5">
          <div className="section-kicker">Find your favourites</div>
          <h2 className="section-title mb-0">Shop by Categories</h2>
          <div className="gold-line"></div>
        </div>

        <div className="row g-3">
          {categories.map((category) => (
            <div key={category.id} className="col-6 col-md-4 col-lg-2">
              <a className="category-card" href="#trending">
                <img src={`http://localhost:8080/uploads/category/${category.imagePath}`} alt={category.categoryName} />
                <span className="category-label">{category.categoryName}</span>
                <span className="category-desc">{category.description}</span> 
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Categories