import { Request, Response } from 'express'
import { getGithubProfile } from '../services/github.service'
import { generateSummary } from '../services/ai.service'
import { Profile } from '../models/Profile'

export async function getProfile(req: Request, res: Response) {
  const username = (req.params.username as string)?.toLowerCase()

  if (!username) {
    res.status(400).json({ error: 'Username is required' })
    return
  }

  try {
    const cachedProfile = await Profile.findOne({ username })
    if (cachedProfile) {
      console.log(`[Cache HIT] Serving data directly from MongoDB for: ${username}`)
      res.json(cachedProfile)
      return
    }

    console.log(`[Cache MISS] Querying GitHub API and running AI layer for: ${username}`)

    const data = await getGithubProfile(username)

    const aiSummary = await generateSummary(data)

    const completeProfile = {
      ...data,
      aiSummary,
      username 
    }

    await Profile.create(completeProfile)

    res.json(completeProfile)
  } catch (error: any) {
    console.error('Error in getProfile controller:', error)
    if (error.response?.status === 404) {
      res.status(404).json({ error: 'GitHub user not found' })
    } else {
      res.status(500).json({ error: 'Something went wrong' })
    }
  }
}