import React from 'react'

const links = [
  { name: 'Home', href: '#' },
  { name: 'Services', href: '#' },
  { name: 'About', href: '#' },
  { name: 'Contact', href: '#' },
]

export default function Footer() {
  return (
    <footer className="bg-[#0f0f0f] text-gray-300 py-12 px-6 mt-24 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-8 md:flex-row md:justify-between">
        <div className="text-lg font-semibold">Techno Tech</div>
        <nav className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
          {links.map(link => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>
        <p className="text-sm text-gray-400 text-center md:text-right">
          © 2025 Techno Tech Inc. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

