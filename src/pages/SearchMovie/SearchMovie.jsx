import { useParams } from "react-router-dom";
import { searchMovie } from "../../api/api";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CardSearch from "../../components/CardSearch";

const SearchMovie = () => {
  // inputan user dipassing dan disimpan pada variabel query
  const { query } = useParams();
  const [searchData, setSearchData] = useState([]);
  // mencari hasil dari inputan user
  useEffect(() => {
    searchMovie(query)
      .then((result) => {
        setSearchData(result);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [query]);

  return (
    <div>
      <Navbar />
      <div className="font-poppins pt-[150px] bg-gradient-to-t from-black to-white/20 text-white px-6 pb-10">
        <div className="ml-12">
          <h1 className="text-2xl font-semibold">Result from {`'${query}'`}</h1>
        </div>
        <div className="flex flex-wrap w-full ">
          {searchData.map((data) => (
            <div
              className="box-border w-full sm:w-6/12 md:w-4/12 lg:w-3/12 p-1 md:p-3"
              key={data.id}
            >
              <CardSearch
                id={data.id}
                backdrop={data.backdrop_path}
                title={data.title}
                vote_average={data.vote_average}
                year={data.release_date}
                vote_count={data.vote_count}
                popularity={data.popularity}
                poster={data.poster_path}
              ></CardSearch>
            </div>
          ))}
        </div>
      </div>
      {/* <ul>
        
      </ul> */}
      <Footer />
    </div>
  );
};

export default SearchMovie;
