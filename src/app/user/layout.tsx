// import PageActionBar from "@/components/custom/PageActionBar";
// import PageAppBar from "@/components/custom/PageAppBar";
import Navigation from "@/components/ui/Navigation";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

const UserLayout: React.FC<ILayout> = async ({ children }) => {
  const client = await createClient();
  const session = await client.auth.getSession();

  if (!session.data.session) redirect("/");

  return (
    <div className="flex min-h-screen py-4 md:p-6 lg:p-12 xl:p-20 gap-8">
      {/* Sidebar (responsive) */}
      <Navigation />

      {/* Main content */}
      <main className="flex-1 max-w-[99%] lg:max-w-[80%] mt-12 md:mt-2 px-2 md:px-6">{children}</main>
    </div>
  );
};


export default UserLayout;
