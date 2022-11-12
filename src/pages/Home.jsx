import { useState, useEffect } from "react";

import { Loading } from "../components/Loading";
import { MovieCard } from "../components/MovieCard";

import { Popcorn } from "phosphor-react";

const moviesUrl = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

export function Home() {
  const [topMovies, setTopMovies] = useState([]);

  useEffect(() => {
    const topRatedUrl = `${moviesUrl}top_rated?${apiKey}`;

    console.log(topRatedUrl);

    getTopRatedMovies(topRatedUrl);
  }, []);

  const getTopRatedMovies = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    setTopMovies(data.results);
  };

  return (
    <div className="flex flex-col py-6">
      <div className="text-zinc-200 flex gap-1 items-center mb-6">
        <Popcorn size={24} />
        <h1 className=" text-xl font-bold">Top Films</h1>
      </div>
      <div className="flex justify-center flex-wrap gap-y-12 gap-x-6 w-full">
        {topMovies.length === 0 && (
          <div className="flex gap-2 text-zinc-200 items-center overflow-hidden">
            <Loading />
            Loading...
          </div>
        )}
        {topMovies.length > 0 &&
          topMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  );
}
