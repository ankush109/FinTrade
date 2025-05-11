import React from "react";
import { AnimatePresence, motion } from "framer-motion";

function FaqSection() {
  const [showAnswer, setShowAnswer] = React.useState(null);

  const handleToggle = (index) => {
    setShowAnswer((prev) => (prev === index ? null : index));
  };

  const faqs = [
    {
      question: "What is the purpose of this application?",
      answer:
        "This application is designed to provide a seamless payment experience for users.",
    },
    {
      question: "How do I create an account?",
      answer:
        "You can create an account by clicking on the 'Sign Up' button and filling out the required information.",
    },
    {
      question: "What payment methods are accepted?",
      answer:
        "We accept various payment methods including credit cards, debit cards, and PayPal.",
    },
    {
      question: "Is my payment information secure?",
      answer:
        "Yes, we use industry-standard encryption to protect your payment information.",
    },
    {
      question: "What payment methods are accepted?",
      answer:
        "We accept various payment methods including credit cards, debit cards, and PayPal.",
    },
    {
      question: "Is my payment information secure?",
      answer:
        "Yes, we use industry-standard encryption to protect your payment information.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-5 py-10 mb-20">
      <h2 className="text-3xl text-center  font-bold mb-20">
        Frequently Asked Questions
      </h2>
      <div className="flex  gap-10">
        <div className="w-full">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b pb-4">
                <button
                  onClick={() => handleToggle(index)}
                  className="w-full text-left flex justify-between items-center"
                >
                  <h3 className="font-semibold text-lg">{faq.question}</h3>
                  <span className="text-blue-500">
                    {showAnswer === index ? "-" : "+"}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {showAnswer === index && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-gray-600 ">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
        <div className="w-1/3 bg-gray-200 p-5 rounded-lg flex flex-col items-center justify-around gap-5">
          <h3 className="text-lg font-semibold mt-10">Have more questions ?</h3>
          <p className="text-gray-600">
            If you have any other questions or need further assistance, feel
            free to reach out to our support team.
          </p>
          <button className="bg-black w-1/2 text-white p-2 rounded-lg">
            Contact
          </button>
        </div>
      </div>
    </div>
  );
}

export default FaqSection;
