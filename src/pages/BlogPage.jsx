import Layout from "../components/Layout";

export default function BlogPage({ currentPath = "/blog/" }) {
  return (
    <Layout currentPath={currentPath} mainClassName="flex min-h-[70vh] items-center justify-center pt-32 pb-24">
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
          More to Come, Stay Tuned
        </h1>
      </section>
    </Layout>
  );
}
