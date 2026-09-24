import { useState } from "react";
import "../styles/boxes.css";

const COUNTS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function BoxContainer() {
  const [count, setCount] = useState(6); // starts with 6 boxes

  return (
    <section className="boxes">
      <h2 className="boxes__title">Boxes</h2>

      {/* Boxes are generated from the count, never hard-coded */}
      <div className="boxes__container">
        {Array.from({ length: count }, (_, index) => (
          <div key={index} className="boxes__box">
            {index + 1}
          </div>
        ))}
      </div>

      <div className="boxes__controls">
        {COUNTS.map((number) => (
          <button
            key={number}
            type="button"
            className={
              number === count
                ? "boxes__control boxes__control--active"
                : "boxes__control"
            }
            onClick={() => setCount(number)}
          >
            {number}
          </button>
        ))}
      </div>
    </section>
  );
}

export default BoxContainer;
