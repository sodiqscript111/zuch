// api/notify.js
import paystack from "paystack";
import emailjs from "@emailjs/browser";

// Your Paystack secret key
const paystackClient = paystack("sk_live_7ecfd68fa7814dbf8b652c80535226b79260f9f9");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { reference, email, phone, address, cartItems } = req.body;

  try {
    // Verify payment with Paystack
    const response = await paystackClient.transaction.verify(reference);
    if (response.data.status !== "success") {
      throw new Error("Payment verification failed");
    }

    // Send email via EmailJS
    await emailjs.send(
      "service_li9a5x5", // Your Service ID
      "template_39qlhen", // Replace with your EmailJS Template ID
      {
        to_email: email,
        reference,
        phone,
        address,
        cart_items: cartItems,
      },
      process.env.EMAILJS_PUBLIC_KEY // Loaded from Vercel env
    );

    res.status(200).json({ success: true, message: "Notification sent" });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Failed to send notification" });
  }
}