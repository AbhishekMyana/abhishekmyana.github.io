export default function About() {
  const eduCards = [
    {
      icon: '🎓',
      title: 'VJTI, Mumbai',
      sub: 'B.Tech · ECE · 2021',
      badge: '8.04 / 10',
    },
    {
      icon: '🏆',
      title: 'GATE CS 2021',
      sub: 'Computer Science',
      badge: 'AIR 800',
    },
    {
      icon: '📍',
      title: 'Location',
      sub: 'Mumbai · Bangalore',
      badge: 'India',
    },
    {
      icon: '🚀',
      title: 'JEE Advanced 2017',
      sub: 'Engineering Entrance',
      badge: 'AIR 6930',
    },
  ]

  return (
    <section className="section" id="about">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">About</span>
          <h2 className="section-title">The Story So Far</h2>
        </div>

        <div className="about-grid">
          <div className="about-text reveal">
            <p className="lead">
              I&apos;m a Senior Software Engineer at Samsung R&amp;D Bangalore, where I design and develop LTE MAC
              layer features — from Network Sharing and QoS Scheduling to Power Allocation.
            </p>
            <p>
              With a B.Tech in Electronics &amp; Communication from VJTI Mumbai (8.04 CGPA), I ranked{' '}
              <strong>AIR 800 in GATE CS 2021</strong> and <strong>AIR 6930 in JEE Advanced 2017</strong>. My
              stack spans embedded systems to full-stack web — C/C++, Python, Django, ReactJS, AWS and beyond.
            </p>
            <p>
              I&apos;ve travelled to Samsung HQ in South Korea, cleared the Professional level Software
              Competency Test, and love delivering training sessions that make complex LTE concepts click.
            </p>
            <div className="about-links">
              <a href="mailto:amyana.email@gmail.com" className="link-pill">
                amyana.email@gmail.com
              </a>
              <a
                href="https://linkedin.com/in/abhishekmyana"
                target="_blank"
                rel="noopener noreferrer"
                className="link-pill"
              >
                LinkedIn ↗
              </a>
            </div>
          </div>

          <div className="about-cards reveal">
            {eduCards.map((card) => (
              <div key={card.title} className="edu-card glass">
                <div className="edu-icon">{card.icon}</div>
                <div>
                  <h4>{card.title}</h4>
                  <p>{card.sub}</p>
                  <span className="badge">{card.badge}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
