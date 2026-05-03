
export default function Pricing() {
  return (
    <div style={root}>
      <div style={container}>

        <h1 style={{ marginBottom: 30 }}>Pricing</h1>

        <div style={grid}>

          <Plan
            title="Free"
            price="€0"
            features={[
              "Idea score",
              "Basic metrics"
            ]}
          />

          <Plan
            title="Pro"
            price="€50 + €10/mo"
            features={[
              "AI analysis",
              "2 validated ideas",
              "Market insights"
            ]}
          />

          <Plan
            title="Elite"
            price="€2000 + €100/mo"
            features={[
              "Full business plan",
              "Deployment-ready SaaS",
              "Ongoing optimization"
            ]}
            highlight
          />

        </div>

      </div>
    </div>
  )
}

function Plan({ title, price, features, highlight }) {
  return (
    <div style={{
      ...card,
      ...(highlight && { border: "2px solid #6366f1" })
    }}>
      <h3>{title}</h3>
      <div style={priceStyle}>{price}</div>

      <ul>
        {features.map(f => <li key={f}>{f}</li>)}
      </ul>

      <button style={btn}>Choose</button>
    </div>
  )
}

/* STYLES */
const root = { minHeight: "100vh", background: "#0a0f1c", color: "white" }
const container = { maxWidth: 1100, margin: "0 auto", padding: 24 }

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(3,1fr)",
  gap: 16
}

const card = {
  background: "#111827",
  padding: 20,
  borderRadius: 12
}

const priceStyle = { margin: "10px 0", fontSize: 20 }

const btn = {
  marginTop: 10,
  background: "#6366f1",
  padding: "10px 14px",
  border: "none",
  borderRadius: 8,
  color: "white"
}
