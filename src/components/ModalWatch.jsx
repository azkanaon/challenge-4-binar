import { useState, useEffect } from "react";
import { getVideo } from "../api/api";
import PropTypes from "prop-types";
import ModalVideo from "react-modal-video";
import "react-modal-video/scss/modal-video.scss";

const ModalWatch = ({ id, close, isOpen }) => {
  const [video, setVideo] = useState([]);
  useEffect(() => {
    getVideo(id)
      .then((result) => {
        if (result.length > 0) {
          setVideo(result);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [id]);
  console.log(video);
  return (
    <div>
      {/* videoId akan mengarahkan ke youtube */}
      <ModalVideo
        channel="youtube"
        youtube={{ mute: 0, autoplay: 0 }}
        isOpen={isOpen}
        videoId={video[0] && video[0].key ? video[0].key : ""}
        onClose={() => close()}
      />
    </div>
  );
};

ModalWatch.propTypes = {
  id: PropTypes.number,
  close: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default ModalWatch;
