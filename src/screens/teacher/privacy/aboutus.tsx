import React from 'react';
import { ChevronLeft, Mail } from 'lucide-react';

 function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <button className="hover:bg-blue-700 p-2 rounded-lg transition">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl font-semibold">About Us</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8">
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">About Us</h2>
          
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              lipsum.com is committed to protecting your privacy online. This Privacy Policy endeavours to describe to you our practices regarding the personal information we collect from users on www.lipsum.com (the "Site"), and the services offered through the Site. If you have any questions about our Privacy Policy, our collection practices, the processing of user information, or if you would like to report a security violation to us directly, please contact us at{' '}
              <a href="mailto:help@lipsum.com" className="text-blue-600 hover:underline inline-flex items-center gap-1">
                help@lipsum.com
                <Mail size={14} />
              </a>
            </p>

            <p className="font-semibold text-gray-900 mt-6">
              Please read this policy in conjunction with the Freestar Privacy Policy
            </p>

            <div className="mt-6">
              <h3 className="font-semibold text-gray-900 mb-3">General Data:</h3>
              <p>
                The use of our services will automatically create information that will be collected. For example, when you use our Services, your geographic location, how you use the Services, information about the type of device you use, your Open Device Identification Number, date/time stamps for your visit, your unique device identifier, your browser type, operating system, Internet Protocol (IP) address, and domain name are all collected. This information is generally used to help us deliver the most relevant information to you and administer and improve the Site.
              </p>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold text-gray-900 mb-3">Log Files:</h3>
              <p>
                As is true of most websites, we gather certain information automatically and store it in log files. This information includes IP addresses, browser type, Internet service provider (ISP), referring/exit pages, operating system, date/time stamps, and clickstream data. We use this information to analyze trends, administer the Site, track user movements around the Site, and gather demographic information about our user base.
              </p>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">Note:</span> This privacy policy is designed to protect your data and ensure transparency in how we handle your information.
              </p>
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-6 bg-white rounded-lg shadow-sm p-6 md:p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Us</h3>
          <p className="text-gray-700 mb-4">
            If you have any concerns or questions regarding the protection of your privacy and data, please don't hesitate to reach out to us.
          </p>
          <a 
            href="mailto:help@lipsum.com"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            <Mail size={18} />
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};
export default AboutUsPage;