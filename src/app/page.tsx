import MuiButton from "@/components/button/Button";
import MuiTextField from "@/components/text-field/TextField";
import Image from "next/image";
import { userLoginFormAction, userSignupAction } from "./login/ui/action";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import USER_ROUTE from "@/constants/ROUTES";

const LandingPage = async () => {
  const client = createClient();

  const session = await client.auth.getSession();

  if (session.data.session) redirect(USER_ROUTE.MANGA_PAGE.href);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gray-100">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image src="https://nextjs.org/icons/next.svg" alt="Next.js logo" width={180} height={38} priority />
        <form className="flex flex-col gap-5 min-w-[320px]">
          <MuiTextField label={"Email"} />
          <MuiTextField label={"Password"} type="password" />
          <div className="flex items-center flex-wrap gap-2">
            <MuiButton className="flex-grow" formAction={userLoginFormAction} type="submit">
              Log in
            </MuiButton>
            <MuiButton className="flex-grow" formAction={userSignupAction} type="submit" color="secondary">
              Sign Up
            </MuiButton>
          </div>
        </form>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="https://nextjs.org/icons/file.svg" alt="File icon" width={16} height={16} />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="https://nextjs.org/icons/window.svg" alt="Window icon" width={16} height={16} />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="https://nextjs.org/icons/globe.svg" alt="Globe icon" width={16} height={16} />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
};

export default LandingPage;
