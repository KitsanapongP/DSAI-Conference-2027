const focusAreas = [
  { number: "01", title: "Data science", description: "Methods and systems that turn complex data into useful knowledge.", color: "bg-sky-300/25" },
  { number: "02", title: "Artificial intelligence", description: "New ideas in intelligent systems, learning, and real-world applications.", color: "bg-violet-300/25" },
  { number: "03", title: "Responsible impact", description: "Thoughtful research and practice that consider people and society.", color: "bg-emerald-300/25" },
];

function ArrowIcon({ diagonal = false }: { diagonal?: boolean }) {
  return diagonal ? (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="size-4"><path d="M4 16 16 4M6 4h10v10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ) : (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="size-4"><path d="M3 10h13m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f5f7fb] text-[#12213b]">
      <header className="relative z-10 border-b border-white/10 bg-[#101f38] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-5 lg:px-10">
          <a href="#top" className="flex items-center gap-3" aria-label="DSAI Conference 2027 home">
            <span className="grid size-10 place-items-center rounded-xl border border-sky-300/40 bg-sky-300/10 text-sm font-bold tracking-tight text-sky-200">D/</span>
            <span className="text-sm font-semibold tracking-[0.13em]">DSAI <span className="font-normal text-slate-300">2027</span></span>
          </a>
          <nav aria-label="Main navigation" className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <a href="#about" className="transition hover:text-white">About</a>
            <a href="#focus" className="transition hover:text-white">Focus areas</a>
            <a href="#updates" className="transition hover:text-white">Updates</a>
          </nav>
          <a href="#updates" className="inline-flex items-center gap-2 rounded-full border border-slate-500/60 px-4 py-2 text-xs font-semibold transition hover:border-sky-300 hover:bg-white/10 sm:text-sm">Conference details <ArrowIcon diagonal /></a>
        </div>
      </header>

      <main id="top">
        <section className="relative overflow-hidden bg-[#101f38] text-white">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 hero-grid opacity-70" />
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 top-4 size-[34rem] rounded-full bg-sky-400/15 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-1/4 size-96 rounded-full bg-violet-500/10 blur-3xl" />
          <div className="relative mx-auto grid max-w-7xl gap-16 px-6 pb-24 pt-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:px-10 lg:pb-32 lg:pt-28">
            <div>
              <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-sky-300/25 bg-sky-200/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-sky-200"><span className="size-1.5 rounded-full bg-sky-300" />Coming in 2027</div>
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">DSAI Conference 2027</p>
              <h1 className="max-w-4xl text-[clamp(3.4rem,7vw,6.8rem)] font-semibold leading-[0.98] tracking-[-0.07em]">Where ideas <span className="text-sky-300">meet</span> possibility.</h1>
              <p className="mt-8 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">A meeting place for the questions, discoveries, and conversations shaping data science and artificial intelligence.</p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a href="#about" className="inline-flex items-center gap-3 rounded-full bg-sky-300 px-6 py-3.5 text-sm font-bold text-[#101f38] transition hover:bg-sky-200">Explore the conference <ArrowIcon /></a>
                <a href="#updates" className="inline-flex items-center gap-2 px-3 py-3 text-sm font-semibold text-slate-200 transition hover:text-white">See what&apos;s next <ArrowIcon diagonal /></a>
              </div>
            </div>
            <div className="relative hidden min-h-[25rem] lg:block" aria-hidden="true">
              <div className="absolute right-0 top-0 size-[25rem] rounded-full border border-sky-200/15" />
              <div className="absolute right-10 top-10 size-[20rem] rounded-full border border-sky-200/25" />
              <div className="absolute right-20 top-20 size-[15rem] rounded-full border border-sky-200/35" />
              <div className="absolute right-[9.5rem] top-[9.5rem] size-[6rem] rounded-full bg-sky-300 shadow-[0_0_100px_20px_rgba(125,211,252,0.25)]" />
              <div className="absolute right-5 top-20 size-3 rounded-full bg-violet-300" />
              <div className="absolute right-48 top-6 size-2 rounded-full bg-sky-200" />
              <div className="absolute bottom-6 right-44 size-2.5 rounded-full bg-emerald-300" />
              <div className="absolute bottom-0 right-0 rounded-2xl border border-white/15 bg-white/10 px-6 py-5 backdrop-blur-md"><p className="text-[10px] font-bold uppercase tracking-[0.25em] text-sky-200">A space to connect</p><p className="mt-2 text-xl font-medium tracking-tight">Research · People · Progress</p></div>
            </div>
          </div>
          <div className="relative border-t border-white/10"><div className="mx-auto flex max-w-7xl flex-wrap gap-x-14 gap-y-4 px-6 py-6 text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-400 lg:px-10"><span>Explore new perspectives</span><span>Share knowledge</span><span>Build connections</span></div></div>
        </section>

        <section id="about" className="mx-auto grid max-w-7xl gap-10 px-6 py-24 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20 lg:px-10 lg:py-32">
          <div className="flex items-start gap-3 text-xs font-bold uppercase tracking-[0.25em] text-sky-700"><span className="mt-1 size-2 rounded-full bg-sky-500" /> About the conference</div>
          <div><h2 className="max-w-3xl text-4xl font-semibold leading-[1.12] tracking-[-0.05em] sm:text-5xl">A place for research to spark conversation.</h2><p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">DSAI Conference 2027 is being prepared as a forum for people working across data science and artificial intelligence. This site will grow as the program, participation details, and key dates are confirmed.</p><a href="#focus" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-sky-800 hover:text-sky-600">Explore focus areas <ArrowIcon /></a></div>
        </section>

        <section id="focus" className="bg-white py-24 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.25em] text-sky-700">Areas of interest</p><h2 className="mt-4 max-w-xl text-4xl font-semibold leading-tight tracking-[-0.05em] sm:text-5xl">The conversations ahead.</h2></div><p className="max-w-sm text-sm leading-7 text-slate-500">Illustrative themes for the site preview. Official conference tracks will be published when confirmed.</p></div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {focusAreas.map((area) => <article key={area.number} className="group relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-[#f8fafc] p-8 transition hover:-translate-y-1 hover:border-sky-200 hover:shadow-xl hover:shadow-slate-200/50"><div className={`absolute -right-16 -top-16 size-56 rounded-full blur-2xl ${area.color}`} aria-hidden="true" /><div className="relative flex min-h-64 flex-col"><span className="text-xs font-bold tracking-[0.2em] text-sky-700">{area.number} / FOCUS</span><div className="mt-auto"><h3 className="text-2xl font-semibold tracking-[-0.04em]">{area.title}</h3><p className="mt-3 text-sm leading-7 text-slate-600">{area.description}</p></div></div></article>)}
            </div>
          </div>
        </section>

        <section id="updates" className="bg-[#eaf2f9] py-24 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_1fr] lg:gap-24 lg:px-10">
            <div><p className="text-xs font-bold uppercase tracking-[0.25em] text-sky-700">Stay informed</p><h2 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.05em] sm:text-5xl">More details are on the way.</h2><p className="mt-6 max-w-lg text-base leading-8 text-slate-600">The conference is taking shape. Check back here for confirmed dates, location, and opportunities to participate.</p></div>
            <div className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-xl shadow-slate-300/20">{[["01", "Dates & venue"], ["02", "Call for papers"], ["03", "Registration"]].map(([number, label]) => <div key={number} className="flex items-center justify-between gap-4 border-b border-slate-100 px-7 py-6 last:border-b-0 sm:px-9"><div className="flex items-center gap-5"><span className="text-xs font-bold tracking-widest text-sky-700">{number}</span><span className="font-semibold">{label}</span></div><span className="whitespace-nowrap text-xs font-medium text-slate-500">To be announced</span></div>)}</div>
          </div>
        </section>
      </main>

      <footer className="bg-[#101f38] text-white"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-6 py-10 sm:flex-row sm:items-end lg:px-10"><div><p className="text-lg font-semibold tracking-tight">DSAI Conference 2027</p><p className="mt-2 text-sm text-slate-400">Ideas for what comes next.</p></div><p className="text-xs text-slate-400">Conference information will be updated as it is confirmed.</p></div></footer>
    </div>
  );
}
