import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Card from "./Card";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const SliderMovie = ({ movieList, title, type }) => {
  return (
    <div className="flex flex-col bg-black md:mt-3">
      <div className="flex justify-between py-5 pl-3">
        <div className="pl-2">
          <h6 className="text-white font-semibold text-lg md:text-2xl">
            {title}
          </h6>
        </div>
        <div className="text-white pr-2">
          {/* arahkan ke movie dengan type sesuai dengan yang user pencet */}
          <Link to={`/movie/${type}`}>
            <span className="inline-block text-lg cursor-pointer hover:translate-y-[-5px] hover:font-semibold duration-300">
              See all &gt;
            </span>
          </Link>
        </div>
      </div>
      <div className="mx-5 md:mx-10 flex flex-wrap h-auto">
        <Swiper
          slidesPerView={2}
          spaceBetween={20}
          pagination={false}
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
          className="mySwiper"
        >
          {movieList.map((movie) => (
            <SwiperSlide key={movie.id} className="lg:flex lg:justify-center">
              <Card
                title={movie.title}
                overview={movie.overview}
                poster={movie.poster_path}
                id={movie.id}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

SliderMovie.propTypes = {
  movieList: PropTypes.array,
  title: PropTypes.string,
  type: PropTypes.string,
};

export default SliderMovie;
