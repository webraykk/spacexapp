import { useEffect, useRef } from "react";
import Image from "./Image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";

export default function FlightList({ currentData }) {
  const listRef = useRef();

  useEffect(() => listRef.current.scrollTo(0, 0), [currentData]);

  const flights = currentData.map(
    ({ links: { flickr }, flight_number, name, date_utc }) => (
      <li className="flights__item col-12 row" key={flight_number}>
        <div className="flights__image col-sm-6">
          {flickr.original.length > 0 ? (
            <Image src={flickr.original[0]} alt={name} />
          ) : (
            <Image />
          )}
        </div>
        <div className="flights__description col-sm-6 d-flex flex-column justify-content-center align-items-start">
          <p className="flights__number"># {flight_number}</p>
          <p className="flights__name">{name}</p>
          <p className="flights__date">
            <FontAwesomeIcon
              icon={faCalendar}
              style={{ paddingRight: "0.5rem" }}
            />{" "}
            {date_utc.split("T").shift()}
          </p>
          <Link className="flights__more" to={`flight/${flight_number}`}>
            more
          </Link>
        </div>
      </li>
    )
  );

  return (
    <ul ref={listRef} className="flights row">
      {flights}
    </ul>
  );
}
