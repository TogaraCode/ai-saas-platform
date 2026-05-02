export const metadata = {
  title: "AI SaaS Validator",
  description: "Validate your SaaS idea instantly"
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "sans-serif" }}>
        {children}
      </body>
    </html>
  )
}
