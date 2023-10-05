import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// card digunakan digunakan ketika mendapatkan hasil dari type movie
const Card = ({ id, title, overview, poster }) => {
  const imageUrl = import.meta.env.VITE_REACT_ORIGINALIMAGE;
  return (
    // arahkan ke detail movie
    <Link to={`/movie/detail/${id}`}>
      <div className="w-full  overflow-hidden rounded-xl flex flex-col box-border shadow-sm neon-slate relative hover:transition-all hover:duration-300">
        <img
          className="w-full lg:h-[425px] object-cover"
          src={`${imageUrl}${poster}`}
          alt=""
        />
        <div className="rounded-t-lg px-3 pt-2 box-border bg-slate-900/75 w-full absolute bottom-[-68px] hover:translate-y-[-68px] duration-300 left-0">
          <h2 className="text-white font-semibold mb-2 text-xl md:text-2xl">
            {title}
          </h2>
          <p className=" line-clamp-3 text-white font-normal">{overview}</p>
        </div>
      </div>
    </Link>
  );
};

Card.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  overview: PropTypes.string,
  poster: PropTypes.string,
};
export default Card;
