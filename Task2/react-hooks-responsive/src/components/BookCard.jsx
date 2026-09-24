import { memo, useRef } from "react";

/*
 * React.memo + useCallback (in App) = this card only re-renders when ITS props change.
 * useRef here counts renders without causing extra renders itself.
 */
function BookCard({ book, isFav, onToggleFav }) {
  const renders = useRef(0);
  renders.current += 1;

  return (
    <article className="card">
      <div className="card-body">
        <h3>{book.title}</h3>
        <p className="muted">{book.author}</p>
      </div>
      <div className="card-footer">
        <span>${book.price} · ★ {book.rating}</span>
        <button
          className={isFav ? "btn btn-active" : "btn"}
          onClick={() => onToggleFav(book.id)}
          aria-pressed={isFav}
        >
          {isFav ? "Saved" : "Save"}
        </button>
      </div>
      <small className="muted">Rendered {renders.current}×</small>
    </article>
  );
}

export default memo(BookCard);
