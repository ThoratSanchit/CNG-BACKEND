import fastify from "fastify";
import pino from "pino";
import dotenv from "dotenv";
import cors from "@fastify/cors";
import { connectToMongoDB } from "./config/mongoDbConfig";
import { sequelize, checkDatabaseConnection } from "./plugins/sequelize";

dotenv.config();

const app = fastify({
  logger: pino({ level: "info" }),
});
dotenv.config();
app.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
});

app.get("/", async (request, reply) => {
  reply.send({ message: "welcome to baap-voting" });
});

app.get("/health", async (request, reply) => {
  reply.send({ message: "Health is ok..." });
});

sequelize.sync();

let port = Number(process.env.PORT) || 4000;
const start = async () => {
  try {
    const dbStatus = await connectToMongoDB();
    if (!dbStatus.connected) {
      throw new Error(dbStatus.message);
    }

    const port = Number(process.env.PORT) || 3000;
    await app.listen({ port, host: "0.0.0.0" });
    app.log.info(`🚀 Server running on http://localhost:${port}`);
  } catch (err) {
    app.log.error("❌ Server startup failed:", err);
    process.exit(1);
  }
};

start();
