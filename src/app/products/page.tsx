import ProductCatalog from "@/components/Products/ProductCatalog";

export const metadata = {
  title: "Glass Catalog | Glass121",
  description: "Browse, filter, and discover glass products with full industry context.",
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-primary-dark">
      <ProductCatalog />
    </div>
  );
}
