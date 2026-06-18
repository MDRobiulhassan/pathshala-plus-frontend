import { SiteNav } from "@/components/homepage/site-nav";
import { HeroSection } from "@/components/homepage/hero-section";
import { BuiltForLearners } from "@/components/homepage/built-for-learners";
import { HowItWorks } from "@/components/homepage/how-it-works";
import { QuickActions } from "@/components/homepage/quick-actions";
import { WhyPathshala } from "@/components/homepage/why-pathshala";
import { Pricing } from "@/components/homepage/pricing";
import { SiteFooter } from "@/components/homepage/site-footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main>
        <HeroSection />
        <QuickActions />
        <WhyPathshala />
        <HowItWorks />
        <BuiltForLearners />
        <Pricing />
      </main>
      <SiteFooter />
    </div>
  );
}
