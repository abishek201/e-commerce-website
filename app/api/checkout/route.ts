import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/mongo";
import OrderSchema from "@/app/model/order";

export async function POST(req: Request) {
  try {
    await dbConnect();

    // Line 21 fix: Explicitly typing the JSON payload instead of using 'any'
    const body: Record<string, unknown> = await req.json();

    const newOrder = await OrderSchema.create(body);

    return NextResponse.json({ success: true, order: newOrder }, { status: 201 });
  } catch (error: unknown) {
    // Line 40 fix: Typing error as 'unknown' and extracting message safely
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";

    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}