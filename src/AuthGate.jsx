// src/AuthGate.jsx
// BioVise Health — Authentication gate
// Shows Clerk login/signup UI to unauthenticated visitors.
// Authenticated users pass straight through to the main app.
import { SignedIn, SignedOut, SignIn } from '@clerk/clerk-react'
export default function AuthGate({ children }) {
  return (
    <>
      {/* ── Signed out: show centered login wall ── */}
      <SignedOut>
        <div style={{
          minHeight: '100vh',
          background: '#F2F4F7',
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
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#6B9EC8">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <span style={{
              fontSize: 24,
              fontWeight: 800,
              color: '#1C3D5A',
              fontFamily: "'Playfair Display', Georgia, serif",
              letterSpacing: '-.3px',
            }}>BioVise Health</span>
          </div>
          {/* Clerk sign-in component — no routing prop for SPA compatibility */}
          <SignIn
            appearance={{
              variables: {
                colorPrimary: '#1C3D5A',
                colorBackground: '#ffffff',
                colorInputBackground: '#F2F4F7',
                colorInputText: '#111827',
                borderRadius: '10px',
                fontFamily: "'DM Sans', sans-serif",
              },
              elements: {
                card: {
                  boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                  border: '1px solid #DDE3EB',
                  borderRadius: '16px',
                },
                headerTitle: {
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: '20px',
                  fontWeight: '700',
                  color: '#1C3D5A',
                },
                headerSubtitle: {
                  fontSize: '13px',
                  color: '#6B7280',
                },
                socialButtonsBlockButton: {
                  borderRadius: '10px',
                  border: '1.5px solid #DDE3EB',
                },
                formButtonPrimary: {
                  background: '#1C3D5A',
                  borderRadius: '10px',
                  fontSize: '15px',
                  fontWeight: '700',
                  fontFamily: "'DM Sans', sans-serif",
                },
                footerActionLink: {
                  color: '#2D5F8A',
                  fontWeight: '600',
                },
              },
            }}
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
              style={{ color: '#1C3D5A', fontWeight: 600, textDecoration: 'none' }}
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
