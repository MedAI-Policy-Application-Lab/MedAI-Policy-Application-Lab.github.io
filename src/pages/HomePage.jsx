import Layout from "../components/Layout";
import SiteLink from "../components/SiteLink";

const pillars = [
  {
    number: "1",
    title: "Patient-Centric Inquiry",
    subtitle: "Identifying Real-World Barriers to Equity",
    description:
      "We begin with the human element of healthcare. Our research investigates the specific pain points faced by patients in current clinical workflows. By prioritizing patient-centric equity, we ensure that AI solutions are designed to address genuine human needs. This foundational inquiry guides the ethical direction of all our subsequent work.",
    icon: "diversity_3",
  },
  {
    number: "2",
    title: "Healthcare System Policy",
    subtitle: "Navigating Macro-Regulatory Frameworks",
    description:
      "We analyze the broader institutional and economic structures governing healthcare delivery. We study how AI adoption impacts systemic sustainability and health disparities, providing strategic insights for policymakers and hospital administrators on how to integrate digital tools without disrupting care continuity.",
    icon: "gavel",
  },
  {
    number: "3",
    title: "AI Policy & Ethics",
    subtitle: "Analyzing Ethical Implications & Future Trends",
    description:
      "We examine the policy and ethical landscape surrounding the deployment of AI in clinical settings. We also conduct forward-looking analysis on emerging trends, such as autonomous agents, to anticipate regulatory challenges and propose proactive ethical frameworks for safe clinical integration.",
    icon: "shield_lock",
  },
  {
    number: "4",
    title: "Open-Source Product Implementation",
    subtitle: "Building Proof-of-Concepts for Responsible AI",
    description:
      "Theory must be validated through practice. We translate our policy insights into tangible, open-source software applications. We demonstrate that responsible AI is not just a theoretical ideal, but a technically feasible and deployable reality.",
    icon: "deployed_code",
  },
];

export default function HomePage({ currentPath = "/" }) {
  return (
    <Layout currentPath={currentPath} mainClassName="flex flex-col gap-32 pt-32 pb-24">
      <section className="relative flex min-h-[716px] flex-col justify-center">
        <div className="relative z-10 max-w-4xl">
          <h1 className="mb-6 font-headline text-[5rem] font-extrabold leading-[0.9] tracking-tighter text-white md:text-[8rem] lg:text-[10rem]">
            MAIPAL
          </h1>
          <h2 className="max-w-3xl font-headline text-2xl font-bold leading-tight tracking-tight text-primary md:text-4xl lg:text-5xl">
            MedAI Policy &amp; Application Lab
          </h2>
          <div className="mt-12 flex flex-col gap-6 sm:flex-row">
            <SiteLink
              href="/project/"
              className="rounded-full bg-gradient-to-r from-primary to-primary-container px-8 py-4 text-center font-bold text-on-primary shadow-[0_0_40px_rgba(20,184,166,0.3)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_60px_rgba(20,184,166,0.5)]"
            >
              Explore Our Work
            </SiteLink>
          </div>
        </div>
        <div className="pointer-events-none absolute right-0 top-1/2 -z-10 h-[600px] w-full max-w-[600px] -translate-y-1/2 rounded-full bg-primary/10 blur-[100px]" />
      </section>

      <section className="flex flex-col gap-12">
        <div className="flex max-w-none flex-col gap-5">
          <h3 className="font-headline text-[clamp(2rem,4.2vw,3rem)] font-bold tracking-tight text-on-surface whitespace-nowrap">
            Navigating the Future of Digital Medicine
          </h3>
          <p className="max-w-6xl text-lg leading-relaxed text-on-surface-variant md:text-xl">
            We bridge the divide between policy and practical application through
            a dual focus on multi-layered governance research and open-source
            tooling. By addressing patient equity, systemic regulation, and
            algorithmic fairness in parallel with product development, we deliver
            digitally enabled health solutions that are robust, compliant, and
            ready for real-world impact.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            {pillars.map((pillar) => (
              <article
                key={pillar.number}
                className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-surface-container-low/85 p-8 shadow-[0_24px_50px_rgba(0,18,52,0.22)] backdrop-blur-xl"
              >
                <div className="absolute right-0 top-0 h-44 w-44 translate-x-1/4 -translate-y-1/4 rounded-full bg-primary/10 blur-3xl" />
                <div className="relative z-10">
                  <div className="mb-6 flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[#8fc1fc] text-lg font-extrabold text-slate-950 shadow-[0_0_24px_rgba(143,193,252,0.2)]">
                        {pillar.number}
                      </span>
                      <span className="material-symbols-outlined text-4xl text-primary">
                        {pillar.icon}
                      </span>
                    </div>
                  </div>

                  <h5 className="mb-2 font-headline text-2xl font-bold tracking-tight text-white">
                    {pillar.title}
                  </h5>
                  <p className="mb-5 text-sm font-semibold uppercase tracking-[0.22em] text-secondary">
                    {pillar.subtitle}
                  </p>
                  <p className="text-base leading-relaxed text-on-surface-variant">
                    {pillar.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
