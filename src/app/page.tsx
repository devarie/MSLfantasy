import Deelnemersstand from "@/components/Deelnemersstand";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 font-sans dark:from-zinc-900 dark:to-black">
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            MSL Fantasy
          </h1>
          <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
            Live deelnemersstand
          </p>
        </div>

        <Deelnemersstand />
      </main>
    </div>
  );
}
