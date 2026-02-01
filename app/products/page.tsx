import Link from "next/link";

const products = [
  { id: '1', name: 'MikroTik License', price: 199.99, commission: 49.99 },
  { id: '2', name: 'React Template', price: 89.99, commission: 29.99 },
  { id: '3', name: 'Python Course', price: 149.99, commission: 39.99 }
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">Products</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product.id} className="border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-2">{product.name}</h2>
            <div className="mb-4">
              <div className="text-2xl font-bold">${product.price}</div>
              <div className="text-green-600 font-bold">Commission: ${product.commission}</div>
            </div>
            <Link 
              href={`/products/${product.id}`}
              className="block w-full text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <Link href="/" className="text-blue-600 hover:underline">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
