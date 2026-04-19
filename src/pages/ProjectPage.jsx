import Layout from "../components/Layout";

export default function ProjectPage({ currentPath = "/project/" }) {
  return (
    <Layout
      currentPath={currentPath}
      showAmbientGlow
      mainClassName="flex min-h-[70vh] flex-col gap-16 pt-40 pb-24"
    >
      <header className="flex max-w-4xl flex-col gap-6">
        <h1 className="font-headline text-5xl font-extrabold leading-tight tracking-[-0.02em] text-white md:text-7xl">
          Architecting the future of{" "}
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            medical intelligence
          </span>
          .
        </h1>
        <p className="max-w-2xl text-lg font-light leading-relaxed text-on-surface-variant md:text-xl">
          Explore our ongoing research and deployed systems at the intersection of
          clinical utility and ethical AI policy.
        </p>
      </header>

      <section className="flex flex-1 items-center justify-center text-center">
        <h2 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
          More to Come, Stay Tuned
        </h2>
      </section>
    </Layout>
  );
}
