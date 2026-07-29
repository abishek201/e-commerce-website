import mongoose, { Schema, Document } from "mongoose";  //importing sechema and document for mongodb

export interface OrderItem{
    productId: number;       // creating the schema for cart items  called ordre items
  name: string;
  price: number;
  quantity: number;
  image?: string;

}
 export interface Iorder extends Document{
    items: OrderItem[];                     // creating another for total amount and data including order items
  totalAmount: number;
  createdAt: Date;

 }

 const OrderSchema = new Schema<Iorder>(        // creating a mongo db schema using <iorder>
  {
    items: [
      {
        productId: { type: Number, required: true },   // which type and requried or not 
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        image: { type: String },  // immage is optional
      },
    ],
    totalAmount: { type: Number, required: true },
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model<Iorder>("Order", OrderSchema); // check the order sechema is alrady existed in cache or if it not recreate new one



export default Order; //export the order model to api request