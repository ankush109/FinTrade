import React from "react";
import { motion } from "framer-motion";

function SectionTrust() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="mt-20 max-w-7xl mx-auto mb-20">
      <div className="text-4xl text-center font-semibold">
        Why Should You Trust Us?
      </div>
      <motion.div
        className="grid grid-cols-4 gap-4 mt-10 mb-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <TrustCard
          title="Expert Financial Advisors"
          description="Connect with over 3500+ experienced financial experts to guide your investments."
          variants={cardVariants}
        />
        <TrustCard
          title="Personalized Strategies"
          description="Receive tailored plans for expense management, savings, and investments."
          variants={cardVariants}
        />
        <TrustCard
          title="Comprehensive Assessments"
          description="Start with a detailed financial health check to identify your needs."
          variants={cardVariants}
        />
        <TrustCard
          title="Top-Rated Experts"
          description="Get guidance from highly-rated mentors and financial advisors."
          variants={cardVariants}
        />
        <TrustCard
          title="Financial Insights"
          description="Access visual charts and data insights to track your financial goals."
          variants={cardVariants}
        />
        <TrustCard
          title="Beginner-Friendly"
          description="Simplified UI/UX designed to help everyone, from beginners to experts."
          variants={cardVariants}
        />
        <TrustCard
          title="Secure & Confidential"
          description="Your financial data is secure, and your privacy is always a priority."
          variants={cardVariants}
        />
        <TrustCard
          title="Community Support"
          description="Engage with our community to share experiences and get support from peers."
          variants={cardVariants}
        />
      </motion.div>
    </div>
  );
}

export default SectionTrust;

interface TrustCardProps {
  title: string;
  description: string;
  variants?: any;
}

const TrustCard: React.FC<TrustCardProps> = ({ title, description, variants }) => {
  return (
    <motion.div
      className="bg-slate-100 p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
      variants={variants}
    >
      <div className="font-bold text-xl mb-2">{title}</div>
      <div className="text-gray-700">{description}</div>
    </motion.div>
  );
};
