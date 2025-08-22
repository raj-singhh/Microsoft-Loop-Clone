"use client";
import React, { use } from "react";
import SideNav from "../../_components/SideNav";
import DocumentEditorSection from "../../_components/DocumentEditorSection";
import { Room } from "@/app/Room";

function Page({ params:paramsPromise }) {
    const params=use(paramsPromise)
  return (
    <Room params={params}>
      <div>
        {/* Side Nav  */}
        <div className="">
          <SideNav params={params} />
        </div>
        {/* Document  */}
        <div className="md:ml-72">
          <DocumentEditorSection params={params} />
        </div>
      </div>
    </Room>
  );
}

export default Page;