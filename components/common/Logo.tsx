"use client";

import Image from "next/image";
import { DM_Sans } from "next/font/google";
import { cn } from "@/lib/utils";

const dmSans = DM_Sans({
    subsets: ["latin"],
    weight: ["700", "800"],
});

type LogoProps = {
    collapsed?: boolean;
};

export default function Logo({ collapsed = false }: LogoProps) {
    return (
        <div className="flex items-center gap-3">
            <Image
                src="/icons/Icon.png"
                alt="Pathshala"
                width={34}
                height={34}
                priority
            />

            {!collapsed && (
                <span
                    className={cn(
                        dmSans.className,
                        "text-[20px] font-[800] tracking-[-0.5px] text-white"
                    )}
                >
                    Pathshala
                </span>
            )}
        </div>
    );
}