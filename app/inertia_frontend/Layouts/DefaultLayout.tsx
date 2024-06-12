import React, { ReactNode } from "react"
import { TitleBar } from "@/components/TitleBar";
import { Separator } from "@/components/ui/separator";
import NavigationSidebar from "@/components/NavigationSidebar";

type Props = {
  children: ReactNode;
}

const DefaultLayout = ({ children }: Props) => (
  <div style={{ display: "flex", flexDirection: "column" }}>
    <TitleBar />
    <Separator orientation="horizontal" />
    <div style={{ width: "100%", display: "flex" }}>
      <div style={{ width: "15%", minHeight: "100vh" }}>
        <NavigationSidebar />
      </div>
      <div style={{ width: "85%", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "center" }}>
        <div style={{ width: "80%", paddingTop: "30px", paddingBottom: "30px" }}>
          {children}
        </div>
      </div>
    </div>
  </div>
)

export default DefaultLayout;
