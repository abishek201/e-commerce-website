// this file is to process the request form /cart/page.tsx(fontend) and connect mogodb 

import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/mongo";
import OrderSchema from "@/app/model/order";  

export async function POST(req: Request) {   //function accepcts the post request form frontend  which containes the (cart item) and the (total value)
 try {
    await dbConnect(); // await for database connection
 
    const { cartItems, totalPrice } = await req.json();  //convert the cart ittem into JSON() formate

    if (!cartItems || cartItems.length === 0) { // if cart items is 0 
      return NextResponse.json(
        { error: "Cart is empty" },
        { status: 400 }
      );
    }

    // Format items to match the schema
    const formattedItems = cartItems.map((item: any) => ({        // map the cart items into the formateditems
      productId: item.product.id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      image: item.product.image,
    }));

    // Create and save order in MongoDB
    const newOrder = await OrderSchema.create({  // creating the order in database according to Orderschema
      items: formattedItems,
      totalAmount: totalPrice,
    });

    return NextResponse.json(
      { message: "Order placed successfully!", orderId: newOrder._id },   // returning the message
      { status: 201 }
      
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to process checkout" },
      { status: 500 }
    );
  }
}