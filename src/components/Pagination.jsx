import React from 'react';
import ReactPaginate from 'react-paginate';
import classNames from 'classnames';


const Pagination = props => {
  const { onChange, page, isFetching, total, perPage } = props;
  const pageCount = Math.ceil(total / perPage);
  const currentPage = page === null ? 0 : page - 1;
  const paginationClassNames = classNames('pagination-block', {
    'pagination-block--fetch': isFetching,
  });
  const handlePageChange = (e) => {
    onChange(e.selected + 1);
  }

  return (
    <div className={paginationClassNames}>
      <ReactPaginate
        pageCount={pageCount}
        containerClassName={"pagination-list"}
        pageClassName={"pagination-item"}
        pageLinkClassName={"pagination-link"}
        activeClassName={"pagination-item--active"}
        nextLabel={"Next »"}
        previousLabel={"« Prev"}
        nextClassName={"pagination-item next-page"}
        nextLinkClassName={"pagination-link pagination-link--text"}
        previousClassName={"pagination-item prev-page"}
        previousLinkClassName={"pagination-link pagination-link--text"}
        breakClassName={"pagination-item pagination-break"}
        breakLinkClassName={"pagination-link"}
        disabledClassName={"pagination-link--disabled"}
        forcePage={currentPage}
        onPageChange={handlePageChange}
        marginPagesDisplayed={3}
        pageRangeDisplayed={3}
      />
    </div>
  )
}

export default Pagination;