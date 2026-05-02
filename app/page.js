function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      
      <svg width="160" height="40" viewBox="0 0 300 80">
        
        {/* Glow background */}
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Text */}
        <text
          x="0"
          y="50"
          fontSize="42"
          fontWeight="800"
          fill="url(#grad)"
          filter="url(#glow)"
          style={{ letterSpacing: "4px" }}
        >
          TOGARA
        </text>
      </svg>

    </div>
  )
}
