module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message, history } = req.body || {};

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  const apiKey = process.env.BYTEZ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "API key not configured" });
  }

  // Build messages array
  const messages = [`
Website ini dibuat oleh Vicky Adrian Pratama, seorang siswa jurusan Teknik Jaringan Komputer (TKJ) di SMK Negeri 1 Kendal. Sebagai seorang yang bersemangat di dunia teknologi, khususnya dalam pengembangan web dan jaringan komputer, Vicky berusaha untuk terus mengasah keterampilan dalam berbagai bidang, mulai dari desain web hingga pemrograman. Website ini menjadi salah satu wadah bagi Vicky untuk menampilkan proyek-proyek yang dikerjakan, termasuk eksperimen dengan teknologi seperti AI dan Machine Learning.

Website ini juga menampilkan chatbot AI yang dibangun menggunakan teknologi GPT-4o Mini, sebuah model bahasa AI yang dapat memahami dan menghasilkan teks dalam berbagai konteks.

Sebagai seorang yang menggemari freelance, bug hunting, dan web development, Vicky terus belajar dan mengembangkan berbagai proyek termasuk ESP8266 dan IoT.
`];

  if (Array.isArray(history)) {
    for (const msg of history) {
      messages.push({
        role: msg.role,
        content: msg.content,
      });
    }
  }

  messages.push({
    role: "user",
    content: message,
  });

  try {
    const response = await fetch(
      "https://api.bytez.com/models/v2/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: messages,
          temperature: 0.7,
        }),
      }
    );

    const data = await response.json();

    const botMessage =
      data?.choices?.[0]?.message?.content ||
      "Saya tidak dapat memproses permintaan.";

    return res.status(200).json({
      response: botMessage,
    });

  } catch (error) {
    console.error("Chat API Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
