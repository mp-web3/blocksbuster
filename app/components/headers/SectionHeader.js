import text from "@/i18n/en/text.json";
const SectionHeader = ({ header }) => {
  const headerClassMap = {
    videoHeader: "video-header",
    articleHeader: "article-header",
  };

  const headerClass = headerClassMap[header];

  return (
    <div class={`section-header ${headerClass}`}>
      <h2>{text.header[header].title}</h2>
      <p>{text.header[header].subTitle}</p>
    </div>
  );
};

export default SectionHeader;
