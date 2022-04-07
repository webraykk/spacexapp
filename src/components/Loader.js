import loader from "../../src/images/spaceship.png";

export default function Loader() {
  return (
    <div className="loader d-flex justify-content-center align-items-end">
      <div className="loader__image">
        <img src={loader} alt="loader" />
      </div>
    </div>
  );
}
