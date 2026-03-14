import { skills, courses } from '../data/resume.js'

export default function Skills() {
  const skillGroups = Object.entries(skills)

  return (
    <section className="section section-alt" id="skills">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">Skills</span>
          <h2 className="section-title">Tech Stack</h2>
        </div>

        <div className="skills-layout">
          {skillGroups.map(([group, items]) => (
            <div key={group} className="skill-group reveal">
              <h4 className="skill-group-title">{group}</h4>
              <div className="skill-chips">
                {items.map((item) => (
                  <span key={item} className="chip">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="courses-section reveal">
          <h4 className="skill-group-title">Certifications &amp; Courses</h4>
          <div className="courses-grid">
            {courses.map((course) => (
              <div key={course.title} className="course-card glass">
                <span className="course-icon">{course.icon}</span>
                <span>{course.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
