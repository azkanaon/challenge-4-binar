import { useEffect, useState } from "react";
import { getMovieList } from "../../api/api";

import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import SliderMovie from "../../components/SliderMovie";
import Footer from "../../components/Footer";

const Home = () => {
  const [moviePopularList, setMoviePopularList] = useState([]);
  const [movieTopRatedList, setMovieTopRatedList] = useState([]);
  const [movieUpcomingList, setMovieUpcomingList] = useState([]);

  // ambil movie dengan tipe popular
  useEffect(() => {
    getMovieList("popular")
      .then((result) => {
        if (result.length > 0) {
          const first9Movies = result.slice(0, 9);
          setMoviePopularList([...first9Movies]);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  // ambil movie dengan tipe upcoming
  useEffect(() => {
    getMovieList("upcoming")
      .then((result) => {
        if (result.length > 0) {
          const first9Movies = result.slice(0, 9);
          setMovieUpcomingList([...first9Movies]);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  // ambil movie dengan tipe top rated
  useEffect(() => {
    getMovieList("top_rated")
      .then((result) => {
        if (result.length > 0) {
          const first9Movies = result.slice(0, 9);
          setMovieTopRatedList([...first9Movies]);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <div className="bg-gradient-to-b from-black/100 to-black/50 font-poppins">
      <Navbar />
      <div className="pb-10">
        <Hero />
        {/* masing-masing tipe dirender di SliderMovie */}
        <SliderMovie
          title="Popular"
          type="popular"
          movieList={moviePopularList}
        />
        <SliderMovie
          title="Top Rated"
          type="top_rated"
          movieList={movieTopRatedList}
        />
        <SliderMovie
          title="Upcoming"
          type="upcoming"
          movieList={movieUpcomingList}
        />
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Home;
