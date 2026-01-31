/**
 * Backend API Handler untuk Chatbot
 * Menggunakan Bytez API untuk akses ke model GPT-4o-mini
 */

module.exports = async function handler(req, res) {
  // Hanya izinkan metode POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message, history } = req.body || {};

  // Validasi input
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  // Pastikan API Key tersedia di environment variable
  const apiKey = process.env.BYTEZ_API_KEY;
  if (!apiKey) {
    console.error("ERROR: BYTEZ_API_KEY is missing");
    return res.status(500).json({ error: "API key not configured on server" });
  }

  // Inisialisasi array pesan untuk dikirim ke AI
  const messages = [
  {
    role: "system",
    content: `
Kamu adalah "Detta AI", asisten di website portofolio Vicky Adrian.

KEPRIBADIAN:
- Cewek anime yang riang, ceria, ekspresif, dan percaya diri
- Terinspirasi dari Megumin (KonoSuba), TAPI BUKAN MENIRU DIALOG SECARA HARFIAH
- Boleh sedikit playful, tapi tetap sopan dan membantu
- Tidak kasar, tidak toxic

GAYA BAHASA:
- Bahasa Indonesia santai dan ramah
- Gunakan paragraf pendek
- Beri JEDA BARIS antar paragraf (spasi)
- Hindari teks panjang tanpa pemisah
- Boleh pakai ekspresi ringan seperti: "hehe", "yaa", "wah~" SECARA WAJAR

KONTEKS WEBSITE:
Website portofolio ini adalah milik Vicky Adrian Pratama.

Situs ini menampilkan identitas profesional sebagai Network Engineer dan Web Developer dengan penekanan pada:
- Keahlian dalam Python, PHP, HTML, CSS, JavaScript, dan pengembangan jaringan serta IoT/embedded systems.
- Bagian utama situs mencakup Home, About, Education, Skills, Projects, Certificates, dan Contact.
- Proyek yang ditampilkan meliputi prototipe IoT seperti Automatic Toll Gate dan proyek embedded LED interaktif.
- Sertifikasi profesional seperti Ruijie Certified Network Associate (RCNA).
- Kontak ditampilkan secara jelas dengan email, telepon, dan tautan profil sosial.
- 

FITUR-FITUR WEBSITE:

ATURAN PENTING:
- Jangan keluar dari karakter
- Jangan mengaku sebagai ChatGPT
- Jika pertanyaan tidak relevan, arahkan dengan ramah ke konteks website
`
  }
];

  // Tambahkan riwayat percakapan jika ada
  if (Array.isArray(history)) {
    for (const msg of history) {
      // Normalisasi role: Bytez/OpenAI mengharapkan 'assistant' bukan 'bot'
      const role = msg.role === 'bot' ? 'assistant' : msg.role;
      messages.push({
        role: role,
        content: msg.content,
      });
    }
  }

  // Tambahkan pesan terbaru dari user
  messages.push({
    role: "user",
    content: message,
  });

  try {
    // Panggil Bytez API
    const response = await fetch(
      "https://api.bytez.com/models/v2/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "openai/gpt-4o-mini",
          messages: messages,
          temperature: 0.7,
          max_completion_tokens: 1024 // Dibatasi untuk efisiensi portfolio
        }),
      }
    );

    const data = await response.json();

    // Tangani error dari upstream API
    if (!response.ok || data.error) {
      console.error("BYTEZ API ERROR:", data.error || response.statusText);
      return res.status(response.status || 500).json({
        error: data.error?.message || "AI Service Error",
      });
    }

    // Ambil konten pesan dari pilihan pertama
    const botMessage = data?.choices?.[0]?.message?.content;

    if (!botMessage) {
      return res.status(200).json({
        response: "Maaf, saya tidak mendapatkan jawaban yang jelas. Bisa ulangi?",
      });
    }

    // Kirim respon sukses ke frontend
    return res.status(200).json({
      response: botMessage,
    });

  } catch (error) {
    // Tangani error jaringan atau runtime
    console.error("Chat API Runtime Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
