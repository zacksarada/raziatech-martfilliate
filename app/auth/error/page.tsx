"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const errorMessages: { [key: string]: string } = {
    Configuration: "There is a problem with the server configuration.",
    AccessDenied: "You do not have permission to sign in.",
    Verification: "The verification link was invalid or has expired.",
    Default: "An error occurred during sign in.",
  };

  const errorMessage = error ? errorMessages[error] || errorMessages.Default : errorMessages.Default;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Authentication Error</h2>
          <p className="mt-2 text-gray-600">
            {errorMessage}
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            href="/auth/signin"
            className="block w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Back to Sign In
          </Link>
          <Link
            href="/"
            className="block w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}