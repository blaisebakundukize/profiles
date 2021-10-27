export const getPagination = async (req, model, condition = {}) => {
  const limit = Number(req.query.limit) || 10;
  const page = Number(req.query.page) || 1;
  const offset = page > 0 ? (page - 1) * limit : 1;
  const totalRows = await model.count(condition);
  return { limit, page, offset, totalRows };
};
