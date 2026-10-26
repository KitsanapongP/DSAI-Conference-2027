import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReferenceContent from "@/components/reference-content";
import { SiteIcon } from "@/components/site-icon";
import { allPages, getGroup, getPage, navigation } from "@/lib/site-content";

type Props = { params: Promise<{ slug: string[] }> };

export function generateStaticParams() {
  return allPages.filter((page) => page.href !== "/").map((page) => ({ slug: page.href.slice(1).split("/") }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getPage(`/${slug.join("/")}`);
  return { title: page ? `${page.title} | DSAI 2027` : "DSAI 2027", description: page?.description };
}

export default async function ContentPage({ params }: Props) {
  const { slug } = await params;
  const page = getPage(`/${slug.join("/")}`);
  if (!page || page.href === "/") notFound();
  const group = getGroup(page);
  const sectionPages = group ? [group, ...(group.children ?? [])] : [page];
  const icon = page.href.startsWith("/submissions") ? "paper" : page.href.startsWith("/program") ? "mic" : page.href.startsWith("/venues") ? "pin" : page.href === "/student-grant" ? "ticket" : "network";

  return <main className="interior-main">
    <section className="interior-content"><div className="container interior-layout">
      <aside className="interior-aside">
        <nav aria-label={`${group?.title ?? page.title} contents`}>
          <p className="eyebrow">In this section</p>
          <h2>{group?.title ?? page.title}</h2>
          <ul className="interior-section-links">{sectionPages.map((item) => <li key={item.href}>
            <Link href={item.href} aria-current={page.href === item.href ? "page" : undefined}>
              {item.href === group?.href && group.children ? "Overview" : item.title}
            </Link>
          </li>)}</ul>
        </nav>
        <nav className="interior-explore" aria-label="Other conference sections">
          <p className="eyebrow">Explore</p>
          <ul>{navigation.filter((item) => item.href !== group?.href).map((item) => <li key={item.href}><Link href={item.href}>{item.title}</Link></li>)}</ul>
        </nav>
      </aside>
      <div className="interior-body">
      <span className="interior-icon"><SiteIcon name={icon} /></span><span className="eyebrow">{page.group ? <Link href={group?.href ?? "/"}>{page.group.toUpperCase()} ↗</Link> : "CONFERENCE INFORMATION"}</span><h2>{page.title}</h2>
      <ReferenceContent path={page.href} />
      <div className="interior-next"><Link href={page.group ? group?.href ?? "/" : "/"}>← {page.group ? `${page.group} overview` : "Back to home"}</Link></div>
    </div></div></section>
  </main>;
}
