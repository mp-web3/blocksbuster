"use client";
import Hero from "@/app/components/hero/Hero";
import VideoList from "@/app/components/videos/VideoList";
import ArticleList from "./components/articles/ArticleList";
import SectionHeader from "./components/headers/SectionHeader";

export default function Page() {
  return (
    <main>
      <Hero />
      <div className="flex flex-col gap-12">
        <SectionHeader header="articleHeader" />
        <ArticleList />
        <SectionHeader header="videoHeader" />
        <VideoList />;
      </div>
    </main>
  );
}
