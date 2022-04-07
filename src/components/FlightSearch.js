import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";

export default function FlightSearch({
  isName,
  isChecked,
  isDate,
  searchConditions,
  handleName,
  handleChecked,
  handleDate,
  handleSubmit,
}) {
  return (
    <>
      <div className="search" onSubmit={handleSubmit}>
        <form>
          <div className="d-flex flex-wrap align-items-end">
            <div className="search__elem col-12 col-sm-6 col-md-3">
              <label>Flight name</label>
              <input
                value={isName}
                onChange={handleName}
                type="text"
                className="form-control"
              />
            </div>
            <div className="search__elem col-12 col-sm-6 col-md-3">
              <label>Flight date</label>
              <DatePicker
                value={isDate}
                className="bg-dark"
                inputClass="form-control"
                onChange={handleDate}
                range
                plugins={[<DatePanel />]}
              />
            </div>
            <div className="search__elem col-12 col-sm-6 col-md-4 d-flex align-items-center mb-4">
              <input
                checked={isChecked}
                onChange={handleChecked}
                type="checkbox"
                id="checkbox"
              />
              <label className="small" htmlFor="checkbox">
                Show only successful flights
              </label>
            </div>
            <div className="search__elem col-12 col-sm-6 col-md-2">
              <button type="submit" className="btn btn-dark">
                Search
              </button>
            </div>
          </div>
        </form>
      </div>

      {searchConditions.isSubmit && (
        <div className="search mt-4">
          The list of flights for the phrase
          <code>"{searchConditions.flightName}"</code>
          {searchConditions.startDate
            ? ` in a time period ${searchConditions.startDate} `
            : null}
          {searchConditions.endDate ? ` - ${searchConditions.endDate} ` : null}
          {searchConditions.flightSuccess
            ? "for successful flights only"
            : "for all flights"}
          :
        </div>
      )}
    </>
  );
}
