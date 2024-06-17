import React from "react";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "./ui/navigation-menu";
import { Link } from "@inertiajs/react";

const NavigationSidebar = () => {
  const navigationTabs = [
    { name: "Products", link: "/" },
  ];

  return (
    <NavigationMenu className="border-r-2 max-w-full h-full items-start justify-start" orientation="vertical">
      <NavigationMenuList className="flex-col items-start min-w-0 max-w-full w-full space-x-0 pt-5">
        {navigationTabs.map(tab => (
          <NavigationMenuItem key={tab.name} className="py-2 pl-5">
            <Link href={tab.link}>{tab.name}</Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default NavigationSidebar;
