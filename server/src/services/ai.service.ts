import Groq from 'groq-sdk'

export async function generateSummary(profileData: any): Promise<string> {
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY! })

  const prompt = `You are a technical recruiter and senior engineering manager analyzing a raw GitHub data footprint, be precise and not so fancy, get to the point and talk in a way the interviewer would like to see. 
Your goal is to deduce behavioral patterns, engineering traits, and underlying habits that GitHub doesn't explicitly display list not only positives, also some negatives if they have some. 

Do NOT just list out or repeat the numbers (e.g., do not say "They have 12 repos and 300k followers"). Look for the story behind the data.

Analyze the following data points to extract:
1. Work Cadence: Look at 'commitDays'. Are they a "weekend warrior", a strict "9-to-5 weekday operator", or do they "ship in intense bursts" based on highly skewed day distributions?
2. Tech Stack DNA: Look at 'Top languages'. Are they a low-level systems specialist, or deeply full-stack? Does their stack reveal a heavy bias (e.g., "strongly backend-focused, completely avoiding frontend ecosystems")?
3. Project Ecosystem: Look at 'Top repos' descriptions. Are they building core infrastructure, experimental scripts, or user-facing products?

Data to analyze:
- Username: ${profileData.username}
- Public repos: ${profileData.publicRepos}
- Followers: ${profileData.followers}
- Top languages: ${Object.keys(profileData.languages).join(', ')}
- Distribution of commits: ${JSON.stringify(profileData.commitDays)}
- Top repos & descriptions: ${profileData.topRepos.map((r: any) => `${r.name} (${r.language}): ${r.description || 'No description'}`).join(' | ')}

Write a dense, 3-4 sentence professional psychological-technical profile. Be direct, blunt, and highly insightful. Start directly with the analysis, do not include any introductory phrases like "Based on the data...".`

  try {
    const response = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.1-8b-instant', 
      temperature: 0.3, 
    })

    return response.choices[0]?.message?.content || 'Could not generate behavioral profile.'
  } catch (error) {
    console.error('Groq API Error:', error)
    return 'Could not generate profile due to an API error.'
  }
}