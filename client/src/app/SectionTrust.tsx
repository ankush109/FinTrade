import React from "react";

function SectionTrust() {
  return (
    <div className="mt-20 max-w-7xl mx-auto mb-20">
      <div className="text-4xl text-center font-semibold">
        Why Should You Trust Us?
      </div>
      <div className="grid grid-cols-4 gap-4 mt-10 mb-10">
        <TrustCard
          title="Expert Financial Advisors"
          description="Connect with over 3500+ experienced financial experts to guide your investments."
        />
        <TrustCard
          title="Personalized Strategies"
          description="Receive tailored plans for expense management, savings, and investments."
        />
        <TrustCard
          title="Comprehensive Assessments"
          description="Start with a detailed financial health check to identify your needs."
        />
        <TrustCard
          title="Top-Rated Experts"
          description="Get guidance from highly-rated mentors and financial advisors."
        />
        <TrustCard
          title="Financial Insights"
          description="Access visual charts and data insights to track your financial goals."
        />
        <TrustCard
          title="Beginner-Friendly"
          description="Simplified UI/UX designed to help everyone, from beginners to experts."
        />
        <TrustCard
          title="Secure & Confidential"
          description="Your financial data is secure, and your privacy is always a priority."
        />
        <TrustCard
          title="Community Support"
          description="Engage with our community to share experiences and get support from peers."
        />
      </div>
    </div>
  );
}

export default SectionTrust;

interface TrustCardProps {
  title: string;
  description: string;
}

const TrustCard: React.FC<TrustCardProps> = ({ title, description }) => {
  return (
    <div className="bg-slate-100 p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
      <div className="font-bold text-xl mb-2">{title}</div>
      <div className="text-gray-700">{description}</div>
    </div>
  );
};
