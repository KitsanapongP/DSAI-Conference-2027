import Link from "next/link";
import { referenceDates, referenceTopics } from "@/lib/reference-2025";

function Arrow() { return <span aria-hidden="true">↗</span>; }

function OrbitArt() {
  return <div className="hero-art" aria-hidden="true">
    <div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit orbit-three" />
    <div className="orbit-center"><span>DS<span className="orbit-amp">&amp;</span>AI</span><small>2027</small></div>
  </div>;
}

export default function Home() {
  return <main>
    <section className="hero-section" id="home">
      <div className="container hero-grid">
        <div className="hero-content">
          <p className="eyebrow light">INTERNATIONAL CONFERENCE</p>
          <h1>Data Science &amp;<br />Artificial Intelligence</h1>
          <p className="hero-lead">Research, ideas, and collaboration across data science and AI.</p>
          <div className="hero-actions"><a className="button button-sand" href="#about">About the conference <Arrow /></a><a className="text-link light-link" href="#dates">Important dates <Arrow /></a></div>
        </div>
        <OrbitArt />
      </div>
    </section>

    <section className="home-section home-about" id="about" aria-labelledby="about-title">
      <div className="container home-section-inner">
        <div className="home-section-heading"><span className="section-index">01 / ABOUT</span><h2 id="about-title">About DSAI 2027</h2></div>
        <div className="home-section-body">
          <p className="home-lead">The conference brings researchers, academics, and practitioners together to exchange knowledge and present work in data science and artificial intelligence.</p>
          <p>Building on the conference series, the event aims to strengthen collaboration between developed and developing regions, support emerging researchers, and explore applications that address real challenges in local communities.</p>
          <details className="home-disclosure"><summary>Research topics <span>+</span></summary><ul className="home-topic-list">{referenceTopics.map((topic) => <li key={topic}>{topic}</li>)}</ul></details>
        </div>
      </div>
    </section>

    <section className="home-section home-dates" id="dates" aria-labelledby="dates-title">
      <div className="container home-section-inner">
        <div className="home-section-heading"><span className="section-index">02 / TIMELINE</span><h2 id="dates-title">Important Dates</h2><p>Dates will be announced.</p></div>
        <div className="home-section-body"><div className="milestone-list">{referenceDates.map((item) => <div className="milestone" key={item.label}><strong>{item.label}</strong><span>To be announced</span></div>)}</div></div>
      </div>
    </section>

    <section className="home-section home-call" aria-labelledby="call-title">
      <div className="container home-section-inner">
        <div className="home-section-heading"><span className="section-index">03 / CONTRIBUTE</span><h2 id="call-title">Call for Papers</h2></div>
        <div className="home-section-body"><p className="home-lead">We welcome original research across data science, AI methods, and their applications.</p><p>Submission topics and author instructions will be announced.</p><Link className="underlined-link" href="/dsai2027/call-for-papers">Call for Papers <Arrow /></Link></div>
      </div>
    </section>

    <section className="home-section home-program" aria-labelledby="program-title">
      <div className="container home-section-inner">
        <div className="home-section-heading"><span className="section-index">04 / PROGRAM</span><h2 id="program-title">Program</h2><p>Sessions and speaker details will be announced.</p></div>
        <div className="home-section-body"><p className="home-lead">Research presentations, invited talks, and opportunities to connect.</p><Link className="underlined-link" href="/program">Explore the program <Arrow /></Link></div>
      </div>
    </section>

    <section className="home-section home-registration" aria-labelledby="registration-title">
      <div className="container home-section-inner">
        <div className="home-section-heading"><span className="section-index">05 / ATTEND</span><h2 id="registration-title">Registration</h2><p>Registration details will be announced.</p></div>
        <div className="home-section-body"><p className="home-lead">Categories, fees, and payment details are coming soon.</p><Link className="underlined-link" href="/submissions/registration">Registration details <Arrow /></Link></div>
      </div>
    </section>

    <section className="home-section home-venue" aria-labelledby="venue-title">
      <div className="container home-section-inner">
        <div className="home-section-heading"><span className="section-index">06 / VISIT</span><h2 id="venue-title">Venue &amp; Travel</h2></div>
        <div className="home-section-body"><p className="home-lead">The host venue and travel information will be announced.</p><Link className="underlined-link" href="/venues">Venue information <Arrow /></Link></div>
      </div>
    </section>
  </main>;
}
