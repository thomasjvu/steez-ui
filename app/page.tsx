import { DocsSiteLayout } from "@/components/docs/site-layout";
import { HomePageContent } from "@/components/docs/home-page";

export default function Home() {
  return (
    <DocsSiteLayout currentNav="home">
      <HomePageContent />
    </DocsSiteLayout>
  );
}
