// eslint-disable-next-line import/no-nodejs-modules
import fs from 'fs';
import swaggerJSDoc from 'swagger-jsdoc';

const generateSwagger = () => {
  const options = {
    definition: {
      openapi: '3.0.0', // Specification (optional, defaults to swagger: '2.0')
      info: {
        title: 'Cake chat project documentation', // Title (required)
        version: '1.0.0', // Version (required)
      },
    },
    // Path to the API docs
    apis: ['../routes/api/user.js'],
  };

  // Initialize swagger-jsdoc -> returns validated swagger spec in json format
  const swaggerSpec = swaggerJSDoc(options);
  fs.writeFile('./swaggerSpec.json', JSON.stringify(swaggerSpec), err => console.log(err));
  console.log('spec: ', swaggerSpec);
}
export default generateSwagger;
