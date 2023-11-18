const express = require("express");
const sequelize = require("./config/database");
const Register = require("./routes/registerRoute");
const Token = require("./routes/tokenRoute")
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require("./swagger.json");

const app = express();
const port = 3000;

sequelize.sync().then(() => console.log("Database connected successfuly"))

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json())


app.use("/api/v1/token", Token)
app.use("/api/v1/register", Register)

app.listen(port, () => console.log("Server started on port 3000"))