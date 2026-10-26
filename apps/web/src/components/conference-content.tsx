import { conferenceIntroduction, conferenceTopics } from "@/lib/conference-2027";

export function ConferenceIntroduction() {
  return <>{conferenceIntroduction.map((paragraph, index) => <p className={index === 0 ? "home-lead" : undefined} key={paragraph}>{paragraph}</p>)}</>;
}

export function ConferenceTopics() {
  return <section className="conference-topics" aria-label="Conference Topics">
    <h3>Conference Topics</h3>
    <p>Topics of interest include, but are not limited to:</p>
    <ol className="conference-topic-groups">{conferenceTopics.map((group) => <li key={group.title}>
      <h4>{group.title}</h4>
      <ul>{group.topics.map((topic) => <li key={topic}>{topic}</li>)}</ul>
    </li>)}</ol>
  </section>;
}
