import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import ChapterCard from "@/components/ChapterCard";
import EngineeringDNA from "@/components/EngineeringDNA";
import BigWords from "@/components/BigWords";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import FeaturedProject from "@/components/FeaturedProject";
import Projects from "@/components/Projects";
import Terminal from "@/components/Terminal";
import Education from "@/components/Education";
import Resume from "@/components/Resume";
import Contact from "@/components/Contact";
import VelocitySkew from "@/components/VelocitySkew";

const AI_TICKER = ["AGENTIC AI", "RAG", "LANGGRAPH", "MCP", "MULTI-AGENT", "LLMS", "QDRANT", "LANGFUSE", "LLAMAINDEX"];
const STACK_TICKER = ["PYTHON", "JAVA", "REACT", "FASTAPI", "SPRING BOOT", "NODE.JS", "AWS", "DOCKER", "KUBERNETES", "CI/CD"];

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee items={AI_TICKER} />

      <ChapterCard scene="SCENE 01" title="The Engineer" sub="AGENTIC AI × FULL STACK × CLOUD" />
      <EngineeringDNA />

      <ChapterCard scene="SCENE 02" title="The Craft" sub="HOW I THINK, BUILD, AND SHIP" />
      <BigWords />

      <ChapterCard scene="SCENE 03" title="The Journey" sub="2022 — PRESENT" />
      <Experience />

      <Marquee items={STACK_TICKER} reverse />
      <Skills />

      <ChapterCard scene="SCENE 04" title="The Feature" sub="ENTERPRISE AI OPERATIONS COPILOT" />
      <FeaturedProject />
      <Projects />

      <ChapterCard scene="FINAL SCENE" title="The Person" sub="BEHIND THE SYSTEMS" />
      <VelocitySkew>
        <Terminal />
        <Education />
        <Resume />
        <Contact />
      </VelocitySkew>
    </>
  );
}
