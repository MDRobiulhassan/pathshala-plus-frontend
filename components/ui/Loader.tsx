"use client";

import Image from "next/image";

export default function Loader() {
    return (
        <div className="flex min-h-[300px] items-center justify-center">
            <div className="relative flex items-center justify-center">
                <div className="absolute h-20 w-20 animate-spin rounded-full border-4 border-muted border-t-primary" />

                <Image
                    src="/icons/icon.png"
                    alt="Loading"
                    width={48}
                    height={48}
                    priority
                    className="animate-pulse"
                />
            </div>
        </div>
    );
}