export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="max-w-xl w-full rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-4">BAC-EVV — Web Scaffold</h1>
        <p className="mb-6">
          Next.js App Router + TypeScript + TailwindCSS is ready.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Monorepo workspace: <code>apps/web</code></li>
          <li>App Router: <code>/app</code> directory</li>
          <li>TailwindCSS configured</li>
        </ul>
      </div>
    </main>
  );
}
