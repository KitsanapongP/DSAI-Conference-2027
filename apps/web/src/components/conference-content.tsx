import { conferenceIntroduction, conferenceTopics } from "@/lib/conference-2027";

export function ConferenceIntroduction() {
  return <>{conferenceIntroduction.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</>;
}

export function ConferenceTopics({ showTitle = true }: { showTitle?: boolean }) {
  const TopicHeading = showTitle ? "h4" : "h3";
  const content = <>
    <p>Topics of interest include, but are not limited to:</p>
    <ol className="conference-topic-groups">{conferenceTopics.map((group) => <li key={group.title}>
      <TopicHeading>{group.title}</TopicHeading>
      <ul>{group.topics.map((topic) => <li key={topic}>{topic}</li>)}</ul>
    </li>)}</ol>
  </>;

  return <section className={showTitle ? "conference-topics" : "conference-topics-standalone"} aria-label="Conference Topics">
    {showTitle && <h3>Conference Topics</h3>}
    {content}
  </section>;
}
