// import { api } from "@/convex/_generated/api";
// import { WebhookEvent } from "@clerk/nextjs/server";
// import { fetchMutation } from "convex/nextjs";
// import { headers } from "next/headers";
// import { NextResponse } from "next/server";
// import { Webhook } from "svix";

// export async function POST(req: Request) {
//   // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
//   const WEBHOOK_SECRET = process.env.SIGNING_SECRET

//   if (!WEBHOOK_SECRET) {
//     throw new Error(
//       "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
//     );
//   }

//   // Get the headers
//   const headerPayload = await headers();
//   const svix_id = headerPayload.get("svix-id");
//   const svix_timestamp = headerPayload.get("svix-timestamp");
//   const svix_signature = headerPayload.get("svix-signature");

//   // If there are no headers, error out
//   if (!svix_id || !svix_timestamp || !svix_signature) {
//     return new Response("Error occured -- no svix headers", {
//       status: 400,
//     });
//   }

//   // Get the body
//   const payload = await req.json();
//   const body = JSON.stringify(payload);

//   // Create a new SVIX instance with your secret.
//   const wh = new Webhook(WEBHOOK_SECRET);

//   let evt: WebhookEvent;

//   // Verify the payload with the headers
//   try {
//     evt = wh.verify(body, {
//       "svix-id": svix_id,
//       "svix-timestamp": svix_timestamp,
//       "svix-signature": svix_signature,
//     }) as WebhookEvent;
//   } catch (err) {
//     console.error("Error verifying webhook:", err);
//     return new Response("Error occured", {
//       status: 400,
//     });
//   }

//   const eventType = evt.type;

//   switch (eventType) {
//     case "user.created":
//       try {
//         console.log("payload", payload);

//         const userData = {
//           userId: payload?.data?.id,
//           email: payload?.data?.email_addresses?.[0]?.email_address,
//           name: `${payload?.data?.first_name ? payload?.data?.first_name : ""}`,
//           createdAt: Date.now(),
//           profileImage: payload?.data?.profile_image_url,
//           onboardingCompleted: false
//         };

//         await fetchMutation(api.users.createUser, userData);

//         return NextResponse.json({
//           status: 200,
//           message: "User info inserted",
//         });
//       } catch (error) {
//         return NextResponse.json({
//           status: 400,
//           error,
//         });
//       }

//     case "user.updated":
//       try {
//         return NextResponse.json({
//           status: 200,
//           message: "User info updated",
//         });
//       } catch (error) {
//         return NextResponse.json({
//           status: 400,
//           error,
//         });
//       }

//     default:
//       return new Response("Error occured -- unhandeled event type", {
//         status: 400,
//       });
//   }
// }