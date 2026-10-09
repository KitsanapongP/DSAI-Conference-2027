export type SitePage = { title: string; href: string; description: string; group?: string };
export type NavItem = SitePage & { children?: SitePage[] };

export const navigation: NavItem[] = [
  { title: "Home", href: "/", description: "Conference home" },
  { title: "DSAI2027", href: "/dsai2027", description: "Explore the conference, its people, and opportunities to contribute.", children: [
    { title: "Call for Papers", href: "/dsai2027/call-for-papers", description: "Research themes, paper types, and the call for contributions." },
    { title: "Special Sessions", href: "/dsai2027/special-sessions", description: "Focused conversations and special session proposals." },
    { title: "Committee", href: "/dsai2027/committee", description: "The people organising the conference." },
    { title: "Reviewer", href: "/dsai2027/reviewer", description: "Information for reviewers and the review process." },
    { title: "Schedule", href: "/dsai2027/schedule", description: "A view of the conference at a glance." },
  ] },
  { title: "Submissions", href: "/submissions", description: "A clear path from preparing a manuscript to presenting it.", children: [
    { title: "Submission Guideline", href: "/submissions/submission-guideline", description: "Prepare your manuscript for submission." },
    { title: "Submit Your Paper", href: "/submissions/submit-your-paper", description: "Submission portal and final checks." },
    { title: "Registration", href: "/submissions/registration", description: "Registration categories, fees, and instructions." },
    { title: "Camera Ready", href: "/submissions/camera-ready", description: "Prepare the final accepted version of your paper." },
    { title: "Presentation Guideline", href: "/submissions/presentation-guideline", description: "Plan your talk or poster presentation." },
  ] },
  { title: "Program", href: "/program", description: "Talks, workshops, and shared learning across the conference.", children: [
    { title: "Keynote Speakers", href: "/program/keynote-speakers", description: "Featured perspectives from invited keynote speakers." },
    { title: "Invited Speakers", href: "/program/invited-speakers", description: "Meet the invited speakers joining the program." },
    { title: "Tutorials", href: "/program/tutorials", description: "Hands-on learning and practical sessions." },
    { title: "Workshops", href: "/program/workshops", description: "Focused workshops for deeper discussion." },
    { title: "City Tour", href: "/program/city-tour", description: "Discover the host city with fellow participants." },
  ] },
  { title: "Venues", href: "/venues", description: "Plan your visit and explore the host destination.", children: [
    { title: "Accommodations", href: "/venues/accommodations", description: "Places to stay near the conference." },
    { title: "Transportation", href: "/venues/transportation", description: "Travel routes and local transport information." },
    { title: "Attractions", href: "/venues/attractions", description: "Places to discover while you are here." },
  ] },
  { title: "Student Grant", href: "/student-grant", description: "Support and opportunities for student participants." },
];

export const allPages = navigation.flatMap((item) => [item, ...(item.children ?? []).map((child) => ({ ...child, group: item.title }))]);
export function getPage(pathname: string) { return allPages.find((page) => page.href === pathname); }
export function getGroup(page: SitePage) { return navigation.find((item) => item.title === page.group || item.href === page.href); }
