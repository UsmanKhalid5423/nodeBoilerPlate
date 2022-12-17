//Implementing Pagination.
/*******************************************************/

const offsetPagination = (req, query) => {
  console.log("{QUERY}", query);
  const pagination = {};
  if (req.query.page) {
    req.query.page = parseInt(req.query.page) || 0;
    if (req.query.page && req.query.page > 0) {
      pagination.page = req.query.page - 1;
    }
  } else {
    pagination.page = 0;
  }

  if (req.query.perPage) {
    req.query.perPage = parseInt(req.query.perPage) || 0;
    if (req.query.perPage && req.query.perPage > 0) {
      pagination.perPage = req.query.perPage;
    }
  } else {
    pagination.perPage = 10;
  }

  if (req.query && req.query.sortBy) {
    req.query.sortBy = String(req.query.sortBy)
      .trim()
    if (req.query.sortBy) {
      pagination.sortBy = req.query.sortBy;
    }
  } else {
    pagination.sortBy = "id";
  }

  if (req.query && req.query.sortOrder) {
    req.query.sortOrder = String(req.query.sortOrder)
      .trim()
      .toUpperCase();
    if (req.query.sortOrder) {
      pagination.sortOrder = req.query.sortOrder;
    }
  } else {
    pagination.sortOrder = "DESC";
  }

  query.order = [[pagination.sortBy, pagination.sortOrder]];
  query.offset = pagination.page * pagination.perPage;
  query.limit = pagination.perPage;
  return query;
};


const offsetPagination_v2 = (req, query,model) => {
  const pagination = {};
  if (req.query.page) {
    req.query.page = parseInt(req.query.page) || 0;
    if (req.query.page && req.query.page > 0) {
      pagination.page = req.query.page - 1;
    }
  } else {
    pagination.page = 0;
  }

  if (req.query.perPage) {
    req.query.perPage = parseInt(req.query.perPage) || 0;
    if (req.query.perPage && req.query.perPage > 0) {
      pagination.perPage = req.query.perPage;
    }
  } else {
    pagination.perPage = 10;
  }

  query.offset = pagination.page * pagination.perPage;
  query.limit = pagination.perPage;
  query.order= [[model, req.query.sortBy, req.query.sortOrder]]
        
  return query;
};

const cursor = (req, totalRecords) => {
  let page, count, pages, perPage;
  page = req.query.page || 1;
  perPage = req.query.perPage || 10; 
  count = totalRecords || 0;
  pages = Math.ceil(count /perPage) || 1;
  return {
    page: page,
    count: count,
    pages: pages,
    sortBy: req.query.sortBy || "id",
    sortOrder: req.query.sortOrder || "DESC"
  };
};

const arrayPagination = (items, sortBy, sortOrder, page, perPage) => {
  const pageNumber = page || 1;
  const perPageLimit = perPage || 10;
  const offset = (pageNumber - 1) * perPageLimit;

  const paginatedItems = items.slice(offset).slice(0, perPageLimit);
  const totalPages = Math.ceil(items.length / perPageLimit);
  return {
    data: paginatedItems,
    cursor: {
      page: pageNumber,
      count: items.length,
      pages: totalPages,
      sortBy: sortBy,
      sortOrder: sortOrder
    }
  };
};

/*******************************************************/
// Exporting Funtions.
/*******************************************************/
module.exports = {
  arrayPagination,
  cursor,
  offsetPagination,
  offsetPagination_v2
};
