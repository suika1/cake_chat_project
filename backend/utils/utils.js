const generateResponse = ({
  res,
  status = 200,
  results = '',
  error = '',
  ok = true,
}) => {
  return res.status(status).send(
    JSON.stringify({
      results,
      ok,
      error,
    }),
  );
};

module.exports = {
  generateResponse,
};
