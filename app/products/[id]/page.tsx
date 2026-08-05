import { mockproducts } from "@/app/data/products";
import Productdetail from "@/app/components/productdetail";
import Link from "next/link";
import "./product-detail.css";

export default async function individualproductpage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const foundproduct = mockproducts.find((p) => p.id === Number(id));

  if (!foundproduct) {
    return (
      <div className="product-page-wrapper">
        <div className="not-found-card">
          <h2>Product Not Found</h2>
          <p>The item you are looking for does not exist or has been removed.</p>
          <Link href="/products" className="back-btn">
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="product-page-wrapper">
      <Link href="/products" className="back-link">
        ← Back to Products
      </Link>
      <Productdetail product={foundproduct} />
    </div>
  );
}

    





