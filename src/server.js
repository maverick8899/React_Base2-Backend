const express = require("express");
const app = express();
const port = 8080;
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const router = require("./routes");
const db = require("./config/db");

app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
router(app);

db.connect();
//
app.use(morgan("combined"));
app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});
