const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const SocketServer = require("./SocketServer");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Socket
const http = require("http").createServer(app);
const io = require("socket.io")(http);

io.on("connection", (socket) => {
	SocketServer(socket);
});

// Routes
app.use("/api", require("./routes/authRouter"));
app.use("/api", require("./routes/userRouter"));
app.use("/api", require("./routes/postRouter"));
app.use("/api", require("./routes/commentRouter"));
app.use("/api", require("./routes/notifyRouter"));

// DB Connection
const URI = process.env.MONGODB_URL;
mongoose.connect(
	URI,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	(err) => {
		if (err) throw err;
		console.log(`MongoDb connected successfully ${mongoose.connection.host}`);
	}
);

if (process.env.NODE_ENV === "production") {
	app.use(express.static("frontend/build"));

	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
	});
}

const port = process.env.PORT || 5000;
http.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
