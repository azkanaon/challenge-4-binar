import { useParams } from "react-router-dom";
import { detailMovie, creditsMovie, getSimilarMovie } from "../../api/api";
import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar";
import ButtonWatch from "../../components/ButtonWatch";
import ModalWatch from "../../components/ModalWatch";
import Footer from "../../components/Footer";
import SliderMovie from "../../components/SliderMovie";
import SliderActor from "../../components/SliderActor";

const DetailMovie = () => {
  const [getDetailData, setGetDetailData] = useState([]);
  const [getActor, setGetActor] = useState([]);
  const [getSimilar, setGetSimilar] = useState([]);
  const imageUrl = import.meta.env.VITE_REACT_W500IMAGE;
  const { id } = useParams();
  // pengaturan untuk modal di page detail
  const [isOpen, setOpen] = useState(false);
  const handleChange = () => {
    setOpen(!isOpen);
  };
  // ambil data detail dari api dengan id klik-an user
  useEffect(() => {
    detailMovie(id).then((result) => {
      if (result) {
        setGetDetailData(result);
      }
    });
  }, [id]);

  // ambil data similar dari api dengan id klik-an user
  useEffect(() => {
    getSimilarMovie(id).then((result) => {
      if (result) {
        setGetSimilar(result);
      }
    });
  }, [id]);
  // ambil 7 index pertama pada actor
  useEffect(() => {
    creditsMovie(id).then((result) => {
      if (result.length > 0) {
        const first10Actor = result.slice(0, 10);
        setGetActor([...first10Actor]);
      }
    });
  }, [id]);
  return (
    <div className="font-poppins">
      <Navbar />
      <div
        style={{
          backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.25)), url(${imageUrl}${getDetailData.backdrop_path})`,
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "black",
          backgroundSize: "cover",
        }}
        className=" h-screen w-full box-border flex justify-center"
      >
        <div className=" text-white w-10/12 md:w-8/12 flex flex-col md:flex-row items-center">
          <div className="w-full pt-[90px] md:pt-0  md:w-6/12 flex justify-center md:justify-end md:pr-10">
            <img
              className="w-5/12 md:w-full lg:w-8/12 rounded-xl shadow-xl neon-slate"
              src={
                getDetailData.poster_path
                  ? `${imageUrl}${getDetailData.poster_path}`
                  : ""
              }
              alt={getDetailData.title}
            />
          </div>
          <div className="w-full pt-2 md:pt-0 md:w-6/12">
            <h1 className="shadow-text font-semibold text-xl md:text-4xl">
              {getDetailData.title} (
              {new Date(getDetailData.release_date).getFullYear()})
            </h1>
            <p className="text-sm md:text-lg py-1 md:py-2">
              <span className="text-yellow-400 ">
                <ion-icon name="star"></ion-icon>
              </span>
              <span className="">
                {getDetailData.vote_average
                  ? getDetailData.vote_average.toFixed(1)
                  : "Unknown"}
              </span>{" "}
              <span className="">
                | {getDetailData.runtime ? getDetailData.runtime : "Unknown"}{" "}
                min
              </span>{" "}
              | {/* looping genre */}
              {getDetailData.genres &&
                getDetailData.genres.map((genre) => (
                  <span key={genre.id}>{genre.name} </span>
                ))}
            </p>
            <p className="text-xs md:text-md h-[60px] md:h-auto overflow-auto md:overflow-visible">
              {getDetailData.overview}
            </p>
            <ModalWatch
              id={getDetailData.id ? getDetailData.id : 0}
              isOpen={isOpen}
              close={handleChange}
            />
            <ButtonWatch click={handleChange} />
            <div className="mt-1 md:mt-4">
              <p className="text-md md:text-xl font-semibold">Caster</p>
              <SliderActor actors={getActor} />
            </div>
          </div>
        </div>
      </div>
      <div className="mx-5 md:mx-10 flex flex-wrap h-auto text-white bg-gradient-to-b from-black/80 to-black/30 pb-10">
        <div className="md:pb-5">
          <h2 className="font-semibold text-md md:text-xl">Similar Movie</h2>
        </div>
        <div className="w-full">
          <SliderMovie movieList={getSimilar} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DetailMovie;
