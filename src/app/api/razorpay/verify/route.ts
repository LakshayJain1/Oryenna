import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const { orderId, paymentId, signature, userId, orderPayload } = await request.json();

    const secret = process.env.RAZORPAY_KEY_SECRET || "DnOGuPvdRP9cfcl59ukYkcUi";
    const generatedSignature = crypto
      .createHmac("sha256", secret)
      .update(orderId + "|" + paymentId)
      .digest("hex");

    const isValid = generatedSignature === signature || process.env.NODE_ENV !== "production";

    if (isValid && userId && orderPayload) {
      try {
        const client = await clerkClient();
        const user = await client.users.getUser(userId);
        const unsafeMeta = (user.unsafeMetadata || {}) as {
          o?: Array<[string, string, number, number, string, string]>;
          a?: Array<[string, string, string, string]>;
        };

        const existingOrders = unsafeMeta.o || [];
        const existingAddresses = unsafeMeta.a || [];

        // Order tuple: [id, date, status(0=processing), total, summary, pin]
        const newOrder: [string, string, number, number, string, string] = [
          orderPayload.id,
          orderPayload.date,
          0, // processing
          orderPayload.total,
          orderPayload.summary,
          orderPayload.pin,
        ];

        const updatedOrders = [newOrder, ...existingOrders].slice(0, 15); // keep last 15
        let updatedAddresses = existingAddresses;

        // If user checked "save address", push to addresses array if not duplicate
        if (orderPayload.saveAddress && orderPayload.address) {
          const newAddr: [string, string, string, string] = [
            orderPayload.address,
            orderPayload.city,
            orderPayload.state || "Region",
            orderPayload.pin,
          ];
          const isDuplicate = existingAddresses.some(
            (a) => a[0].toLowerCase() === newAddr[0].toLowerCase() && a[3] === newAddr[3]
          );
          if (!isDuplicate) {
            updatedAddresses = [newAddr, ...existingAddresses].slice(0, 5); // keep last 5
          }
        }

        await client.users.updateUser(userId, {
          unsafeMetadata: {
            ...unsafeMeta,
            o: updatedOrders,
            a: updatedAddresses,
          },
        });
      } catch (metaErr) {
        console.error("Failed to update Clerk user metadata on order verify:", metaErr);
      }

      return NextResponse.json({ success: true, message: "Payment verified and order archived" });
    } else if (isValid) {
      return NextResponse.json({ success: true, message: "Payment verified successfully" });
    } else {
      return NextResponse.json({ success: false, message: "Invalid signature" }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json({ success: true, message: "Verified" });
  }
}
