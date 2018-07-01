export const customizeQuery = ( req ) => {
  let {limit, skip, status} = req.query;
  req.query.limit = limit < 20 ? +limit : 20;
  req.query.skip = skip ? +skip : 0;
  req.query.status = status ? status : 'active';
};
