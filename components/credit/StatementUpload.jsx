import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, ArrowLeft, Loader2, AlertTriangle, CheckCircle } from "lucide-react";

export default function StatementUpload({ onUpload, onCancel, isUploading }) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [validationError, setValidationError] = useState("");

  const validateFile = (file) => {
    setValidationError("");
    
    // Check file type - must be PDF
    if (file.type !== "application/pdf") {
      setValidationError("Only PDF files are accepted. Please upload a PDF bank statement.");
      return false;
    }

    // Check file name contains bank statement keywords
    const fileName = file.name.toLowerCase();
    const hasValidName = fileName.includes('statement') || 
                        fileName.includes('bank') ||
                        fileName.includes('account');
    
    if (!hasValidName) {
      setValidationError("Filename must contain 'statement', 'bank', or 'account'. Please rename your bank statement file.");
      return false;
    }

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setValidationError("File size must be less than 10MB");
      return false;
    }

    // Check minimum file size (at least 10KB - too small likely not a real statement)
    if (file.size < 10 * 1024) {
      setValidationError("File is too small to be a valid bank statement");
      return false;
    }

    return true;
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      if (validateFile(files[0])) {
        setSelectedFile(files[0]);
      }
    }
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files && files[0]) {
      if (validateFile(files[0])) {
        setSelectedFile(files[0]);
      }
    }
  };

  const handleUpload = () => {
    if (selectedFile && !validationError) {
      onUpload(selectedFile);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="p-4 md:p-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" onClick={onCancel} disabled={isUploading}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Upload Bank Statement</h1>
              <p className="text-slate-600">Analyze your credit health and recurring payments</p>
            </div>
          </div>

          <Card className="glass-effect shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-blue-600" />
                Statement Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Validation Requirements */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Bank Statement Requirements
                </h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>✓ Must be in PDF format</li>
                  <li>✓ Filename must contain "statement", "bank", or "account"</li>
                  <li>✓ Should be from a recognized South African bank</li>
                  <li>✓ Must show at least one month of transactions</li>
                  <li>✓ File size: 10KB - 10MB</li>
                </ul>
              </div>

              {/* File Upload Area */}
              <div
                className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-200 ${
                  dragActive 
                    ? "border-blue-400 bg-blue-50" 
                    : validationError
                    ? "border-red-300 bg-red-50"
                    : selectedFile
                    ? "border-emerald-300 bg-emerald-50"
                    : "border-slate-200 hover:border-slate-300"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={handleFileSelect}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  disabled={isUploading}
                />
                
                <div className="text-center">
                  {selectedFile ? (
                    <div className="flex items-center justify-center gap-3">
                      <FileText className="w-8 h-8 text-emerald-500" />
                      <div>
                        <p className="font-medium text-slate-800">{selectedFile.name}</p>
                        <p className="text-sm text-slate-500">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-slate-800 mb-2">
                        Upload Your Bank Statement
                      </h3>
                      <p className="text-slate-600 mb-4">
                        Drag and drop your file here, or click to browse
                      </p>
                      <p className="text-sm text-slate-500">
                        Only PDF files with valid bank statement names accepted
                      </p>
                    </>
                  )}
                </div>
              </div>

              {validationError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-red-800">
                    <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Validation Error</p>
                      <p className="text-sm text-red-700 mt-1">{validationError}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Example Filenames */}
              <div className="bg-slate-50 p-4 rounded-lg">
                <h4 className="font-medium text-slate-800 mb-2">✓ Valid filename examples:</h4>
                <div className="text-sm text-slate-600 space-y-1">
                  <div>• bank-statement-january-2024.pdf</div>
                  <div>• FNB_Account_Statement_Dec2023.pdf</div>
                  <div>• my_bank_statement.pdf</div>
                </div>
              </div>

              {/* Privacy Notice */}
              <div className="bg-emerald-50 p-4 rounded-lg">
                <h4 className="font-medium text-emerald-800 mb-2">🔒 Your Privacy is Protected</h4>
                <ul className="text-sm text-emerald-700 space-y-1">
                  <li>• Your statement is analyzed securely and not stored permanently</li>
                  <li>• We only extract recurring payment patterns and balances</li>
                  <li>• Personal account details are never saved or shared</li>
                  <li>• Analysis helps generate your student credit score</li>
                  <li>• All data is private to your account only</li>
                </ul>
              </div>

              {/* What We Analyze */}
              <div className="bg-slate-50 p-4 rounded-lg">
                <h4 className="font-medium text-slate-800 mb-2">📊 What We Analyze</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-slate-600">
                  <div>• Statement period (months)</div>
                  <div>• Recurring payments</div>
                  <div>• Monthly commitments</div>
                  <div>• Income patterns</div>
                  <div>• Debt-to-income ratio</div>
                  <div>• Account behavior</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={onCancel} disabled={isUploading}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleUpload}
                  disabled={!selectedFile || !!validationError || isUploading}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing Statement...
                    </>
                  ) : (
                    <>
                      <FileText className="w-4 h-4 mr-2" />
                      Analyze Statement
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}