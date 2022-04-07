export default function FlightDetailsBody({
  detailsFlight,
  detailsRocket,
  detailsLaunchpad,
}) {
  return (
    <div className="details__body d-flex flex-column flex-md-row mt-5">
      <div className="details__bodyBox">
        <p>
          <span className="details__bodyBoxSpan">Flight name:</span>
          <strong>{detailsFlight.name}</strong>
        </p>
        <p>
          <span className="details__bodyBoxSpan">Flight date:</span>
          <strong>{detailsFlight.date_utc.split("T").shift()}</strong>
        </p>
        <p>
          <span className="details__bodyBoxSpan">Flight status:</span>
          <strong>
            <span
              className={`details__bodyBoxSpanStatus ${
                detailsFlight.success ? "success" : "failed"
              }`}
            >
              {detailsFlight.success ? "success" : "failed"}
            </span>
          </strong>
        </p>
      </div>
      <div className="details__bodyBox">
        <p>
          <span className="details__bodyBoxSpan">Flight crew:</span>
          <strong>{detailsFlight.crew.length}</strong>
        </p>
        <p>
          <span className="details__bodyBoxSpan">Flight rocket:</span>
          <strong>{detailsRocket.name}</strong>
        </p>
        <p>
          <span className="details__bodyBoxSpan">Launchpad:</span>
          <strong>{detailsLaunchpad.name}</strong>
        </p>
      </div>
    </div>
  );
}
