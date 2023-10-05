import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieList } from "../../api/api";
import Card from "../../components/Card";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const MovieType = () => {
  const { type } = useParams();
  // tipe top rated direname agar tampilan terlihat lebih rapi
  const typeModifier = useState(
    type === "top_rated" ? "TOP RATED" : type.toUpperCase()
  );
  const [movieList, setMovieList] = useState([]);
  // ambil data dengan type klik-an user
  useEffect(() => {
    getMovieList(type)
      .then((result) => {
        if (result.length > 0) {
          setMovieList(result);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [type]);

  return (
    <div className="bg-gradient-to-tr from-black to-white/20">
      <Navbar />
      <div className="font-poppins mx-auto pt-[100px] md:pt-[150px]  w-11/12 md:w-10/12 text-white pb-10">
        <div className="text-center pb-5 md:pb-10 ">
          <h2 className=" md:text-4xl text-2xl font-semibold">
            {typeModifier} MOVIE
          </h2>
        </div>
        <div className="flex flex-wrap w-full">
          {movieList.map((movie) => (
            <div
              key={movie.id}
              className="w-6/12 md:w-4/12 lg:w-3/12 box-border p-1 md:p-4"
            >
              <Card
                title={movie.title}
                overview={movie.overview}
                poster={movie.poster_path}
                id={movie.id}
              />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MovieType;
