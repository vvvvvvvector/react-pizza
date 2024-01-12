const pages = [...new Array(2)];

type PaginationPropsTypes = {
  pageIndex: number;
  onChangePage: (pageIndex: number) => void;
};

export const Pagination = ({
  pageIndex,
  onChangePage
}: PaginationPropsTypes) => {
  const onClickPrevious = () => {
    if (pageIndex > 1) {
      onChangePage(pageIndex - 1);
    }
  };

  const onClickNext = () => {
    if (pageIndex <= pages.length - 1) {
      onChangePage(pageIndex + 1);
    }
  };

  return (
    <div className='pagination'>
      <ul>
        <li>
          <button disabled={pageIndex === 1} onClick={onClickPrevious}>
            <span>←</span>
          </button>
        </li>
        {pages.map((_, index) => (
          <li key={index}>
            <button
              onClick={() => onChangePage(index + 1)}
              className={index === pageIndex - 1 ? 'active' : ''}
            >
              <span>{index + 1}</span>
            </button>
          </li>
        ))}
        <li>
          <button disabled={pageIndex === pages.length} onClick={onClickNext}>
            <span>→</span>
          </button>
        </li>
      </ul>
    </div>
  );
};
