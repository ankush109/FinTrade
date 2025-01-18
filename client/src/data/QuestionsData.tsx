interface Option {
  text: string;
  points: number;
}

interface QuestionsData {
  question: string;
  options: Option[];
}

export const QuestionsData: QuestionsData[] = [
  {
    question: "how are you feeling today?",
    options: [
      { text: "good", points: 3 },
      { text: "bad", points: 1 },
      { text: "horny", points: 2 },
      { text: "average kinda", points: 2 },
    ],
  },
  {
    question: "how is your mood today?",
    options: [
      { text: "happy", points: 3 },
      { text: "sad", points: 1 },
      { text: "angry", points: 1 },
      { text: "neutral", points: 2 },
    ],
  },
  {
    question: "did you get enough sleep last night?",
    options: [
      { text: "yes", points: 3 },
      { text: "no", points: 1 },
      { text: "somewhat", points: 2 },
      { text: "not sure", points: 2 },
    ],
  },
  {
    question: "how stressed are you feeling right now?",
    options: [
      { text: "not at all", points: 3 },
      { text: "a little", points: 2 },
      { text: "moderately", points: 1 },
      { text: "very stressed", points: 0 },
    ],
  },
  {
    question: "how satisfied are you with your life currently?",
    options: [
      { text: "very satisfied", points: 3 },
      { text: "satisfied", points: 2 },
      { text: "neutral", points: 1 },
      { text: "dissatisfied", points: 0 },
    ],
  },
  {
    question: "how often do you feel anxious?",
    options: [
      { text: "never", points: 3 },
      { text: "sometimes", points: 2 },
      { text: "often", points: 1 },
      { text: "always", points: 0 },
    ],
  },
  {
    question: "how motivated do you feel today?",
    options: [
      { text: "very motivated", points: 3 },
      { text: "motivated", points: 2 },
      { text: "neutral", points: 1 },
      { text: "unmotivated", points: 0 },
    ],
  },
  {
    question: "how connected do you feel with your friends and family?",
    options: [
      { text: "very connected", points: 3 },
      { text: "somewhat connected", points: 2 },
      { text: "neutral", points: 1 },
      { text: "disconnected", points: 0 },
    ],
  },
  {
    question: "how often do you feel overwhelmed?",
    options: [
      { text: "never", points: 3 },
      { text: "sometimes", points: 2 },
      { text: "often", points: 1 },
      { text: "always", points: 0 },
    ],
  },
  {
    question: "how would you rate your overall mental health?",
    options: [
      { text: "excellent", points: 3 },
      { text: "good", points: 2 },
      { text: "fair", points: 1 },
      { text: "poor", points: 0 },
    ],
  },
  {
    question: "how often do you engage in activities you enjoy?",
    options: [
      { text: "daily", points: 3 },
      { text: "weekly", points: 2 },
      { text: "monthly", points: 1 },
      { text: "rarely", points: 0 },
    ],
  },
];
