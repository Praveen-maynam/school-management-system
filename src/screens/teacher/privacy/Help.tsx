import React from 'react';
import { ChevronRight, CreditCard, GraduationCap, BookOpen, LogIn, ArrowLeft, MessageCircle, Phone, Mail } from 'lucide-react';

function HelpPage() {
  const helpCategories = [
    {
      icon: <CreditCard className="text-blue-600" size={28} />,
      title: "Fee & Payment Issues",
      description: "Get help with fee details, payment history, receipts, or report any payment-related problems.",
      link: "Get Help Now",
      gradient: "from-blue-50 to-cyan-50"
    },
    {
      icon: <GraduationCap className="text-purple-600" size={28} />,
      title: "Teacher / Class Issues",
      description: "Raise concerns related to teachers, class timings, subjects, or classroom activities.",
      link: "Get Help Now",
      gradient: "from-purple-50 to-pink-50"
    },
    {
      icon: <BookOpen className="text-green-600" size={28} />,
      title: "Homework / Exam Issues",
      description: "Get help with homework uploads, exam schedules, results, or study materials.",
      link: "Get Help Now",
      gradient: "from-green-50 to-emerald-50"
    },
    {
      icon: <LogIn className="text-orange-600" size={28} />,
      title: "Login & App Issues",
      description: "Report problems with login, password, app access, or technical errors.",
      link: "Get Help Now",
      gradient: "from-orange-50 to-amber-50"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-8 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <button className="p-2 hover:bg-blue-700 rounded-lg transition">
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-3xl font-bold">Help & Support</h1>
              <p className="text-blue-100 mt-1">We're here to help you with any issues or questions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Quick Stats Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-blue-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <MessageCircle className="text-blue-600" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">24/7</p>
                <p className="text-sm text-gray-600">Support Available</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-5 shadow-sm border border-green-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Phone className="text-green-600" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">&lt;2 min</p>
                <p className="text-sm text-gray-600">Avg Response Time</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-5 shadow-sm border border-purple-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Mail className="text-purple-600" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">98%</p>
                <p className="text-sm text-gray-600">Issue Resolution</p>
              </div>
            </div>
          </div>
        </div>

        {/* Help Categories Title */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">How can we help you?</h2>
          <p className="text-gray-600">Choose a category below to get started</p>
        </div>

        {/* Help Categories Grid */}
        <div className="grid gap-6 mb-8">
          {helpCategories.map((category, index) => (
            <div 
              key={index}
              className="group bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
            >
              <div className={`bg-gradient-to-r ${category.gradient} p-6`}>
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    {category.icon}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                      {category.description}
                    </p>
                    <button className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all text-sm bg-white px-4 py-2 rounded-lg shadow-sm">
                      {category.link}
                      <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Support Card */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 shadow-xl text-white relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-24 -mb-24"></div>
          
          <div className="relative z-10">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 bg-white bg-opacity-20 rounded-xl flex items-center justify-center flex-shrink-0">
                <MessageCircle className="text-white" size={28} />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">
                  Still Need Help?
                </h3>
                <p className="text-blue-100 leading-relaxed">
                  Our dedicated support team is available 24/7 to assist you. Get personalized help for any issue you're facing.
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-xl hover:bg-blue-50 transition font-semibold shadow-lg flex items-center gap-2">
                <MessageCircle size={20} />
                Live Chat Support
              </button>
              <button className="bg-blue-500 text-white px-8 py-3 rounded-xl hover:bg-blue-400 transition font-semibold flex items-center gap-2">
                <Mail size={20} />
                Email Us
              </button>
            </div>
          </div>
        </div>

        {/* FAQ Quick Links */}
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              "How do I reset my password?",
              "How to download fee receipts?",
              "How to contact my teacher?",
              "Where can I see exam results?"
            ].map((faq, idx) => (
              <button key={idx} className="text-left px-4 py-3 rounded-lg hover:bg-blue-50 transition text-sm text-gray-700 hover:text-blue-600 flex items-center justify-between group">
                <span>{faq}</span>
                <ChevronRight size={16} className="text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HelpPage;