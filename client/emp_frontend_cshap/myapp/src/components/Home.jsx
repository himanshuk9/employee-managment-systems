export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
      <div className="bg-slate-900/80 backdrop-blur-lg text-white p-10 rounded-2xl shadow-2xl max-w-xl w-full text-center">
        
        <h1 className="text-4xl font-extrabold mb-4">
          Welcome to <span className="text-indigo-400">MyApp</span>
        </h1>

        <p className="text-slate-300 mb-8">
          This is a public home page.  
          Login or signup to unlock more features and manage your dashboard.
        </p>

        <div className="flex gap-4 justify-center">
          <a
            href="/login"
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition font-semibold"
          >
            Login
          </a>

          <a
            href="/signup"
            className="px-6 py-3 rounded-xl border border-indigo-500 text-indigo-400 hover:bg-indigo-500 hover:text-white transition font-semibold"
          >
            Signup
          </a>
        </div>

      </div>
    </div>
  );
}
