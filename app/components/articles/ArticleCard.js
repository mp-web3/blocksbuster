const ArticleCard = ({ article }) => {
  return (
    <div className="card col-span-4">
      <div className="content-container">
        <a href={article.url} target="_blank" rel="noopener noreferrer">
          <img className="rounded-md" src={article.image} alt={article.title} />
        </a>
      </div>
      <a href={article.url} target="_blank" rel="noopener noreferrer">
        <h3 class="article-title">
          {article.title.split(" ").slice(0, 5).join(" ")}
        </h3>
      </a>
      <p>{article.description}</p>
      <h5>
        {article.publishedAt} | {article.author}
      </h5>
    </div>
  );
};

export default ArticleCard;
