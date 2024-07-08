import Link from "next/link";
import Image from "next/image";
import favicon from "../../public/favicon.png";

export default function Logo() {
  return (
    <Link href="/" className="inline-flex" aria-label="Cruip">
      <Image src={favicon} alt="Logo" width={28} height={28} />
    </Link>
  );
}
