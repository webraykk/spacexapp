import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import spinner from "../../src/images/spinner.gif";

export default function FlightDetailsGallery({
  detailsFlight,
  galleryFlight,
  galleryRocket,
}) {
  const gallery = [...galleryFlight, ...galleryRocket];
  const [srcImage, setSrcImage] = useState(Array(gallery.length).fill(spinner));

  const handleStatus = (currentItem) => `${currentItem} / ${gallery.length}`;

  const handleOnload = (imageSrc, imageIndex) => {
    setSrcImage(
      srcImage.map((el, index) => {
        if (index === imageIndex) {
          el = imageSrc;
        }
        return el;
      })
    );
  };

  return (
    <div className="details__gallery">
      <Carousel
        showIndicators={false}
        thumbWidth={110}
        statusFormatter={handleStatus}
      >
        {gallery.map((el, index) => (
          <div className="details__galleryImage" key={index}>
            <img
              src={srcImage[index]}
              alt={`${detailsFlight.name} - ${index}`}
              onLoad={() => handleOnload(el, index)}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
