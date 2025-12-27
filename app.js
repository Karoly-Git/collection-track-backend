require("dotenv").config();
const express = require("express");
const cors = require("cors");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const lorryRoutes = require("./src/routes/lorry.routes");

const app = express();

// Helps rate-limit and IP handling
app.set("trust proxy", 1);

// Middleware
app.use(express.json());

// CORS (important for Swagger UI)
app.use(
    cors({
        origin: "*", // tighten later if needed
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.get("/", (req, res) => {
    res.json(
        {
            "name": "load-track-backend",
            "developer": {
                "name": "Karoly Hornyak",
                "tel": "+447421411763",
                "email": "karoly.webdev@gmail.com",
                "web": "karolyhornyak.com"
            },
        }
    );
});

// Health check
app.get("/health", (req, res) => res.json({ status: "ok" }));

// Swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/lorries", lorryRoutes);

module.exports = app;
