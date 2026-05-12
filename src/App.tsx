import { useState, useLayoutEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useTheme }           from './hooks/useTheme';
import { useSidebar }         from './hooks/useSidebar';
import { useScrollReveal }    from './hooks/useScrollReveal';
import { useActiveSection }   from './hooks/useActiveSection';
import { useRipple }          from './hooks/useRipple';
import { useSpotlight }       from './hooks/useSpotlight';


import { Cursor }        from './components/Cursor/Cursor';
import { Topbar }        from './components/Topbar/Topbar';
import { Sidebar }       from './components/Sidebar/Sidebar';
import { Hero }          from './components/Hero/Hero';
import { Marquee }       from './components/Marquee/Marquee';
import { About }         from './components/About/About';
import { Skills }        from './components/Skills/Skills';
import { Projects }       from './components/Projects/Projects';
import { GitHubActivity } from './components/GitHubActivity/GitHubActivity';
import { Services }       from './components/Services/Services';
import { Testimonials }  from './components/Testimonials/Testimonials';
import { Contact }       from './components/Contact/Contact';
import { Footer }        from './components/Footer/Footer';
import { ScrollToTop }     from './components/ScrollToTop/ScrollToTop';
import { SkillsSidebar }   from './components/SkillsSidebar/SkillsSidebar';
import { PageLoader }      from './components/PageLoader/PageLoader';
import { ScrollProgress }  from './components/ScrollProgress/ScrollProgress';
import { CommandPalette }  from './components/CommandPalette/CommandPalette';
import { ShaderBg }        from './components/ShaderBg/ShaderBg';
import { RatingWidget }    from './components/RatingWidget/RatingWidget';
import { PortfolioChat }   from './components/PortfolioChat/PortfolioChat';
import { NotFound }        from './components/NotFound/NotFound';
import { isPortfolioSectionId } from './data/sections';

export default function App() {
  const { section } = useParams();
  const location = useLocation();
  const [askAiOpen, setAskAiOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { isOpen, open, close } = useSidebar();
  const activeSection           = useActiveSection();
  useScrollReveal();
  useRipple();
  useSpotlight();

  useLayoutEffect(() => {
    const segment = location.pathname === '/' ? 'hero' : location.pathname.slice(1);
    if (!isPortfolioSectionId(segment)) return;

    const scrollTo = () => {
      document.getElementById(segment)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    scrollTo();
    const retry = window.setTimeout(scrollTo, 2600);
    return () => window.clearTimeout(retry);
  }, [location.pathname]);

  if (section !== undefined && !isPortfolioSectionId(section)) {
    return <NotFound />;
  }

  return (
    <>
      <ShaderBg />
      <ScrollProgress />
      <PageLoader />
      <Cursor />
      <Topbar
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onOpenMenu={open}
        activeSection={activeSection}
        askAiOpen={askAiOpen}
        onToggleAskAi={() => setAskAiOpen((v) => !v)}
      />
      <Sidebar
        isOpen={isOpen}
        onClose={close}
        activeSection={activeSection}
      />
      <SkillsSidebar />

      <main>
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Projects />
        <GitHubActivity />
        <Services />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
      <ScrollToTop />
      <CommandPalette isDark={isDark} onToggleTheme={toggleTheme} />
      <RatingWidget />
      <PortfolioChat open={askAiOpen} onOpenChange={setAskAiOpen} />
    </>
  );
}
