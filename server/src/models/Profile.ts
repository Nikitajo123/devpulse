import { Schema, model } from 'mongoose'

const ProfileSchema = new Schema({
  username: { type: String, required: true, unique: true, lowercase: true },
  name: String,
  avatar: String,
  bio: String,
  followers: Number,
  following: Number,
  publicRepos: Number,
  languages: Schema.Types.Mixed,
  commitDays: Schema.Types.Mixed,
  aiSummary: String,
  topRepos: [Schema.Types.Mixed],
  createdAt: { type: Date, default: Date.now, expires: 86400 } // for now good enough
})

export const Profile = model('Profile', ProfileSchema)