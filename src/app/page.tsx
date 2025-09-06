import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import USER_ROUTE from "@/constants/ROUTES";
import LoginForm from "./login/ui/LoginForm";

const LandingPage = async () => {
  const client = await createClient();

  const session = await client.auth.getSession();

  if (session.data.session) redirect(USER_ROUTE.MANGA_PAGE.href);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center max-w-6xl mx-auto px-6 sm:px-8 py-20 gap-12 text-center">
        <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-gray-100">
          Welcome to <span className="text-indigo-600 dark:text-indigo-400">MangaList</span>
        </h1>
        <p className="text-gray-700 dark:text-gray-300 text-lg sm:text-xl max-w-2xl">
          MangaList is your personal manga tracker—save every title you read so you’ll always remember them and never
          lose track of your favorites.
        </p>
      </section>

      {/* Login Form Section */}
      <section className="flex justify-center items-center py-16 px-6 sm:px-8">
        <div className="w-full sm:w-[360px]">
          <LoginForm />
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-6 sm:px-8 py-16 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Never Forget a Title</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Save every manga you read so you’ll always remember where you left off.
          </p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Keep It Organized</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Create a clean list of your manga and find any title quickly whenever you need it.
          </p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Simple & Focused</h3>
          <p className="text-gray-600 dark:text-gray-300">
            No clutter, no distractions—just a straightforward way to keep track of your manga.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 mt-auto text-center text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
        <p>&copy; {new Date().getFullYear()} MangaList. Built with Next.js and Supabase.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
