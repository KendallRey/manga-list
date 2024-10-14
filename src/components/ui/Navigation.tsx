"use client";

import MuiButton from "@/components/button/Button";
import MuiPaper from "@/components/paper/Paper";
import MuiTypography from "@/components/typography/Typograph";
import { APP } from "@/constants/APP";
import { usePathname } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import MuiFab from "../fab/Fab";
import { useMediaQuery, useTheme } from "@mui/material";
import Link from "next/link";
import { useScroll, motion } from "framer-motion";

const Navigation = () => {
  const pathname = usePathname();
  const theme = useTheme();
  const routes = useMemo(() => Object.values(APP.ROUTES.USER), []);

  const { scrollY } = useScroll();

  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));

  const isActiveLink = useCallback(
    (link: string) => {
      return pathname.startsWith(link);
    },
    [pathname],
  );

  if (!isMd) return <></>;

  return (
    <MuiPaper
      component={"nav"}
      className="flex-grow max-w-[50px] lg:max-w-[240px] lg:min-w-[240px] p-4"
      elevation={3}
      color="primary"
    >
      <motion.div style={{ marginTop: scrollY, transitionDuration: "200ms" }}>
        <div className="flex flex-col gap-4 lg:gap-2">
          {routes.map((route) => {
            const active = isActiveLink(route.href);
            return (
              <React.Fragment key={route.href}>
                {isLg ? (
                  <MuiButton component={Link} href={route.href} variant={active ? "contained" : "text"}>
                    <MuiTypography variant="button" fontSize={18}>
                      {route.name}
                    </MuiTypography>
                  </MuiButton>
                ) : (
                  <MuiFab component={Link} href={route.href} size="small" color={active ? "primary" : "default"}>
                    {route.icon}
                  </MuiFab>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </motion.div>
    </MuiPaper>
  );
};

export default Navigation;
