"use client";

import { Result } from "@/components/layouts/Result";
import { RightMenu } from "@/components/layouts/RightMenu";
import { LeftMenu } from "@/components/elements/LeftMenu";
import { Standby } from "@/components/elements/Standby";

export default function Test() {
    return (
        <div>
            <Result resultValue={null} />
        </div>
    )
}