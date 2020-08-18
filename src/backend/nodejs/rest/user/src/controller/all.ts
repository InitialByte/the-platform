import {paginate} from 'express-paginate';

export const allController = (_, res): void => {
  db.User.findAndCountAll({limit: req.query.limit, offset: req.skip})
    .then((results) => {
      const itemCount = results.count;
      const pageCount = Math.ceil(results.count / req.query.limit);

      res.json({
        users: results.rows,
        pageCount,
        itemCount,
        pages: paginate.getArrayPages(req)(3, pageCount, req.query.page),
      });
    })
    .catch((err) => next(err));

  res.status(200).json({
    data: 'it works',
  });
};
