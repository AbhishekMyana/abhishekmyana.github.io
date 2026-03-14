import { personalInfo } from '../data/resume.js'

export default function Contact() {
  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="contact-inner reveal">
          <span className="section-tag">Contact</span>
          <h2 className="section-title">Let&apos;s Connect</h2>
          <p className="contact-sub">
            Whether it&apos;s a collaboration, an opportunity or just a conversation — my inbox is always open.
          </p>
          <div className="contact-actions">
            <a href={`mailto:${personalInfo.email}`} className="btn btn-primary btn-lg">
              Send an Email
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-lg"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
