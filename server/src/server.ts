import cors from "cors";
import express from "express";
import usersRoutes from "./routes/users.route";

const server = express();

server.use(cors());

server.use(express.json());

server.get("/", (req, res) => {
  res.send("Hello World");
});

server.use("/users", usersRoutes);

export default server;
