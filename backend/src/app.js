const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const userRoutes = require('./routes/user.routes');
const taskRoutes = require('./routes/task.routes');
const errorMiddleware = require('./middlewares/error.middleware');

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

try {
  app.use('/api/users', userRoutes);
  app.use('/api/tasks', taskRoutes);
} catch (err) {
  console.error("Error loading routes:", err);
}

app.get('/api/health', (req, res) => res.send("API is healthy"));

app.use((req, res) => res.status(404).json({ message: "Route not found" }));

app.use(errorMiddleware);

module.exports = app;
