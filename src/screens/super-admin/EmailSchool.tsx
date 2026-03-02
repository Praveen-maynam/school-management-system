import React, { useState, useRef, FormEvent, ChangeEvent } from 'react';
import {
  Undo,
  Redo,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Indent,
  Outdent,
  Link2,
  Table,
  Image,
  Code,
  Maximize,
  Eye,
  Minimize2,
} from 'lucide-react';

// ========== TYPES ==========

interface FormData {
  subject: string;
  schools: string[];
  description: string;
}

interface FormErrors {
  subject?: string;
  schools?: string;
  description?: string;
}

interface MergeTag {
  label: string;
  value: string;
}

// ========== CONSTANTS ==========

const MERGE_TAGS: MergeTag[] = [
  { label: 'School Name', value: '{School Name}' },
  { label: 'School Admin Name', value: '{School Admin Name}' },
  { label: 'School Email', value: '{School Email}' },
  { label: 'School Admin Email', value: '{School Admin Email}' },
  { label: 'School Admin Mobile', value: '{School Admin Mobile}' },
  { label: 'Code', value: '{Code}' },
  { label: 'System Name', value: '{System Name}' },
  { label: 'Support Email', value: '{Support Email}' },
  { label: 'Support Contact', value: '{Support Contact}' },
  { label: 'Website', value: '{Website}' },
];

const AVAILABLE_SCHOOLS: string[] = [
  'Springfield Elementary',
  'Oakwood High School',
  'Riverside Academy',
  'Mountain View School',
  'Lakeside Institute',
  'Greenwood Primary',
  'Sunset High School',
  'Cedar Valley School',
  'Maple Grove Academy',
  'Pinehurst Institute',
];

// ========== TOOLBAR COMPONENT ==========

const EditorToolbar: React.FC<{
  onExecuteCommand: (command: string, value?: string) => void;
}> = ({ onExecuteCommand }) => {
  return (
    <div className="border border-gray-300 rounded-t-lg bg-gray-50 p-2">
      <div className="flex flex-wrap gap-1 items-center">
        {/* File Menu Dropdowns */}
        <div className="flex gap-1 mr-2 border-r border-gray-300 pr-2">
          <select className="text-xs px-2 py-1 border border-gray-300 rounded bg-white hover:bg-gray-50 cursor-pointer">
            <option>File</option>
            <option>New</option>
            <option>Open</option>
            <option>Save</option>
          </select>
          <select className="text-xs px-2 py-1 border border-gray-300 rounded bg-white hover:bg-gray-50 cursor-pointer">
            <option>Edit</option>
            <option>Cut</option>
            <option>Copy</option>
            <option>Paste</option>
          </select>
          <select className="text-xs px-2 py-1 border border-gray-300 rounded bg-white hover:bg-gray-50 cursor-pointer">
            <option>View</option>
            <option>Preview</option>
            <option>Fullscreen</option>
          </select>
          <select className="text-xs px-2 py-1 border border-gray-300 rounded bg-white hover:bg-gray-50 cursor-pointer">
            <option>Tools</option>
            <option>Spell Check</option>
            <option>Word Count</option>
          </select>
        </div>

        {/* Formatting Buttons */}
        <div className="flex gap-1 flex-wrap">
          <button
            type="button"
            onClick={() => onExecuteCommand('undo')}
            className="p-2 hover:bg-gray-200 rounded transition-colors"
            title="Undo"
          >
            <Undo className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onExecuteCommand('redo')}
            className="p-2 hover:bg-gray-200 rounded transition-colors"
            title="Redo"
          >
            <Redo className="w-4 h-4" />
          </button>

          <div className="w-px bg-gray-300 mx-1"></div>

          <button
            type="button"
            onClick={() => onExecuteCommand('bold')}
            className="p-2 hover:bg-gray-200 rounded transition-colors font-bold"
            title="Bold"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onExecuteCommand('italic')}
            className="p-2 hover:bg-gray-200 rounded transition-colors italic"
            title="Italic"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onExecuteCommand('underline')}
            className="p-2 hover:bg-gray-200 rounded transition-colors underline"
            title="Underline"
          >
            <Underline className="w-4 h-4" />
          </button>

          <div className="w-px bg-gray-300 mx-1"></div>

          <button
            type="button"
            onClick={() => onExecuteCommand('justifyLeft')}
            className="p-2 hover:bg-gray-200 rounded transition-colors"
            title="Align Left"
          >
            <AlignLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onExecuteCommand('justifyCenter')}
            className="p-2 hover:bg-gray-200 rounded transition-colors"
            title="Align Center"
          >
            <AlignCenter className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onExecuteCommand('justifyRight')}
            className="p-2 hover:bg-gray-200 rounded transition-colors"
            title="Align Right"
          >
            <AlignRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onExecuteCommand('justifyFull')}
            className="p-2 hover:bg-gray-200 rounded transition-colors"
            title="Justify"
          >
            <AlignJustify className="w-4 h-4" />
          </button>

          <div className="w-px bg-gray-300 mx-1"></div>

          <button
            type="button"
            onClick={() => onExecuteCommand('insertUnorderedList')}
            className="p-2 hover:bg-gray-200 rounded transition-colors"
            title="Bullet List"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onExecuteCommand('insertOrderedList')}
            className="p-2 hover:bg-gray-200 rounded transition-colors"
            title="Numbered List"
          >
            <ListOrdered className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onExecuteCommand('indent')}
            className="p-2 hover:bg-gray-200 rounded transition-colors"
            title="Indent"
          >
            <Indent className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onExecuteCommand('outdent')}
            className="p-2 hover:bg-gray-200 rounded transition-colors"
            title="Outdent"
          >
            <Outdent className="w-4 h-4" />
          </button>

          <div className="w-px bg-gray-300 mx-1"></div>

          <button
            type="button"
            onClick={() => {
              const url = prompt('Enter URL:');
              if (url) onExecuteCommand('createLink', url);
            }}
            className="p-2 hover:bg-gray-200 rounded transition-colors"
            title="Insert Link"
          >
            <Link2 className="w-4 h-4" />
          </button>

          <div className="w-px bg-gray-300 mx-1"></div>

          <select 
            className="text-xs px-2 py-1 border border-gray-300 rounded bg-white hover:bg-gray-50 cursor-pointer"
            onChange={(e) => onExecuteCommand('fontName', e.target.value)}
          >
            <option value="Arial">Arial</option>
            <option value="Courier New">Courier New</option>
            <option value="Georgia">Georgia</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Verdana">Verdana</option>
          </select>

          <select 
            className="text-xs px-2 py-1 border border-gray-300 rounded bg-white hover:bg-gray-50 cursor-pointer"
            onChange={(e) => onExecuteCommand('fontSize', e.target.value)}
          >
            <option value="1">8pt</option>
            <option value="2">10pt</option>
            <option value="3" selected>12pt</option>
            <option value="4">14pt</option>
            <option value="5">18pt</option>
            <option value="6">24pt</option>
            <option value="7">36pt</option>
          </select>

          <div className="w-px bg-gray-300 mx-1"></div>

          <button
            type="button"
            className="p-2 hover:bg-gray-200 rounded transition-colors"
            title="Insert Table"
          >
            <Table className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => {
              const url = prompt('Enter image URL:');
              if (url) onExecuteCommand('insertImage', url);
            }}
            className="p-2 hover:bg-gray-200 rounded transition-colors"
            title="Insert Image"
          >
            <Image className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="p-2 hover:bg-gray-200 rounded transition-colors"
            title="Insert Code"
          >
            <Code className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="p-2 hover:bg-gray-200 rounded transition-colors"
            title="Fullscreen"
          >
            <Maximize className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="p-2 hover:bg-gray-200 rounded transition-colors"
            title="Preview"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// ========== MAIN COMPONENT ==========

const SendMailToSchools: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    subject: '',
    schools: [],
    description: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [selectedSchools, setSelectedSchools] = useState<string[]>([]);
  const descriptionRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSchoolSelection = (school: string) => {
    setSelectedSchools((prev) => {
      if (prev.includes(school)) {
        return prev.filter((s) => s !== school);
      }
      return [...prev, school];
    });

    if (errors.schools) {
      setErrors((prev) => ({ ...prev, schools: '' }));
    }
  };

  const insertMergeTag = (tag: string) => {
    if (descriptionRef.current) {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const tagNode = document.createTextNode(tag + ' ');
        range.insertNode(tagNode);
        range.setStartAfter(tagNode);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
      } else {
        descriptionRef.current.textContent += tag + ' ';
      }
      setFormData((prev) => ({
        ...prev,
        description: descriptionRef.current?.textContent || '',
      }));

      if (errors.description) {
        setErrors((prev) => ({ ...prev, description: '' }));
      }
    }
  };

  const executeCommand = (command: string, value: string = '') => {
    document.execCommand(command, false, value);
    descriptionRef.current?.focus();
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (selectedSchools.length === 0) {
      newErrors.schools = 'Please select at least one school';
    }

    if (
      !formData.description.trim() &&
      !descriptionRef.current?.textContent?.trim()
    ) {
      newErrors.description = 'Description is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      const submitData = {
        ...formData,
        description: descriptionRef.current?.innerHTML || '',
        schools: selectedSchools,
      };
      console.log('Mail data submitted:', submitData);
      alert('Mail sent successfully! Check console for data.');
    }
  };

  const handleReset = () => {
    setFormData({
      subject: '',
      schools: [],
      description: '',
    });
    setSelectedSchools([]);
    if (descriptionRef.current) {
      descriptionRef.current.innerHTML = '';
    }
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-xl font-medium text-gray-900 mb-6">
            Send Mail to Schools
          </h1>

          <form onSubmit={handleSubmit}>
            {/* Subject Field */}
            <div className="mb-6">
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                  errors.subject ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter email subject"
              />
              {errors.subject && (
                <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
              )}
            </div>

            {/* Schools Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Schools <span className="text-red-500">*</span>
              </label>
              <div className="p-4 border border-gray-300 rounded-lg bg-gray-50">
                <div className="flex flex-wrap gap-2">
                  {AVAILABLE_SCHOOLS.map((school) => (
                    <button
                      key={school}
                      type="button"
                      onClick={() => handleSchoolSelection(school)}
                      className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                        selectedSchools.includes(school)
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      {school}
                    </button>
                  ))}
                </div>
                {selectedSchools.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      Selected: {selectedSchools.length} school
                      {selectedSchools.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                )}
              </div>
              {errors.schools && (
                <p className="mt-1 text-sm text-red-500">{errors.schools}</p>
              )}
            </div>

            {/* Description with Rich Text Editor */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>

              {/* Toolbar */}
              <EditorToolbar onExecuteCommand={executeCommand} />

              {/* Editor Area */}
              <div
                ref={descriptionRef}
                contentEditable
                className={`min-h-[250px] p-4 border border-t-0 border-gray-300 rounded-b-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.description ? 'border-red-500' : ''
                }`}
                style={{
                  minHeight: '250px',
                }}
                data-placeholder="Enter your message here..."
                onInput={() => {
                  if (errors.description) {
                    setErrors((prev) => ({ ...prev, description: '' }));
                  }
                }}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-500">{errors.description}</p>
              )}

              {/* Tiny Badge */}
              <div className="flex justify-end mt-2">
                <button
                  type="button"
                  className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700"
                  title="Powered by TinyMCE"
                >
                  <Minimize2 className="w-3 h-3" />
                  <span>tiny</span>
                </button>
              </div>
            </div>

            {/* Merge Tags */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Merge Tags
              </label>
              <div className="flex flex-wrap gap-2">
                {MERGE_TAGS.map((tag) => (
                  <button
                    key={tag.value}
                    type="button"
                    onClick={() => insertMergeTag(tag.value)}
                    className="px-3 py-1.5 text-xs bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors font-medium"
                    title={`Insert ${tag.label}`}
                  >
                    {tag.label}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Click on a merge tag to insert it at the cursor position
              </p>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Reset
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          font-style: italic;
        }
        [contenteditable]:focus {
          outline: none;
        }
      `}</style>
    </div>
  );
};

export default SendMailToSchools;