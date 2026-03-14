import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import useReveal from '../hooks/useReveal.js'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import { posts } from '../data/posts.jsx'

export default function BlogList() {
  useReveal()

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [])

  return (
    <>
      <Navbar alwaysScrolled />

      <main>
        <div className="blog-hero section-alt">
          <div className="container">
            <div className="blog-hero-content reveal">
              <span className="section-tag">Blog</span>
              <h1 className="section-title" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', marginTop: '12px' }}>
                Writing &amp; Thinking
              </h1>
              <p>
                Technical deep-dives on telecom systems, machine learning, full-stack development, and career advice — written from experience.
              </p>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="blog-grid" style={{ paddingTop: '64px' }}>
            {posts.map((post) => (
              <Link key={post.id} to={`/blog/${post.id}`} className="blog-card glass">
                <div className="blog-card-meta">
                  <span className="blog-category">{post.category}</span>
                  <span className="blog-date">{post.date}</span>
                  <span className="blog-read-time">{post.readTime}</span>
                </div>
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
                <span className="blog-card-cta">Read Article →</span>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
