import React from "react";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "./ui/navigation-menu";
import { Link } from "@inertiajs/react";

export const NavigationBar = () => (
  <div style={{ display: "flex", justifyContent: "flex-start", paddingTop: "30px", paddingBottom: "30px", width: "100%" }}>
    <h2>Pokedex Example App</h2>
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink>
            <Link href="/">Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  </div>
)

