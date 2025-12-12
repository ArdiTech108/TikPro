export default async function handler(req, res) {
  const userMessage = req.query.message || "Hello";

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      input: userMessage
    })
  });

  const data = await response.json();
  res.status(200).json(data);
}
