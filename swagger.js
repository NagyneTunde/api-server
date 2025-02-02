const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0", // specify the OpenAPI version
    info: {
      title: "API-SERVER",
      version: "1.0.0",
      description: "TODO app in Express",
    },
  },
  apis: ["app.js"], // path to your API route files
};

const specs = swaggerJsDoc();
module.exports = specs;
