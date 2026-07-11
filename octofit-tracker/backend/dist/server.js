"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("./models");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', baseUrl });
});
app.get('/api/users/', async (_req, res) => {
    const users = await models_1.User.find().lean();
    res.json(users);
});
app.post('/api/users/', async (req, res) => {
    const user = await models_1.User.create(req.body);
    res.status(201).json(user);
});
app.get('/api/teams/', async (_req, res) => {
    const teams = await models_1.Team.find().populate('captain').populate('members').lean();
    res.json(teams);
});
app.post('/api/teams/', async (req, res) => {
    const team = await models_1.Team.create(req.body);
    res.status(201).json(team);
});
app.get('/api/activities/', async (_req, res) => {
    const activities = await models_1.Activity.find().populate('userId').lean();
    res.json(activities);
});
app.post('/api/activities/', async (req, res) => {
    const activity = await models_1.Activity.create(req.body);
    res.status(201).json(activity);
});
app.get('/api/leaderboard/', async (_req, res) => {
    const leaderboard = await models_1.LeaderboardEntry.find().populate('userId').lean();
    res.json(leaderboard);
});
app.post('/api/leaderboard/', async (req, res) => {
    const entry = await models_1.LeaderboardEntry.create(req.body);
    res.status(201).json(entry);
});
app.get('/api/workouts/', async (_req, res) => {
    const workouts = await models_1.Workout.find().lean();
    res.json(workouts);
});
app.post('/api/workouts/', async (req, res) => {
    const workout = await models_1.Workout.create(req.body);
    res.status(201).json(workout);
});
mongoose_1.default
    .connect(MONGO_URI)
    .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
        console.log(`API base URL: ${baseUrl}`);
    });
})
    .catch((error) => {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
});
