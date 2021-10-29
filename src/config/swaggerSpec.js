import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'REST API for Profiles',
    version: '1.0.0',
    description:
      'An API that allows users to upload a csv file of users profiles. The CSV file contains column including, Names, NID, Phone Number, Gender, and Email. It was a challenge to prove that I can code.',
  },
  servers: [
    {
      url: 'http://localhost:5000',
      description: 'Development server',
    },
  ],
};

const apis = ['src/api/**/*.{js, ts}'];

const options = {
  swaggerDefinition,
  apis,
};

export default swaggerJSDoc(options);
