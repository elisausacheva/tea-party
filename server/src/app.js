require("dotenv").config();
const express = require("express");
const indexRouter = require("./routes/indexRouter");
const serverConfig = require("./configs/serverConfig");
const app = express();


const PORT = process.env.PORT || 3001;
serverConfig(app);

app.use("/api", indexRouter);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

module.exports = app;
