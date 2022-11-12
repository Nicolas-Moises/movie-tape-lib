import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Wallet,
  Calendar,
  FilmSlate,
  HourglassMedium,
  TrendUp,
  TrendDown,
  PlayCircle,
  ArrowBendUpLeft,
} from "phosphor-react";

const moviesUrl = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;
const imageUrl = import.meta.env.VITE_IMG;

export function Movie() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);

  const getMovie = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    setMovie(data);
  };

  const formatCurrency = (number) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  useEffect(() => {
    const movieUrl = `${moviesUrl}${id}?${apiKey}`;

    getMovie(movieUrl);
  }, []);

  return (
    <div className="flex flex-col gap-5 py-10">
      <h1 className=" text-xl font-bold text-zinc-100"></h1>

      {movie && (
        <div className="flex flex-col items-center">
          <h1 className=" text-xl font-bold text-zinc-100 mb-4">
            {movie.title}
          </h1>
          <div className="h-auto md:w-2/3">
            <img
              className="rounded-xl w-full"
              src={imageUrl + movie.backdrop_path}
              alt={movie.tagline}
            />
            <div className="flex md:flex-row flex-col gap-3 justify-between items-center mt-4">
              <p className="font-semibold text-zinc-50">{movie.tagline}</p>
              <button className="flex gap-1 rounded-lg font-bold items-center px-4 py-3 bg-red-600 hover:bg-red-500 text-zinc-100">
                Trailer
                <PlayCircle size={20} weight="fill" />
              </button>
            </div>
          </div>

          <div className="w-2/3 flex md:flex-row flex-col gap-3 justify-between mt-10 ">
            <div className="flex flex-col gap-4 items-stretch">
              <div className="flex flex-col gap-2">
                <h2 className="flex gap-2 items-center text-zinc-50 font-bold text-lg">
                  <FilmSlate size={24} />
                  Synopsis
                </h2>
                <p className="max-w-[400px] text-sm text-zinc-200 ">
                  {movie.overview}
                </p>
              </div>

              <div>
                <h2 className="flex gap-2 items-center text-zinc-50 font-bold text-lg">
                  <HourglassMedium size={24} />
                  Duration
                </h2>
                <p className="text-sm text-zinc-200">{movie.runtime} min</p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div>
                <h2 className="flex gap-2 items-center text-zinc-50 font-bold text-lg">
                  <Calendar size={24} />
                  Release
                </h2>

                <p className="text-sm text-zinc-200">{movie.release_date}</p>
              </div>

              <div>
                <h2 className="flex gap-2 items-center text-zinc-50 font-bold text-lg">
                  <Wallet size={24} />
                  Budget
                </h2>
                <p className="text-sm text-zinc-200">
                  {formatCurrency(movie.budget)}
                </p>
              </div>

              <div>
                <h2 className="flex gap-2 items-center text-zinc-50 font-bold text-lg">
                  {movie.revenue > movie.budget ? (
                    <TrendUp size={24} />
                  ) : (
                    <TrendDown size={24} />
                  )}
                  Revenue
                </h2>
                <p className="text-sm text-zinc-200">
                  {formatCurrency(movie.revenue)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <Link to="/" className="self-center">
        <button
          className="flex items-center justify-center bg-red-600 hover:bg-red-500 px-7 py-3
        text-lg font-bold text-zinc-50 rounded-lg"
        >
          Back To Home
        </button>
      </Link>
    </div>
  );
}
