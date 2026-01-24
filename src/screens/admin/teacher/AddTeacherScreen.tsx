
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddTeacherScreen: React.FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        employeeId: '',
        email: '',
        department: '',
        phone: '',
        status: 'Active',
        subjects: '',
        classes: '',
        documents: null as File | null,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, files } = e.target as any;
        setForm((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const handleNext = () => setStep((s) => s + 1);
    const handleBack = () => setStep((s) => s - 1);
    const handleCancel = () => navigate('/admin/teachers');
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Teacher added (dummy)');
        navigate('/admin/teachers');
    };

    return (
        <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-6 mt-6">
            <h2 className="text-2xl font-bold mb-4">Add Teacher</h2>
            <form onSubmit={handleSubmit}>
                {step === 1 && (
                    <div className="space-y-4">
                        <div>
                            <label className="block font-medium mb-1">Personal Details</label>
                            <div className="flex gap-2">
                                <input className="input w-1/2" name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} required />
                                <input className="input w-1/2" name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} required />
                            </div>
                            <input className="input mt-2 w-full" name="employeeId" placeholder="Employee ID" value={form.employeeId} onChange={handleChange} required />
                            <input className="input mt-2 w-full" name="email" placeholder="Email" value={form.email} onChange={handleChange} required type="email" />
                            <input className="input mt-2 w-full" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
                        </div>
                    </div>
                )}
                {step === 2 && (
                    <div className="space-y-4">
                        <div>
                            <label className="block font-medium mb-1">Professional Details</label>
                            <select className="input w-full" name="department" value={form.department} onChange={handleChange} required>
                                <option value="">Select Department</option>
                                <option value="Math">Math</option>
                                <option value="Science">Science</option>
                                <option value="English">English</option>
                            </select>
                            <input className="input mt-2 w-full" name="subjects" placeholder="Subjects (comma separated)" value={form.subjects} onChange={handleChange} />
                            <input className="input mt-2 w-full" name="classes" placeholder="Classes (comma separated)" value={form.classes} onChange={handleChange} />
                        </div>
                    </div>
                )}
                {step === 3 && (
                    <div className="space-y-4">
                        <div>
                            <label className="block font-medium mb-1">Documents (dummy upload)</label>
                            <input className="input w-full" name="documents" type="file" onChange={handleChange} />
                        </div>
                    </div>
                )}
                <div className="flex gap-2 mt-6">
                    {step > 1 && (
                        <button type="button" className="btn-secondary" onClick={handleBack}>Back</button>
                    )}
                    {step < 3 && (
                        <button type="button" className="btn-primary" onClick={handleNext}>Next</button>
                    )}
                    {step === 3 && (
                        <button type="submit" className="btn-primary">Save</button>
                    )}
                    <button type="button" className="btn-secondary ml-auto" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default AddTeacherScreen;
