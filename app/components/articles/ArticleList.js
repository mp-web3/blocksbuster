import ArticleCard from './ArticleCard';
import useArticles from '@/app/custom-hooks/useArticles';

const ArticleList = () => {
    const { articles, loading, error } = useArticles(
      process.env.NEXT_PUBLIC_GNEWS_API_KEY
    );

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error... {error}</div>;

    return (
        <main className='m-24 rounded-md grid grid-cols-4 gap-12'>
            {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
            ))}
        </main> 
    )

}

export default ArticleList;