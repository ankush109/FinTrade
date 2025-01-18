import React from "react";

function SectionTrust() {
  return (
    <div className="mt-20 max-w-7xl mx-auto mb-20">
      <div className="text-4xl text-center font-semibold">
        Why Should You Trust Us?
      </div>
      <div className="grid grid-cols-4 gap-4 mt-10 mb-10">
        <TrustCard
          title="Expert Specialists"
          description="Reach out to over 3500+ experienced doctors specializing in mental health."
        />
        <TrustCard
          title="Personalized Plans"
          description="Receive a 30-day mental exercise plan tailored to your specific needs."
        />
        <TrustCard
          title="Comprehensive Assessments"
          description="Start with a well-crafted test to determine the level of help you need."
        />
        <TrustCard
          title="Top-Rated Experts"
          description="Consult with top experts who provide assured guidance and support."
        />
        <TrustCard
          title="Community Support"
          description="Engage in our discuss section to share experiences and get support from peers."
        />
        <TrustCard
          title="Trusted Mentors"
          description="Access a network of mentors and experts dedicated to mental health."
        />
        <TrustCard
          title="NGO Partnerships"
          description="Collaborate with various NGOs registered on our platform for additional support."
        />
        <TrustCard
          title="Confidential & Secure"
          description="Your privacy is our priority. We ensure all consultations are confidential."
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
    <div className="bg-slate-100 p-5 rounded-lg shadow-md">
      <div className="font-bold text-xl mb-2">{title}</div>
      <div>{description}</div>
    </div>
  );
};
