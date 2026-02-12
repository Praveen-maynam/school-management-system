import React, { useState, useRef } from 'react';
import { X } from 'lucide-react';

interface SchoolFormData {
  name: string;
  logo: File | null;
  schoolEmail: string;
  schoolPhone: string;
  tagline: string;
  address: string;
  schoolCodePrefix: string;
  domainType: 'default' | 'custom';
  defaultDomain: string;
  emergencyContact: string;
}

interface FormErrors {
  [key: string]: string;
}

interface CreateSchoolProps {
  onClose: () => void;
}

const CreateSchool: React.FC<CreateSchoolProps> = ({ onClose }) => {
  const [formData, setFormData] = useState<SchoolFormData>({
    name: '',
    logo: null,
    schoolEmail: '',
    schoolPhone: '',
    tagline: '',
    address: '',
    schoolCodePrefix: 'SCH',
    domainType: 'default',
    defaultDomain: '',
    emergencyContact: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [generatedCode, setGeneratedCode] = useState('2026219');
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[\d\s\-+()]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, logo: 'File size should not exceed 5MB' }));
        return;
      }
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, logo: 'Please upload an image file' }));
        return;
      }
      setFormData(prev => ({ ...prev, logo: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setErrors(prev => ({ ...prev, logo: '' }));
    }
  };

  const handleDomainTypeChange = (type: 'default' | 'custom') => {
    setFormData(prev => ({ ...prev, domainType: type }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'School name is required';
    }
    if (!formData.schoolEmail.trim()) {
      newErrors.schoolEmail = 'School email is required';
    } else if (!validateEmail(formData.schoolEmail)) {
      newErrors.schoolEmail = 'Please enter a valid email address';
    }
    if (!formData.schoolPhone.trim()) {
      newErrors.schoolPhone = 'School phone is required';
    } else if (!validatePhone(formData.schoolPhone)) {
      newErrors.schoolPhone = 'Please enter a valid phone number';
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      // Handle form submission logic here
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      logo: null,
      schoolEmail: '',
      schoolPhone: '',
      tagline: '',
      address: '',
      schoolCodePrefix: 'SCH',
      domainType: 'default',
      defaultDomain: '',
      emergencyContact: '',
    });
    setLogoPreview(null);
    setErrors({});
    setGeneratedCode(Math.floor(1000000 + Math.random() * 9000000).toString());
  };

  // Modal wrapper
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-4 sm:p-8 relative flex flex-col max-h-[95vh] overflow-y-auto touch-manipulation">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 p-3 sm:p-2 rounded hover:bg-gray-100 focus:outline-none active:bg-gray-200"
          aria-label="Close"
        >
          <X className="w-7 h-7 sm:w-6 sm:h-6 text-gray-500" />
        </button>
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6 sm:mb-8">Create Schools</h1>
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Schools"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
              )}
            </div>
            {/* Logo Upload */}
            <div>
              <label htmlFor="logo" className="block text-sm font-medium text-gray-700 mb-2">
                Logo <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    readOnly
                    value={formData.logo?.name || ''}
                    placeholder="Logo"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed text-sm"
                  />
                  {logoPreview && (
                    <img
                      src={logoPreview}
                      alt="Logo preview"
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 object-cover rounded"
                    />
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium text-sm active:scale-95"
                >
                  Upload
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
              </div>
              {errors.logo && (
                <p className="mt-1 text-sm text-red-500">{errors.logo}</p>
              )}
            </div>
            {/* School Email */}
            <div>
              <label htmlFor="schoolEmail" className="block text-sm font-medium text-gray-700 mb-2">
                School Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="schoolEmail"
                name="schoolEmail"
                value={formData.schoolEmail}
                onChange={handleInputChange}
                placeholder="Support Email"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm ${
                  errors.schoolEmail ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.schoolEmail && (
                <p className="mt-1 text-sm text-red-500">{errors.schoolEmail}</p>
              )}
            </div>
            {/* School Phone */}
            <div>
              <label htmlFor="schoolPhone" className="block text-sm font-medium text-gray-700 mb-2">
                School Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="schoolPhone"
                name="schoolPhone"
                value={formData.schoolPhone}
                onChange={handleInputChange}
                placeholder="Support Phone"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm ${
                  errors.schoolPhone ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.schoolPhone && (
                <p className="mt-1 text-sm text-red-500">{errors.schoolPhone}</p>
              )}
            </div>
            {/* Tagline */}
            <div>
              <label htmlFor="tagline" className="block text-sm font-medium text-gray-700 mb-2">
                Tagline <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="tagline"
                name="tagline"
                value={formData.tagline}
                onChange={handleInputChange}
                placeholder="Tagline"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm"
              />
            </div>
            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Address"
                  rows={3}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none text-sm ${
                    errors.address ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <div className="absolute right-3 top-3 flex flex-col gap-2">
                 
               
                
                  
                 
                </div>
              </div>
              {errors.address && (
                <p className="mt-1 text-sm text-red-500">{errors.address}</p>
              )}
            </div>
          </div>
          {/* School Code Prefix */}
          <div className="mt-4 sm:mt-6">
            <label htmlFor="schoolCodePrefix" className="block text-sm font-medium text-gray-700 mb-2">
              School Code Prefix <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
              <input
                type="text"
                id="schoolCodePrefix"
                name="schoolCodePrefix"
                value={formData.schoolCodePrefix}
                onChange={handleInputChange}
                placeholder="SCH"
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm"
              />
              <div className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 flex items-center text-gray-700 text-sm">
                {generatedCode}
              </div>
            </div>
          </div>
          {/* Domain Type */}
          <div className="mt-4 sm:mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Domain Type <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-4 sm:gap-6 flex-wrap">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="domainType"
                  value="default"
                  checked={formData.domainType === 'default'}
                  onChange={() => handleDomainTypeChange('default')}
                  className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-2 focus:ring-purple-500"
                />
                <span className="ml-2 text-gray-700">Default</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="domainType"
                  value="custom"
                  checked={formData.domainType === 'custom'}
                  onChange={() => handleDomainTypeChange('custom')}
                  className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-2 focus:ring-purple-500"
                />
                <span className="ml-2 text-gray-700">Custom</span>
              </label>
            </div>
          </div>
          {/* Default Domain */}
          <div className="mt-4 sm:mt-6">
            <label htmlFor="defaultDomain" className="block text-sm font-medium text-gray-700 mb-2">
              Domain
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 items-center">
              <input
                type="text"
                id="defaultDomain"
                name="defaultDomain"
                value={formData.defaultDomain}
                onChange={handleInputChange}
                placeholder={formData.domainType === 'default' ? 'myschool' : 'customdomain'}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm"
                disabled={formData.domainType === 'default'}
              />
              {formData.domainType === 'custom' && (
                <div className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 flex items-center text-gray-600 text-sm">
                  .eschool-saas.wrteam.me
                </div>
              )}
            </div>
            {formData.domainType === 'default' && (
              <p className="text-xs text-gray-500 mt-2">Default domain will be auto-generated and does not require input.</p>
            )}
          </div>
          {/* Emergency Contact */}
          <div className="mt-4 sm:mt-6">
            <label htmlFor="emergencyContact" className="block text-sm font-medium text-gray-700 mb-2">
              Emergency Contact
            </label>
            <div className="relative inline-block w-full">
              <input
                type="text"
                id="emergencyContact"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleInputChange}
                placeholder="Emergency Contact"
                className="w-full px-3 py-2 pr-16 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm"
              />
              {formData.emergencyContact && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">
                  {formData.emergencyContact}
                </span>
              )}
            </div>
          </div>
          {/* Form Actions */}
          <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm active:scale-95"
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium text-sm active:scale-95"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSchool;