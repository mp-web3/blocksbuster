import GameCard from "./GameCard";
import useGames from "../custom-hooks/useGames";

const GameList = () => {
    const { games, loading, error } = useGames(
        process.env.NEXT_PUBLIC_RAWG_API_KEY
    );

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error... {error}</div>

    return (
        <main className="m-24 rounded-md grid grid-cols-4 gap-12">
            {games.map((game) => (
                <GameCard key={game.id} game={game} />
            ))}
        </main>
    );
};

export default GameList;