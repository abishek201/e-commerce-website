import { mockproducts } from "@/app/data/products"
import Productdetail from "@/app/components/productdetail";

export default async function individualproductpage({ params}: {params: Promise<{ id: string }>;}) {
const { id } = await params;

const foundproduct = mockproducts.find((p) => p.id === Number(id));

if (!foundproduct){
    return <div>product not found</div>
}

return (
    <>
        <Productdetail product={foundproduct} />
    </>
);
}

    





