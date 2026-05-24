import Header            from '@/components/layout/Header';
import Hero              from '@/components/sections/Hero';
import ProjectOverview   from '@/components/sections/ProjectOverview';
import ProjectHighlights from '@/components/sections/ProjectHighlights';
import VideoShowcase     from '@/components/sections/VideoShowcase';
import LocationPreview   from '@/components/sections/LocationPreview';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProjectOverview />
        <ProjectHighlights />
        <VideoShowcase />
        <LocationPreview />
        {/* Facilities preview, Floor Plans preview, Blog preview, Contact CTA — Stage 3E+ */}
      </main>
    </>
  );
}
