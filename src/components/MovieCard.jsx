import { Link } from "react-router-dom";

import { Star } from "phosphor-react";

const imageUrl = import.meta.env.VITE_IMG;

export function MovieCard({ movie, showLink = true }) {
  return (
    <div className="w-64 relative overflow-hidden rounded-lg">
      <img src={imageUrl + movie.poster_path} alt={movie.title} />
      <div
        className="absolute top-0 left-0 bg-gradient-to-t from-black via-black/50 to-transparent w-full h-full flex flex-col 
        justify-end px-4 pb-6"
      >
        <h2 className="font-bold text-zinc-200 mb-2 truncate">{movie.title}</h2>

        <span className="flex gap-2 text-zinc-100 font-bold items-center mb-2">
          <Star weight="fill" className="text-yellow-300" />
          <p className="text-sm">{movie.vote_average}</p>
        </span>
        {showLink && (
          <Link
            className="px-4 py-3 bg-red-600 text-zinc-50 text-xs font-bold rounded-lg flex justify-center items-center 
            max-w-[100px] hover:bg-red-500 transition-colors"
            to={`/movie/${movie.id}`}
          >
            Details
          </Link>
        )}
      </div>
    </div>
  );
}
