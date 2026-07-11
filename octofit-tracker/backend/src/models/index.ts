import mongoose, { Schema, type Document, type Model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  age: number;
  fitnessLevel: string;
  city: string;
  createdAt: Date;
}

export interface ITeam extends Document {
  name: string;
  captain: mongoose.Schema.Types.ObjectId;
  members: mongoose.Schema.Types.ObjectId[];
  focus: string;
  createdAt: Date;
}

export interface IActivity extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  type: string;
  durationMinutes: number;
  distanceKm?: number;
  calories: number;
  date: Date;
}

export interface ILeaderboardEntry extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  points: number;
  streak: number;
  rank: number;
}

export interface IWorkout extends Document {
  title: string;
  description: string;
  durationMinutes: number;
  difficulty: string;
  targetMuscles: string[];
  equipment: string[];
  createdAt: Date;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  age: { type: Number, required: true },
  fitnessLevel: { type: String, required: true },
  city: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  captain: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  focus: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const activitySchema = new Schema<IActivity>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  distanceKm: Number,
  calories: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const leaderboardSchema = new Schema<ILeaderboardEntry>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  points: { type: Number, required: true },
  streak: { type: Number, required: true },
  rank: { type: Number, required: true },
});

const workoutSchema = new Schema<IWorkout>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  difficulty: { type: String, required: true },
  targetMuscles: [{ type: String }],
  equipment: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

export const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);
export const Team: Model<ITeam> = mongoose.model<ITeam>('Team', teamSchema);
export const Activity: Model<IActivity> = mongoose.model<IActivity>('Activity', activitySchema);
export const LeaderboardEntry: Model<ILeaderboardEntry> = mongoose.model<ILeaderboardEntry>('LeaderboardEntry', leaderboardSchema);
export const Workout: Model<IWorkout> = mongoose.model<IWorkout>('Workout', workoutSchema);
