// api/notify.js
import paystack from "paystack";
import emailjs from "@emailjs/browser";

// Load Paystack secret from environment
const paystackClient = paystack(process.env.PAYSTACK_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { reference, email, phone, address, cartItems } = req.body;

  try {
    // Verify payment with Paystack
    const response = await paystackClient.transaction.verify(reference);

    if (response?.data?.status !== "success") {
      throw new Error("Payment verification failed");
    }

    // Send email via EmailJS
    await emailjs.send(
      "service_li9a5x5",
      "template_39qlhen",
      {
        to_email: email,
        reference,
        phone,
        address,
        cart_items: cartItems,
      },
      process.env.EMAILJS_PUBLIC_KEY
    );

    res.status(200).json({ success: true, message: "Notification sent" });
  } catch (error) {
    console.error("Error sending notification:", error.message);
    res.status(500).json({ error: "Failed to send notification" });
  }
}
