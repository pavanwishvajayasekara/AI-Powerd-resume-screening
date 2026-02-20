import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';

const FileUpload = ({ onFileSelect, file, label, accept }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative group cursor-pointer transition-all duration-300 ${
        isDragging ? 'border-indigo-500 bg-indigo-500/10' : 'border-white/10 hover:border-white/20'
      } border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center gap-4 glass-card`}
    >
      <input
        type="file"
        onChange={handleFileChange}
        accept={accept}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      
      {file ? (
        <div className="flex flex-col items-center gap-2">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
            <CheckCircle className="text-green-500 w-8 h-8" />
          </div>
          <span className="text-sm font-medium text-gray-300">{file.name}</span>
          <span className="text-xs text-gray-500">Click to change</span>
        </div>
      ) : (
        <>
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Upload className="text-indigo-400 w-8 h-8" />
          </div>
          <div className="text-center">
            <p className="text-gray-200 font-medium">{label}</p>
            <p className="text-xs text-gray-500 mt-1">Drag and drop or click to browse</p>
          </div>
        </>
      )}
    </div>
  );
};

export default FileUpload;
