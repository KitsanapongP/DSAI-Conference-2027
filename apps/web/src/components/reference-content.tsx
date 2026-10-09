import Link from "next/link";
import { referenceTopics } from "@/lib/reference-2025";
import { getPage, navigation } from "@/lib/site-content";

function Block({ title, children }: { title?: string; children: React.ReactNode }) {
  return <section className="reference-block">{title && <h3>{title}</h3>}{children}</section>;
}

function List({ items }: { items: readonly string[] }) {
  return <ul className="reference-list">{items.map((item) => <li key={item}>{item}</li>)}</ul>;
}

function Pending({ children = "Details will be announced." }: { children?: React.ReactNode }) {
  return <p className="reference-pending">{children}</p>;
}

function Overview({ path }: { path: string }) {
  const group = navigation.find((item) => item.href === path);
  if (!group?.children) return null;
  return <Block title="Explore this section"><div className="reference-link-grid">{group.children.map((item) => <Link href={item.href} key={item.href}><strong>{item.title}</strong></Link>)}</div></Block>;
}

export default function ReferenceContent({ path }: { path: string }) {
  const page = getPage(path);
  if (!page) return null;

  let body: React.ReactNode;

  switch (path) {
    case "/dsai2027":
      body = <><Block><p>The conference brings together researchers, academics, and practitioners to share work in data science and artificial intelligence, build connections, and explore applications with real world impact.</p></Block><Overview path={path} /></>;
      break;
    case "/dsai2027/call-for-papers":
      body = <Block><p>We welcome original research across data science, artificial intelligence, and their applications. The topics below are indicative; the final call and submission requirements will be announced.</p><List items={referenceTopics} /></Block>;
      break;
    case "/dsai2027/special-sessions":
      body = <Block><Pending>Special session themes and proposal details will be announced.</Pending></Block>;
      break;
    case "/dsai2027/committee":
      body = <Block><Pending>The organising and technical committees will be announced.</Pending></Block>;
      break;
    case "/dsai2027/reviewer":
      body = <Block><p>Reviewers help assess originality, technical quality, relevance, and contribution. Reviewer invitations and guidance will be announced.</p></Block>;
      break;
    case "/dsai2027/schedule":
      body = <Block><Pending>The conference schedule, session times, and rooms will be announced.</Pending></Block>;
      break;
    case "/submissions":
      body = <><Block><ol className="reference-steps"><li>Prepare an original research paper.</li><li>Submit your manuscript through the conference portal when it opens.</li><li>Review the decision and prepare a final version if accepted.</li><li>Register and present your work.</li></ol></Block><Overview path={path} /></>;
      break;
    case "/submissions/submission-guideline":
      body = <Block><p>Submissions should present original, unpublished work relevant to data science or artificial intelligence.</p><List items={["Paper template and length: to be announced", "Submission portal: to be announced", "Review and publication policies: to be announced"]} /></Block>;
      break;
    case "/submissions/submit-your-paper":
      body = <Block><Pending>The paper submission portal and author checklist will be announced.</Pending></Block>;
      break;
    case "/submissions/registration":
      body = <Block><Pending>Registration categories, fees, inclusions, and payment details will be announced.</Pending></Block>;
      break;
    case "/submissions/camera-ready":
      body = <Block><Pending>Final paper instructions, upload details, and the deadline will be announced.</Pending></Block>;
      break;
    case "/submissions/presentation-guideline":
      body = <Block><Pending>Presentation formats, timing, and presenter guidance will be announced.</Pending></Block>;
      break;
    case "/program":
      body = <><Block><p>The program will bring together research presentations, invited talks, and opportunities to learn and connect. Session details will be announced.</p></Block><Overview path={path} /></>;
      break;
    case "/program/keynote-speakers":
      body = <Block><Pending>Keynote speakers and talk details will be announced.</Pending></Block>;
      break;
    case "/program/invited-speakers":
      body = <Block><Pending>Invited speakers and talk details will be announced.</Pending></Block>;
      break;
    case "/program/tutorials":
      body = <Block><Pending>Tutorial topics, instructors, and registration details will be announced.</Pending></Block>;
      break;
    case "/program/workshops":
      body = <Block><Pending>Workshop topics, speakers, schedules, and registration details will be announced.</Pending></Block>;
      break;
    case "/program/city-tour":
      body = <Block><Pending>City tour details will be announced.</Pending></Block>;
      break;
    case "/venues":
      body = <><Block><Pending>The host venue and travel details will be announced.</Pending></Block><Overview path={path} /></>;
      break;
    case "/venues/accommodations":
      body = <Block><Pending>Accommodation recommendations and booking information will be announced.</Pending></Block>;
      break;
    case "/venues/transportation":
      body = <Block><Pending>Airport transfers and local transport information will be announced.</Pending></Block>;
      break;
    case "/venues/attractions":
      body = <Block><Pending>Places to visit near the host venue will be announced.</Pending></Block>;
      break;
    case "/student-grant":
      body = <Block><Pending>Student grant eligibility, support, and application details will be announced.</Pending></Block>;
      break;
    default:
      body = <Block><Pending /></Block>;
  }

  return <div className="reference-content">{body}</div>;
}
