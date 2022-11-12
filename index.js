const express = require("express");
const { connection } = require("./config/db");
const { Authetication } = require("./Middleware/Authetication");
const { TodoRoute } = require("./Routes/Todo.Route");
const { UserRoute } = require("./Routes/User.Route");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("HOMEPAGE");
});

app.use("/user", UserRoute);
app.use(Authetication);
app.use("/todo", TodoRoute);

app.listen(8080, async () => {
  try {
    await connection;
    console.log("Connected to Database");
    console.log("Listening on port 8080");
  } catch (err) {
    console.log(err);
    console.log("Not connected to database");
  }
});
