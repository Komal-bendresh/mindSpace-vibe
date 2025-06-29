const axios = require("axios");

const analyzeMood = async (req, res) => {
  const { journalText } = req.body;

  if (!journalText) {
    return res.status(400).json({ message: "Journal text is required" });
  }

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama3-70b-8192",
        messages: [
          {
            role: "system",
            content: `You are a compassionate mental health assistant. 
              Analyze the journal entry below and reply with:
              - Emotion detected
              - 1 Self-care suggestion
              - 1 Daily affirmation
              - 1 Weekly goal suggestion
              Reply in max 100 words.`,
          },
          {
            role: "user",
            content: journalText,
          },
        ],
        max_tokens: 150,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const analysis = response.data.choices[0].message.content;
    res.status(200).json({ analysis });
  } catch (error) {
    console.error("Groq AI Error:", error.message);
    res.status(500).json({ message: "AI analysis failed" });
  }
};

module.exports = {
  analyzeMood,
};
