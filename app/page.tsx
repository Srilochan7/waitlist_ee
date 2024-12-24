import BackgroundSection from "./Components/Background.js";
import GlassCTA from "./Components/GlassCTA.js";
import Footer from "./Components/Footer.js";
// import Faqpage from "./Components/faqs.js";
export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <BackgroundSection/>
      <main className=" w-[100%] relative">
        <GlassCTA />
      </main>
    </div>
  );
}
