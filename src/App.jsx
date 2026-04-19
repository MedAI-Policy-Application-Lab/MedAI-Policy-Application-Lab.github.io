import Layout from "./components/Layout";
import { getPageByPath } from "./pageRegistry";

function NotFoundPage({ currentPath }) {
  return (
    <Layout currentPath={currentPath} mainClassName="flex min-h-[70vh] items-center justify-center pt-32 pb-24">
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
          Page Not Found
        </h1>
      </section>
    </Layout>
  );
}

export default function App({ currentPath = "/" }) {
  const page = getPageByPath(currentPath);

  if (!page) {
    return <NotFoundPage currentPath={currentPath} />;
  }

  const PageComponent = page.component;
  return <PageComponent currentPath={page.path} />;
}
