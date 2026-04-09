import Link from "next/link"


// TODO make pages for your links
export default function Header() {
  return (
    <div className="pb-4">
      <div className="border bg-secondary border-border pl-2 py-4">
        <span className="p-2">
          <Link href="/" className="header-link">Home</Link>
        </span>
      </div>
    </div>
  )
}
