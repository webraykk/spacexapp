import { urlLaunches, urlRockets, urlLaunchpads } from "../config";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Loader from "./Loader";
import Error from "./Error";
import FlightDetails from "./FlightDetails";

export default function FlightSubpage() {
  const { flightNumber } = useParams();
  const {
    data: dataLaunches,
    loading: loadingLaunches,
    error: errorLaunches,
  } = useFetch(urlLaunches);
  const {
    data: dataRockets,
    loading: loadingRockets,
    error: errorRockets,
  } = useFetch(urlRockets);
  const {
    data: dataLaunchpads,
    loading: loadingLaunchpads,
    error: errorLaunchpads,
  } = useFetch(urlLaunchpads);

  return (
    <>
      {(loadingLaunches || loadingRockets || loadingLaunchpads) && <Loader />}
      {(errorLaunches || errorRockets || errorLaunchpads) && (
        <Error error={errorLaunches || errorRockets || errorLaunchpads} />
      )}
      {dataLaunches && dataRockets && dataLaunchpads && (
        <FlightDetails
          dataLaunches={dataLaunches}
          dataRockets={dataRockets}
          dataLaunchpads={dataLaunchpads}
          flightNumber={flightNumber}
        />
      )}
    </>
  );
}
