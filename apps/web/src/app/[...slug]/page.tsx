import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReferenceContent from "@/components/reference-content";
import { allPages, getGroup, getPage } from "@/lib/site-content";

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

  return <main className="interior-main">
    <section className="interior-content"><div className="container interior-layout"><div className="interior-body">
      <span className="eyebrow">{page.group ? <Link href={group?.href ?? "/"}>{page.group.toUpperCase()} ↗</Link> : "CONFERENCE INFORMATION"}</span><h2>{page.title}</h2>
      <ReferenceContent path={page.href} />
      <div className="interior-next"><Link href={page.group ? group?.href ?? "/" : "/"}>← {page.group ? `${page.group} overview` : "Back to home"}</Link></div>
    </div></div></section>
  </main>;
}
