// processData.tsx
import { StaticImageData } from "next/image";
import m1 from "../../public/m1.jpg";
import m2 from "../../public/m2.jpg";
import m3 from "../../public/m3.jpg";
import m4 from "../../public/m4.jpg";
import m5 from "../../public/m5.jpg";

interface ProcessData {
  imageUrl: StaticImageData;
  title: string;
  description: string;
}

const processData: ProcessData[] = [
  {
    imageUrl: m1,
    title: "Expense Tracking",
    description:
      "Easily track your daily, weekly, and monthly expenses to gain a clear understanding of your financial habits and make informed decisions.",
  },
  {
    imageUrl: m2,
    title: "Savings & Investments",
    description:
      "Set savings goals and explore investment opportunities to grow your wealth over time, with personalized recommendations and guidance.",
  },
  {
    imageUrl: m3,
    title: "Loans & EMIs Management",
    description:
      "Manage your loans and EMIs effectively, ensuring timely payments and reducing financial stress with structured repayment plans.",
  },
  {
    imageUrl: m4,
    title: "Financial Goal Prediction",
    description:
      "Use our predictive algorithms to forecast your financial goals and track progress, helping you stay on course for long-term financial success.",
  },
  {
    imageUrl: m5,
    title: "Expert Consultation",
    description:
      "Consult with financial experts who provide personalized advice and mentorship to help you make smarter financial decisions.",
  },
];

export default processData;
