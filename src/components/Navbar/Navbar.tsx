"use client";

export default function Navbar() {
  return (
    <nav className="fixed top-6 right-6 z-50">
      <button
        onClick={() => console.log("Menu clicked")}
        className="flex flex-col gap-2"
      >
        <span className="block h-px w-8 bg-white" />
        <span className="block h-px w-8 bg-white" />
      </button>
    </nav>
  );
}