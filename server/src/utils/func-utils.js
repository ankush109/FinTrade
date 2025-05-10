export const parseGeminiResponse = (text) => {
  try {
    const cleaned = text.replace(/```json\n?/, '').replace(/```$/, '').trim();
    return JSON.parse(cleaned);
  } catch (err) {
    console.error('Failed to parse Gemini response:', err);
    return null;
  }
};