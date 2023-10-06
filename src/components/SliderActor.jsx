import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import imageError from "../assets/image/error.png";

import PropTypes from "prop-types";

const SliderActor = ({ actors }) => {
  const imageUrl = import.meta.env.VITE_REACT_W500IMAGE;
  return (
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
      {actors.map((actor) => (
        <SwiperSlide key={actor.id}>
          <img
            className="w-[100px] border-2 border-slate-400 h-[100px] overflow-hidden shadow-lg neon-slate object-cover rounded-3xl inline-block duration-300 hover:scale-110"
            src={
              actor.profile_path
                ? `${imageUrl}${actor.profile_path}`
                : imageError
            }
            alt={actor.name}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

SliderActor.propTypes = {
  actors: PropTypes.array,
};

export default SliderActor;
