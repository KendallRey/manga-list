import React from "react";
import UserProfile from "./ui/UserProfile";
import FavoriteMangaList from "./ui/FavoriteMangaList";
import CardContainer from "@/components/shared/Card";

const ProfilePage = async (props: PageProps<"/user/profile">) => {
  const { searchParams } = props;

  const _searchParams = await searchParams;

  return (
    <div className="flex flex-col gap-5">
      <CardContainer className="flex flex-col items-center p-4">
        <UserProfile />
      </CardContainer>
      <CardContainer className="flex-grow p-4">
        <FavoriteMangaList params={_searchParams} />
      </CardContainer>
    </div>
  );
};

export default ProfilePage;
