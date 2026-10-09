import Link from "next/link";
import { navigation } from "@/lib/site-content";

function Chevron() { return <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="m2.5 4.5 3.5 3 3.5-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>; }

export function SiteHeader() {
  return <header className="site-header">
    <div className="header-inner container">
      <Link href="/" className="brand" aria-label="DSAI 2027 home"><span className="brand-mark"><span>D</span><span className="brand-slash">/</span><span>AI</span></span><span className="brand-copy"><strong>DSAI <em>2027</em></strong><small>INTERNATIONAL CONFERENCE</small></span></Link>
      <details className="mobile-navigation"><summary aria-label="Open navigation">Menu <span className="menu-lines" aria-hidden="true"><i /><i /></span></summary><nav aria-label="Mobile navigation" className="mobile-panel">{navigation.map((item) => item.children ? <details key={item.href} className="mobile-group"><summary>{item.title}<Chevron /></summary><Link href={item.href}>Overview</Link>{item.children.map((child) => <Link href={child.href} key={child.href}>{child.title}</Link>)}</details> : <Link href={item.href} key={item.href}>{item.title}</Link>)}</nav></details>
      <nav className="desktop-navigation" aria-label="Main navigation">{navigation.map((item) => item.children ? <div key={item.href} className="nav-group"><Link href={item.href} className="nav-link">{item.title}<Chevron /></Link><div className="nav-dropdown"><Link href={item.href} className="dropdown-overview">{item.title} overview <span>↗</span></Link>{item.children.map((child) => <Link href={child.href} key={child.href}>{child.title}</Link>)}</div></div> : <Link href={item.href} className="nav-link" key={item.href}>{item.title}</Link>)}</nav>
    </div>
  </header>;
}
