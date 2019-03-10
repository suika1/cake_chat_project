const generateResponse = ({ res, status = 200, results = '', error = '' }) => {
  return res.status(status).send(
    JSON.stringify({
      results,
      error,
    }),
  );
};

module.exports = {
  generateResponse,
};
