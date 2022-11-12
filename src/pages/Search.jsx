import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { MovieCard } from "../components/MovieCard";
import { Loading } from "../components/Loading";

const searchUrl = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

export function Search() {
  const [searchParams] = useSearchParams();

  const [movies, setMovies] = useState([]);
  const query = searchParams.get("q");

  useEffect(() => {
    const searchWithQueryUrl = `${searchUrl}?${apiKey}&query=${query}`;

    getSearchedMovies(searchWithQueryUrl);
  }, [query]);

  const getSearchedMovies = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    setMovies(data.results);
  };

  return (
    <div className="flex flex-col py-6">
      <div className="text-zinc-200 flex gap-1 items-center mb-6">
        <h1 className=" text-xl font-bold">
          Results for
          <span className="font-black text-2xl capitalize"> "{query}"</span>
        </h1>
      </div>
      <div className="flex justify-center flex-wrap gap-y-12 gap-x-6 w-full">
        {movies.length === 0 && (
          <div className="flex gap-2 text-zinc-200 items-center overflow-hidden">
            <Loading />
            Loading...
          </div>
        )}
        {movies.length > 0 &&
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  );
}
