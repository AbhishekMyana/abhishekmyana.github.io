import { useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import { posts } from '../data/posts.jsx'

export default function BlogPost() {
  const { id } = useParams()
  const post = posts.find((p) => p.id === id)

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [id])

  if (!post) {
    return <Navigate to="/blog" replace />
  }

  return (
    <>
      <Navbar alwaysScrolled />

      <main className="blog-post-page">
        <div className="blog-post-hero section-alt">
          <div className="container">
            <Link to="/blog" className="back-link">
              ← Back to Blog
            </Link>
            <div className="post-meta-row">
              <span className="blog-category">{post.category}</span>
              <span className="blog-date">{post.date}</span>
              <span className="blog-read-time">{post.readTime}</span>
            </div>
            <h1 className="post-title">{post.title}</h1>
          </div>
        </div>

        <div className="blog-post-body">
          <div className="container">
            <article className="post-content">
              <post.Content />
            </article>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
