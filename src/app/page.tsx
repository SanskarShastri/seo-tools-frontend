import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold text-center mb-8">Welcome to SEO Tools</h1>
        <p className="text-lg text-center text-gray-600">Your all-in-one solution for website optimization</p>
      </div>
    </main>
  )
}
