export default async function PlaceholderDynamicPage({
    params,
  }: {
    params: Promise<{ [key: string]: string }>;
  }) {
    const resolvedParams = await params;
  
    return (
      <main className="p-8">
        <h1 className="text-2xl font-bold">Dynamic Page</h1>
        <pre className="mt-4 p-4 bg-gray-100 rounded text-sm">
          {JSON.stringify(resolvedParams, null, 2)}
        </pre>
      </main>
    );
  }