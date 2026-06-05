import { useState } from 'react'
import axios from 'axios'

function App() {
  const [username, setUsername] = useState('')
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const search = async () => {
    if (!username) return
    setLoading(true)
    setError('')
    setData(null)
    try {
      const res = await axios.get(`http://localhost:3000/api/github/${username}`)
      setData(res.data)
    } catch (err) {
      setError('User not found')
    } finally {
      // Direct assignment bypasses stale closure capture bugs
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-4xl mx-auto">

        {/* Header Branding */}
        <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
          DevPulse
        </h1>
        <p className="text-center text-gray-400 mb-8">GitHub profile analyzer</p>

        {/* Unified Search Input Control */}
        <div className="flex gap-3 mb-10">
          <input
            type="text"
            placeholder="Enter GitHub username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && search()}
            className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
          <button
            onClick={search}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition-colors shadow-lg shadow-blue-600/20"
          >
            Search
          </button>
        </div>

        {/* Dynamic State Feedback Intermediaries */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-400 animate-pulse">Analyzing profile with AI...</p>
          </div>
        )}
        
        {error && (
          <p className="text-center text-red-400 bg-red-950/30 border border-red-900/50 p-4 rounded-xl">
            {error}
          </p>
        )}

        {/* Data Rendition Matrix */}
        {data && (
          <div className="space-y-6">

            {/* Core Identity Banner */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex flex-col sm:flex-row items-center gap-6">
              <img src={data.avatar} className="w-20 h-20 rounded-full border-2 border-gray-700" alt="GitHub Avatar" />
              <div className="text-center sm:text-left flex-1">
                <h2 className="text-2xl font-bold">{data.name || data.username}</h2>
                <p className="text-blue-400 font-mono text-sm">@{data.username}</p>
                {data.bio && <p className="text-gray-300 mt-2 text-sm max-w-xl">{data.bio}</p>}
                <div className="flex flex-wrap justify-center sm:justify-start gap-6 mt-4 text-sm text-gray-400">
                  <span><span className="text-white font-semibold">{data.followers}</span> followers</span>
                  <span><span className="text-white font-semibold">{data.following}</span> following</span>
                  <span><span className="text-white font-semibold">{data.publicRepos}</span> repos</span>
                </div>
              </div>
            </div>

            {/* AI Summary Highlight Panel */}
            {data.aiSummary && (
              <div className="relative overflow-hidden rounded-xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/40 to-purple-950/40 p-6 shadow-[0_0_20px_rgba(99,102,241,0.1)]">
                {/* Visual Ambient Blur Accents */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-5 h-5 text-indigo-400 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 21c-.5 0-.9-.3-1.1-.7l-2.2-5-5-2.2c-.4-.2-.7-.6-.7-1.1s.3-.9.7-1.1l5-2.2 2.2-5c.2-.4.6-.7 1.1-.7s.9.3 1.1.7l2.2 5 5 2.2c.4.2.7.6.7 1.1s-.3.9-.7 1.1l-5 2.2-2.2 5c-.2.4-.6.7-1.1.7zm10-12c-.3 0-.6-.2-.7-.4l-.7-1.7-1.7-.7c-.3-.1-.4-.4-.4-.7s.2-.6.4-.7l1.7-.7.7-1.7c.1-.3.4-.4.7-.4s.6.2.7.4l.7 1.7 1.7.7c.3.1.4.4.4.7s-.2.6-.4.7l-1.7.7-.7 1.7c-.1.2-.4.4-.7.4z" />
                  </svg>
                  <h3 className="text-sm font-semibold tracking-wider uppercase text-indigo-300">
                    AI Professional Insights
                  </h3>
                </div>
                <p className="text-gray-100 text-base leading-relaxed font-sans">
                  {data.aiSummary}
                </p>
              </div>
            )}

            {/* Language Composition Breakdown */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-200">Top Languages</h3>
              <div className="flex flex-wrap gap-2.5">
                {Object.entries(data.languages).map(([lang, count]: any) => (
                  <span key={lang} className="bg-gray-800/80 border border-gray-700 text-gray-200 px-4 py-1.5 rounded-full text-sm font-medium">
                    {lang} <span className="text-gray-500 ml-1">· {count}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Weekly Temporal Heat Distribution */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-200">Commit Activity by Day</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
                {Object.entries(data.commitDays).map(([day, count]: any) => (
                  <div key={day} className="bg-gray-800/50 border border-gray-700/60 rounded-xl px-3 py-4 text-center">
                    <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">{day}</p>
                    <p className="text-white font-bold text-xl">{count}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Priority Repositories Section */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-200">Top Repositories</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.topRepos.map((repo: any) => (
                  <a
                    key={repo.name}
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col justify-between bg-gray-800/40 border border-gray-700/70 rounded-xl p-5 hover:border-gray-600 hover:bg-gray-800/80 transition-all group"
                  >
                    <div>
                      <p className="font-semibold text-blue-400 group-hover:text-blue-300 transition-colors break-words">
                        {repo.name}
                      </p>
                      {repo.description && (
                        <p className="text-gray-400 text-xs line-clamp-2 mt-2 leading-relaxed">
                          {repo.description}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-4 text-xs text-gray-500 font-mono mt-4 pt-3 border-t border-gray-800/80">
                      {repo.language && <span className="text-gray-400">{repo.language}</span>}
                      <span className="flex items-center gap-1">⭐ {repo.stars}</span>
                      <span className="flex items-center gap-1">🍴 {repo.forks}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  )
}

export default App