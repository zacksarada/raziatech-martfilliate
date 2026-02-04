export default function AffiliatePage() {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Affiliate Dashboard</h1>
        <p className="text-gray-600 mb-8">
          Please sign in to access your affiliate dashboard.
        </p>
        <a href="/auth/signin" className="bg-blue-600 text-white px-6 py-3 rounded-lg">
          Sign In
        </a>
      </div>
    </div>
  );
}
