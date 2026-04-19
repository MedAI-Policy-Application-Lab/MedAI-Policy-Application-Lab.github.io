import { useState } from "react";
import Layout from "../components/Layout";

const people = [
  {
    name: "Zhiyuan Li",
    role: "Founder & Principal Investigator",
    description:
      "Senior Computer Science student at UW-Madison. He bridges AI policy with practical application by investigating patient-centric healthcare pain points and regulatory frameworks, while building open-source, compliant tools for trustworthy clinical deployment.",
    tags: ["Application", "Policy"],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDdYonGOfKmFlzpne5HS5TXdSOmDA3zni2SjPcfi9xSE2Fzp8CuxsGnFs0vWKhOrNx5lD4unIeeGSX2Y5-Ph31bzfYa4idfEPk48_n75LMdExVlrGXQoZGzUqkbBv8g4aRfrQDhnZfRoX9v-a2XVL5hWMJ38YZ5fSL4XVjItA0NYRcWXW-lFqDw37Eel5imSc9Nos90LuyemHXEPowBllVHDTSLetR0aTPJEyo92xcuHwypHI_76aswSV7LK_6rOnvLA-Ya-pJ7l8UV",
  },
];

const openRoles = [
  "Founding Research Scientist (Policy)",
  "Founding Engineer (Application)",
];

export default function PeoplePage({ currentPath = "/people/" }) {
  const [isRolesOpen, setIsRolesOpen] = useState(false);

  return (
    <Layout currentPath={currentPath} mainClassName="pt-32 pb-24">
      <header className="mb-20 mt-10 md:w-2/3">
        <h1 className="mb-6 font-headline text-5xl font-bold leading-tight tracking-[-0.02em] text-white md:text-7xl">
          Our Team
        </h1>
      </header>

      <section className="mb-24 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {people.map((person) => (
          <article
            key={person.name}
            className="group flex flex-col overflow-hidden rounded-lg bg-surface-container-low transition-transform duration-500 ease-out hover:-translate-y-2"
          >
            <div className="relative h-80 w-full overflow-hidden bg-surface-container">
              <img
                alt={person.name}
                className="h-full w-full object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-105"
                src={person.image}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent opacity-80" />
            </div>
            <div className="relative z-10 -mt-10 flex flex-grow flex-col rounded-t-lg bg-surface-container-lowest p-8 shadow-[0_-10px_40px_rgba(0,13,42,0.5)]">
              <div className="mb-4">
                <h2 className="mb-1 text-2xl font-bold tracking-tight text-white">
                  {person.name}
                </h2>
                <p className="font-medium text-primary">{person.role}</p>
              </div>
              <p className="mb-6 flex-grow text-sm leading-relaxed text-on-surface-variant">
                {person.description}
              </p>
              <div className="mt-auto flex gap-3">
                {person.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-surface-variant px-3 py-1 text-xs font-medium text-secondary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="glass-effect ghost-border relative overflow-hidden rounded-xl p-10 md:p-16">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-primary/20 blur-[80px]" />
        <div className="relative z-10 flex flex-col gap-10">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div className="md:w-2/3">
              <h3 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                Join Our Mission
              </h3>
              <p className="mb-0 text-lg text-secondary">
                We look for brilliant minds at the intersection of medicine,
                technology, and policy.
                <br />
                Help us shape the future of healthcare.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsRolesOpen((value) => !value)}
              className="inline-flex items-center gap-3 whitespace-nowrap rounded-full border border-outline-variant/30 bg-surface-container-highest/40 px-8 py-4 font-bold text-primary transition-colors duration-300 hover:bg-surface-container-highest/60"
            >
              View Open Roles
              <span className="material-symbols-outlined text-xl">
                {isRolesOpen ? "remove" : "add"}
              </span>
            </button>
          </div>

          <div
            className={`grid overflow-hidden transition-all duration-500 ease-out ${
              isRolesOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="min-h-0">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {openRoles.map((role) => (
                  <article
                    key={role}
                    className="rounded-2xl border border-white/10 bg-surface-container-lowest/80 p-6 shadow-[0_16px_40px_rgba(0,18,52,0.18)] backdrop-blur-xl"
                  >
                    <div className="mb-3 flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <span className="material-symbols-outlined">work</span>
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                        Open Role
                      </span>
                    </div>
                    <h4 className="text-xl font-bold tracking-tight text-white">
                      {role}
                    </h4>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
