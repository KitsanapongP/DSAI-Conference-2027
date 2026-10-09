import Link from "next/link";
import { navigation } from "@/lib/site-content";

export function SiteFooter() {
  return <footer className="site-footer"><div className="container footer-top"><div><p className="footer-kicker">DSAI 2027</p><h2>Data Science &amp; Artificial Intelligence</h2><p className="footer-note">Conference information will be updated as details are confirmed.</p></div><div className="footer-links"><span>EXPLORE</span>{navigation.slice(1).map((item) => <Link href={item.href} key={item.href}>{item.title}</Link>)}</div></div><div className="container footer-bottom"><strong>DSAI <span>2027</span></strong><span>© DSAI Conference</span></div></footer>;
}
