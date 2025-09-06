import React from "react";
import { createMangaListAction } from "@/app/action/manga";

const CreateMangaList = () => {
  return (
    <div className="flex-grow p-6 flex bg-white dark:bg-gray-900 rounded-2xl shadow-md">
      <div className="flex flex-col gap-4 w-full">
        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Manga List</h1>

        {/* Subtitle */}
        <p className="text-lg text-gray-600 dark:text-gray-400">Start listing your manga here</p>

        {/* Form */}
        <form className="py-6">
          <button
            formAction={createMangaListAction}
            type="submit"
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 
                       text-white font-medium transition duration-200 
                       shadow-sm hover:shadow-md"
          >
            Get started
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateMangaList;
