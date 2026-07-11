"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("../models");
const connectionString = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        await models_1.User.deleteMany({});
        await models_1.Team.deleteMany({});
        await models_1.Activity.deleteMany({});
        await models_1.LeaderboardEntry.deleteMany({});
        await models_1.Workout.deleteMany({});
        const users = await models_1.User.insertMany([
            {
                name: 'Ava Brooks',
                email: 'ava@example.com',
                passwordHash: 'hashed_password_1',
                age: 29,
                fitnessLevel: 'advanced',
                city: 'Seattle',
            },
            {
                name: 'Noah Kim',
                email: 'noah@example.com',
                passwordHash: 'hashed_password_2',
                age: 34,
                fitnessLevel: 'intermediate',
                city: 'Austin',
            },
            {
                name: 'Mia Chen',
                email: 'mia@example.com',
                passwordHash: 'hashed_password_3',
                age: 27,
                fitnessLevel: 'beginner',
                city: 'Denver',
            },
        ]);
        const teams = await models_1.Team.insertMany([
            {
                name: 'Velocity Squad',
                captain: users[0]._id,
                members: [users[0]._id, users[1]._id],
                focus: 'HIIT and endurance',
            },
            {
                name: 'Core Collective',
                captain: users[2]._id,
                members: [users[2]._id, users[1]._id],
                focus: 'Strength and recovery',
            },
        ]);
        await models_1.Activity.insertMany([
            {
                userId: users[0]._id,
                type: 'run',
                durationMinutes: 42,
                distanceKm: 8.4,
                calories: 480,
                date: new Date('2026-07-10T06:30:00Z'),
            },
            {
                userId: users[1]._id,
                type: 'strength',
                durationMinutes: 55,
                calories: 390,
                date: new Date('2026-07-09T19:15:00Z'),
            },
            {
                userId: users[2]._id,
                type: 'yoga',
                durationMinutes: 30,
                calories: 180,
                date: new Date('2026-07-11T07:00:00Z'),
            },
        ]);
        await models_1.LeaderboardEntry.insertMany([
            { userId: users[0]._id, points: 1320, streak: 5, rank: 1 },
            { userId: users[1]._id, points: 1180, streak: 3, rank: 2 },
            { userId: users[2]._id, points: 980, streak: 2, rank: 3 },
        ]);
        await models_1.Workout.insertMany([
            {
                title: 'Sunrise Interval Run',
                description: 'A brisk interval run to build endurance.',
                durationMinutes: 30,
                difficulty: 'intermediate',
                targetMuscles: ['legs', 'cardio'],
                equipment: ['running shoes'],
            },
            {
                title: 'Full Body Strength',
                description: 'Compound lifts and core work for a full-body session.',
                durationMinutes: 45,
                difficulty: 'advanced',
                targetMuscles: ['full body'],
                equipment: ['dumbbells', 'bench'],
            },
            {
                title: 'Mobility Flow',
                description: 'A recovery-focused routine for flexibility.',
                durationMinutes: 20,
                difficulty: 'beginner',
                targetMuscles: ['mobility', 'core'],
                equipment: ['mat'],
            },
        ]);
        console.log('Database seeding complete');
        console.log(`Seeded ${users.length} users, ${teams.length} teams, activities, leaderboard entries, and workouts.`);
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
