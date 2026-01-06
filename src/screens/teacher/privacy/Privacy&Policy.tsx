import React from 'react';
import { ArrowLeft } from 'lucide-react';

 function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white px-8 py-5 flex items-center gap-4">
        <button className="hover:bg-blue-700 rounded-full p-2 transition">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-semibold">Privacy Policy</h1>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-white rounded-xl shadow-md p-8">
          {/* Main Heading */}
          <h2 className="text-2xl font-bold text-gray-900 mb-6">GDPR & Privacy Policy</h2>

          {/* Introduction */}
          <div className="space-y-4 text-gray-700 leading-relaxed mb-8">
            <p>
              lipsum.com is committed to protecting your privacy online. This Privacy Policy endeavours to describe to you our practices regarding the personal information we collect from users on our website, located at lipsum.com (the "Site"), and the services offered through the Site. If you have any questions about our Privacy Policy, our collection practices, the processing of user information, or if you would like to report a security violation to us directly, please contact us at help@lipsum.com
            </p>
            <p>
              Please read this policy in conjunction with the Freestar Privacy Policy
            </p>
          </div>

          {/* What Data We Collect Section */}
          <h3 className="text-xl font-bold text-gray-900 mb-4">What Data We Collect</h3>
          
          <div className="space-y-4 text-gray-700 leading-relaxed mb-8">
            <p>
              <strong>General Data:</strong> The use of our services will automatically create information that will be collected. For example, when you use our Services, your geographic location, how you use the Services, information about the type of device you use, your Open Device Identification Number, date/time stamps for your visit, your unique device identifier, your browser type, operating system, Internet Protocol (IP) address, and domain name are all collected. This information is generally used to help us deliver the most relevant information to you and administer and improve the Site.
            </p>
            <p>
              <strong>Log Files:</strong> As is true of most websites, we gather certain information automatically and store it in log files. This information includes IP addresses, browser type, Internet service provider (ISP), referring/exit pages, operating system, date/time stamp, and clickstream data. We use this information to maintain and improve the performance of the Services.
            </p>
          </div>

          {/* Analytics Section */}
          <h3 className="text-xl font-bold text-gray-900 mb-4">Analytics</h3>
          
          <div className="space-y-4 text-gray-700 leading-relaxed mb-8">
            <p>
              We use analytics services (including, but not limited to, Google Analytics) to help analyze how users use the Site. Analytics services use Cookies to collect information such as how often users visit the Site and we use the information to improve our Site and Services. The analytics services' ability to use and share information collected by them is restricted by their terms of use and privacy policy, which you should refer to for more information about how these entities use this information.
            </p>
          </div>

          {/* Location Information Section */}
          <h3 className="text-xl font-bold text-gray-900 mb-4">Location Information</h3>
          
          <div className="space-y-4 text-gray-700 leading-relaxed mb-8">
            <p>
              If you have enabled location services on your mobile device, we may collect your location information to improve the Services we offer. If you do not want this information collected, you can disable location services on your device.
            </p>
          </div>

          {/* Cookies Section */}
          <h3 className="text-xl font-bold text-gray-900 mb-4">Cookies</h3>
          
          <div className="space-y-4 text-gray-700 leading-relaxed mb-8">
            <p>
              "Cookies" are small pieces of information (text files) that a website sends to your computer's hard drive while you are viewing the website. These text files can be used by websites to make the user experience more efficient. The law states that we can store these cookies on your device if they are strictly necessary for the operation of this site. For all other types of cookies we need your permission. To that end, this site uses different types of cookies. Some cookies are placed by third party services that appear on our pages.
            </p>
            <p>
              We use both session Cookies (which expire once you close your web browser) and persistent Cookies (which stay on your computer until you delete them). You have the ability to accept or decline Cookies. Most web browsers automatically accept Cookies, but you can usually modify your browser setting to decline Cookies if you prefer. If you choose to decline Cookies, you may not be able to sign in or use other interactive features of our websites and Services that depend on Cookies.
            </p>
          </div>

          {/* How We Use Information Section */}
          <h3 className="text-xl font-bold text-gray-900 mb-4">How We Use Information</h3>
          
          <div className="space-y-4 text-gray-700 leading-relaxed mb-8">
            <p>
              We use the information we collect in the following ways:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide, operate, maintain, and improve our Services</li>
              <li>To enable you to access and use the Services</li>
              <li>To process and complete transactions, and send you related information</li>
              <li>To send transactional messages, including responses to your comments, questions, and requests</li>
              <li>To send promotional communications, such as providing you with information about services, features, surveys, newsletters, offers, and events</li>
              <li>To monitor and analyze trends, usage, and activities in connection with our Services</li>
              <li>To detect, prevent, and address technical issues and illegal activities</li>
            </ul>
          </div>

          {/* Data Security Section */}
          <h3 className="text-xl font-bold text-gray-900 mb-4">Data Security</h3>
          
          <div className="space-y-4 text-gray-700 leading-relaxed mb-8">
            <p>
              We take the security of your personal information seriously and use appropriate technical and organizational measures to protect your personal information against unauthorized or unlawful processing and against accidental loss, destruction, or damage. However, please note that no method of transmission over the Internet or method of electronic storage is 100% secure.
            </p>
          </div>

          {/* Your Rights Section */}
          <h3 className="text-xl font-bold text-gray-900 mb-4">Your Rights</h3>
          
          <div className="space-y-4 text-gray-700 leading-relaxed mb-8">
            <p>
              Under the General Data Protection Regulation (GDPR), you have certain rights regarding your personal information, including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The right to access your personal information</li>
              <li>The right to rectification of inaccurate personal information</li>
              <li>The right to erasure of your personal information</li>
              <li>The right to restrict processing of your personal information</li>
              <li>The right to data portability</li>
              <li>The right to object to processing of your personal information</li>
            </ul>
          </div>

          {/* Contact Section */}
          <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Us</h3>
          
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p>
              <strong>Email:</strong> help@lipsum.com<br />
              <strong>Website:</strong> www.lipsum.com
            </p>
            <p className="text-sm text-gray-600 mt-8">
              Last Updated: January 2026
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PrivacyPolicyPage;