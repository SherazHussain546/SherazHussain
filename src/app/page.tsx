import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import AboutSection from '@/components/portfolio/about-section';
import SkillsSection from '@/components/portfolio/skills-section';
import ExperienceSection from '@/components/portfolio/experience-section';
import ProjectsSection from '@/components/portfolio/projects-section';
import EducationSection from '@/components/portfolio/education-section';
import CertificationsSection from '@/components/portfolio/certifications-section';
import ContactSection from '@/components/portfolio/contact-section';
import PostsSection from '@/components/portfolio/posts-section';
import CertifiedBySection from '@/components/portfolio/certified-by-section';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <AboutSection />
        <CertifiedBySection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <EducationSection />
        <CertificationsSection />
        <PostsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
