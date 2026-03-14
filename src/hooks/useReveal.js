import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function useReveal() {
  const location = useLocation()

  useEffect(() => {
    const elements = document.querySelectorAll('.reveal')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )

    // Small delay to allow DOM to settle after route change
    const timer = setTimeout(() => {
      elements.forEach((el) => {
        observer.observe(el)
      })
    }, 50)

    return () => {
      clearTimeout(timer)
      elements.forEach((el) => observer.unobserve(el))
    }
  }, [location.pathname])
}
