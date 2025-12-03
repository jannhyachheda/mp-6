import Link from "next/link";

export default function Header() {
  const linkStyling = "p-1 m-2 text-xl hover:underline";
  
  return (
    <header className="flex justify-between items-center h-20 bg-gray-800 text-white">
      <h2 className="text-4xl font-semibold p-4">MP6 | OAuth</h2>
      <nav className="p-2 m-4">
        <Link href="/" className={linkStyling}>
          Home
        </Link>
      </nav>
    </header>
  );
}
