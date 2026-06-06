import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function App() {
  const { username: urlUsername } = useParams();
  const navigate = useNavigate();
  const [username, setUsername] = useState(urlUsername || "");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const search = async () => {
    if (!username) return;
    setLoading(true);
    setError("");
    setData(null);
    navigate(`/u/${username}`);
    try {
      const res = await axios.get(
        `http://localhost:3000/api/github/${username}`,
      );
      setData(res.data);
    } catch (err) {
      setError("User not found");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      {/* Subtle background grid */}
      <div className="fixed inset-0 bg-[radial-gradient(#222_0.8px,transparent_1px)] bg-[length:40px_40px] opacity-40 pointer-events-none"></div>

      <div className="relative max-w-5xl mx-auto px-6 py-12 min-h-screen flex flex-col">
        {/* Enhanced Header */}
        <div className="flex flex-col items-center mb-16">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400 rounded-2xl flex items-center justify-center">
              <span className="text-2xl font-black tracking-tighter">DP</span>
            </div>
            <h1 className="text-5xl font-bold tracking-tighter bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              DevPulse
            </h1>
          </div>
          <p className="text-zinc-500 text-lg tracking-wide">
            GitHub • AI Insights
          </p>
        </div>

        {/* Modern Search Bar */}
        <div className="relative max-w-2xl mx-auto w-full mb-16">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 via-fuchsia-500/20 to-cyan-400/20 rounded-3xl blur-xl opacity-70 group-focus-within:opacity-100 transition-all"></div>

            <div className="relative flex items-center bg-zinc-900/80 backdrop-blur-xl border border-zinc-700/80 rounded-3xl px-6 py-4 shadow-2xl shadow-black/60">
              <div className="absolute left-6 text-zinc-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 01-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              <input
                type="text"
                placeholder="Search GitHub username..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && search()}
                className="flex-1 bg-transparent border-0 focus:outline-none text-lg px-12 placeholder-zinc-500"
              />

              <button
                onClick={search}
                disabled={!username || loading}
                className="px-8 py-3 bg-white text-black font-semibold rounded-2xl flex items-center gap-2 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-white/20"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    Analyze
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M14 5l7 7-7 7"
                      />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
          <p className="text-center text-zinc-500 text-sm mt-3">
            Discover talent • Analyze activity • AI-powered
          </p>
        </div>

        {/* Loading State - More premium */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 border-4 border-zinc-700 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-transparent border-t-violet-500 rounded-full animate-spin"></div>
            </div>
            <p className="mt-8 text-zinc-400 text-lg font-light tracking-widest">
              PULSE CHECK IN PROGRESS...
            </p>
            <p className="text-zinc-500 text-sm mt-2">
              AI is scanning repositories &amp; contributions
            </p>
          </div>
        )}

        {error && (
          <div className="max-w-md mx-auto bg-red-950/30 border border-red-900/50 rounded-3xl p-8 text-center">
            <div className="text-red-400 text-6xl mb-4">⚠️</div>
            <p className="text-xl text-red-300">{error}</p>
            <p className="text-zinc-500 mt-2">
              Make sure the username is correct
            </p>
          </div>
        )}

        {data && (
          <div className="space-y-12">
            <div className="bg-zinc-900/70 backdrop-blur-2xl border border-zinc-700/70 rounded-3xl p-10 flex flex-col md:flex-row gap-10 items-center md:items-start">
              <div className="relative shrink-0">
                <img
                  src={data.avatar}
                  alt="Avatar"
                  className="w-36 h-36 rounded-3xl ring-4 ring-zinc-800/80 object-cover shadow-2xl"
                />
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-emerald-500 rounded-2xl ring-4 ring-zinc-900"></div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-end gap-3 md:gap-4">
                  <h2 className="text-4xl font-semibold tracking-tight">
                    {data.name || data.username}
                  </h2>
                  <p className="text-2xl text-zinc-500 font-mono">
                    @{data.username}
                  </p>
                </div>

                {data.bio && (
                  <p className="mt-5 text-zinc-300 text-[17px] leading-relaxed max-w-2xl">
                    {data.bio}
                  </p>
                )}

                <div className="flex flex-wrap justify-center md:justify-start gap-x-10 gap-y-3 mt-8 text-sm">
                  <div>
                    <span className="text-3xl font-semibold text-white">
                      {data.followers}
                    </span>
                    <span className="block text-xs text-zinc-500 tracking-widest mt-1">
                      FOLLOWERS
                    </span>
                  </div>
                  <div>
                    <span className="text-3xl font-semibold text-white">
                      {data.following}
                    </span>
                    <span className="block text-xs text-zinc-500 tracking-widest mt-1">
                      FOLLOWING
                    </span>
                  </div>
                  <div>
                    <span className="text-3xl font-semibold text-white">
                      {data.publicRepos}
                    </span>
                    <span className="block text-xs text-zinc-500 tracking-widest mt-1">
                      REPOSITORIES
                    </span>
                  </div>
                  <div className="mt-6 flex justify-center md:justify-start">
                    <button
                      onClick={() =>
                        navigator.clipboard.writeText(window.location.href)
                      }
                      className="flex items-center gap-2 px-5 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-2xl text-sm text-zinc-300 transition-all hover:-translate-y-0.5"
                    >
                      <span>🔗</span>
                      <span>Copy shareable link</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Summary - Premium Glow */}
            {data.aiSummary && (
              <div className="relative bg-gradient-to-br from-zinc-900 to-zinc-950 border border-violet-500/30 rounded-3xl p-9 overflow-hidden">
                <div className="absolute top-0 right-8 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-12 w-52 h-52 bg-fuchsia-500/10 rounded-full blur-3xl"></div>

                <div className="flex items-center gap-3 mb-5">
                  <div className="px-4 py-1 bg-violet-500/10 text-violet-400 text-xs font-mono tracking-[2px] rounded-full border border-violet-500/20">
                    AI INSIGHT
                  </div>
                </div>

                <p className="text-zinc-100 text-[17px] leading-relaxed">
                  {data.aiSummary}
                </p>
              </div>
            )}

            {/* Languages */}
            <div className="bg-zinc-900/70 backdrop-blur-xl border border-zinc-700/70 rounded-3xl p-9">
              <h3 className="uppercase text-xs tracking-[3px] text-zinc-500 mb-6">
                Primary Languages
              </h3>
              <div className="flex flex-wrap gap-3">
                {Object.entries(data.languages).map(([lang, count]: any) => (
                  <div
                    key={lang}
                    className="group bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-600 px-6 py-3 rounded-2xl flex items-center gap-3 transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <div className="text-emerald-400">◉</div>
                    <div>
                      <div className="font-medium text-white group-hover:text-emerald-300 transition-colors">
                        {lang}
                      </div>
                      <div className="text-xs text-zinc-500">{count} repos</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Commit Activity */}
            <div className="bg-zinc-900/70 backdrop-blur-xl border border-zinc-700/70 rounded-3xl p-9">
              <h3 className="uppercase text-xs tracking-[3px] text-zinc-500 mb-7">
                WEEKLY COMMIT PULSE
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
                {Object.entries(data.commitDays).map(([day, count]: any) => (
                  <div
                    key={day}
                    className="bg-zinc-950 border border-zinc-800 hover:border-violet-500/30 rounded-2xl p-6 text-center transition-all hover:scale-105 group"
                  >
                    <div className="text-xs uppercase tracking-widest text-zinc-500 mb-3 group-hover:text-violet-400 transition-colors">
                      {day}
                    </div>
                    <div className="text-5xl font-semibold text-white tabular-nums">
                      {count}
                    </div>
                    <div className="text-[10px] text-emerald-400 mt-1 tracking-widest">
                      COMMITS
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Repos */}
            <div className="bg-zinc-900/70 backdrop-blur-xl border border-zinc-700/70 rounded-3xl p-9">
              <h3 className="uppercase text-xs tracking-[3px] text-zinc-500 mb-8">
                STARRED REPOSITORIES
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {data.topRepos.map((repo: any) => (
                  <a
                    key={repo.name}
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-zinc-950 border border-zinc-800 hover:border-zinc-600 rounded-3xl p-7 flex flex-col transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/60"
                  >
                    <div className="flex-1">
                      <div className="font-semibold text-xl text-white group-hover:text-violet-300 transition-colors line-clamp-1">
                        {repo.name}
                      </div>
                      {repo.description && (
                        <p className="mt-3 text-zinc-400 text-[15px] line-clamp-3 leading-relaxed">
                          {repo.description}
                        </p>
                      )}
                    </div>

                    <div className="mt-8 flex items-center justify-between text-sm border-t border-zinc-900 pt-5">
                      {repo.language && (
                        <div className="flex items-center gap-2 text-emerald-400">
                          <span className="w-2.5 h-2.5 bg-current rounded-full"></span>
                          <span>{repo.language}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-5 text-zinc-400">
                        <span className="flex items-center gap-1">
                          ★ {repo.stars}
                        </span>
                        <span className="flex items-center gap-1">
                          ↳ {repo.forks}
                        </span>
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
  );
}

export default App;
