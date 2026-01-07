import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";

import collectionRoutes from "./src/routes/collection.routes.js";
import commentRoutes from "./src/routes/comment.routes.js";

dotenv.config();

const app = express();

// Trust proxy (Render / Heroku / Nginx)
app.set("trust proxy", 1);

// Middleware
app.use(express.json());

// CORS
app.use(
    cors({
        origin: "*", // restrict in production
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

// Root info
app.get("/", (req, res) => {
    res.json({
        name: "collection-track-backend",
        developer: {
            name: "Karoly Hornyak",
            tel: "+447421411763",
            email: "karoly.webdev@gmail.com",
            web: "karolyhornyak.com"
        }
    });
});

// Health check
app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/collections", collectionRoutes);
app.use("/comments", commentRoutes);

export default app;
