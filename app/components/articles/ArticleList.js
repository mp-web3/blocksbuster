import ArticleCard from './ArticleCard';
import useArticles from '@/app/custom-hooks/useArticles';

const ArticleList = () => {
    const { articles, loading, error } = useArticles(
      process.env.NEXT_PUBLIC_GNEWS_API_KEY
    );

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error... {error}</div>;

    return (
      <main class="rounded-md grid grid-cols-4 m-2 gap-4 md:grid-cols-12 md:m-32 md:gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </main>
    );

}

export default ArticleList;