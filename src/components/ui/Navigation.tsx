"use client";

import MuiButton from "@/components/button/Button";
import MuiPaper from "@/components/paper/Paper";
import MuiTypography from "@/components/typography/Typograph";
import { APP } from "@/constants/APP";
import { usePathname, useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";

const Navigation = () => {
  const pathname = usePathname();
  const router = useRouter();

  const routes = useMemo(() => Object.values(APP.ROUTES.USER), []);

  const isActiveLink = useCallback(
    (link: string) => {
      return pathname.startsWith(link);
    },
    [pathname],
  );

  const onClickLink = useCallback(
    (link: string) => {
      router.push(link);
    },
    [router],
  );

  return (
    <MuiPaper component={"nav"} className="flex-grow max-w-[240px] min-w-[240px] p-4" elevation={3} color="primary">
      <div className="flex flex-col gap-2">
        {routes.map((route) => {
          const active = isActiveLink(route.href);
          return (
            <MuiButton key={route.href} variant={active ? "contained" : "text"} onClick={() => onClickLink(route.href)}>
              <MuiTypography variant="button" fontSize={18}>
                {route.name}
              </MuiTypography>
            </MuiButton>
          );
        })}
      </div>
    </MuiPaper>
  );
};

export default Navigation;
