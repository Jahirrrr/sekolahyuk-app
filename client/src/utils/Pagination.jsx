/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */


import React from 'react';
import { Pagination } from 'react-bootstrap';
import _ from 'lodash';

const Paginations = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);

  return (
    <nav>
      <Pagination>
        {pages.map(page => (
          <div
            className="mypost"
            key={page}
            className={page === currentPage ? 'page-item active' : 'page-item'}
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </div>
        ))}
      </Pagination>
    </nav>
  );
};

export default Paginations;
