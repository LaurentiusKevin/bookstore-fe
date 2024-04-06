"use client";

import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import Link from "@mui/joy/Link";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import Typography from "@mui/joy/Typography";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import * as React from "react";
import { usePathname } from "next/navigation";

export default function AdminBreadcrumbs() {
  const paths = usePathname();
  const pathNames = paths
    .replace("-", " ")
    .split("/")
    .filter((path) => path);

  return (
    <Breadcrumbs
      size="sm"
      aria-label="breadcrumbs"
      separator={<ChevronRightRoundedIcon />}
      sx={{ pl: 0 }}
    >
      <Link underline="none" color="neutral" href="/admin" aria-label="Home">
        <HomeRoundedIcon />
      </Link>
      {pathNames.map((item, key) => {
        if (key >= 0 && item != "admin") {
          let href = `/${pathNames.slice(0, key + 1).join("/")}`;

          return (
            <Link
              key={`admin-breadcrumb-${key}`}
              underline="hover"
              color="neutral"
              href={href}
              fontSize={12}
              fontWeight={500}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Link>
          );
        }
      })}
    </Breadcrumbs>
  );
}
