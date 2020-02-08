const corsMiddleware = (req, res, next) => {
  res
    .set('Content-Type', 'application/json')
    // cors headers
    .set('Access-Control-Allow-Origin', '*')
    .set('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT, DELETE')
    .set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    return res.status(200).send();
  }
  next();
};

export default corsMiddleware;
