import { NavigationBar } from "@/components/NavigationBar";
import { Separator } from "@/components/ui/separator";
import React, { ReactNode } from "react"

type Props = {
  children: ReactNode;
}

const DefaultLayout = ({ children }: Props) => (
  <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
    <NavigationBar />
    <Separator orientation="horizontal" />
    <div style={{ width: "94%", paddingTop: "50px" }}>
      {children}
    </div>
  </div>
)

export default DefaultLayout;
