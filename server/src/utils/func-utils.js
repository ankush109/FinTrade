export const parseGeminiResponse = (text) => {
  try {
    const cleaned = text
      .replace(/```json\n?/, "")
      .replace(/```$/, "")
      .trim();
    return JSON.parse(cleaned);
  } catch (err) {
    console.error("Failed to parse Gemini response:", err);
    return null;
  }
};

export const convertDateTimeStamp = (isoDate) => {
  const readable = new Date(isoDate).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
  return readable;
};
