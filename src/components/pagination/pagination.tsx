const pages = [...new Array(2)];

type PaginationPropsTypes = {
  pageIndex: number;
  onChangePage: (pageIndex: number) => void;
};

export const Pagination = ({
  pageIndex,
  onChangePage
}: PaginationPropsTypes) => {
  return (
    <div className='pagination'>
      <ul>
        <li>
          <button
            disabled={pageIndex === 1}
            onClick={() => {
              if (pageIndex > 1) {
                onChangePage(pageIndex - 1);
              }
            }}
          >
            <span>←</span>
          </button>
        </li>
        {pages.map((_, index) => (
          <li key={index}>
            <button
              onClick={() => onChangePage(index + 1)}
              className={index === pageIndex - 1 ? 'selected' : ''}
            >
              <span>{index + 1}</span>
            </button>
          </li>
        ))}
        <li>
          <button
            disabled={pageIndex === pages.length}
            onClick={() => {
              if (pageIndex <= pages.length - 1) {
                onChangePage(pageIndex + 1);
              }
            }}
          >
            <span>→</span>
          </button>
        </li>
      </ul>
    </div>
  );
};
