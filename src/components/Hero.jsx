export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-bg">
        <div className="hero-grid" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
      </div>

      <div className="hero-content">
        <p className="hero-eyebrow reveal">Senior Software Engineer</p>
        <h1 className="hero-name reveal">
          Abhishek
          <br />
          <span className="text-gradient">Myana</span>
        </h1>
        <p className="hero-sub reveal">
          Building robust telecom systems at Samsung · LTE MAC Layer · Full-Stack Dev
        </p>
        <div className="hero-actions reveal">
          <a href="#projects" className="btn btn-primary">
            View Work
          </a>
          <a href="#contact" className="btn btn-ghost">
            Get in Touch
          </a>
        </div>
        <div className="hero-scroll reveal">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </div>

    </section>
  )
}
