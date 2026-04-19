import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

export default function Layout({
  children,
  currentPath = "/",
  mainClassName = "",
  maxWidth = "max-w-screen-2xl",
  showAmbientGlow = false,
}) {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {showAmbientGlow ? (
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          <div className="absolute left-[-10%] top-[-10%] h-[50%] w-[50%] rounded-full bg-primary/20 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-5%] h-[40%] w-[40%] rounded-full bg-secondary-container/30 blur-[100px]" />
        </div>
      ) : null}

      <div className="relative z-10">
        <SiteHeader currentPath={currentPath} />
        <main className={`mx-auto w-full ${maxWidth} px-6 md:px-12 ${mainClassName}`}>
          {children}
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}
