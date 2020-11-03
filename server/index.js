require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const routes = require("./routes");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Unittend API Documentation",
      servers: ["http://localhost:8080/"],
      version: process.env.npm_package_version,
    },
    basePath: "/api",
    securityDefinitions: {
      bearerAuth: {
        type: "apiKey",
        name: "Authorization",
        scheme: "bearer",
        in: "header",
      },
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());
app.use("/api", routes);

app.listen(process.env.PORT || 8080, () => console.log("Started!"));
