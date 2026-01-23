module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message, conversationId, history } = req.body || {};

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  const apiKey = process.env.BYTEZ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "API key not configured" });
  }

  const messages = [];

  if (Array.isArray(history)) {
    for (const msg of history) {
      messages.push({
        role: msg.role,
        content: msg.content
      });
    }
  }

  messages.push({
    role: "user",
    content: message
  });

  try {
    const response = await fetch(
      "https://api.bytez.com/models/v2/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages,
          temperature: 0.7
        })
      }
    );

    const data = await response.json();

    const botMessage =
      data?.choices?.[0]?.message?.content ||
      "Saya tidak dapat memproses permintaan.";

    return res.status(200).json({
      response: botMessage
    });

  } catch (error) {
    console.error("Chat API Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};    const response = await fetch(
      "https://api.bytez.com/models/v2/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: messages,
          temperature: 0.7
        })
      }
    );

    const data = await response.json();

    const botMessage =
      data?.choices?.[0]?.message?.content ||
      "Saya tidak dapat memproses permintaan.";

    return res.status(200).json({
      response: botMessage
    });

  } catch (error) {
    console.error("Chat API Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
