import MuiPaper from "@/components/paper/Paper";
import React from "react";

const DashboardPage = async () => {
  return (
    <>
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
    </>
  );
};

export default DashboardPage;
