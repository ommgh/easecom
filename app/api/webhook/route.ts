import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import prismadb from "@/lib/prismadb";

const DASHBOARD_URL = process.env.DASHBOARD_URL!;
const DASHBOARD_API_KEY = process.env.DASHBOARD_API_KEY!;
const STORE_CHANNEL_ID = process.env.STORE_CHANNEL_ID!;

async function sendOrderToDashboard(order: any) {
  try {
    const response = await fetch(`${DASHBOARD_URL}/api/custom/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${DASHBOARD_API_KEY}`,
        "X-Channel-ID": STORE_CHANNEL_ID,
      },
      body: JSON.stringify({
        channelOrderId: order.id,
        productName: order.orderItems[0]?.product?.name || "Unknown Product",
        productPrice: order.orderItems[0]?.product?.price || 0,
        quantity: order.orderItems.length,
        orderStatus: "PENDING",
        channelId: STORE_CHANNEL_ID,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to send order to dashboard: ${response.statusText}`
      );
    }

    console.log("Order successfully sent to dashboard");
  } catch (error) {
    console.error("Error sending order to dashboard:", error);
  }
}

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const address = session?.customer_details?.address;

  const addressComponents = [
    address?.line1,
    address?.line2,
    address?.city,
    address?.state,
    address?.postal_code,
    address?.country,
  ];

  const addressString = addressComponents.filter((c) => c !== null).join(", ");

  if (event.type === "checkout.session.completed") {
    const order = await prismadb.order.update({
      where: {
        id: session?.metadata?.orderId,
      },
      data: {
        isPaid: true,
        address: addressString,
        phone: session?.customer_details?.phone || "",
      },
      include: {
        orderItems: {
          include: {
            product: true, // Include product details
          },
        },
      },
    });

    // Send order to dashboard after successful payment
    await sendOrderToDashboard(order);

    const productIds = order.orderItems.map((orderItem) => orderItem.productId);
    await prismadb.product.updateMany({
      where: {
        id: {
          in: [...productIds],
        },
      },
      data: {
        isArchived: true,
      },
    });
  }

  return new NextResponse(null, { status: 200 });
}
