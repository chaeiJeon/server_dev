import express from "express";
import session from "express-session";
import userRouter from "./routers/userRouter";
import path from "path";

const app = express();
app.listen(3000, function() {
  console.log("hi 3000");
});

app.use(express.static(path.join("localhost:3000", "CLIENT/build")));
app.use("/user", userRouter);

app.get("/", function(req, res) {
  res.sendFile(path.join("localhost:3000", "CLIENT/build/index.html"));
});
