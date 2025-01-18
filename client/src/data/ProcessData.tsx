// processData.tsx
import { StaticImageData } from "next/image";
import m1 from "@/assets/mental1.jpeg";
import m2 from "@/assets/mental2.jpeg";
import m3 from "@/assets/mental3.jpeg";
import m4 from "@/assets/mental4.jpeg";
import m5 from "@/assets/mental5.jpeg";

interface ProcessData {
  imageUrl: StaticImageData;
  title: string;
  description: string;
}

const processData: ProcessData[] = [
  {
    imageUrl: m1,
    title: "Initial Assessment",
    description:
      "Begin with a well-crafted mental health assessment to understand your current state and determine the level of support required.",
  },
  {
    imageUrl: m2,
    title: "Personalized Plan",
    description:
      "Receive a customized 30-day mental exercise plan tailored to your specific needs and goals, created by our expert team.",
  },
  {
    imageUrl: m1,
    title: "Expert Consultation",
    description:
      "Book one-on-one sessions with top mental health professionals to receive personalized guidance and support.",
  },
  {
    imageUrl: m1,
    title: "Community Support",
    description:
      "Join our discussion forums to connect with a supportive community, share experiences, and find peer support.",
  },
  {
    imageUrl: m1,
    title: "Ongoing Monitoring",
    description:
      "Regularly track your progress and adjust your plan as needed with continuous support from our experts.",
  },
];

export default processData;
