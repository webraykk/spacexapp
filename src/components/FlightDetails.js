import { Link } from "react-router-dom";
import FlightDetailsBody from "./FlightDetailsBody";
import FlightDetailsGallery from "./FlightDetailsGallery";
import NotFound from "./NotFound";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";

export default function FlightDetails({
  dataLaunches,
  dataRockets,
  dataLaunchpads,
  flightNumber,
}) {
  const launches = dataLaunches.filter(
    (el) => el.flight_number.toString() === flightNumber
  );

  let detailsFlight, detailsLaunchpad, detailsRocket;

  if (launches.length > 0) {
    detailsFlight = launches[0];

    [detailsLaunchpad] = dataLaunchpads.filter(
      (el) => el.id === detailsFlight.launchpad
    );

    [detailsRocket] = dataRockets.filter(
      (el) => el.id === detailsFlight.rocket
    );
  }

  return (
    <>
      {launches.length > 0 ? (
        <div className="details">
          <div className="details__header d-flex">
            <Link to="/">
              <FontAwesomeIcon icon={faLongArrowAltLeft} />
            </Link>
            <div className="details__headerName">
              Details of the flight # {detailsFlight.flight_number}
            </div>
          </div>
          <FlightDetailsBody
            detailsFlight={detailsFlight}
            detailsRocket={detailsRocket}
            detailsLaunchpad={detailsLaunchpad}
          />
          {(detailsFlight.links.flickr.original.length > 0 ||
            detailsRocket.flickr_images.length > 0) && (
            <FlightDetailsGallery
              detailsFlight={detailsFlight}
              galleryFlight={detailsFlight.links.flickr.original}
              galleryRocket={detailsRocket.flickr_images}
            />
          )}
          {detailsFlight.details ? (
            <div className="details__description">{detailsFlight.details}</div>
          ) : null}
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
}
