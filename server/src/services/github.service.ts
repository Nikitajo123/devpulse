import axios from 'axios'
import { generateSummary } from './ai.service'

const GITHUB_API = 'https://api.github.com'

export async function getGithubProfile(username: string) {
  const [profileRes, reposRes, eventsRes] = await Promise.all([
    axios.get(`${GITHUB_API}/users/${username}`),
    axios.get(`${GITHUB_API}/users/${username}/repos?per_page=100`),
    axios.get(`${GITHUB_API}/users/${username}/events?per_page=100`)
  ])

  const profile = profileRes.data
  const repos = reposRes.data
  const events = eventsRes.data

  const languages: Record<string, number> = {}
  for (const repo of repos) {
    if (repo.language) {
      languages[repo.language] = (languages[repo.language] || 0) + 1
    }
  }

  const commitDays: Record<string, number> = {}
  for (const event of events) {
    if (event.type === 'PushEvent') {
      const day = new Date(event.created_at).toLocaleDateString('en-US', { weekday: 'long' })
      commitDays[day] = (commitDays[day] || 0) + 1
    }
  }

  const aiSummary = await generateSummary({
  username: profile.login,
  publicRepos: profile.public_repos,
  followers: profile.followers,
  languages,
  commitDays,
  topRepos: repos
    .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)
    .slice(0, 5)
    .map((repo: any) => ({ name: repo.name }))
})

  return {
    name: profile.name,
    username: profile.login,
    avatar: profile.avatar_url,
    bio: profile.bio,
    followers: profile.followers,
    following: profile.following,
    publicRepos: profile.public_repos,
    languages,
    commitDays,
    aiSummary,
    topRepos: repos
      .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)
      .slice(0, 5)
      .map((repo: any) => ({
        name: repo.name,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language,
        url: repo.html_url,
        description: repo.description
      }))
  }
}