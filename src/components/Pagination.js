export function Pagination( {onChangePage, page} ) {
    return (
        <section className="pagination">
            <button onClick={() => onChangePage(-1)}>Prev</button>
            | {page} |
            <button onClick={() => onChangePage(1)}>Next</button>
        </section>
    )
}