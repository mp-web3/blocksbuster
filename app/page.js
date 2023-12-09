"use client";
import Hero from "@/app/components/hero/Hero";
import VideoList from "@/app/components/videos/VideoList";
import ArticleList from "./components/articles/ArticleList";
import SectionHeader from "./components/headers/SectionHeader";
import Footer from "./components/footer/Footer";
import Header from "./components/headers/Header";

export default function Page() {
  return (
    <main>
      <Header />
      <Hero />
      <div className="flex flex-col gap-12">
        <SectionHeader header="articleHeader" />
        <ArticleList />
        <SectionHeader header="videoHeader" />
        <VideoList />
      </div>
      <Footer />
    </main>
  );
}
