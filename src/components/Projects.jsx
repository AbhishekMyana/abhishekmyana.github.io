import { projects } from '../data/resume.js'

export default function Projects() {
  return (
    <section className="section" id="projects">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">Projects</span>
          <h2 className="section-title">Things I&apos;ve Built</h2>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card glass reveal">
              <div className="project-num">{project.num}</div>
              <div className="project-body">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
              <div className="project-footer">
                <div className="tag-list">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="project-date">{project.period}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
