"use client";

import { Breadcrumbs } from "@mui/material";
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";
import MuiLink from "../link/Link";
import Link from "next/link";
import { formatToLabel, isUUID } from "../helper/component";

type IPageBreadCrumbs = {
  route: string;
  pathNames?: string[];
};

type IRoute = {
  name: string;
  href: string;
};

const PageBreadCrumbs: React.FC<IPageBreadCrumbs> = (props) => {
  const { route, pathNames = [] } = props;
  const path = usePathname();

  const routes = useMemo(() => {
    let currentRoute = `${route}`;
    const routes: IRoute[] = [];
    const activeRoute = path.replace(`${route}/`, "");
    const paths = activeRoute.split("/");
    const names = pathNames;
    paths.forEach((path) => {
      const isPathUUID = isUUID(path);
      let name = formatToLabel(path);
      if (isPathUUID && names.length) {
        name = names[0];
        names.pop();
      }
      routes.push({
        name: name,
        href: `${currentRoute}/${path}`,
      });
      currentRoute = currentRoute.concat(`/${path}`);
    });
    return routes;
  }, [path, route, pathNames]);

  return (
    <Breadcrumbs className="p-2">
      {routes.map((item) => (
        <MuiLink key={item.name} href={item.href} component={Link}>
          {item.name}
        </MuiLink>
      ))}
    </Breadcrumbs>
  );
};

export default PageBreadCrumbs;
