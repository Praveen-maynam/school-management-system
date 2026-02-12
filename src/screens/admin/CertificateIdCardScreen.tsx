
import React, { useState, useRef, useEffect } from 'react';
import {
  Award, CreditCard, Download, Printer, Search, Filter,
  Eye, Edit, Trash2, Plus, Calendar, User, GraduationCap,
  MapPin, Phone, Mail, Check, X, Star, Shield, Camera,
  Save, Copy, FileText, Image as ImageIcon, Sparkles,
  Users, BookOpen, ChevronDown, Settings, Upload
} from 'lucide-react';

// ========== TYPES ==========

interface Student {
  id: number;
  name: string;
  studentId: string;
  class: string;
  section: string;
  rollNumber: string;
  dateOfBirth: string;
  bloodGroup: string;
  address: string;
  phone: string;
  parentPhone: string;
  email: string;
  photo?: string;
  admissionDate: string;
  validUntil: string;
}

interface Certificate {
  id: string;
  type: 'achievement' | 'participation' | 'merit' | 'completion' | 'appreciation';
  studentName: string;
  studentId: string;
  class: string;
  title: string;
  description: string;
  date: string;
  signatory: string;
  signatoryTitle: string;
  certificateNumber: string;
  templateId: string;
}

interface IDCard {
  id: string;
  studentId: number;
  validFrom: string;
  validUntil: string;
  cardNumber: string;
  templateId: string;
}

// ========== MOCK DATA ==========

const MOCK_STUDENTS: Student[] = [
  {
    id: 1,
    name: 'Emma Thompson',
    studentId: 'STU2024001',
    class: '10th',
    section: 'A',
    rollNumber: '15',
    dateOfBirth: '2010-05-15',
    bloodGroup: 'A+',
    address: '123 Oak Street, Downtown',
    phone: '+1234567890',
    parentPhone: '+1234567899',
    email: 'emma.t@school.edu',
    admissionDate: '2023-04-01',
    validUntil: '2025-03-31',
  },
  {
    id: 2,
    name: 'Liam Chen',
    studentId: 'STU2024002',
    class: '11th',
    section: 'B',
    rollNumber: '08',
    dateOfBirth: '2009-08-22',
    bloodGroup: 'O+',
    address: '456 Pine Avenue, Eastside',
    phone: '+1234567891',
    parentPhone: '+1234567898',
    email: 'liam.c@school.edu',
    admissionDate: '2023-04-01',
    validUntil: '2025-03-31',
  },
];

const CERTIFICATE_TEMPLATES = [
  { id: 'classic', name: 'Classic Gold', style: 'traditional' },
  { id: 'modern', name: 'Modern Blue', style: 'contemporary' },
  { id: 'elegant', name: 'Elegant Purple', style: 'refined' },
  { id: 'vibrant', name: 'Vibrant Green', style: 'energetic' },
];

const ID_CARD_TEMPLATES = [
  { id: 'standard', name: 'Standard Design', orientation: 'vertical' },
  { id: 'professional', name: 'Professional', orientation: 'vertical' },
  { id: 'modern', name: 'Modern Minimalist', orientation: 'vertical' },
  { id: 'horizontal', name: 'Horizontal Layout', orientation: 'horizontal' },
];

// ========== CERTIFICATE TEMPLATES ==========

const CertificateTemplate: React.FC<{ certificate: Certificate; template: string }> = ({ certificate, template }) => {
  const templates: { [key: string]: React.ReactNode } = {
    classic: (
      <div className="w-[297mm] h-[210mm] bg-white p-12 relative overflow-hidden print:m-0" style={{ aspectRatio: '1.414/1' }}>
        {/* Ornate Border */}
        <div className="absolute inset-4 border-8 border-double border-amber-600"></div>
        <div className="absolute inset-8 border-2 border-amber-400"></div>
        
        {/* Corner Ornaments */}
        <div className="absolute top-6 left-6 w-24 h-24 border-l-4 border-t-4 border-amber-600"></div>
        <div className="absolute top-6 right-6 w-24 h-24 border-r-4 border-t-4 border-amber-600"></div>
        <div className="absolute bottom-6 left-6 w-24 h-24 border-l-4 border-b-4 border-amber-600"></div>
        <div className="absolute bottom-6 right-6 w-24 h-24 border-r-4 border-b-4 border-amber-600"></div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: 'radial-gradient(circle, #d97706 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}></div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-20">
          {/* Header */}
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-amber-400 to-amber-700 rounded-full flex items-center justify-center">
              <Award className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl font-serif font-bold text-amber-900 mb-2">
              Certificate of {certificate.type.charAt(0).toUpperCase() + certificate.type.slice(1)}
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto"></div>
          </div>

          {/* Body */}
          <div className="my-8 space-y-6">
            <p className="text-xl text-gray-700 font-light">This is to certify that</p>
            <h2 className="text-5xl font-serif font-bold text-gray-900 border-b-2 border-amber-600 pb-2 px-8 inline-block">
              {certificate.studentName}
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
              {certificate.description}
            </p>
          </div>

          {/* Footer */}
          <div className="mt-auto pt-8 flex justify-between w-full">
            <div className="text-left">
              <p className="text-sm text-gray-600 mb-1">Date: {new Date(certificate.date).toLocaleDateString()}</p>
              <p className="text-xs text-gray-500">Certificate No: {certificate.certificateNumber}</p>
            </div>
            <div className="text-center border-t-2 border-gray-800 pt-2 px-8">
              <p className="font-semibold text-gray-900">{certificate.signatory}</p>
              <p className="text-sm text-gray-600">{certificate.signatoryTitle}</p>
            </div>
          </div>
        </div>
      </div>
    ),

    modern: (
      <div className="w-[297mm] h-[210mm] bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-12 relative overflow-hidden print:m-0">
        {/* Modern Geometric Shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-indigo-600/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-indigo-500/10 to-blue-600/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        
        {/* Accent Lines */}
        <div className="absolute top-16 left-12 w-32 h-1 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
        <div className="absolute top-20 left-12 w-24 h-1 bg-gradient-to-r from-indigo-600 to-blue-600"></div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-start justify-between mb-12">
            <div>
              <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                Certificate
              </h1>
              <p className="text-xl text-gray-600 font-light">of {certificate.type}</p>
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Award className="w-10 h-10 text-white" />
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 flex flex-col justify-center space-y-8 max-w-4xl">
            <p className="text-2xl text-gray-700">Proudly presented to</p>
            <h2 className="text-6xl font-bold text-gray-900 py-4 border-b-4 border-gradient-to-r from-blue-600 to-indigo-600 inline-block">
              {certificate.studentName}
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              {certificate.description}
            </p>
            <div className="flex gap-4 text-sm text-gray-600">
              <span className="px-4 py-2 bg-blue-50 rounded-lg">Class: {certificate.class}</span>
              <span className="px-4 py-2 bg-indigo-50 rounded-lg">ID: {certificate.studentId}</span>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-end">
            <div>
              <p className="text-sm text-gray-500 mb-1">{new Date(certificate.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <p className="text-xs text-gray-400">#{certificate.certificateNumber}</p>
            </div>
            <div className="text-right">
              <div className="h-16 w-48 border-b-2 border-gray-800 mb-2"></div>
              <p className="font-semibold text-gray-900">{certificate.signatory}</p>
              <p className="text-sm text-gray-600">{certificate.signatoryTitle}</p>
            </div>
          </div>
        </div>
      </div>
    ),

    elegant: (
      <div className="w-[297mm] h-[210mm] bg-gradient-to-br from-purple-50 via-white to-pink-50 p-16 relative overflow-hidden print:m-0">
        {/* Elegant Frame */}
        <div className="absolute inset-6 border border-purple-200 rounded-3xl"></div>
        <div className="absolute inset-10 border-2 border-purple-400 rounded-2xl shadow-inner"></div>

        {/* Decorative Elements */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-64 h-32">
          <div className="w-full h-full bg-gradient-to-b from-purple-400/20 to-transparent rounded-full blur-2xl"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-24">
          {/* Ornate Header */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-purple-400"></div>
              <Star className="w-8 h-8 text-purple-500" />
              <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-purple-400"></div>
            </div>
            <h1 className="text-5xl font-serif italic text-purple-900 mb-2">Certificate</h1>
            <p className="text-2xl text-purple-700 font-light">of {certificate.type}</p>
            <div className="flex items-center justify-center gap-4 mt-6">
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-purple-400"></div>
              <Star className="w-6 h-6 text-purple-400" />
              <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-purple-400"></div>
            </div>
          </div>

          {/* Presentation */}
          <div className="my-10 space-y-6">
            <p className="text-xl text-gray-600 font-serif italic">is hereby awarded to</p>
            <div className="relative inline-block">
              <h2 className="text-6xl font-serif text-gray-900 px-12 py-4 relative z-10">
                {certificate.studentName}
              </h2>
              <div className="absolute bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200 -z-0"></div>
            </div>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed font-serif">
              {certificate.description}
            </p>
          </div>

          {/* Elegant Footer */}
          <div className="mt-auto pt-10 flex justify-between w-full items-end">
            <div className="text-left">
              <p className="text-sm font-serif text-purple-800">{new Date(certificate.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            </div>
            <div className="text-center">
              <div className="w-48 border-t-2 border-gray-800 mb-2 pt-2">
                <p className="font-serif font-semibold text-gray-900">{certificate.signatory}</p>
                <p className="text-sm text-gray-600 font-serif italic">{certificate.signatoryTitle}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 font-mono">No. {certificate.certificateNumber}</p>
            </div>
          </div>
        </div>
      </div>
    ),

    vibrant: (
      <div className="w-[297mm] h-[210mm] bg-white p-12 relative overflow-hidden print:m-0">
        {/* Vibrant Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 opacity-10"></div>
        
        {/* Dynamic Shapes */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-emerald-400 to-teal-500 rounded-full opacity-20 blur-3xl"></div>
        
        {/* Bold Border */}
        <div className="absolute inset-6 border-4 border-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-2xl"></div>
        <div className="absolute top-8 right-8 w-32 h-32 border-8 border-green-500 rounded-full"></div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col p-8">
          {/* Bold Header */}
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center transform rotate-12">
                <Award className="w-12 h-12 text-white transform -rotate-12" />
              </div>
              <div>
                <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                  CERTIFICATE
                </h1>
                <div className="w-full h-2 bg-gradient-to-r from-green-500 to-emerald-500 mt-1 rounded-full"></div>
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-700 uppercase tracking-wide">
              of {certificate.type}
            </p>
          </div>

          {/* Dynamic Body */}
          <div className="flex-1 flex flex-col justify-center space-y-8">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-2xl border-l-8 border-green-500">
              <p className="text-2xl text-gray-700 mb-4 font-semibold">This certifies that</p>
              <h2 className="text-7xl font-black text-gray-900 mb-4">
                {certificate.studentName}
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed">
                {certificate.description}
              </p>
            </div>
            
            <div className="flex gap-4">
              <div className="px-6 py-3 bg-green-500 text-white rounded-xl font-bold">
                {certificate.class}
              </div>
              <div className="px-6 py-3 bg-emerald-500 text-white rounded-xl font-bold">
                {certificate.studentId}
              </div>
            </div>
          </div>

          {/* Strong Footer */}
          <div className="flex justify-between items-end pt-8 border-t-4 border-green-500">
            <div className="space-y-1">
              <p className="font-bold text-green-700">ISSUED ON</p>
              <p className="text-2xl font-black text-gray-900">
                {new Date(certificate.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
              <p className="text-sm text-gray-500">Certificate #{certificate.certificateNumber}</p>
            </div>
            <div className="text-right">
              <div className="inline-block bg-gradient-to-r from-green-500 to-emerald-500 p-1 rounded-xl mb-2">
                <div className="bg-white px-8 py-4 rounded-lg">
                  <p className="font-black text-gray-900 text-xl">{certificate.signatory}</p>
                  <p className="text-sm text-gray-600 font-semibold">{certificate.signatoryTitle}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  };

  return <>{templates[template] ?? templates.classic}</>;
};

// ========== ID CARD TEMPLATES ==========

const IDCardTemplate: React.FC<{ student: Student; template: string }> = ({ student, template }) => {
  const templates: { [key: string]: React.ReactNode } = {
    standard: (
      <div className="w-[85.6mm] h-[54mm] bg-white rounded-xl overflow-hidden shadow-2xl relative">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600"></div>
        
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)',
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 10px 10px'
          }}></div>
        </div>

        {/* Content */}
        <div className="relative z-10 p-4 h-full flex flex-col">
          {/* Header */}
          <div className="text-center mb-3">
            <div className="w-12 h-12 mx-auto mb-2 bg-white rounded-full flex items-center justify-center">
              <GraduationCap className="w-7 h-7 text-indigo-600" />
            </div>
            <h3 className="text-white font-bold text-sm">RIVERSIDE HIGH SCHOOL</h3>
            <p className="text-white/80 text-xs">Student Identity Card</p>
          </div>

          {/* Student Info */}
          <div className="flex gap-3 bg-white rounded-lg p-3 flex-1">
            <div className="w-20 h-24 bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg flex items-center justify-center flex-shrink-0">
              <User className="w-12 h-12 text-gray-600" />
            </div>
            <div className="flex-1 flex flex-col justify-between text-xs">
              <div>
                <p className="font-bold text-gray-900 text-sm mb-1">{student.name}</p>
                <div className="space-y-0.5 text-gray-700">
                  <p><span className="font-semibold">ID:</span> {student.studentId}</p>
                  <p><span className="font-semibold">Class:</span> {student.class}-{student.section}</p>
                  <p><span className="font-semibold">Blood:</span> {student.bloodGroup}</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <p className="text-gray-600">Valid until: {new Date(student.validUntil).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-2 flex justify-between items-center">
            <div className="w-16 h-10 bg-white/20 rounded flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <p className="text-white/60 text-xs">+1 (555) 123-4567</p>
          </div>
        </div>
      </div>
    ),

    professional: (
      <div className="w-[85.6mm] h-[54mm] bg-white rounded-2xl overflow-hidden shadow-2xl relative">
        {/* Professional Design */}
        <div className="h-full flex">
          {/* Left Side - Dark Panel */}
          <div className="w-1/3 bg-gradient-to-b from-slate-800 to-slate-900 p-3 flex flex-col items-center justify-between">
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-2">
                <GraduationCap className="w-10 h-10 text-slate-800" />
              </div>
              <p className="text-white font-bold text-xs">STUDENT ID</p>
            </div>
            
            <div className="w-full space-y-2">
              <div className="w-20 h-24 bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg mx-auto flex items-center justify-center">
                <User className="w-12 h-12 text-gray-600" />
              </div>
            </div>

            <div className="w-full">
              <div className="bg-white/10 rounded-lg p-2 text-center">
                <p className="text-white/60 text-xs mb-1">Valid Until</p>
                <p className="text-white font-bold text-xs">{new Date(student.validUntil).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
              </div>
            </div>
          </div>

          {/* Right Side - Info Panel */}
          <div className="flex-1 p-4 flex flex-col justify-between bg-gradient-to-br from-white to-slate-50">
            <div>
              <h4 className="text-slate-800 font-bold text-xs mb-1">RIVERSIDE HIGH SCHOOL</h4>
              <div className="w-full h-0.5 bg-gradient-to-r from-slate-800 to-transparent mb-3"></div>
              
              <h3 className="text-slate-900 font-bold text-base mb-3">{student.name}</h3>
              
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-600 font-semibold">Student ID:</span>
                  <span className="text-gray-900 font-bold">{student.studentId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-semibold">Class:</span>
                  <span className="text-gray-900">{student.class}-{student.section}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-semibold">Roll No:</span>
                  <span className="text-gray-900">{student.rollNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-semibold">Blood Group:</span>
                  <span className="text-gray-900">{student.bloodGroup}</span>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 text-gray-600">
                  <Phone className="w-3 h-3" />
                  <span>{student.phone}</span>
                </div>
                <Shield className="w-4 h-4 text-slate-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    ),

    modern: (
      <div className="w-[85.6mm] h-[54mm] bg-white rounded-2xl overflow-hidden shadow-2xl relative">
        {/* Modern Minimalist */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>

        <div className="relative z-10 h-full p-4 flex flex-col">
          {/* Minimal Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="text-white font-bold text-xs leading-tight">RIVERSIDE</h4>
                <p className="text-white/80 text-xs leading-tight">High School</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white/60 text-xs">ID CARD</p>
              <p className="text-white font-mono text-xs">{student.studentId}</p>
            </div>
          </div>

          {/* Card Content */}
          <div className="flex-1 bg-white rounded-xl p-3 flex gap-3">
            <div className="w-20 h-full bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg flex items-center justify-center">
              <User className="w-12 h-12 text-blue-600" />
            </div>
            
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-gray-900 font-bold text-base mb-2">{student.name}</h3>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-600">Class {student.class}-{student.section}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-cyan-500 rounded-full"></div>
                    <span className="text-gray-600">Roll {student.rollNumber}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-600">Blood {student.bloodGroup}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-xs pt-2 border-t border-gray-200">
                <span className="text-gray-500">Valid: {new Date(student.validUntil).toLocaleDateString('en-US', { month: 'short', year: '2-digit' })}</span>
                <Shield className="w-4 h-4 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    ),

    horizontal: (
      <div className="w-[85.6mm] h-[54mm] bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl overflow-hidden shadow-2xl relative">
        <div className="h-full flex items-stretch">
          {/* Photo Section */}
          <div className="w-1/4 bg-white/95 p-3 flex flex-col items-center justify-center">
            <div className="w-16 h-20 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-lg flex items-center justify-center mb-2">
              <User className="w-10 h-10 text-emerald-700" />
            </div>
            <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
          </div>

          {/* Info Section */}
          <div className="flex-1 p-4 flex flex-col justify-between text-white">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <GraduationCap className="w-5 h-5" />
                  <h4 className="font-bold text-sm">RIVERSIDE HIGH</h4>
                </div>
                <h2 className="text-xl font-bold mb-1">{student.name}</h2>
              </div>
              <div className="text-right text-xs">
                <p className="opacity-80">Student ID</p>
                <p className="font-mono font-bold">{student.studentId}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
              <div>
                <p className="opacity-70">Class</p>
                <p className="font-semibold">{student.class}-{student.section}</p>
              </div>
              <div>
                <p className="opacity-70">Roll Number</p>
                <p className="font-semibold">{student.rollNumber}</p>
              </div>
              <div>
                <p className="opacity-70">Blood Group</p>
                <p className="font-semibold">{student.bloodGroup}</p>
              </div>
              <div>
                <p className="opacity-70">Valid Until</p>
                <p className="font-semibold">{new Date(student.validUntil).toLocaleDateString('en-US', { month: 'short', year: '2-digit' })}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs opacity-80">
              <Phone className="w-3 h-3" />
              <span>{student.phone}</span>
            </div>
          </div>
        </div>
      </div>
    ),
  };

  return <>{templates[template] ?? templates.standard}</>;
};

// ========== MAIN COMPONENT ==========

const CertificateIDManagement = () => {
  const [activeTab, setActiveTab] = useState<'certificates' | 'idcards'>('certificates');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('classic');
  const [searchTerm, setSearchTerm] = useState('');
  const printRef = useRef<HTMLDivElement>(null);

  // Certificate Form State
  const [certificateForm, setCertificateForm] = useState({
    type: 'achievement' as Certificate['type'],
    title: '',
    description: '',
    signatory: 'Dr. John Smith',
    signatoryTitle: 'Principal',
  });

  const filteredStudents = MOCK_STUDENTS.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    // In production, use libraries like jsPDF or html2canvas
    alert('PDF download functionality - integrate with jsPDF');
  };

  const generateCertificate = () => {
    if (!selectedStudent) return null;

    const certificate: Certificate = {
      id: `CERT-${Date.now()}`,
      type: certificateForm.type,
      studentName: selectedStudent.name,
      studentId: selectedStudent.studentId,
      class: `${selectedStudent.class}-${selectedStudent.section}`,
      title: certificateForm.title,
      description: certificateForm.description,
      date: new Date().toISOString(),
      signatory: certificateForm.signatory,
      signatoryTitle: certificateForm.signatoryTitle,
      certificateNumber: `${selectedStudent.studentId}-${Date.now().toString().slice(-6)}`,
      templateId: selectedTemplate,
    };

    return certificate;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-area, .print-area * {
            visibility: visible;
          }
          .print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          @page {
            size: ${activeTab === 'certificates' ? 'A4 landscape' : '85.6mm 54mm'};
            margin: 0;
          }
        }
      `}</style>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Certificates & ID Cards</h1>
        <p className="text-gray-600">Generate professional certificates and student ID cards</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('certificates')}
            className={`flex-1 px-6 py-4 font-semibold transition ${
              activeTab === 'certificates'
                ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Award className="w-5 h-5" />
              <span>Certificates</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('idcards')}
            className={`flex-1 px-6 py-4 font-semibold transition ${
              activeTab === 'idcards'
                ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <CreditCard className="w-5 h-5" />
              <span>ID Cards</span>
            </div>
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Panel - Form */}
        <div className="lg:col-span-1 space-y-6">
          {/* Student Selection */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Select Student</h3>
            
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {filteredStudents.map((student) => (
                <button
                  key={student.id}
                  onClick={() => setSelectedStudent(student)}
                  className={`w-full p-3 rounded-lg text-left transition ${
                    selectedStudent?.id === student.id
                      ? 'bg-indigo-50 border-2 border-indigo-500'
                      : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                  }`}
                >
                  <p className="font-semibold text-gray-900">{student.name}</p>
                  <p className="text-sm text-gray-600">{student.studentId} • {student.class}-{student.section}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Certificate Form */}
          {activeTab === 'certificates' && selectedStudent && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Certificate Details</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Certificate Type</label>
                  <select
                    value={certificateForm.type}
                    onChange={(e) => setCertificateForm({ ...certificateForm, type: e.target.value as Certificate['type'] })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="achievement">Achievement</option>
                    <option value="participation">Participation</option>
                    <option value="merit">Merit</option>
                    <option value="completion">Completion</option>
                    <option value="appreciation">Appreciation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={certificateForm.title}
                    onChange={(e) => setCertificateForm({ ...certificateForm, title: e.target.value })}
                    placeholder="e.g., First Place in Science Fair"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                  <textarea
                    value={certificateForm.description}
                    onChange={(e) => setCertificateForm({ ...certificateForm, description: e.target.value })}
                    placeholder="for outstanding performance and dedication in the annual science fair..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Template</label>
                  <div className="grid grid-cols-2 gap-2">
                    {CERTIFICATE_TEMPLATES.map((template) => (
                      <button
                        key={template.id}
                        onClick={() => setSelectedTemplate(template.id)}
                        className={`p-3 rounded-lg text-sm font-semibold transition ${
                          selectedTemplate === template.id
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {template.name}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setShowPreview(true)}
                  className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition flex items-center justify-center gap-2"
                >
                  <Eye className="w-5 h-5" />
                  Preview Certificate
                </button>
              </div>
            </div>
          )}

          {/* ID Card Template Selection */}
          {activeTab === 'idcards' && selectedStudent && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">ID Card Template</h3>
              
              <div className="space-y-3">
                {ID_CARD_TEMPLATES.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => {
                      setSelectedTemplate(template.id);
                      setShowPreview(true);
                    }}
                    className={`w-full p-4 rounded-lg text-left transition ${
                      selectedTemplate === template.id
                        ? 'bg-indigo-50 border-2 border-indigo-600'
                        : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                    }`}
                  >
                    <p className="font-semibold text-gray-900">{template.name}</p>
                    <p className="text-sm text-gray-600">{template.orientation}</p>
                  </button>
                ))}

                <button
                  onClick={() => setShowPreview(true)}
                  className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition flex items-center justify-center gap-2 mt-4"
                >
                  <Eye className="w-5 h-5" />
                  Preview ID Card
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Panel - Preview */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">
                {activeTab === 'certificates' ? 'Certificate Preview' : 'ID Card Preview'}
              </h3>
              
              {showPreview && (
                <div className="flex gap-2">
                  <button
                    onClick={handlePrint}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition"
                  >
                    <Printer className="w-5 h-5" />
                    Print
                  </button>
                  <button
                    onClick={handleDownloadPDF}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
                  >
                    <Download className="w-5 h-5" />
                    Download PDF
                  </button>
                </div>
              )}
            </div>

            {/* Preview Area */}
            {!selectedStudent ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  {activeTab === 'certificates' ? (
                    <Award className="w-10 h-10 text-gray-400" />
                  ) : (
                    <CreditCard className="w-10 h-10 text-gray-400" />
                  )}
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">No Student Selected</h4>
                <p className="text-gray-600">Select a student from the list to preview their {activeTab === 'certificates' ? 'certificate' : 'ID card'}</p>
              </div>
            ) : !showPreview ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <Sparkles className="w-16 h-16 text-indigo-500 mb-4" />
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Ready to Generate</h4>
                <p className="text-gray-600">
                  {activeTab === 'certificates' 
                    ? 'Fill in the certificate details and click "Preview Certificate"' 
                    : 'Select a template and click "Preview ID Card"'}
                </p>
              </div>
            ) : (
              <div ref={printRef} className="print-area flex items-center justify-center bg-gray-100 rounded-lg p-8 min-h-[600px]">
                {activeTab === 'certificates' ? (
                  <div className="scale-50 origin-center">
                    <CertificateTemplate 
                      certificate={generateCertificate()!} 
                      template={selectedTemplate} 
                    />
                  </div>
                ) : (
                  <div className="scale-150">
                    <IDCardTemplate 
                      student={selectedStudent} 
                      template={selectedTemplate} 
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateIDManagement;