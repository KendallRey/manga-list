import PageActionBar from "@/components/custom/PageActionBar";
import PageAppBar from "@/components/custom/PageAppBar";
import Navigation from "@/components/ui/Navigation";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

const UserLayout: React.FC<ILayout> = async ({ children }) => {
  const client = createClient();

  const session = await client.auth.getSession();

  if (!session.data.session) redirect("/");

  return (
    <>
      <PageAppBar />
      <div className="flex min-h-screen justify-between p-4 md:p-6 lg:p-12 xl:p-20 gap-8 bg-zinc-100">
        <Navigation />
        {children}
        <PageActionBar />
      </div>
    </>
  );
};

export default UserLayout;
