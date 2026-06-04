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
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold text-center mb-2">DevPulse</h1>
        <p className="text-center text-gray-400 mb-8">GitHub profile analyzer</p>

        <div className="flex gap-3 mb-10">
          <input
            type="text"
            placeholder="Enter GitHub username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && search()}
            className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={search}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Search
          </button>
        </div>

        {loading && <p className="text-center text-gray-400">Loading...</p>}
        {error && <p className="text-center text-red-400">{error}</p>}

        {data && (
          <div className="space-y-6">

            <div className="bg-gray-900 rounded-xl p-6 flex items-center gap-6">
              <img src={data.avatar} className="w-20 h-20 rounded-full" />
              <div>
                <h2 className="text-2xl font-bold">{data.name || data.username}</h2>
                <p className="text-gray-400">@{data.username}</p>
                {data.bio && <p className="text-gray-300 mt-1">{data.bio}</p>}
                <div className="flex gap-6 mt-3 text-sm text-gray-400">
                  <span><span className="text-white font-medium">{data.followers}</span> followers</span>
                  <span><span className="text-white font-medium">{data.following}</span> following</span>
                  <span><span className="text-white font-medium">{data.publicRepos}</span> repos</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Top Languages</h3>
              <div className="flex flex-wrap gap-3">
                {Object.entries(data.languages).map(([lang, count]: any) => (
                  <span key={lang} className="bg-blue-900 text-blue-200 px-4 py-2 rounded-full text-sm">
                    {lang} · {count}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-gray-900 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Commit Activity by Day</h3>
              <div className="flex flex-wrap gap-3">
                {Object.entries(data.commitDays).map(([day, count]: any) => (
                  <div key={day} className="bg-gray-800 rounded-lg px-4 py-3 text-center">
                    <p className="text-gray-400 text-xs">{day}</p>
                    <p className="text-white font-bold text-lg">{count}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-900 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Top Repositories</h3>
              <div className="space-y-3">
                {data.topRepos.map((repo: any) => (
                  <a
                    key={repo.name}
                    href={repo.url}
                    target="_blank"
                    className="block bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-blue-400">{repo.name}</p>
                        {repo.description && <p className="text-gray-400 text-sm mt-1">{repo.description}</p>}
                      </div>
                      <div className="flex gap-4 text-sm text-gray-400">
                        {repo.language && <span>{repo.language}</span>}
                        <span>⭐ {repo.stars}</span>
                        <span>🍴 {repo.forks}</span>
                      </div>
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