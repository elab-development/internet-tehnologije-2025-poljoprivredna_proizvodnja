const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Import modela i baza
const db = require("./models"); // tvoja Sequelize konfiguracija

// Import ruta
const authRoutes = require("./routes/authRoutes");
const productionRoutes = require("./routes/productionRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

// Middleware rute
app.use("/api/auth", authRoutes);
app.use("/api/productions", productionRoutes);
app.use("/api/notifications", notificationRoutes);

// Test ruta
app.get("/", (req, res) => {
  res.send("API je live!");
});

// Sinhronizacija sa bazom i start servera
db.sequelize.sync({ alter: true }) // ili { force: true } samo prvi put ako praviš tabelu
  .then(() => {
    console.log("Database synced");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((err) => console.error("Error syncing DB:", err));
