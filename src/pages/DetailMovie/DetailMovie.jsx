import { useParams } from "react-router-dom";
import { detailMovie, creditsMovie } from "../../api/api";
import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar";
import ButtonWatch from "../../components/ButtonWatch";
import ModalWatch from "../../components/ModalWatch";
import Footer from "../../components/Footer";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const DetailMovie = () => {
  const [getDetailData, setGetDetailData] = useState([]);
  const [getActor, setGetActor] = useState([]);
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

  // ambil 7 index pertama pada actor
  useEffect(() => {
    creditsMovie(id).then((result) => {
      if (result.length > 0) {
        const first5Actor = result.slice(0, 7);
        setGetActor([...first5Actor]);
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
          <div className="w-full pt-[75px] md:pt-0  md:w-6/12 flex justify-center md:justify-end md:pr-10">
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
              <Swiper
                slidesPerView={2}
                spaceBetween={20}
                pagination={true}
                grabCursor={true}
                breakpoints={{
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 40,
                  },
                  1024: {
                    slidesPerView: 5,
                    spaceBetween: 30,
                  },
                }}
                modules={[Pagination]}
                className="mySwiper pb-10 pt-2"
              >
                {/* looping actor */}
                {getActor.map((actor) => (
                  <SwiperSlide key={actor.id}>
                    <img
                      className="w-[100px] border-2 border-slate-400 h-[100px] overflow-hidden shadow-lg neon-slate object-cover rounded-3xl"
                      src={`${imageUrl}${actor.profile_path}`}
                      alt={actor.name}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DetailMovie;
