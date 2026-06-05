import Groq from 'groq-sdk'

export async function generateSummary(profileData: any): Promise<string> {
  // Initialize the Groq client using your new free key
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY! })

  const prompt = `You are analyzing a GitHub developer profile. Write a 3-4 sentence professional summary of this developer as well as their most proficient skills. Be specific and insightful.

Data:
- Username: ${profileData.username}
- Public repos: ${profileData.publicRepos}
- Followers: ${profileData.followers}
- Top languages: ${Object.keys(profileData.languages).join(', ')}
- Most active day: ${Object.entries(profileData.commitDays).sort((a: any, b: any) => b[1] - a[1])[0]?.[0] || 'unknown'}
- Top repos: ${profileData.topRepos.map((r: any) => r.name).join(', ')}

Write only the summary paragraph, nothing else.`

  try {
    const response = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      // 'llama-3.1-8b-instant' is free, incredibly fast, and perfect for summaries
      model: 'llama-3.1-8b-instant', 
    })

    return response.choices[0]?.message?.content || 'Could not generate summary.'
  } catch (error) {
    console.error('Groq API Error:', error)
    return 'Could not generate summary due to an API error.'
  }
}