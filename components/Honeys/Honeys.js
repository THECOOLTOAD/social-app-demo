import Honey from "./Honey";

const Honeys = ({ honeys, setHoneys }) => {
  return (
    <>
      {honeys.map((honey) => (
        <div key={honey._id}>
          <Honey honey={honey} setHoneys={setHoneys} />
        </div>
      ))}
    </>
  );
};

export default Honeys;