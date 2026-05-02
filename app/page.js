"use client"
import { useState, useEffect } from "react"

export default function Home() {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const update = () => setWidth(window.innerWidth)
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  const isMobile = width < 768

  return (
    <div style={root}>

      {/* BACKGROUND */}
      <div style={bg}></div>
      <div style={grid}></div>

      <div style={content}>

        {/* HEADER */}
        <div style={header}>
          <div style={logo}>
            <span style={logoMain}>NEXUS</span>
            <span style={logoSub}>CORE</span>
          </div>

          {!isMobile && (
            <input placeholder="Search..." style={search} />
          )}

          <div style={rightIcons}>
            <CircleBtn icon="⚡" />
            <CircleBtn icon="👤" />
          </div>
        </div>

        {/* KPI STRIP */}
        <div style={kpiStrip}>
          <MiniKPI label="IDEAS" value="10,428" />
          <MiniKPI label="MRR" value="€3,072" />
          <MiniKPI label="GROWTH" value="+24.6%" />
          <MiniKPI label="RETENTION" value="57%" />
        </div>

        {/* MAIN GRID */}
        <div style={mainGrid}>

          {/* LEFT BIG PANEL */}
          <Panel title="VALIDATION ENGINE">
            <Flywheel />
          </Panel>

          {/* RIGHT PANEL */}
          <Panel title="TRACTION">
            <LineChart />
          </Panel>

          {/* FULL WIDTH */}
          <Panel title="MARKET OPPORTUNITY" full>
            <BarChart />
          </Panel>

          {/* METRICS */}
          <Panel title="UNIT ECONOMICS">
            <Stats />
          </Panel>

          <Panel title="FUNNEL">
            <Funnel />
          </Panel>

        </div>

      </div>

      {/* ANIMATIONS */}
      <style>{`
        @keyframes glow {
          0% { box-shadow: 0 0 10px #22d3ee }
          50% { box-shadow: 0 0 25px #a855f7 }
          100% { box-shadow: 0 0 10px #22d3ee }
        }

        @keyframes spin {
          from { transform: rotate(0deg) }
          to { transform: rotate(360deg) }
        }
      `}</style>

    </div>
  )
}

/* ================= COMPONENTS ================= */

function CircleBtn({ icon }) {
  return (
    <div style={circleBtn}>{icon}</div>
  )
}

function MiniKPI({ label, value }) {
  return (
    <div style={miniKpi}>
      <div style={miniValue}>{value}</div>
      <div style={miniLabel}>{label}</div>
    </div>
  )
}

function Panel({ title, children, full }) {
  return (
    <div style={{
      ...panel,
      ...(full ? { gridColumn: "1 / -1" } : {})
    }}>
      <div style={panelTitle}>{title}</div>
      {children}
    </div>
  )
}

/* 🔁 FLYWHEEL */
function Flywheel() {
  return (
    <div style={flywheelWrap}>
      <div style={ring}></div>
      <div style={center}>AI</div>
    </div>
  )
}

/* 📈 LINE */
function LineChart() {
  return (
    <svg viewBox="0 0 300 120" style={{ width: "100%" }}>
      <polyline
        fill="none"
        stroke="url(#grad)"
        strokeWidth="3"
        points="0,100 50,80 100,60 150,50 200,30 250,20 300,10"
      />
      <defs>
        <linearGradient id="grad">
          <stop offset="0%" stopColor="#22d3ee"/>
          <stop offset="100%" stopColor="#a855f7"/>
        </linearGradient>
      </defs>
    </svg>
  )
}

/* 📊 BARS */
function BarChart() {
  const data = [30, 60, 90, 120]

  return (
    <div style={bars}>
      {data.map((d,i)=>(
        <div key={i} style={{
          height:d,
          flex:1,
          background:"linear-gradient(#22d3ee,#a855f7)",
          borderRadius:6,
          boxShadow:"0 0 15px #22d3ee"
        }}/>
      ))}
    </div>
  )
}

/* 📊 STATS */
function Stats() {
  return (
    <div style={stats}>
      <Stat label="LTV" value="€612"/>
      <Stat label="CAC" value="€70"/>
      <Stat label="Margin" value="82%"/>
      <Stat label="Payback" value="1.6M"/>
    </div>
  )
}

function Stat({label,value}) {
  return (
    <div style={stat}>
      <div style={statValue}>{value}</div>
      <div style={statLabel}>{label}</div>
    </div>
  )
}

/* FUNNEL */
function Funnel() {
  const f=[["Awareness","100%"],["Signup","12%"],["Paid","4.9%"]]
  return (
    <div style={{display:"grid",gap:6}}>
      {f.map(([l,v])=>(
        <div key={l} style={funnelRow}>
          {l}
          <span style={{color:"#22d3ee"}}>{v}</span>
        </div>
      ))}
    </div>
  )
}

/* ================= STYLES ================= */

const root={minHeight:"100vh",color:"white",fontFamily:"system-ui"}

const bg={
  position:"fixed",inset:0,
  background:"#020617"
}

const grid={
  position:"fixed",inset:0,
  backgroundImage:`linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
  linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
  backgroundSize:"40px 40px",
  opacity:0.2
}

const content={padding:16}

const header={
  display:"flex",
  alignItems:"center",
  justifyContent:"space-between",
  marginBottom:20,
  position:"relative"
}

const logoMain={color:"#22d3ee",fontWeight:900}
const logoSub={color:"#a855f7"}
const logo={display:"flex",gap:6}

const search={
  flex:1,
  margin:"0 20px",
  padding:10,
  borderRadius:12,
  background:"rgba(0,0,0,0.4)",
  border:"1px solid rgba(255,255,255,0.2)",
  color:"white"
}

const rightIcons={
  display:"flex",
  gap:10
}

const circleBtn={
  width:42,height:42,
  borderRadius:"50%",
  background:"linear-gradient(#22d3ee,#a855f7)",
  display:"flex",
  alignItems:"center",
  justifyContent:"center"
}

const kpiStrip={
  display:"grid",
  gridTemplateColumns:"repeat(auto-fit,minmax(100px,1fr))",
  gap:10,
  marginBottom:20
}

const miniKpi={textAlign:"center"}
const miniValue={color:"#22d3ee",fontWeight:"bold"}
const miniLabel={opacity:0.6,fontSize:12}

const mainGrid={
  display:"grid",
  gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",
  gap:14
}

const panel={
  padding:16,
  borderRadius:16,
  background:"rgba(0,0,0,0.6)",
  border:"1px solid rgba(168,85,247,0.3)"
}

const panelTitle={
  marginBottom:10,
  color:"#22d3ee"
}

/* FLYWHEEL */
const flywheelWrap={
  width:120,height:120,margin:"auto",position:"relative"
}

const ring={
  position:"absolute",inset:0,
  borderRadius:"50%",
  border:"2px solid #22d3ee",
  animation:"spin 6s linear infinite"
}

const center={
  position:"absolute",inset:0,
  display:"flex",alignItems:"center",justifyContent:"center"
}

/* BARS */
const bars={
  display:"flex",
  gap:6,
  height:120,
  alignItems:"flex-end"
}

const stats={display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}
const stat={background:"rgba(255,255,255,0.05)",padding:10,borderRadius:10}
const statValue={color:"#22d3ee",fontWeight:"bold"}
const statLabel={fontSize:12,opacity:0.6}

const funnelRow={
  display:"flex",
  justifyContent:"space-between",
  padding:6,
  background:"rgba(255,255,255,0.05)",
  borderRadius:6
}
