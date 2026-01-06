import React, { useState } from 'react';
import { Camera, X } from 'lucide-react';

interface Photo {
  id: number;
  url: string;
  name: string;
}

function RaiseIssueScreen() {
  const [issueType, setIssueType] = useState('');
  const [description, setDescription] = useState('');
 const [photos, setPhotos] = useState<Photo[]>([]);


 const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (!e.target.files) return;

  const files = Array.from(e.target.files);

  const newPhotos: Photo[] = files.map((file) => ({
    id: Date.now() + Math.random(),
    url: URL.createObjectURL(file),
    name: file.name,
  }));

  setPhotos((prev) => [...prev, ...newPhotos]);
};

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!issueType || !description) {
    alert("Please fill in all required fields");
    return;
  }

  console.log({
    issueType,
    description,
    photos: photos.map((p) => p.name),
  });

  alert("Issue submitted successfully!");
};

    
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold">Raise an Issue</h1>
          <p className="text-blue-100 mt-1">Submit your concerns and we'll get back to you</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Issue Type Selection */}
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-3">
                Select Issue Type <span className="text-red-500">*</span>
              </label>
              <select
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
                className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700 text-lg transition"
                required
              >
                <option value="">Select</option>
                <option value="technical">Technical Issue</option>
                <option value="academic">Academic Issue</option>
                <option value="administrative">Administrative Issue</option>
                <option value="facility">Facility Issue</option>
                <option value="safety">Safety Concern</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-3">
                Describe Your Issue <span className="text-red-500">*</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Please provide detailed information about your issue..."
                className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-gray-700 placeholder-gray-400 text-lg transition"
                rows={6}
                required
              />
            </div>

            {/* Photo Upload */}
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-3">
                Add Photos (Optional)
              </label>
              
              <input
                type="file"
                id="photoUpload"
                accept="image/*"
                multiple
                onChange={handlePhotoUpload}
                className="hidden"
              />
              
              <label
                htmlFor="photoUpload"
                className="w-full border-2 border-dashed border-gray-300 rounded-xl p-12 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition group"
              >
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition">
                  <Camera size={40} className="text-blue-600" />
                </div>
                <span className="text-gray-700 font-medium text-lg">Click to upload photos</span>
                <span className="text-gray-500 text-sm mt-1">or drag and drop images here</span>
              </label>

              {/* Photo Preview Grid */}
              {photos.length > 0 && (
                <div className="grid grid-cols-4 gap-4 mt-6">
                  {photos.map((photo) => (
                    <div key={photo.id} className="relative group">
                      <img
                        src={photo.url}
                        alt="Preview"
                        className="w-full aspect-square object-cover rounded-lg shadow-md"
                      />
                      <button
                        type="button"
                        onClick={() => setPhotos(photos.filter(p => p.id !== photo.id))}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg hover:bg-red-600 opacity-0 group-hover:opacity-100 transition"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => {
                  setIssueType('');
                  setDescription('');
                  setPhotos([]);
                }}
                className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-xl font-semibold text-lg hover:bg-gray-300 active:scale-98 transition"
              >
                Clear Form
              </button>
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 active:scale-98 transition shadow-lg"
              >
                Submit Issue
              </button>
            </div>
          </form>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center text-gray-600">
          <p>Need immediate assistance? Contact us at <a href="mailto:support@school.com" className="text-blue-600 hover:underline font-medium">support@school.com</a></p>
        </div>
      </main>
    </div>
  );
};
export default RaiseIssueScreen;