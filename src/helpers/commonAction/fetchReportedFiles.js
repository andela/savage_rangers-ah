import models from '../../api/models/index';
import ReportQuery from './commonQueries';

const {
  Report,
} = models;
export default (offset, limit) => {
  const paginatedArticle = Report.findAll({
    attributes: ['createdAt'],
    include: ReportQuery.reportArticleJoin,
    offset,
    limit
  });

  return paginatedArticle;
};
