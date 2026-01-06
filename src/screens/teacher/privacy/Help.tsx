import React from 'react';
import { ChevronRight, CreditCard, GraduationCap, BookOpen, LogIn } from 'lucide-react';

function HelpPage() {
  const helpCategories = [
    {
      icon: <CreditCard className="text-blue-600" size={24} />,
      title: "Fee & Payment Issues",
      description: "Get help with fee details, payment history, receipts, or report any payment-related problems.",
      link: "Help Center"
    },
    {
      icon: <GraduationCap className="text-blue-600" size={24} />,
      title: "Teacher / Class Issues",
      description: "Raise concerns related to teachers, class timings, subjects, or classroom activities.",
      link: "Help Center"
    },
    {
      icon: <BookOpen className="text-blue-600" size={24} />,
      title: "Homework / Exam Issues",
      description: "Get help with homework uploads, exam schedules, results, or study materials.",
      link: "Help Center"
    },
    {
      icon: <LogIn className="text-blue-600" size={24} />,
      title: "Login & App Issues",
      description: "Report problems with login, password, app access, or technical errors.",
      link: "Help Center"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white px-8 py-6">
        <h1 className="text-3xl font-bold">Help & Support</h1>
        <p className="text-blue-100 mt-2">We're here to help you with any issues or questions</p>
      </div>

      {/* Help Categories */}
      <div className="p-8 max-w-5xl">
        <div className="grid gap-6">
          {helpCategories.map((category, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  {category.icon}
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {category.description}
                  </p>
                  <button className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 text-sm">
                    {category.link}
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Help Section */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Can't find what you're looking for?
          </h3>
          <p className="text-gray-700 mb-4">
            Our support team is here to help you. Contact us directly for personalized assistance.
          </p>
          <button className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition font-medium">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};
export default HelpPage;