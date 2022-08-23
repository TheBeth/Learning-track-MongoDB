require("./src/db/mongoose");
const express = require("express");
const userRouter = require("./src/route/UserRoute");
const petRouter = require("./src/route/PetRoute");

const app = express();
app.use(express.json());

app.use("/users", userRouter);
app.use("/pets", petRouter);

app.use((req, res) => {
  res.status(404).send("Resoure not found");
});

app.use((err, req, res, next) => {
  res.status(500).json(err.message);
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server running on port ${port}`));
