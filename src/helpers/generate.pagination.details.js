export default (count, rows, offset, limit) => ({
  pages: Math.ceil(count / limit),
  currentPage: Math.floor(offset / limit) + 1,
  pageSize: rows.length,
  count
});
