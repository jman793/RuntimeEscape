import Link from "next/link"


// TODO make pages for your links
export default function Header() {
  return (
    <div className="pb-4">
      <div className="border bg-secondary border-border pl-2 py-4 flex justify-between items-center">
        <span className="p-2">
          <Link href="/" className="header-link">Home</Link>
        </span>
        <span className="pr-4">
          <a href="/feed" className="header-link">RSS</a>
        </span>
      </div>
    </div>
  )
}
