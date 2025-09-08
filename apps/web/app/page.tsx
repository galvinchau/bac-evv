import '../styles/globals.css';

import { Button } from '../src/components/ui/button';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-2xl font-bold">BAC-EVV Web</h1>
      <Button>Shadcn Button</Button>
    </main>
  );
}
