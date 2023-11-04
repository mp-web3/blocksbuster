"use client";

const GameCard = ({ game }) => {
  return (
    <div className="col-span-4 md:col-span-2">
      <h1>{game.name}</h1>
      <p>Rating: {game.rating}</p>
      <div className="aspect-video relative overflow-hidden rounded-md">
        <img
          src={game.backgroundImage}
          layout="fill"
          objectFit="cover"
          className="rounded-md"
          alt={game.name}
        />
      </div>
    </div>
  );
};

export default GameCard;
