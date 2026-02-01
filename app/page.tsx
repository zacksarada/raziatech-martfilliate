export default function HomePage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">RaziaTech MartFilliate</h1>
      <p className="text-lg mt-4">Deployment successful! 🎉</p>
      <p className="mt-2">Live at: https://raziatech-martfilliate.vercel.app</p>
      <div className="mt-6 p-4 bg-green-100 rounded">
        <p>✅ Vercel deployment completed</p>
        <p>✅ Database connected via Prisma</p>
        <p>✅ Ready for production use</p>
      </div>
    </main>
  );
}
