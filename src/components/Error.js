export default function Error({ error }) {
  return (
    <div className="search">
      <h1>Houston, we have a problem!</h1>
      <h2 className="mt-5 text-danger">{error}</h2>
    </div>
  );
}
