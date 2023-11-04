const ArticleCard = ({ article }) => {
    return (
      <div className="col-span-4">
        <div className="aspect-video relative overflow-hidden rounded-md">
            <img
                className="rounded-md"
                src={article.image}
                alt={article.title}
            />
        </div>
        <h2>{article.title.split(" ").slice(0, 5).join(" ")}</h2>
        <p>{article.description}</p>
        <div>
          {article.publishedAt} | {article.author}
        </div>
      </div>
    );
}

export default ArticleCard;