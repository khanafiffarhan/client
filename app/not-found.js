import Link from "next/link";
export default function NotFound() {
  return <div className="text-center py-32"><h1 className="text-7xl font-bold text-warning">404</h1>
    <p className="my-4 text-xl">This page wandered off the shelf.</p><Link href="/" className="btn btn-warning">Back to Home</Link></div>;
}
