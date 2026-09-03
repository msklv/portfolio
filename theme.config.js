const YEAR = new Date().getFullYear()

export default {
  darkMode: true,
  footer: (
    <small className="site-footer">
      <span>
        <time>{YEAR}</time> © Михаил Соколов, Architect 🔗 Manager в Tech &
        AI, 💻 👨‍👩‍👧‍👦 🐕 🚴‍♂️ ⚛
      </span>
      <a href="/feed.xml">RSS</a>
      <style jsx>{`
        .site-footer {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 1.5rem;
          margin-top: 6rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border);
          color: var(--fg-muted);
        }
        .site-footer a {
          flex-shrink: 0;
          color: var(--fg-muted);
        }
        .site-footer a:hover {
          color: var(--accent);
        }
        @media screen and (max-width: 480px) {
          .site-footer {
            flex-direction: column;
            gap: 0.5rem;
          }
          article {
            padding-top: 2rem;
            padding-bottom: 4rem;
          }
        }
      `}</style>
    </small>
  )
}
