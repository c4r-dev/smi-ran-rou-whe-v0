// components/FaviconButton.tsx
"use client";

import Link from "next/link";
import Image from "next/image";

export default function FaviconButton() {
  return (
    <Link href="/" passHref>
      <button className="favicon-button">
        <Image
          src="/favicon.ico"
          alt="Home"
          width={40}
          height={40}
          className="favicon"
        />
      </button>
    </Link>
  );
}
