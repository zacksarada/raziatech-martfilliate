export default function AuthErrorPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-red-600">Authentication Error</h1>
        <p className="mt-2">Something went wrong during authentication.</p>
        <a href="/auth/signin" className="mt-4 inline-block text-blue-600 hover:underline">
          Go back to sign in
        </a>
      </div>
    </div>
  );
}
