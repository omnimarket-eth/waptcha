import Image from "next/image"
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Image src="/head-wall.svg" alt="Nouns Wall" width={300} height={300} />
      <h1 className="font-bold text-[#254EFB] font-display text-6xl mb-8">Waptcha</h1>
      <p className="text-xl mb-6">A more reliable alternative to ReCAPTCHA based on World ID</p>
      <p className="text-lg mb-12">Coming soon...</p>
      <Link href="/dashboard" className="font-bold text-[#254EFB] font-display underline">Your Dashboard</Link>
    </div>
  )
}
