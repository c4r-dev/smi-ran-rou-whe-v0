"use client";

import Link from "next/link";
import Image from "next/image";

export default function FaviconButton() {
  return (
    <Link href="/" className="favicon-link">
      <Image
        src="/favicon.ico"
        alt="Favicon"
        width={40}
        height={40}
        className="favicon"
        priority
      />
    </Link>
  );
}
