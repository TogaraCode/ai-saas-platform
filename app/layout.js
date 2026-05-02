export const metadata = {
  title: "NEXUS CORE — AI SaaS Engine",
  description: "Validate and build AI SaaS ideas with data-driven intelligence"
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Space+Grotesk:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>

      <body
        style={{
          margin: 0,
          fontFamily: "'Orbitron','Space Grotesk',system-ui",
          background: "#020617"
        }}
      >
        {children}
      </body>
    </html>
  )
}
