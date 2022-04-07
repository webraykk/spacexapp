import { useState, useEffect } from "react";
import { urlLaunches, itemsPerPage } from "../config";
import FlightSearch from "./FlightSearch";
import FlightList from "./FlightList";
import Loader from "./Loader";
import Error from "./Error";
import useFetch from "../hooks/useFetch";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const { data, loading, error } = useFetch(urlLaunches, (myData) =>
    myData
      .sort((a, b) => (a.date_utc < b.date_utc ? 1 : -1))
      .filter((el) => el.date_unix * 1000 <= Date.now())
  );
  const [fetchedData, setFetchedData] = useState(null);
  const [currentData, setCurrentData] = useState(null);
  const [dataOffset, setDataOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [isName, setIsName] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isDate, setIsDate] = useState([]);
  const [searchConditions, setSearchConditions] = useState({
    isSubmit: false,
    flightName: isName,
    flightSuccess: false,
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    setFetchedData(data);
  }, [data]);

  useEffect(() => {
    const endOffset = dataOffset + itemsPerPage;
    fetchedData && setPageCount(Math.ceil(fetchedData.length / itemsPerPage));
    fetchedData && setCurrentData(fetchedData.slice(dataOffset, endOffset));
  }, [dataOffset, fetchedData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let filteredData = data;

    if (isChecked) {
      filteredData = filteredData.filter((el) => el.success === true);
    }

    if (isName) {
      filteredData = filteredData.filter((el) => {
        const flightName = el.name.toLowerCase();
        return flightName.includes(isName.toLowerCase()) ? el : null;
      });
    }

    if (isDate.length) {
      if (isDate.length === 1) {
        filteredData = filteredData.filter(
          (el) =>
            el.date_utc.split("T").shift() === isDate[0].format("YYYY-MM-DD")
        );
      } else {
        const startDate = isDate[0].format("YYYY-MM-DD");
        const endDate = isDate[1].format("YYYY-MM-DD");
        filteredData = filteredData.filter((el) => {
          const flightDate = el.date_utc.split("T").shift();
          return flightDate >= startDate && flightDate <= endDate;
        });
      }
    }

    setFetchedData(filteredData);
    setIsName("");
    setIsChecked(false);
    setIsDate([]);
    setSearchConditions({
      isSubmit: true,
      flightName: isName,
      flightSuccess: isChecked,
      startDate: isDate[0] ? isDate[0].format("YYYY-MM-DD") : "",
      endDate: isDate[1] ? isDate[1].format("YYYY-MM-DD") : "",
    });
  };

  const handleName = (e) => {
    setIsName(e.target.value);
  };

  const handleChecked = () => {
    setIsChecked(!isChecked);
  };

  const handleDate = (dateObjects) => {
    setIsDate(dateObjects);
  };

  const handlePageClick = (e) => {
    const offset = e.selected * itemsPerPage;
    setDataOffset(offset);
  };

  return (
    <>
      {currentData && (
        <>
          <FlightSearch
            isName={isName}
            isChecked={isChecked}
            isDate={isDate}
            searchConditions={searchConditions}
            handleChecked={handleChecked}
            handleName={handleName}
            handleDate={handleDate}
            handleSubmit={handleSubmit}
          />
          <FlightList currentData={currentData} />
          {currentData.length ? (
            <ReactPaginate
              pageCount={pageCount}
              pageRangeDisplayed={2}
              marginPagesDisplayed={2}
              onPageChange={handlePageClick}
              containerClassName="pagination justify-content-center mt-5"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              activeClassName="active"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              breakClassName="page-item"
              breakLinkClassName="page-link"
              previousLabel={<FontAwesomeIcon icon={faCaretLeft} />}
              nextLabel={<FontAwesomeIcon icon={faCaretRight} />}
            />
          ) : null}
        </>
      )}
      {loading && <Loader />}
      {error && <Error error={error} />}
    </>
  );
}
