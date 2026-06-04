import { Request, Response } from 'express'
import { getGithubProfile } from '../services/github.service'

export async function getProfile(req: Request, res: Response) {
  const username = req.params.username as string

  if (!username) {
    res.status(400).json({ error: 'Username is required' })
    return
  }

  try {
    const data = await getGithubProfile(username)
    res.json(data)
  } catch (error: any) {
    if (error.response?.status === 404) {
      res.status(404).json({ error: 'GitHub user not found' })
    } else {
      res.status(500).json({ error: 'Something went wrong' })
    }
  }
}