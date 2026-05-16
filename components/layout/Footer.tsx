import Image from 'next/image'
import Link from 'next/link'

const FOOTER_LINKS = [
  { label: 'Use Cases', href: '/use-cases' },
  { label: 'Tools', href: '/tools' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="border-t border-border-subtle bg-surface"
      role="contentinfo"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-2">
            <Link
              href="/"
              className="w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
              aria-label="Flowithm — home"
            >
              <Image
                src="/flowithm_wordmark.webp"
                alt="Flowithm"
                width={300}
                height={80}
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-sm text-text-muted max-w-xs">
              From Algorithm to Impact — AI Systems. Real Outcomes.
            </p>
          </div>

          {/* Nav links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-6 gap-y-2" role="list">
              {FOOTER_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-text-muted hover:text-text-primary transition-colors duration-150"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="flex flex-col gap-1">
            <a
              href="mailto:hello@flowithm.io"
              className="text-sm text-text-muted hover:text-primary transition-colors duration-150"
              aria-label="Email Flowithm"
            >
              hello@flowithm.io
            </a>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="mt-10 pt-6 border-t border-border-subtle flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-xs text-text-muted">
            &copy; {year} Flowithm. All rights reserved.
          </p>
          <p className="text-xs text-text-muted">
            Where AI Meets Execution
          </p>
        </div>
      </div>
    </footer>
  )
}
