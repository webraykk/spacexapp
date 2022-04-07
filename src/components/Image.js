import { useState } from "react";
import spinner from "../../src/images/spinner.gif";
import dummyImage from "../../src/images/dummy.jpg";

export default function Image({ src, alt }) {
  const handleOnload = () => {
    setSrcImage(src);
  };

  const [srcImage, setSrcImage] = useState(spinner);

  return (
    <>
      <img src={srcImage} alt={alt} loading="lazy" onLoad={handleOnload} />
    </>
  );
}

Image.defaultProps = {
  src: dummyImage,
  alt: "placeholder",
};
