import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <Link to="/" className="nav-logo">
            AM<span className="dot">.</span>
          </Link>
          <p>© {new Date().getFullYear()} Abhishek Myana. Designed with care.</p>
          <div className="footer-links">
            <a href="mailto:amyana.email@gmail.com">Email</a>
            <a href="https://linkedin.com/in/abhishekmyana" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <Link to="/blog">Blog</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
