'use client';
import React, { useState, useEffect } from 'react';
import { 
  Database, 
  Settings, 
  Play,
  Plus,
  ChevronDown,
  Code,
  FileText,
  Sparkles,
  Copy,
  Download,
  FileSpreadsheet,
  Upload,
  X,
  CheckCircle2,
  RefreshCw,
  Link,
  User,
  Bell,
  Menu,
  Paperclip,
  Wand2,
  Brain,
  BarChart3,
  Table,
  PieChart,
  LineChart,
  Target,
  Clock,
  Zap,
  TrendingUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  LineChart as RechartsLineChart,
  BarChart as RechartsBarChart,
  PieChart as RechartsPieChart,
  ScatterChart as RechartsScatterChart,
  AreaChart as RechartsAreaChart,
  Line,
  Bar,
  Pie,
  Scatter,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer
} from 'recharts';

interface Data {
  prompt: string;
  mode: string;
  query_id: string;
  query: string;
  success: boolean;
  error: string | null;
}

interface DataSourceInfo {
  type: string;
  fileName: string;
  uploadDate: string;
}

interface ChartConfig {
  chart_type: string;
  x_axis: string;
  y_axis: string;
  title: string;
  colors: string[];
  color_scheme: string;
  width: number;
  height: number;
  show_legend: boolean;
  show_grid: boolean;
  show_tooltip: boolean;
  animate: boolean;
  aggregate_function: string | null;
  group_by: string | null;
  additional_config: any;
}

interface ExecutionResult {
  query_id: string;
  success: boolean;
  data: Array<Record<string, any>>;
  row_count: number;
  execution_time_seconds: number;
  columns: string[];
  chart_config?: ChartConfig;
}

type StepState = 'upload' | 'generate' | 'execute';

const SQLGeneratorJulius = () => {
  const navigate = useNavigate();
  const [instruction, setInstruction] = useState('');
  const [outputType, setOutputType] = useState('table');
  const [generatedQuery, setGeneratedQuery] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [data, setData] = useState<Data | null>(null);
  const [datasetId, setDatasetId] = useState<string | null>(null);
  const [queryId, setQueryId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState('');
  const [dataSource, setDataSource] = useState<DataSourceInfo | null>(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showToolbar, setShowToolbar] = useState(false);
  
  const [currentStep, setCurrentStep] = useState<StepState>('upload');
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null);
  const [showExecutionOptions, setShowExecutionOptions] = useState(false);
  const [executionType, setExecutionType] = useState<'table' | 'chart' | null>(null); // ✅ Track execution type
  
  const [generateChart, setGenerateChart] = useState(false);
  const [chartPrompt, setChartPrompt] = useState('');
  const [chartType, setChartType] = useState<string>('');
  const [colorScheme, setColorScheme] = useState('blue');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    sheet_name: '',
    name: '',
    description: '',
    create_table: 'true',
  });

  useEffect(() => {
    try {
      const datasetIdFromHeader = localStorage.getItem('X-Dataset-ID');
      const savedQueryId = localStorage.getItem('X-Query-ID');
      const savedFileName = localStorage.getItem('X-Dataset-FileName');
      const savedUploadDate = localStorage.getItem('X-Dataset-UploadDate');
      const savedQuery = localStorage.getItem('X-Generated-Query');
      const savedPrompt = localStorage.getItem('X-User-Prompt'); // ✅ Load saved prompt
      
      if (datasetIdFromHeader) {
        setDatasetId(datasetIdFromHeader);
        setDataSource({
          type: 'Excel (XLSX)',
          fileName: savedFileName || 'Unknown File',
          uploadDate: savedUploadDate || new Date().toLocaleDateString()
        });
        
        if (savedQueryId && savedQuery) {
          setCurrentStep('execute');
          setQueryId(savedQueryId);
          setGeneratedQuery(savedQuery);
          if (savedPrompt) setInstruction(savedPrompt); // ✅ Restore prompt
        } else {
          setCurrentStep('generate');
        }
      } else {
        setCurrentStep('upload');
      }
    } catch (error) {
      console.error('Error checking dataset header:', error);
    }
  }, []);

  const handleGenerateQuery = async () => {
    try {
      setIsGenerating(true);
      if (!instruction.trim()) {
        alert('Please enter an instruction');
        return;
      }

      if (!datasetId) {
        alert('Please upload a dataset first');
        return;
      }

      const response = await fetch('http://localhost:8000/api/v1/excel/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Dataset-ID': datasetId
        },
        body: JSON.stringify({
          prompt: instruction,
          mode: 'simple',
          use_cache: true,
          querytype: 'excel'
        })
      });

      const result = await response.json();
      
      if (result.success) {
        setData(result);
        setGeneratedQuery(result.query || '');
        setQueryId(result.query_id);
        
        localStorage.setItem('X-Query-ID', result.query_id);
        localStorage.setItem('X-Generated-Query', result.query || '');
        localStorage.setItem('X-User-Prompt', instruction); // ✅ Save prompt
        
        setCurrentStep('execute');
        setShowExecutionOptions(true);
        
        console.log('✅ Query generated successfully', result);
      } else {
        console.error('❌ Error', result.error);
        alert('Error generating query: ' + result.error);
      }
    } catch (error) {
      console.error('Error in fetch:', error);
      alert('Error generating query');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExecuteQuery = async () => {
    if (!queryId || !generatedQuery || !datasetId) {
      alert('Missing required data');
      return;
    }

    try {
      setIsExecuting(true);
      setExecutionType('table'); // ✅ Set execution type
      
      const response = await fetch('http://localhost:8000/api/v1/excel/query/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Dataset-ID': datasetId
        },
        body: JSON.stringify({
          query_id: queryId,
          sql_query: generatedQuery
        })
      });

      const result: ExecutionResult = await response.json();
      
      if (result.success) {
        setExecutionResult(result);
        console.log('✅ Query executed successfully', result);
      } else {
        alert('Error executing query');
      }
    } catch (error) {
      console.error('Error executing query:', error);
      alert('Error executing query');
    } finally {
      setIsExecuting(false);
    }
  };

  const handleExecuteWithChart = async () => {
    if (!queryId || !generatedQuery || !datasetId) {
      alert('Missing required data');
      return;
    }

    try {
      setIsExecuting(true);
      setExecutionType('chart'); // ✅ Set execution type
      
      const params = new URLSearchParams({
        generate_chart: 'true',
        color_scheme: colorScheme,
        chart_width: '800',
        chart_height: '400'
      });

      if (chartPrompt) {
        params.append('chart_prompt', chartPrompt);
      }

      if (chartType) {
        params.append('chart_type', chartType);
      }

      const response = await fetch(
        `http://localhost:8000/api/v1/excel/query/execute?${params.toString()}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Dataset-ID': datasetId
          },
          body: JSON.stringify({
            query_id: queryId,
            sql_query: generatedQuery
          })
        }
      );

      const result: ExecutionResult = await response.json();
      
      if (result.success) {
        setExecutionResult(result);
        console.log('✅ Query executed with chart', result);
      } else {
        alert('Error executing query with chart');
      }
    } catch (error) {
      console.error('Error executing query with chart:', error);
      alert('Error executing query with chart');
    } finally {
      setIsExecuting(false);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please upload a file first!');
      return;
    }

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

      if (data.dataset_id) {
        localStorage.setItem('X-Dataset-ID', data.dataset_id);
        localStorage.setItem('X-Dataset-FileName', file.name);
        localStorage.setItem('X-Dataset-UploadDate', new Date().toLocaleDateString());
      }

      setUploadResult('✅ Upload success');

      setDataSource({
        type: 'Excel (XLSX)',
        fileName: file.name,
        uploadDate: new Date().toLocaleDateString()
      });

      setDatasetId(data.dataset_id);
      setCurrentStep('generate');

      setTimeout(() => {
        setShowModal(false);
        setUploadResult('');
      }, 1500);
    } catch (err: any) {
      setUploadResult('❌ Upload failed: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleChangeDataSource = () => {
    navigate('/tools');
  };

  const handleOpenUploadModal = () => {
    setShowModal(true);
    setFile(null);
    setUploadResult('');
  };

  const handleChooseDifferentSource = () => {
    navigate('/tools');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedQuery);
    alert('✅ Query copied to clipboard!');
  };

  const handleExport = () => {
    const blob = new Blob([generatedQuery], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'generated_query.sql';
    link.click();
  };

  const handleNewQuery = () => {
    setInstruction('');
    setGeneratedQuery('');
    setQueryId(null);
    setExecutionResult(null);
    setExecutionType(null);
    setShowExecutionOptions(false);
    setCurrentStep('generate');
    localStorage.removeItem('X-Query-ID');
    localStorage.removeItem('X-Generated-Query');
    localStorage.removeItem('X-User-Prompt');
  };

  // ✅ Flexible Chart Renderer
  const renderChart = (config: ChartConfig, data: Array<Record<string, any>>) => {
    const { chart_type, x_axis, y_axis, colors, title, width, height, show_legend, show_grid, show_tooltip, animate } = config;

    const commonProps = {
      data: data,
      margin: { top: 20, right: 30, left: 20, bottom: 20 }
    };

    switch (chart_type.toLowerCase()) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={height || 400}>
            <RechartsLineChart {...commonProps}>
              {show_grid && <CartesianGrid strokeDasharray="3 3" stroke="#374151" />}
              <XAxis dataKey={x_axis} stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              {show_tooltip && <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }} />}
              {show_legend && <Legend />}
              <Line 
                type="monotone" 
                dataKey={y_axis} 
                stroke={colors[0] || '#8884d8'} 
                strokeWidth={2}
                dot={{ fill: colors[0] || '#8884d8' }}
                animationDuration={animate ? 1000 : 0}
              />
            </RechartsLineChart>
          </ResponsiveContainer>
        );

      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={height || 400}>
            <RechartsBarChart {...commonProps}>
              {show_grid && <CartesianGrid strokeDasharray="3 3" stroke="#374151" />}
              <XAxis dataKey={x_axis} stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              {show_tooltip && <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }} />}
              {show_legend && <Legend />}
              <Bar dataKey={y_axis} fill={colors[0] || '#8884d8'} animationDuration={animate ? 1000 : 0} />
            </RechartsBarChart>
          </ResponsiveContainer>
        );

      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={height || 400}>
            <RechartsPieChart>
              {show_tooltip && <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }} />}
              {show_legend && <Legend />}
              <Pie
                data={data}
                dataKey={y_axis}
                nameKey={x_axis}
                cx="50%"
                cy="50%"
                outerRadius={120}
                label
                animationDuration={animate ? 1000 : 0}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length] || '#8884d8'} />
                ))}
              </Pie>
            </RechartsPieChart>
          </ResponsiveContainer>
        );

      case 'area':
        return (
          <ResponsiveContainer width="100%" height={height || 400}>
            <RechartsAreaChart {...commonProps}>
              {show_grid && <CartesianGrid strokeDasharray="3 3" stroke="#374151" />}
              <XAxis dataKey={x_axis} stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              {show_tooltip && <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }} />}
              {show_legend && <Legend />}
              <Area 
                type="monotone" 
                dataKey={y_axis} 
                stroke={colors[0] || '#8884d8'} 
                fill={colors[0] || '#8884d8'}
                fillOpacity={0.6}
                animationDuration={animate ? 1000 : 0}
              />
            </RechartsAreaChart>
          </ResponsiveContainer>
        );

      case 'scatter':
        return (
          <ResponsiveContainer width="100%" height={height || 400}>
            <RechartsScatterChart {...commonProps}>
              {show_grid && <CartesianGrid strokeDasharray="3 3" stroke="#374151" />}
              <XAxis dataKey={x_axis} stroke="#9CA3AF" />
              <YAxis dataKey={y_axis} stroke="#9CA3AF" />
              {show_tooltip && <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }} />}
              {show_legend && <Legend />}
              <Scatter 
                name={y_axis} 
                data={data} 
                fill={colors[0] || '#8884d8'}
                animationDuration={animate ? 1000 : 0}
              />
            </RechartsScatterChart>
          </ResponsiveContainer>
        );

      default:
        return (
          <div className="text-center py-8 text-gray-400">
            Unsupported chart type: {chart_type}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex relative overflow-hidden">
      {/* Animated Background - Same as before */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-purple-600/8 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-cyan-600/8 rounded-full filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Sidebar - Same as before */}
      <aside className={`${showSidebar ? 'w-60' : 'w-0'} bg-[#141414] border-r border-gray-800 transition-all duration-300 overflow-hidden flex flex-col`}>
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg">Julius</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-800/50 transition-colors">
            <Plus className="w-5 h-5" />
            <span>New</span>
          </button>
          
          <div className="pt-4 pb-2">
            <div className="text-xs text-gray-500 uppercase tracking-wider px-3 mb-2">Recent</div>
            <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-800/50 transition-colors text-left">
              <FileText className="w-4 h-4 text-gray-400" />
              <span className="text-sm truncate">Chats</span>
            </button>
          </div>
        </nav>

        <div className="p-4 border-t border-gray-800 space-y-2">
          <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-800/50 transition-colors text-sm">
            <User className="w-4 h-4 text-gray-400" />
            <span>Profile</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <header className="h-14 bg-[#141414] border-b border-gray-800 flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setShowSidebar(!showSidebar)}
              className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5 text-gray-400" />
            </button>
            
            <div className="flex items-center space-x-2">
              <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg ${
                currentStep === 'upload' ? 'bg-blue-600' : 
                currentStep === 'generate' ? 'bg-yellow-600' : 
                'bg-green-600'
              }`}>
                <span className="text-sm font-medium text-white">
                  Step {currentStep === 'upload' ? '1' : currentStep === 'generate' ? '2' : '3'}
                </span>
              </div>
              <span className="text-sm text-gray-400">
                {currentStep === 'upload' ? 'Upload Dataset' : 
                 currentStep === 'generate' ? 'Generate Query' : 
                 'Execute Query'}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors">
              <Bell className="w-5 h-5 text-gray-400" />
            </button>
            <button className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors">
              <Settings className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </header>

        {/* Main Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto py-20 px-6">
            {/* Hero Section */}
            {currentStep === 'generate' && !generatedQuery && (
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">
                  What do you want to analyze today?
                </h1>
                <p className="text-gray-400 text-lg">
                  Query your Excel data using natural language
                </p>
              </div>
            )}

            {/* Data Source Card */}
            {dataSource && (
              <div className="mb-6 bg-[#141414] border border-gray-800 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                      <FileSpreadsheet className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold text-white">{dataSource.type}</h4>
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                      </div>
                      <p className="text-sm text-gray-400">{dataSource.fileName}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleChangeDataSource}
                    className="text-sm text-blue-400 hover:text-blue-300 transition-colors font-medium"
                  >
                    Change
                  </button>
                </div>
              </div>
            )}

            {/* ✅ User Prompt Display (Always visible in step 3) */}
            {currentStep === 'execute' && instruction && (
              <div className="mb-6 bg-[#141414] border border-gray-800 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Wand2 className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white mb-1">Your Question</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">{instruction}</p>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Query Generation Input */}
            {currentStep === 'generate' && (
              <div className="bg-[#141414] border border-gray-800 rounded-2xl overflow-hidden">
                <div className="p-6">
                  <textarea
                    value={instruction}
                    onChange={(e) => setInstruction(e.target.value)}
                    placeholder="Run a regression analysis to forecast next quarter's trends..."
                    className="w-full bg-transparent text-white placeholder-gray-500 resize-none focus:outline-none text-lg min-h-[100px]"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleGenerateQuery();
                      }
                    }}
                  />
                </div>

                <div className="border-t border-gray-800 px-6 py-3 flex items-center justify-end">
                  <button
                    onClick={handleGenerateQuery}
                    disabled={!instruction.trim() || isGenerating || !datasetId}
                    className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium transition-all flex items-center space-x-2"
                  >
                    {isGenerating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Generating...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Generate Query</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Generated Query Display */}
            {currentStep === 'execute' && generatedQuery && (
              <>
                <div className="mb-6 bg-[#141414] border border-gray-800 rounded-2xl overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Code className="w-5 h-5 text-blue-400" />
                      <h3 className="font-semibold text-white">Generated Query</h3>
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={handleCopy}
                        className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors"
                        title="Copy"
                      >
                        <Copy className="w-4 h-4 text-gray-400" />
                      </button>
                      <button 
                        onClick={handleExport}
                        className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors"
                        title="Download"
                      >
                        <Download className="w-4 h-4 text-gray-400" />
                      </button>
                      <button 
                        onClick={handleNewQuery}
                        className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors"
                        title="New Query"
                      >
                        <RefreshCw className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-black/30">
                    <pre className="text-gray-300 whitespace-pre-wrap font-mono text-sm leading-relaxed">
                      <code>{generatedQuery}</code>
                    </pre>
                  </div>
                </div>

                {/* Execution Options */}
                {!executionResult && (
                  <div className="mb-6 bg-[#141414] border border-gray-800 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold mb-4 text-white">Choose Execution Option</h3>
                    
                    <div className="space-y-4">
                      {/* Option 1: Execute as Table */}
                      <button
                        onClick={handleExecuteQuery}
                        disabled={isExecuting}
                        className="w-full bg-gray-800/50 hover:bg-gray-800 border border-gray-700 rounded-xl p-4 transition-all flex items-center justify-between group"
                      >
                        <div className="flex items-center space-x-3">
                          <Table className="w-6 h-6 text-blue-400" />
                          <div className="text-left">
                            <div className="font-semibold text-white">Execute as Table</div>
                            <div className="text-sm text-gray-400">View results in table format</div>
                          </div>
                        </div>
                        <Play className="w-5 h-5 text-gray-400 group-hover:text-white" />
                      </button>

                      {/* Option 2: Execute with Chart */}
                      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                        <div className="flex items-center space-x-3 mb-4">
                          <BarChart3 className="w-6 h-6 text-purple-400" />
                          <div>
                            <div className="font-semibold text-white">Execute with Chart</div>
                            <div className="text-sm text-gray-400">Generate visualization automatically</div>
                          </div>
                        </div>

                        <div className="space-y-3 ml-9">
                          <input
                            type="text"
                            placeholder="Describe the chart (optional): e.g., 'show sales trend over time'"
                            value={chartPrompt}
                            onChange={(e) => setChartPrompt(e.target.value)}
                            className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />

                          <div className="grid grid-cols-2 gap-3">
                            <select
                              value={chartType}
                              onChange={(e) => setChartType(e.target.value)}
                              className="bg-gray-900/50 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                              <option value="">Auto Chart Type</option>
                              <option value="line">Line Chart</option>
                              <option value="bar">Bar Chart</option>
                              <option value="pie">Pie Chart</option>
                              <option value="scatter">Scatter Plot</option>
                              <option value="area">Area Chart</option>
                              <option value="histogram">Histogram</option>
                            </select>

                            <select
                              value={colorScheme}
                              onChange={(e) => setColorScheme(e.target.value)}
                              className="bg-gray-900/50 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                              <option value="blue">Blue</option>
                              <option value="green">Green</option>
                              <option value="purple">Purple</option>
                              <option value="red">Red</option>
                              <option value="orange">Orange</option>
                              <option value="teal">Teal</option>
                              <option value="pink">Pink</option>
                            </select>
                          </div>

                          <button
                            onClick={handleExecuteWithChart}
                            disabled={isExecuting}
                            className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg font-medium transition-all flex items-center justify-center space-x-2"
                          >
                            {isExecuting ? (
                              <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                <span>Executing...</span>
                              </>
                            ) : (
                              <>
                                <Play className="w-4 h-4" />
                                <span>Execute with Chart</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ✅ Execution Results */}
                {executionResult && (
                  <div className="space-y-6">
                    {/* Execution Info */}
                    <div className="bg-[#141414] border border-gray-800 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <CheckCircle2 className="w-4 h-4 text-green-400" />
                            <span className="text-gray-400">
                              {executionResult.row_count} rows
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-blue-400" />
                            <span className="text-gray-400">
                              {executionResult.execution_time_seconds.toFixed(3)}s
                            </span>
                          </div>
                          {executionType === 'chart' && (
                            <div className="flex items-center space-x-2">
                              <BarChart3 className="w-4 h-4 text-purple-400" />
                              <span className="text-gray-400">Chart View</span>
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => {
                            setExecutionResult(null);
                            setExecutionType(null);
                            setShowExecutionOptions(true);
                          }}
                          className="text-sm text-blue-400 hover:text-blue-300 transition-colors font-medium"
                        >
                          Re-execute
                        </button>
                      </div>
                    </div>

                    {/* ✅ Table Results (Only show if execution type is 'table') */}
                    {executionType === 'table' && (
                      <div className="bg-[#141414] border border-gray-800 rounded-2xl overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-800">
                          <h3 className="font-semibold text-white flex items-center space-x-2">
                            <Table className="w-5 h-5 text-blue-400" />
                            <span>Query Results</span>
                          </h3>
                        </div>
                        
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead className="bg-gray-800/50">
                              <tr>
                                {executionResult.columns.map((col, idx) => (
                                  <th key={idx} className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    {col}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                              {executionResult.data.slice(0, 10).map((row, idx) => (
                                <tr key={idx} className="hover:bg-gray-800/30">
                                  {executionResult.columns.map((col, colIdx) => (
                                    <td key={colIdx} className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                      {row[col] !== null ? String(row[col]) : 'NULL'}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        
                        {executionResult.row_count > 10 && (
                          <div className="px-6 py-3 bg-gray-800/30 border-t border-gray-800 text-center text-sm text-gray-400">
                            Showing 10 of {executionResult.row_count} rows
                          </div>
                        )}
                      </div>
                    )}

                    {/* ✅ Chart View (Only show if execution type is 'chart' and chart_config exists) */}
                    {executionType === 'chart' && executionResult.chart_config && (
                      <div className="bg-[#141414] border border-gray-800 rounded-2xl overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-800">
                          <h3 className="font-semibold text-white flex items-center space-x-2">
                            <BarChart3 className="w-5 h-5 text-purple-400" />
                            <span>{executionResult.chart_config.title || 'Data Visualization'}</span>
                          </h3>
                        </div>
                        
                        <div className="p-6">
                          {renderChart(executionResult.chart_config, executionResult.data)}
                        </div>

                        {/* Chart Details */}
                        <div className="px-6 py-4 bg-gray-800/30 border-t border-gray-800">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Chart Type</span>
                              <p className="text-white font-medium capitalize">{executionResult.chart_config.chart_type}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">X-Axis</span>
                              <p className="text-white font-medium">{executionResult.chart_config.x_axis}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Y-Axis</span>
                              <p className="text-white font-medium">{executionResult.chart_config.y_axis}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Color Scheme</span>
                              <p className="text-white font-medium capitalize">{executionResult.chart_config.color_scheme}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}

            {/* Quick Actions */}
            {currentStep === 'upload' && !dataSource && (
              <div className="mt-6 flex items-center justify-center space-x-4">
                <button 
                  onClick={handleOpenUploadModal}
                  className="flex items-center space-x-2 bg-[#141414] hover:bg-gray-800/50 border border-gray-700 text-white px-4 py-2 rounded-lg transition-all"
                >
                  <FileSpreadsheet className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">Upload Excel File</span>
                </button>
                <button 
                  onClick={handleChooseDifferentSource}
                  className="flex items-center space-x-2 bg-[#141414] hover:bg-gray-800/50 border border-gray-700 text-white px-4 py-2 rounded-lg transition-all"
                >
                  <Database className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">More Options</span>
                </button>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Upload Modal - Same as before */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />
          
          <div className="relative bg-[#141414] rounded-2xl shadow-2xl max-w-md w-full border border-gray-800">
            <button 
              onClick={() => setShowModal(false)} 
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8">
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <FileSpreadsheet className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl font-bold mb-1 text-white">Upload Excel Dataset</h2>
                <p className="text-gray-400 text-sm">Import your Excel file to start analyzing</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2 uppercase">
                    Excel File
                  </label>
                  <input
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white file:font-medium hover:file:bg-blue-700 file:cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {file && (
                    <p className="mt-2 text-sm text-green-400">✓ {file.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2 uppercase">
                    Sheet Name <span className="text-gray-600">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Sheet1"
                    value={formData.sheet_name}
                    onChange={(e) => setFormData({...formData, sheet_name: e.target.value})}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2 uppercase">
                    Dataset Name <span className="text-gray-600">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Sales Data Q4"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  onClick={handleUpload}
                  disabled={!file || uploading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl py-3 transition-all flex items-center justify-center space-x-2 mt-6"
                >
                  {uploading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      <span>Upload Dataset</span>
                    </>
                  )}
                </button>
              </div>

              {uploadResult && (
                <div className="mt-4">
                  <p className={`text-sm text-center rounded-lg py-2 px-4 ${
                    uploadResult.includes('✅') 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                      : 'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}>
                    {uploadResult}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delay-1 { animation: float 6s ease-in-out infinite; animation-delay: 0.5s; }
        .animate-float-delay-2 { animation: float 7s ease-in-out infinite; animation-delay: 1s; }
        .animate-float-delay-3 { animation: float 6.5s ease-in-out infinite; animation-delay: 1.5s; }
      `}</style>
    </div>
  );
};

export default SQLGeneratorJulius;