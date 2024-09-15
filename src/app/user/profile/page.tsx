import MuiPaper from "@/components/paper/Paper";
import Dashboard from "@/components/ui/Dashboard";
import { createClient } from "@/utils/supabase/client";
import React from "react";

const ProfilePage = async () => {
  const client = createClient();

  return (
    <Dashboard>
      <div className="flex flex-wrap gap-4">
        <MuiPaper className="flex-grow min-h-[180px] p-4" elevation={2} color="primary">
          Card 1
        </MuiPaper>
        <MuiPaper className="flex-grow min-h-[180px] p-4" elevation={2} color="primary">
          Card 1
        </MuiPaper>
        <MuiPaper className="flex-grow min-h-[180px] p-4" elevation={2} color="primary">
          Card 1
        </MuiPaper>
      </div>
      <div className="flex flex-wrap gap-4">
        <MuiPaper className="flex-grow-[2] min-h-[320px] p-4" elevation={2} color="primary">
          Graph 1
        </MuiPaper>
        <MuiPaper className="flex-grow min-h-[320px] p-4" elevation={2} color="primary">
          Graph 1
        </MuiPaper>
      </div>
      <div className="flex flex-wrap flex-grow gap-4">
        <MuiPaper className="flex-grow min-h-[240px] p-4" elevation={2} color="primary">
          Stats 1
        </MuiPaper>
        <MuiPaper className="flex-grow min-h-[240px] p-4" elevation={2} color="primary">
          Stats 1
        </MuiPaper>
        <MuiPaper className="flex-grow min-h-[240px] p-4" elevation={2} color="primary">
          Stats 1
        </MuiPaper>
      </div>
    </Dashboard>
  );
};

export default ProfilePage;
