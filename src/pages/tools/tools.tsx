'use client';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/navbar/navbar';
import {
  Search,
  BarChart3,
  Database,
  FileJson,
  FileSpreadsheet,
  Server,
  Cloud,
  HardDrive,
  X,
  Table,
  Code,
  Brain,
  TrendingUp,
  Layers,
  Settings,
  Sparkles,
  CheckCircle,
  Upload,
  Zap
} from 'lucide-react';

const DatabasePage = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState('landing');
  const [searchQuery, setSearchQuery] = useState('');
  const [outputFormat, setOutputFormat] = useState('chart');
  const [mode, setMode] = useState('simple');
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    sheet_name: '',
    name: '',
    description: '',
    create_table: 'true',
  });
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState('');

  const handlePageChange = (page: React.SetStateAction<string>) => {
    setCurrentPage(page);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    { id: 'all', name: 'All Sources', icon: Database, color: 'from-blue-500 to-cyan-500' },
    { id: 'database', name: 'Databases', icon: Server, color: 'from-purple-500 to-pink-500' },
    { id: 'files', name: 'File Formats', icon: FileSpreadsheet, color: 'from-green-500 to-emerald-500' },
    { id: 'cloud', name: 'Cloud Services', icon: Cloud, color: 'from-orange-500 to-red-500' }
  ];

  const dataSources = {
    database: [
      { name: 'PostgreSQL', icon: Database, category: 'database', available: false, description: 'Advanced open-source database', popular: false },
      { name: 'Microsoft SQL Server', icon: Database, category: 'database', available: false, description: 'Enterprise database solution', popular: false },
      { name: 'Oracle PL/SQL', icon: Database, category: 'database', available: false, description: 'High-performance database', popular: false },
      { name: 'MySQL', icon: Database, category: 'database', available: false, description: 'Popular relational database', popular: false },
      { name: 'SQLite', icon: Database, category: 'database', available: false, description: 'Lightweight database engine', popular: false },
      { name: 'MongoDB', icon: FileJson, category: 'database', available: false, description: 'NoSQL document database', popular: false },
      { name: 'Redis', icon: HardDrive, category: 'database', available: false, description: 'In-memory data structure store', popular: false }
    ],
    files: [
      { name: 'Excel (XLSX)', icon: FileSpreadsheet, category: 'files', available: true, description: 'Microsoft Excel spreadsheets', popular: true },
      { name: 'CSV Files', icon: FileSpreadsheet, category: 'files', available: true, description: 'Comma-separated values', popular: true },
      { name: 'JSON Files', icon: FileJson, category: 'files', available: false, description: 'JavaScript object notation', popular: false },
      { name: 'XML Files', icon: FileJson, category: 'files', available: false, description: 'Extensible markup language', popular: false },
      { name: 'Parquet Files', icon: FileSpreadsheet, category: 'files', available: false, description: 'Columnar storage format', popular: false },
      { name: 'TSV Files', icon: FileSpreadsheet, category: 'files', available: false, description: 'Tab-separated values', popular: false }
    ],
    cloud: [
      { name: 'BigQuery', icon: BarChart3, category: 'cloud', available: false, description: 'Google Cloud data warehouse', popular: false },
      { name: 'Amazon Redshift', icon: Cloud, category: 'cloud', available: false, description: 'AWS data warehouse', popular: false },
      { name: 'Snowflake', icon: Cloud, category: 'cloud', available: false, description: 'Cloud data platform', popular: false },
      { name: 'Azure SQL', icon: Cloud, category: 'cloud', available: false, description: 'Microsoft cloud database', popular: false },
      { name: 'Google Cloud SQL', icon: Cloud, category: 'cloud', available: false, description: 'Managed MySQL & PostgreSQL', popular: false },
      { name: 'Amazon RDS', icon: Cloud, category: 'cloud', available: false, description: 'AWS relational database', popular: false }
    ]
  };

  const getAllSources = () => {
    if (activeCategory === 'all') {
      return [...dataSources.database, ...dataSources.files, ...dataSources.cloud];
    }
    return activeCategory in dataSources ? dataSources[activeCategory as keyof typeof dataSources] : [];
  };

  const filteredSources = getAllSources().filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSourceSelect = (source: any) => {
    if (source.name === 'Excel (XLSX)') {
      setShowModal(true);
    } else {
      alert(`${source.name} 🚧 Coming Soon!`);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please upload a file first!');
      return;
    }
      localStorage.removeItem('X-Dataset-ID');
  localStorage.removeItem('X-Query-ID');
  localStorage.removeItem('X-Generated-Query');
  localStorage.removeItem('X-User-Prompt');
  localStorage.removeItem('X-Dataset-FileName');
  localStorage.removeItem('X-Dataset-UploadDate');
    setUploading(true);
    setUploadResult('');
    const payload = new FormData();
    payload.append('file', file);
    Object.entries(formData).forEach(([k, v]) => {
      if (v) payload.append(k, v);
    });
    try {
      const res = await fetch('http://127.0.0.1:8000/api/v1/excel/dynamic/upload', {
        method: 'POST',
        body: payload,
      });
      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      // ✅ Simpan dataset_id ke localStorage
      if (data.dataset_id) {
        localStorage.setItem('X-Dataset-ID', data.dataset_id);
      }
      setUploadResult('✅ Upload success: ' + JSON.stringify(data, null, 2));
      // ✅ Redirect otomatis ke halaman SQLGeneratorPage
      setTimeout(() => {
        navigate('/query');
      }, 1500);
    } catch (err: any) {
      setUploadResult('❌ Upload failed: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-black to-slate-900 text-white overflow-hidden relative">
      {/* Animated Background Elements - Subtle */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs - Reduced opacity */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-purple-600/8 rounded-full filter blur-3xl"></div>
        
        {/* Minimal Floating Icons - Only key ones */}
        <div className="absolute top-32 left-8 lg:left-16 opacity-15 animate-float">
          <Database className="w-12 h-12 lg:w-14 lg:h-14 text-blue-400" />
        </div>
        <div className="absolute top-96 right-12 lg:right-24 opacity-12 animate-float-delay-2">
          <BarChart3 className="w-10 h-10 lg:w-12 lg:h-12 text-blue-400" />
        </div>
        <div className="absolute bottom-40 left-16 lg:left-28 opacity-10 animate-float-delay-1">
          <Server className="w-10 h-10 lg:w-12 lg:h-12 text-slate-500" />
        </div>
        <div className="absolute bottom-32 right-20 lg:right-32 opacity-12 animate-float-delay-3">
          <Cloud className="w-12 h-12 lg:w-14 lg:h-14 text-slate-500" />
        </div>
      </div>

      {/* Navbar */}
      <Navbar 
        isScrolled={isScrolled}
        currentPage={"database"}
        onPageChange={handlePageChange}
        isMenuOpen={isMenuOpen}
        onMenuToggle={handleMenuToggle}
        showSystemStatus={false}
      />

      {/* Main Content */}
      <div className="pt-32 pb-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-16">
            {/* Badge - More Professional */}
            <div className="inline-flex items-center space-x-2 bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-full px-5 py-2.5 mb-6">
              <Database className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-gray-300">Connect Your Data</span>
            </div>

            {/* Title - Less Gradient, More Professional */}
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-white">
              Choose Your Data Source
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Connect to databases, upload files, or integrate cloud services to start analyzing your data.
            </p>
          </div>

          {/* Search Bar - Professional Design */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <div className="backdrop-blur-sm bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden transition-all duration-300 hover:border-slate-600">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search data sources..."
                  className="w-full bg-transparent pl-14 pr-6 py-4 text-white placeholder-gray-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Categories - Professional Style */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`group relative flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                    : 'bg-slate-800/50 border border-slate-700 text-gray-300 hover:bg-slate-700/50 hover:border-slate-600'
                }`}
              >
                <cat.icon className="w-4 h-4" />
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Data Sources Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredSources.map((src, idx) => {
              const available = src.available;
              return (
                <div
                  key={idx}
                  onClick={() => available && handleSourceSelect(src)}
                  className={`group relative bg-slate-800/40 backdrop-blur-sm rounded-xl border transition-all duration-200 ${
                    available
                      ? 'border-slate-700 hover:bg-slate-800/60 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 cursor-pointer'
                      : 'border-slate-800/50 cursor-not-allowed opacity-60'
                  }`}
                >
                  {/* Popular Badge - Subtle */}
                  {src.popular && available && (
                    <div className="absolute -top-2 -right-2 z-10">
                      <div className="bg-blue-600 rounded-full px-2.5 py-1 flex items-center space-x-1 shadow-md">
                        <Zap className="w-3 h-3 text-white" />
                        <span className="text-white text-xs font-semibold">Popular</span>
                      </div>
                    </div>
                  )}

                  {/* Coming Soon Badge */}
                  {!available && (
                    <div className="absolute top-3 right-3 bg-slate-700/80 backdrop-blur-sm border border-slate-600 rounded-lg px-2.5 py-1">
                      <span className="text-gray-400 text-xs font-medium">Coming Soon</span>
                    </div>
                  )}

                  <div className="p-6">
                    {/* Icon Container - Clean */}
                    <div className={`w-14 h-14 rounded-lg flex items-center justify-center mb-4 ${
                      available 
                        ? 'bg-slate-700/50' 
                        : 'bg-slate-800/30'
                    }`}>
                      <src.icon className={`w-7 h-7 ${
                        available ? 'text-blue-400' : 'text-gray-600'
                      }`} />
                    </div>

                    {/* Text Content */}
                    <div>
                      <h3 className={`text-base font-semibold mb-1.5 ${available ? 'text-white' : 'text-gray-600'}`}>
                        {src.name}
                      </h3>
                      <p className={`text-sm leading-relaxed ${available ? 'text-gray-400' : 'text-gray-700'}`}>
                        {src.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredSources.length === 0 && (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-white/5 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-gray-600" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">No data sources found</h3>
              <p className="text-gray-400 text-lg">Try adjusting your search or filter</p>
            </div>
          )}
        </div>
      </div>

      {/* Professional Upload Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />
          
          {/* Modal Content */}
          <div className="relative bg-slate-900 rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-700">
            
            {/* Close Button */}
            <button 
              onClick={() => setShowModal(false)} 
              className="absolute top-5 right-5 text-gray-400 hover:text-white transition-colors z-10 bg-slate-800 rounded-lg p-2 hover:bg-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="text-center pt-10 pb-6 px-8 border-b border-slate-800">
              <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <FileSpreadsheet className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Upload Excel Dataset
              </h2>
              <p className="text-gray-400 text-sm">Import your file to start analyzing</p>
            </div>

            {/* Form Fields */}
            <div className="px-8 py-6 space-y-5">
              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Excel File *
                </label>
                <div className="relative">
                  <div className="bg-slate-800 border-2 border-dashed border-slate-700 rounded-lg p-6 hover:border-blue-600 transition-all duration-200">
                    <input
                      type="file"
                      accept=".xlsx,.xls"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="text-center pointer-events-none">
                      <Upload className="w-10 h-10 text-blue-400 mx-auto mb-3" />
                      <p className="text-white font-medium mb-1">
                        {file ? file.name : 'Click to upload'}
                      </p>
                      <p className="text-sm text-gray-500">
                        {file ? '✓ File selected' : 'XLSX or XLS (max. 50MB)'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sheet Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Sheet Name <span className="text-gray-600">(Optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Sheet1"
                  value={formData.sheet_name}
                  onChange={(e) => setFormData({...formData, sheet_name: e.target.value})}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-blue-600 focus:outline-none transition-all"
                />
              </div>

              {/* Dataset Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Dataset Name <span className="text-gray-600">(Optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Q4 Sales Report"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-blue-600 focus:outline-none transition-all"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description <span className="text-gray-600">(Optional)</span>
                </label>
                <textarea
                  placeholder="Describe your dataset..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-blue-600 focus:outline-none transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleUpload}
                disabled={!file || uploading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg py-3.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-600/20 flex items-center justify-center space-x-2"
              >
                {uploading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span>Upload Dataset</span>
                  </>
                )}
              </button>
            </div>

            {/* Result Message */}
            {uploadResult && (
              <div className="px-8 pb-6">
                <div className={`rounded-lg p-4 border ${
                  uploadResult.includes('✅') 
                    ? 'bg-green-500/10 border-green-500/30' 
                    : 'bg-red-500/10 border-red-500/30'
                }`}>
                  <div className="flex items-start space-x-2">
                    {uploadResult.includes('✅') ? (
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    ) : (
                      <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    )}
                    <p className={`text-sm ${
                      uploadResult.includes('✅') ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {uploadResult}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delay-1 {
          animation: float 6s ease-in-out infinite;
          animation-delay: 2s;
        }
        
        .animate-float-delay-2 {
          animation: float 6s ease-in-out infinite;
          animation-delay: 4s;
        }
        
        .animate-float-delay-3 {
          animation: float 6s ease-in-out infinite;
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
};

export default DatabasePage;