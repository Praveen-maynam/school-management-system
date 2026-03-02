import React, { useState } from 'react';

interface Module {
  id: string;
  name: string;
  description: string;
  icon: string;
  basePrice: number;
  features: string[];
  category: 'core' | 'optional' | 'premium';
}

interface Plan {
  id: string;
  name: string;
  description: string;
  maxStudents: number;
  maxStaff: number;
  basePrice: number;
  discount: number;
  recommended?: boolean;
}

const modules: Module[] = [
  {
    id: 'student-management',
    name: 'Student Management',
    description: 'Complete student information system',
    icon: '👨‍🎓',
    basePrice: 299,
    category: 'core',
    features: ['Student profiles', 'Enrollment tracking', 'Document management', 'Student reports']
  },
  {
    id: 'attendance',
    name: 'Attendance Tracking',
    description: 'Automated attendance system',
    icon: '📋',
    basePrice: 199,
    category: 'core',
    features: ['Daily attendance', 'Absence notifications', 'Attendance reports', 'Parent alerts']
  },
  {
    id: 'gradebook',
    name: 'Gradebook & Assessment',
    description: 'Grade management and reporting',
    icon: '📊',
    basePrice: 249,
    category: 'core',
    features: ['Grade entry', 'Report cards', 'Progress tracking', 'Grade analytics']
  },
  {
    id: 'timetable',
    name: 'Timetable Management',
    description: 'Schedule and class management',
    icon: '📅',
    basePrice: 179,
    category: 'optional',
    features: ['Class scheduling', 'Room allocation', 'Teacher assignments', 'Schedule conflicts']
  },
  {
    id: 'fee-management',
    name: 'Fee Management',
    description: 'Complete fee collection system',
    icon: '💰',
    basePrice: 349,
    category: 'optional',
    features: ['Fee structure', 'Payment tracking', 'Invoicing', 'Payment reminders']
  },
  {
    id: 'library',
    name: 'Library Management',
    description: 'Digital library system',
    icon: '📚',
    basePrice: 149,
    category: 'optional',
    features: ['Book catalog', 'Issue/return', 'Fine management', 'Digital resources']
  },
  {
    id: 'transport',
    name: 'Transport Management',
    description: 'Fleet and route tracking',
    icon: '🚌',
    basePrice: 229,
    category: 'optional',
    features: ['Route planning', 'Vehicle tracking', 'Driver management', 'GPS integration']
  },
  {
    id: 'hostel',
    name: 'Hostel Management',
    description: 'Accommodation management',
    icon: '🏠',
    basePrice: 199,
    category: 'optional',
    features: ['Room allocation', 'Mess management', 'Visitor tracking', 'Hostel fees']
  },
  {
    id: 'hr-payroll',
    name: 'HR & Payroll',
    description: 'Staff management system',
    icon: '👔',
    basePrice: 399,
    category: 'premium',
    features: ['Staff profiles', 'Payroll processing', 'Leave management', 'Performance tracking']
  },
  {
    id: 'parent-portal',
    name: 'Parent Portal',
    description: 'Parent communication platform',
    icon: '👨‍👩‍👧',
    basePrice: 179,
    category: 'premium',
    features: ['Parent login', 'Real-time updates', 'Communication', 'Progress reports']
  },
  {
    id: 'exam-management',
    name: 'Exam Management',
    description: 'Complete examination system',
    icon: '📝',
    basePrice: 279,
    category: 'premium',
    features: ['Exam scheduling', 'Question bank', 'Result processing', 'Analytics']
  },
  {
    id: 'online-classes',
    name: 'Online Classes',
    description: 'Virtual classroom integration',
    icon: '💻',
    basePrice: 449,
    category: 'premium',
    features: ['Video conferencing', 'Recording', 'Assignment submission', 'Virtual whiteboard']
  }
];

const plans: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'For small schools',
    maxStudents: 500,
    maxStaff: 50,
    basePrice: 0,
    discount: 0
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'For growing institutions',
    maxStudents: 2000,
    maxStaff: 200,
    basePrice: 200,
    discount: 10,
    recommended: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For large schools',
    maxStudents: 10000,
    maxStaff: 1000,
    basePrice: 500,
    discount: 20
  }
];

const SchoolSubscription: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>('professional');
  const [selectedModules, setSelectedModules] = useState<Set<string>>(new Set([
    'student-management',
    'attendance',
    'gradebook'
  ]));
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  const toggleModule = (moduleId: string) => {
    const newSelected = new Set(selectedModules);
    if (newSelected.has(moduleId)) {
      newSelected.delete(moduleId);
    } else {
      newSelected.add(moduleId);
    }
    setSelectedModules(newSelected);
  };

  const calculateTotal = (): number => {
    const plan = plans.find(p => p.id === selectedPlan);
    if (!plan) return 0;

    let modulesTotal = 0;
    selectedModules.forEach(moduleId => {
      const module = modules.find(m => m.id === moduleId);
      if (module) {
        modulesTotal += module.basePrice;
      }
    });

    const subtotal = plan.basePrice + modulesTotal;
    const discountAmount = (subtotal * plan.discount) / 100;
    const totalAfterDiscount = subtotal - discountAmount;

    if (billingCycle === 'annual') {
      return totalAfterDiscount * 12 * 0.85; // 15% discount for annual
    }

    return totalAfterDiscount;
  };

  const getModulesByCategory = (category: 'core' | 'optional' | 'premium') => {
    return modules.filter(m => m.category === category);
  };

  const currentPlan = plans.find(p => p.id === selectedPlan);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-6 px-2 sm:px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4">
            School Management System
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Choose your plan and select the modules you need. Build a customized solution for your institution.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8 md:mb-12">
          <div className="flex flex-col md:flex-row items-center justify-center md:space-x-4 space-y-4 md:space-y-0">
            {[
              { num: 1, label: 'Select Plan' },
              { num: 2, label: 'Choose Modules' },
              { num: 3, label: 'Review & Subscribe' }
            ].map((step) => (
              <div key={step.num} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${
                  currentStep >= step.num
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step.num}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  currentStep >= step.num ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  {step.label}
                </span>
                {step.num < 3 && (
                  <div className={`w-16 h-1 mx-4 ${
                    currentStep > step.num ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Plan Selection */}
        {currentStep === 1 && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
              Select Your Institution Plan
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`relative rounded-2xl bg-white p-8 cursor-pointer transition-all duration-300 ${
                    selectedPlan === plan.id
                      ? 'ring-4 ring-blue-500 shadow-2xl scale-105'
                      : 'shadow-lg hover:shadow-xl hover:scale-102'
                  } ${plan.recommended ? 'border-2 border-blue-300' : ''}`}
                >
                  {plan.recommended && (
                    <div className="absolute -top-4 left-0 right-0 flex justify-center">
                      <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-semibold shadow-lg">
                        RECOMMENDED
                      </span>
                    </div>
                  )}

                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 text-sm mb-6">{plan.description}</p>
                    
                    <div className="mb-6">
                      <div className="text-4xl font-extrabold text-blue-600">
                        ${plan.basePrice}
                      </div>
                      <div className="text-sm text-gray-500">base fee/month</div>
                    </div>

                    <div className="space-y-3 text-left">
                      <div className="flex items-center text-sm">
                        <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Up to {plan.maxStudents.toLocaleString()} students</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Up to {plan.maxStaff} staff members</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>{plan.discount}% discount on modules</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-6 md:mt-8">
              <button
                onClick={() => setCurrentStep(2)}
                className="bg-blue-600 text-white px-6 md:px-8 py-2 md:py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg w-full max-w-xs"
              >
                Continue to Modules
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Module Selection */}
        {currentStep === 2 && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Select Modules for Your School
              </h2>
              <p className="text-gray-600">
                Choose the features you need. You can add or remove modules anytime.
              </p>
            </div>

            {/* Core Modules */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-3">Core</span>
                Essential Modules
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {getModulesByCategory('core').map((module) => (
                  <div
                    key={module.id}
                    onClick={() => toggleModule(module.id)}
                    className={`bg-white rounded-xl p-6 cursor-pointer transition-all duration-300 ${
                      selectedModules.has(module.id)
                        ? 'ring-2 ring-blue-500 shadow-lg'
                        : 'shadow hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-4xl">{module.icon}</div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedModules.has(module.id)}
                          onChange={() => {}}
                          className="w-5 h-5 text-blue-600 rounded"
                        />
                      </div>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-1">{module.name}</h4>
                    <p className="text-sm text-gray-600 mb-3">{module.description}</p>
                    <div className="text-blue-600 font-bold">${module.basePrice}/month</div>
                    <ul className="mt-3 space-y-1">
                      {module.features.slice(0, 2).map((feature, idx) => (
                        <li key={idx} className="text-xs text-gray-500 flex items-center">
                          <svg className="w-3 h-3 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Optional Modules */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm mr-3">Optional</span>
                Enhanced Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                {getModulesByCategory('optional').map((module) => (
                  <div
                    key={module.id}
                    onClick={() => toggleModule(module.id)}
                    className={`bg-white rounded-xl p-6 cursor-pointer transition-all duration-300 ${
                      selectedModules.has(module.id)
                        ? 'ring-2 ring-purple-500 shadow-lg'
                        : 'shadow hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-4xl">{module.icon}</div>
                      <input
                        type="checkbox"
                        checked={selectedModules.has(module.id)}
                        onChange={() => {}}
                        className="w-5 h-5 text-purple-600 rounded"
                      />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-1">{module.name}</h4>
                    <p className="text-sm text-gray-600 mb-3">{module.description}</p>
                    <div className="text-purple-600 font-bold">${module.basePrice}/month</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Premium Modules */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm mr-3">Premium</span>
                Advanced Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                {getModulesByCategory('premium').map((module) => (
                  <div
                    key={module.id}
                    onClick={() => toggleModule(module.id)}
                    className={`bg-white rounded-xl p-6 cursor-pointer transition-all duration-300 ${
                      selectedModules.has(module.id)
                        ? 'ring-2 ring-amber-500 shadow-lg'
                        : 'shadow hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-4xl">{module.icon}</div>
                      <input
                        type="checkbox"
                        checked={selectedModules.has(module.id)}
                        onChange={() => {}}
                        className="w-5 h-5 text-amber-600 rounded"
                      />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-1">{module.name}</h4>
                    <p className="text-sm text-gray-600 mb-3">{module.description}</p>
                    <div className="text-amber-600 font-bold">${module.basePrice}/month</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between mt-6 md:mt-8 space-y-3 md:space-y-0 md:space-x-4">
              <button
                onClick={() => setCurrentStep(1)}
                className="bg-gray-200 text-gray-700 px-6 md:px-8 py-2 md:py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors w-full md:w-auto"
              >
                Back to Plans
              </button>
              <button
                onClick={() => setCurrentStep(3)}
                className="bg-blue-600 text-white px-6 md:px-8 py-2 md:py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg w-full md:w-auto"
              >
                Review & Subscribe
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Review & Subscribe */}
        {currentStep === 3 && currentPlan && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
              Review Your Subscription
            </h2>

            <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-8">
              {/* Billing Cycle Toggle */}
              <div className="flex justify-center items-center mb-8 pb-8 border-b">
                <span className={`text-sm font-medium mr-3 ${billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-500'}`}>
                  Monthly Billing
                </span>
                <button
                  onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
                  className="relative inline-flex h-7 w-14 items-center rounded-full bg-gray-200 transition-colors"
                >
                  <span className={`inline-block h-5 w-5 transform rounded-full bg-blue-600 shadow-lg transition-transform ${
                    billingCycle === 'annual' ? 'translate-x-8' : 'translate-x-1'
                  }`} />
                </button>
                <span className={`text-sm font-medium ml-3 ${billingCycle === 'annual' ? 'text-gray-900' : 'text-gray-500'}`}>
                  Annual Billing
                </span>
                {billingCycle === 'annual' && (
                  <span className="ml-3 bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                    Save 15%
                  </span>
                )}
              </div>

              {/* Selected Plan */}
              <div className="mb-6">
                <h3 className="font-bold text-gray-900 mb-3">Selected Plan</h3>
                <div className="bg-blue-50 rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-gray-900">{currentPlan.name} Plan</div>
                    <div className="text-sm text-gray-600">
                      Up to {currentPlan.maxStudents.toLocaleString()} students, {currentPlan.maxStaff} staff
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-blue-600">${currentPlan.basePrice}/month</div>
                    {currentPlan.discount > 0 && (
                      <div className="text-xs text-green-600">{currentPlan.discount}% module discount</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Selected Modules */}
              <div className="mb-6">
                <h3 className="font-bold text-gray-900 mb-3">Selected Modules ({selectedModules.size})</h3>
                <div className="space-y-2">
                  {Array.from(selectedModules).map(moduleId => {
                    const module = modules.find(m => m.id === moduleId);
                    if (!module) return null;
                    
                    const discountedPrice = module.basePrice * (1 - currentPlan.discount / 100);
                    
                    return (
                      <div key={moduleId} className="flex justify-between items-center bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">{module.icon}</span>
                          <div>
                            <div className="font-medium text-gray-900">{module.name}</div>
                            <div className="text-xs text-gray-500">{module.description}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          {currentPlan.discount > 0 && (
                            <div className="text-xs text-gray-400 line-through">${module.basePrice}</div>
                          )}
                          <div className="font-semibold text-gray-900">
                            ${discountedPrice.toFixed(0)}/month
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="border-t pt-6">
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Plan Base Fee</span>
                    <span>${currentPlan.basePrice}/month</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Modules ({selectedModules.size})</span>
                    <span>
                      ${Array.from(selectedModules).reduce((sum, id) => {
                        const module = modules.find(m => m.id === id);
                        return sum + (module ? module.basePrice : 0);
                      }, 0)}
                      /month
                    </span>
                  </div>
                  {currentPlan.discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Module Discount ({currentPlan.discount}%)</span>
                      <span>
                        -${(Array.from(selectedModules).reduce((sum, id) => {
                          const module = modules.find(m => m.id === id);
                          return sum + (module ? module.basePrice : 0);
                        }, 0) * currentPlan.discount / 100).toFixed(0)}
                      </span>
                    </div>
                  )}
                  {billingCycle === 'annual' && (
                    <div className="flex justify-between text-green-600">
                      <span>Annual Billing Discount (15%)</span>
                      <span>-${(calculateTotal() / 0.85 * 0.15).toFixed(0)}</span>
                    </div>
                  )}
                  <div className="border-t pt-3 flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-900">Total</span>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-blue-600">
                        ${calculateTotal().toFixed(0)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {billingCycle === 'monthly' ? 'per month' : 'per year'}
                      </div>
                      {billingCycle === 'annual' && (
                        <div className="text-xs text-gray-500">
                          (${(calculateTotal() / 12).toFixed(0)}/month)
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 md:mt-8 space-y-3">
                <button className="w-full bg-blue-600 text-white py-3 md:py-4 rounded-lg font-bold text-base md:text-lg hover:bg-blue-700 transition-colors shadow-lg">
                  Subscribe Now
                </button>
                <button
                  onClick={() => setCurrentStep(2)}
                  className="w-full bg-gray-100 text-gray-700 py-2 md:py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  Modify Selection
                </button>
              </div>

              {/* Additional Info */}
              <div className="mt-6 text-center text-sm text-gray-500">
                <p>✓ 30-day money-back guarantee</p>
                <p>✓ Free setup and onboarding</p>
                <p>✓ 24/7 customer support</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SchoolSubscription;