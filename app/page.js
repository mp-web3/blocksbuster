"use client";
import text from "@/i18n/en/text.json";
import VideoList from "@/app/components/videos/VideoList";
import SectionHeader from "./components/headers/SectionHeader";

export default function Page() {
  return (
      <main>
      <SectionHeader header="videoHeader" />
      <VideoList />;
    </main>
  );
}
