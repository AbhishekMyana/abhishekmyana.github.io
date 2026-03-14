import { experience } from '../data/resume.js'

export default function Experience() {
  return (
    <section className="section section-alt" id="experience">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">Experience</span>
          <h2 className="section-title">Where I&apos;ve Worked</h2>
        </div>

        <div className="timeline">
          {experience.map((job) => (
            <div key={job.id} className="timeline-item reveal">
              <div className="timeline-marker">
                <div className={`timeline-dot${job.active ? ' active' : ''}`} />
              </div>

              <div className="timeline-card glass">
                <div className="timeline-header">
                  <div>
                    <h3 className="company">{job.company}</h3>
                    <p className="role">{job.role}</p>
                  </div>
                  <div className="timeline-meta">
                    <span className="timeline-date">{job.period}</span>
                    <span className="timeline-loc">{job.location}</span>
                  </div>
                </div>

                <ul className="timeline-points">
                  {job.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>

                <div className="tag-list">
                  {job.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
