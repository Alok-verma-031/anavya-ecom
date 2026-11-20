import React from 'react'
import '../styles/Home.css'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Categories from '../components/Categories'
import PromoBanners from '../components/PromoBanners'
import Footer from '../components/Footer'
import WhyChoose from '../components/WhyChoose'
import Testimonials from '../components/Testimonials'
import Newsletter from '../components/Newsletter'
import TrendingProducts from '../components/TrendingProducts'

const Home = () => {
  return (
    <>
    <Navbar/>
    <Hero/>
    <Categories/>
    <TrendingProducts/>
    <PromoBanners/>
    <WhyChoose/>
    <Testimonials/>
    <Newsletter/>
    <Footer/>
    </>
  )
}

export default Home