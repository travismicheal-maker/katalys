// src/AuthGate.jsx
// Katalys Health — Authentication gate
// Shows Clerk login/signup UI to unauthenticated visitors.
// Authenticated users pass straight through to the main app.
// Renders on every page automatically — no per-page wiring needed.

import { SignedIn, SignedOut, SignIn } from '@clerk/clerk-react'

export default function AuthGate({ children }) {
  return (
    <>
      {/* ── Signed out: show centered login wall ── */}
      <SignedOut>
        <div style={{
          minHeight: '100vh',
          background: '#F8FAF8',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
        }}>
          {/* Brand header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            marginBottom: 28,
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#52B788">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <span style={{
              fontSize: 24,
              fontWeight: 800,
              color: '#1B4332',
              fontFamily: "'Playfair Display', Georgia, serif",
              letterSpacing: '-.3px',
            }}>Katalys Health</span>
          </div>

          {/* Clerk sign-in component */}
          <SignIn
            appearance={{
              variables: {
                colorPrimary: '#1B4332',
                colorBackground: '#ffffff',
                colorInputBackground: '#F8FAF8',
                colorInputText: '#111827',
                borderRadius: '10px',
                fontFamily: "'DM Sans', sans-serif",
              },
              elements: {
                card: {
                  boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                  border: '1px solid #E5E1D8',
                  borderRadius: '16px',
                },
                headerTitle: {
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: '20px',
                  fontWeight: '700',
                  color: '#1B4332',
                },
                headerSubtitle: {
                  fontSize: '13px',
                  color: '#6B7280',
                },
                socialButtonsBlockButton: {
                  borderRadius: '10px',
                  border: '1.5px solid #E5E1D8',
                },
                formButtonPrimary: {
                  background: '#1B4332',
                  borderRadius: '10px',
                  fontSize: '15px',
                  fontWeight: '700',
                  fontFamily: "'DM Sans', sans-serif",
                  '&:hover': { background: '#2D6A4F' },
                },
                footerActionLink: {
                  color: '#2D6A4F',
                  fontWeight: '600',
                },
              },
            }}
            routing="hash"
            redirectUrl="/"
          />

          {/* Footer */}
          <div style={{
            marginTop: 24,
            fontSize: 11,
            color: '#9CA3AF',
            textAlign: 'center',
            lineHeight: 1.7,
          }}>
            Powered by{' '}
            <a
              href="https://www.bioprecisionaging.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#1B4332', fontWeight: 600, textDecoration: 'none' }}
            >
              Bio Precision Aging
            </a>
            <br />
            For clinical decision-support purposes only.
          </div>
        </div>
      </SignedOut>

      {/* ── Signed in: render the full app ── */}
      <SignedIn>
        {children}
      </SignedIn>
    </>
  )
}
