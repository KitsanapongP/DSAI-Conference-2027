import Link from "next/link";
import { SiteIcon } from "@/components/site-icon";
import { referenceDates } from "@/lib/reference-2025";
import { conferenceDate, conferenceIntroduction } from "@/lib/conference-2027";
import { ConferenceIntroduction, ConferenceTopics } from "@/components/conference-content";

function Arrow() { return <SiteIcon name="arrow" className="link-arrow" />; }

function SectionIcon({ name }: { name: "network" | "calendar" | "paper" | "mic" | "ticket" | "pin" }) {
  return <span className="section-icon"><SiteIcon name={name} /></span>;
}

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
          <p className="eyebrow light"><SiteIcon name="spark" className="hero-kicker-icon" /> INTERNATIONAL CONFERENCE</p>
          <h1>Data Science &amp;<br />Artificial Intelligence</h1>
          <p className="hero-lead">The 5th International Conference · {conferenceDate}</p>
          <div className="hero-actions"><a className="button button-sand" href="#about">About the conference <Arrow /></a><a className="text-link light-link" href="#dates">Important dates <Arrow /></a></div>
        </div>
        <OrbitArt />
      </div>
    </section>

    <section className="home-section home-about" id="about" aria-labelledby="about-title">
      <div className="container home-section-inner">
        <div className="home-section-heading"><SectionIcon name="network" /><span className="section-index">01 / ABOUT</span><h2 id="about-title">About DSAI 2027</h2></div>
        <div className="home-section-body">
          <ConferenceIntroduction />
          <ConferenceTopics />
        </div>
      </div>
    </section>

    <section className="home-section home-dates" id="dates" aria-labelledby="dates-title">
      <div className="container home-section-inner">
        <div className="home-section-heading"><SectionIcon name="calendar" /><span className="section-index">02 / TIMELINE</span><h2 id="dates-title">Important Dates</h2><p>The conference will be held on {conferenceDate}. Other dates will be announced.</p></div>
        <div className="home-section-body"><div className="milestone-list">{referenceDates.map((item) => <div className="milestone" key={item.label}><strong><SiteIcon name="calendar" />{item.label}</strong><span>{item.label === "Conference" ? conferenceDate : "To be announced"}</span></div>)}</div></div>
      </div>
    </section>

    <section className="home-section home-call" aria-labelledby="call-title">
      <div className="container home-section-inner">
        <div className="home-section-heading"><SectionIcon name="paper" /><span className="section-index">03 / CONTRIBUTE</span><h2 id="call-title">Call for Papers</h2></div>
        <div className="home-section-body"><p className="home-lead">{conferenceIntroduction[3]}</p><Link className="underlined-link" href="/dsai2027/call-for-papers">Call for Papers <Arrow /></Link></div>
      </div>
    </section>

    <section className="home-section home-program" aria-labelledby="program-title">
      <div className="container home-section-inner">
        <div className="home-section-heading"><SectionIcon name="mic" /><span className="section-index">04 / PROGRAM</span><h2 id="program-title">Program</h2><p>Sessions and speaker details will be announced.</p></div>
        <div className="home-section-body"><p className="home-lead">Research presentations, invited talks, and opportunities to connect.</p><Link className="underlined-link" href="/program">Explore the program <Arrow /></Link></div>
      </div>
    </section>

    <section className="home-section home-registration" aria-labelledby="registration-title">
      <div className="container home-section-inner">
        <div className="home-section-heading"><SectionIcon name="ticket" /><span className="section-index">05 / ATTEND</span><h2 id="registration-title">Registration</h2><p>Registration details will be announced.</p></div>
        <div className="home-section-body"><p className="home-lead">Categories, fees, and payment details are coming soon.</p><Link className="underlined-link" href="/submissions/registration">Registration details <Arrow /></Link></div>
      </div>
    </section>

    <section className="home-section home-venue" aria-labelledby="venue-title">
      <div className="container home-section-inner">
        <div className="home-section-heading"><SectionIcon name="pin" /><span className="section-index">06 / VISIT</span><h2 id="venue-title">Venue &amp; Travel</h2></div>
        <div className="home-section-body"><p className="home-lead">The host venue and travel information will be announced.</p><Link className="underlined-link" href="/venues">Venue information <Arrow /></Link></div>
      </div>
    </section>
  </main>;
}
