const paginate = function ({ count, pageNum, pageSize, req }) {
  const url =
    req.protocol +
    '://' +
    req.get('host') +
    req.baseUrl +
    req.path +
    '?page=';

  const prev_page = pageNum - 1 <= 0 ? null : url + (pageNum - 1);

  const next_page =
    pageNum + 1 > Math.ceil(count / pageSize) ? null : url + (pageNum + 1);

  const current_page = parseInt(pageNum);

  const total_pages = Math.ceil(count / pageSize);

  return { count, current_page, total_pages, prev_page, next_page };
};

module.exports = paginate;
