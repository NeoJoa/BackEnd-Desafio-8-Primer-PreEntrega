import express from "express";
import __dirname from "./utils.js";
import handlebars from "express-handlebars";
import productsRouter from "./routes/productsRoutes.js";
import cartsRouter from "./routes/cartsRoutes.js";
import { Server } from "socket.io";

const app = express();
const httpServer = app.listen(8080, () =>
  console.log("app listen on port", 8080)
);
export const io = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(productsRouter);
app.use(cartsRouter);

io.on("connection", (socket) => {
  console.log("New client connected");
});
