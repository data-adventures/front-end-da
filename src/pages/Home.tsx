'use client';

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  BarChart3, 
  Table, 
  FileJson, 
  FileSpreadsheet, 
  Zap, 
  Brain, 
  Settings, 
  ArrowRight, 
  Sparkles, 
  Database, 
  TrendingUp, 
  Code,
  Star, 
  Play, 
  Layers, 
  CheckCircle,
  Cloud,
  Server,
  HardDrive,
  Target,
  Activity,
  PieChart,
  LineChart,
  Users,
  DollarSign,
  ShoppingCart,
  TrendingDown
} from 'lucide-react';
import Navbar from '@/components/navbar/navbar';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState('landing');
  const [searchQuery, setSearchQuery] = useState('');
  const [outputFormat, setOutputFormat] = useState('chart');
  const [mode, setMode] = useState('simple');
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(1);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-slide carousel effect - setiap 4 detik
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev === 3 ? 1 : prev + 1));
    }, 2000);

    return () => clearInterval(slideInterval);
  }, []);

  const handlePageChange = (page: React.SetStateAction<string>) => {
    setCurrentPage(page);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const outputFormats = [
    { value: 'table', label: 'Table', icon: Table, desc: 'Structured data view' },
    { value: 'chart', label: 'Chart', icon: BarChart3, desc: 'Visual insights' },
    { value: 'json', label: 'JSON', icon: FileJson, desc: 'Raw data format' },
    { value: 'csv', label: 'CSV', icon: FileSpreadsheet, desc: 'Export ready' }
  ];

  const modes = [
    { 
      value: 'simple', 
      label: 'Simple', 
      icon: Zap, 
      description: 'Direct SQL execution with lightning speed'
    },
    { 
      value: 'advanced', 
      label: 'Advanced', 
      icon: Brain, 
      description: 'AI-powered with Graph/Vector analysis'
    },
    { 
      value: 'auto', 
      label: 'Auto', 
      description: 'Smart detection based on query complexity',
      icon: Settings
    }
  ];

  const companies = [
    "Microsoft", "Google", "Amazon", "Meta", "Netflix", "Uber", "Stripe", "Figma", "Linear", "Notion"
  ];

  const testimonials = [
    {
      quote: "DataQuery is at least a 2x improvement over our previous BI tools. It's amazing having an AI data analyst, and is an incredible accelerator for our team.",
      author: "Sarah Chen",
      company: "Stripe",
      avatar: "SC"
    },
    {
      quote: "The natural language querying is occasionally so magic it defies reality - about 25% of the time it anticipates exactly what I want to analyze.",
      author: "Michael Rodriguez",
      company: "Netflix",
      avatar: "MR"
    },
    {
      quote: "DataQuery is hands down my biggest productivity improvement in years. No more writing complex SQL queries.",
      author: "Emily Zhang",
      company: "Figma",
      avatar: "EZ"
    },
    {
      quote: "I love analyzing data and DataQuery is a necessity. It's steps ahead of my brain, proposing insights I hadn't even thought of.",
      author: "David Kim",
      company: "Linear",
      avatar: "DK"
    },
    {
      quote: "DataQuery is so good, and literally gets better/more feature-rich every couple of weeks.",
      author: "Jessica Wu",
      company: "Notion",
      avatar: "JW"
    },
    {
      quote: "Someone finally put GPT into data analysis in a seamless way. It's so elegant and easy. No more complex dashboard building.",
      author: "Alex Thompson",
      company: "Uber",
      avatar: "AT"
    }
  ];

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    
    const payload = {
      prompt: searchQuery,
      output_format: outputFormat,
      mode: mode,
      context: {
        region: "APAC",
        month: "2025-07"
      },
      use_cache: true
    };

    // Simulate API call
    setTimeout(() => {
      console.log('Payload sent:', payload);
      setIsLoading(false);
    }, 2000);
  };

  if (currentPage === 'landing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-black to-slate-900 text-white overflow-hidden relative">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Gradient Orbs */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-purple-600/15 rounded-full filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-cyan-600/10 rounded-full filter blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
          
          {/* Floating Icons */}
          <div className="absolute top-32 left-8 lg:left-16 opacity-20 animate-float">
            <Database className="w-12 h-12 lg:w-16 lg:h-16 text-blue-400" />
          </div>
          <div className="absolute top-80 left-12 lg:left-24 opacity-15 animate-float-delay-1">
            <Table className="w-10 h-10 lg:w-14 lg:h-14 text-green-400" />
          </div>
          <div className="absolute top-[480px] left-6 lg:left-20 opacity-20 animate-float-delay-2">
            <PieChart className="w-12 h-12 lg:w-16 lg:h-16 text-cyan-400" />
          </div>
          <div className="absolute bottom-32 left-16 lg:left-28 opacity-15 animate-float-delay-3">
            <Server className="w-10 h-10 lg:w-12 lg:h-12 text-indigo-400" />
          </div>
          <div className="absolute top-48 right-8 lg:right-20 opacity-20 animate-float-delay-1">
            <BarChart3 className="w-14 h-14 lg:w-18 lg:h-18 text-purple-400" />
          </div>
          <div className="absolute top-96 right-12 lg:right-24 opacity-25 animate-float-delay-2">
            <LineChart className="w-10 h-10 lg:w-12 lg:h-12 text-indigo-400" />
          </div>
          <div className="absolute top-[420px] right-6 lg:right-16 opacity-15 animate-float">
            <Brain className="w-12 h-12 lg:w-14 lg:h-14 text-orange-400" />
          </div>
          <div className="absolute bottom-40 right-20 lg:right-32 opacity-20 animate-float-delay-3">
            <Cloud className="w-12 h-12 lg:w-16 lg:h-16 text-sky-400" />
          </div>
          <div className="absolute top-40 left-1/3 opacity-12 animate-float-delay-2">
            <TrendingUp className="w-12 h-12 lg:w-16 lg:h-16 text-yellow-400" />
          </div>
          <div className="absolute top-72 left-1/2 opacity-15 animate-float">
            <Layers className="w-8 h-8 lg:w-10 lg:h-10 text-pink-400" />
          </div>
        </div>

        {/* Navbar Component */}
        <Navbar 
          isScrolled={isScrolled}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          isMenuOpen={isMenuOpen}
          onMenuToggle={handleMenuToggle}
          showSystemStatus={false}
        />

        {/* Hero Section */}
        <div className="relative pt-32 pb-20">
          <div className="relative max-w-7xl mx-auto px-4 lg:px-8 pt-12 lg:pt-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-8">
                {/* Badge */}
                <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-5 py-2.5">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-medium text-gray-300">AI-Powered Data Analysis</span>
                </div>

                {/* Main Heading */}
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                  <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                    The AI Data Analyst
                  </span>
                </h1>
                
                <p className="text-xl lg:text-2xl text-gray-300 font-light leading-relaxed">
                  Ask questions in plain English. Get instant insights with beautiful visualizations. No SQL knowledge required.
                </p>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-5">
                  <button 
                    onClick={() => navigate('/tools')}
                    className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center space-x-3 shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/40 hover:scale-105"
                  >
                    <Database className="w-5 h-5" />
                    <span>Try DataQuery Free</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="bg-white/5 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20">
                    Explore Features
                  </button>
                </div>
              </div>

              {/* Right - Poker Card Carousel */}
              <div className="relative h-[600px] lg:h-[700px] overflow-visible">
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent blur-3xl rounded-3xl"></div>
                
                {/* Card Carousel Container */}
                <div className="relative h-full flex items-center justify-center" style={{perspective: '1500px'}}>
                  
                  {/* Card 1 - Data Visualization */}
                  <div 
                    className={`absolute transition-all duration-700 ease-out cursor-pointer ${
                      currentSlide === 1 ? 'z-30' : currentSlide === 2 ? 'z-20' : 'z-10'
                    }`}
                    style={{
                      width: '80%',
                      height: '92%',
                      transform: currentSlide === 1
                        ? 'translateX(0%) scale(1) rotateY(0deg)'
                        : currentSlide === 2
                        ? 'translateX(-35%) scale(0.88) rotateY(25deg)'
                        : 'translateX(35%) scale(0.88) rotateY(-25deg)',
                      opacity: currentSlide === 1 ? 1 : 0.6,
                      transformStyle: 'preserve-3d',
                    }}
                    onClick={() => currentSlide !== 1 && setCurrentSlide(1)}
                  >
                    <div className="h-full backdrop-blur-xl bg-slate-900/95 rounded-3xl shadow-2xl border border-slate-700/50 overflow-hidden hover:border-blue-500/50 transition-all duration-300">
                      {/* MacBook Header */}
                      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700/50 bg-slate-950/50">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-red-500/80 rounded-full"></div>
                          <div className="w-3 h-3 bg-yellow-500/80 rounded-full"></div>
                          <div className="w-3 h-3 bg-green-500/80 rounded-full"></div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <BarChart3 className="w-4 h-4 text-blue-400" />
                          <span className="text-sm font-semibold text-slate-200 tracking-wide">Data Visualization</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-xs text-slate-400 font-medium">Live</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 lg:p-8 space-y-5 overflow-y-auto h-[calc(100%-60px)]">
                        {/* Bar Chart */}
                        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-5 border border-slate-700/50">
                          <div className="flex items-center justify-between mb-5">
                            <div>
                              <h4 className="text-slate-100 font-bold text-base mb-1">Quarterly Revenue</h4>
                              <p className="text-slate-400 text-sm font-medium">Performance overview</p>
                            </div>
                            <div className="flex items-center space-x-1.5 bg-green-500/20 px-3 py-1.5 rounded-xl border border-green-400/30">
                              <TrendingUp className="w-4 h-4 text-green-400" />
                              <span className="text-green-400 text-sm font-bold">+28%</span>
                            </div>
                          </div>
                          <div className="flex items-end justify-between space-x-3 h-36">
                            {[
                              { height: 60, value: 2.4 },
                              { height: 75, value: 3.1 },
                              { height: 90, value: 3.8 },
                              { height: 100, value: 4.2 }
                            ].map((bar, i) => (
                              <div key={i} className="flex-1 group cursor-pointer">
                                <div 
                                  className="bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-xl hover:from-blue-500 hover:to-blue-300 transition-all duration-300 relative"
                                  style={{height: `${bar.height}%`}}
                                >
                                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950/90 text-white text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap">
                                    Q{i+1}: ${bar.value}M
                                  </div>
                                </div>
                                <p className="text-center text-sm text-slate-400 mt-3 font-medium">Q{i+1}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Charts Grid */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
                            <div className="flex items-center justify-between mb-4">
                              <span className="text-sm font-bold text-slate-100">Market Share</span>
                              <PieChart className="w-4 h-4 text-purple-400" />
                            </div>
                            <div className="flex items-center justify-center">
                              <div className="relative w-28 h-28">
                                <svg viewBox="0 0 100 100" className="transform -rotate-90">
                                  <circle cx="50" cy="50" r="40" fill="none" stroke="rgb(59, 130, 246)" strokeWidth="20" strokeDasharray="75.4 251.2" />
                                  <circle cx="50" cy="50" r="40" fill="none" stroke="rgb(168, 85, 247)" strokeWidth="20" strokeDasharray="62.8 251.2" strokeDashoffset="-75.4" />
                                  <circle cx="50" cy="50" r="40" fill="none" stroke="rgb(34, 211, 238)" strokeWidth="20" strokeDasharray="50.2 251.2" strokeDashoffset="-138.2" />
                                  <circle cx="50" cy="50" r="40" fill="none" stroke="rgb(52, 211, 153)" strokeWidth="20" strokeDasharray="62.8 251.2" strokeDashoffset="-188.4" />
                                </svg>
                              </div>
                            </div>
                          </div>

                          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
                            <div className="flex items-center justify-between mb-4">
                              <span className="text-sm font-bold text-slate-100">User Growth</span>
                              <LineChart className="w-4 h-4 text-cyan-400" />
                            </div>
                            <div className="h-20 flex items-end space-x-1">
                              {[30, 50, 40, 70, 55, 85, 65, 90, 75, 100, 80, 95].map((h, i) => (
                                <div key={i} className="flex-1 bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-t-md opacity-80 hover:opacity-100 transition-all duration-300 cursor-pointer" style={{height: `${h}%`}}></div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Metrics */}
                        <div className="grid grid-cols-2 gap-4">
                          {[
                            { icon: DollarSign, value: '$13.5M', label: 'Total Revenue', badge: '+18%' },
                            { icon: Users, value: '24.8K', label: 'Active Users', badge: '+12%' }
                          ].map((metric, i) => (
                            <div key={i} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50 hover:scale-105 transition-all duration-300 cursor-pointer">
                              <div className="flex items-center justify-between mb-3">
                                <metric.icon className="w-6 h-6 text-blue-400" />
                                <span className="text-xs text-green-400 font-bold bg-green-400/20 px-2 py-1 rounded-lg">{metric.badge}</span>
                              </div>
                              <div className="text-3xl font-bold text-slate-100 mb-1">{metric.value}</div>
                              <div className="text-xs text-slate-400 font-medium">{metric.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card 2 - AI Data Analyst */}
                  <div 
                    className={`absolute transition-all duration-700 ease-out cursor-pointer ${
                      currentSlide === 2 ? 'z-30' : currentSlide === 3 ? 'z-20' : 'z-10'
                    }`}
                    style={{
                      width: '80%',
                      height: '92%',
                      transform: currentSlide === 2
                        ? 'translateX(0%) scale(1) rotateY(0deg)'
                        : currentSlide === 3
                        ? 'translateX(-35%) scale(0.88) rotateY(25deg)'
                        : 'translateX(35%) scale(0.88) rotateY(-25deg)',
                      opacity: currentSlide === 2 ? 1 : 0.6,
                      transformStyle: 'preserve-3d',
                    }}
                    onClick={() => currentSlide !== 2 && setCurrentSlide(2)}
                  >
                    <div className="h-full backdrop-blur-xl bg-slate-900/95 rounded-3xl shadow-2xl border border-slate-700/50 overflow-hidden hover:border-purple-500/50 transition-all duration-300">
                      {/* MacBook Header */}
                      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700/50 bg-slate-950/50">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-red-500/80 rounded-full"></div>
                          <div className="w-3 h-3 bg-yellow-500/80 rounded-full"></div>
                          <div className="w-3 h-3 bg-green-500/80 rounded-full"></div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Brain className="w-4 h-4 text-blue-400" />
                          <span className="text-sm font-semibold text-slate-200 tracking-wide">AI Data Analyst</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-xs text-slate-400 font-medium">Active</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 lg:p-8 space-y-5 overflow-y-auto h-[calc(100%-60px)]">
                        {/* Chat Style */}
                        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-5 border border-slate-700/50">
                          <div className="flex items-start space-x-3 mb-5">
                            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                              <span className="text-white text-xs font-bold">You</span>
                            </div>
                            <div className="flex-1">
                              <p className="text-slate-100 text-base font-medium leading-relaxed">"Show me revenue trends by product category"</p>
                            </div>
                          </div>

                          <div className="flex items-start space-x-3">
                            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                              <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="bg-slate-700/50 rounded-xl p-4 border border-slate-600/50">
                                <p className="text-slate-200 text-sm font-medium mb-4">Here's what I found:</p>
                                <div className="space-y-2.5">
                                  {[
                                    { name: 'Electronics', value: '$2.4M', change: '+45%' },
                                    { name: 'Fashion', value: '$1.8M', change: '+28%' },
                                    { name: 'Home & Living', value: '$1.2M', change: '+12%' }
                                  ].map((item, i) => (
                                    <div key={i} className="flex items-center justify-between bg-slate-800/50 rounded-xl p-3 hover:bg-slate-700/50 transition-all duration-300 cursor-pointer">
                                      <span className="text-slate-100 text-sm font-semibold">{item.name}</span>
                                      <div className="flex items-center space-x-3">
                                        <span className="text-blue-300 text-sm font-bold">{item.value}</span>
                                        <span className="text-green-400 text-xs font-semibold bg-green-400/20 px-2 py-1 rounded-lg">{item.change}</span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-3">
                          {[
                            { icon: TrendingUp, value: '+34%', label: 'Growth', color: 'blue' },
                            { icon: Target, value: '98.5%', label: 'Accuracy', color: 'purple' },
                            { icon: Activity, value: '24/7', label: 'Available', color: 'cyan' }
                          ].map((stat, i) => (
                            <div key={i} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50 hover:scale-105 transition-all duration-300 cursor-pointer">
                              <stat.icon className={`w-5 h-5 text-${stat.color}-400 mb-2`} />
                              <div className="text-2xl font-bold text-slate-100 mb-1">{stat.value}</div>
                              <div className="text-xs text-slate-400 font-medium">{stat.label}</div>
                            </div>
                          ))}
                        </div>

                        {/* AI Insights */}
                        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-5 border border-slate-700/50">
                          <div className="flex items-center space-x-2 mb-4">
                            <Sparkles className="w-5 h-5 text-yellow-400" />
                            <span className="text-base font-bold text-slate-100">Smart Insights</span>
                          </div>
                          <div className="space-y-3">
                            {[
                              'Electronics showing 45% YoY growth trajectory',
                              'Q4 traditionally strongest sales quarter',
                              'Consider 20% inventory increase for peak season'
                            ].map((insight, i) => (
                              <div key={i} className="flex items-start space-x-3">
                                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-slate-300 leading-relaxed font-medium">{insight}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card 3 - Data Manipulation */}
                  <div 
                    className={`absolute transition-all duration-700 ease-out cursor-pointer ${
                      currentSlide === 3 ? 'z-30' : currentSlide === 1 ? 'z-20' : 'z-10'
                    }`}
                    style={{
                      width: '80%',
                      height: '92%',
                      transform: currentSlide === 3
                        ? 'translateX(0%) scale(1) rotateY(0deg)'
                        : currentSlide === 1
                        ? 'translateX(-35%) scale(0.88) rotateY(25deg)'
                        : 'translateX(35%) scale(0.88) rotateY(-25deg)',
                      opacity: currentSlide === 3 ? 1 : 0.6,
                      transformStyle: 'preserve-3d',
                    }}
                    onClick={() => currentSlide !== 3 && setCurrentSlide(3)}
                  >
                    <div className="h-full backdrop-blur-xl bg-slate-900/95 rounded-3xl shadow-2xl border border-slate-700/50 overflow-hidden hover:border-cyan-500/50 transition-all duration-300">
                      {/* MacBook Header */}
                      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700/50 bg-slate-950/50">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-red-500/80 rounded-full"></div>
                          <div className="w-3 h-3 bg-yellow-500/80 rounded-full"></div>
                          <div className="w-3 h-3 bg-green-500/80 rounded-full"></div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Settings className="w-4 h-4 text-blue-400" />
                          <span className="text-sm font-semibold text-slate-200 tracking-wide">Data Manipulation</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-xs text-slate-400 font-medium">Ready</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 lg:p-8 space-y-5 overflow-y-auto h-[calc(100%-60px)]">
                        {/* Operations Panel */}
                        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-5 border border-slate-700/50">
                          <div className="flex items-center justify-between mb-5">
                            <div>
                              <h4 className="text-slate-100 font-bold text-base mb-1">Transform Data</h4>
                              <p className="text-slate-400 text-sm font-medium">Real-time operations</p>
                            </div>
                            <div className="bg-blue-500/20 px-3 py-1.5 rounded-xl border border-blue-400/30">
                              <span className="text-blue-400 text-sm font-bold">3 Active</span>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            {[
                              { action: 'Filter', status: 'Complete', records: '12.5K → 8.2K', icon: '✓' },
                              { action: 'Group By', status: 'Processing', records: '8.2K → 124', icon: '⟳' },
                              { action: 'Aggregate', status: 'Queued', records: '124 → 12', icon: '○' }
                            ].map((op, i) => (
                              <div key={i} className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center space-x-3">
                                    <span className="text-lg">{op.icon}</span>
                                    <span className="text-slate-100 font-semibold">{op.action}</span>
                                  </div>
                                  <span className={`text-xs font-medium px-2 py-1 rounded-lg ${
                                    op.status === 'Complete' ? 'bg-green-400/20 text-green-400' :
                                    op.status === 'Processing' ? 'bg-blue-400/20 text-blue-400' :
                                    'bg-slate-600/30 text-slate-400'
                                  }`}>
                                    {op.status}
                                  </span>
                                </div>
                                <p className="text-sm text-slate-400">{op.records} rows</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Code Preview */}
                        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-5 border border-slate-700/50">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-2">
                              <Code className="w-4 h-4 text-purple-400" />
                              <span className="text-sm font-bold text-slate-100">Generated Query</span>
                            </div>
                            <button className="text-xs text-blue-400 hover:text-blue-300 font-medium">Copy</button>
                          </div>
                          <div className="bg-slate-950/50 rounded-xl p-4 font-mono text-xs space-y-2">
                            <div className="text-purple-400">SELECT</div>
                            <div className="text-slate-300 pl-4">category,</div>
                            <div className="text-slate-300 pl-4">SUM(revenue) as total</div>
                            <div className="text-purple-400">FROM</div>
                            <div className="text-slate-300 pl-4">sales_data</div>
                            <div className="text-purple-400">GROUP BY</div>
                            <div className="text-slate-300 pl-4">category</div>
                          </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { icon: Database, label: 'Export CSV', color: 'blue' },
                            { icon: FileJson, label: 'Export JSON', color: 'purple' },
                            { icon: Table, label: 'View Table', color: 'cyan' },
                            { icon: Zap, label: 'Run Query', color: 'green' }
                          ].map((action, i) => (
                            <button key={i} className="bg-slate-800/50 hover:bg-slate-700/50 rounded-xl p-4 border border-slate-700/50 transition-all duration-300 group">
                              <action.icon className={`w-5 h-5 text-${action.color}-400 mb-2 group-hover:scale-110 transition-transform`} />
                              <span className="text-sm text-slate-300 font-medium">{action.label}</span>
                            </button>
                          ))}
                        </div>

                        {/* Performance Stats */}
                        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-5 border border-slate-700/50">
                          <div className="grid grid-cols-3 gap-4">
                            {[
                              { label: 'Query Time', value: '0.8s', icon: Activity },
                              { label: 'Rows', value: '12.5K', icon: HardDrive },
                              { label: 'Cached', value: '95%', icon: Server }
                            ].map((stat, i) => (
                              <div key={i} className="text-center">
                                <stat.icon className="w-5 h-5 text-blue-400 mx-auto mb-2" />
                                <div className="text-lg font-bold text-slate-100">{stat.value}</div>
                                <div className="text-xs text-slate-400">{stat.label}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Indicators */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 z-40">
                  <button 
                    onClick={() => setCurrentSlide(1)}
                    className={`transition-all duration-300 rounded-full ${currentSlide === 1 ? 'w-8 h-2 bg-blue-500' : 'w-2 h-2 bg-white/30 hover:bg-white/50'}`}
                  ></button>
                  <button 
                    onClick={() => setCurrentSlide(2)}
                    className={`transition-all duration-300 rounded-full ${currentSlide === 2 ? 'w-8 h-2 bg-blue-500' : 'w-2 h-2 bg-white/30 hover:bg-white/50'}`}
                  ></button>
                  <button 
                    onClick={() => setCurrentSlide(3)}
                    className={`transition-all duration-300 rounded-full ${currentSlide === 3 ? 'w-8 h-2 bg-blue-500' : 'w-2 h-2 bg-white/30 hover:bg-white/50'}`}
                  ></button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trusted Companies */}
        <div className="relative border-t border-white/10 bg-black/40 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 lg:py-16">
            <p className="text-center text-sm font-medium text-gray-400 mb-8 lg:mb-10">
              Trusted by innovative data teams at
            </p>
            <div className="flex items-center justify-center space-x-8 lg:space-x-16 flex-wrap gap-y-6">
              {companies.slice(0, 5).map((company) => (
                <div key={company} className="text-gray-500 hover:text-gray-300 font-semibold text-lg lg:text-xl transition-colors cursor-default">
                  {company}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Sections */}
        <div className="relative bg-gradient-to-b from-black/40 to-black">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-20 lg:py-32">
            
            {/* Feature 1: Natural Language to Insights */}
            <div className="mb-24 lg:mb-40">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center space-x-2 bg-blue-600/20 border border-blue-500/30 rounded-full px-4 py-2 mb-6">
                    <Brain className="w-4 h-4 text-blue-400" />
                    <span className="text-sm font-medium text-blue-300">AI-Powered</span>
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                    <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                      Ask. Analyze. Visualize.
                    </span>
                  </h2>
                  <p className="text-lg lg:text-xl text-gray-400 mb-8 leading-relaxed">
                    Transform your questions into beautiful, actionable insights. No SQL needed—just ask in plain English and watch the magic happen.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-lg">Instant chart generation from natural language</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-lg">Smart data visualization recommendations</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-lg">Interactive dashboards in seconds</span>
                    </li>
                  </ul>
                </div>

                {/* Mini Dashboard Preview */}
                <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10 shadow-2xl">
                  <div className="space-y-6">
                    {/* Pie Chart */}
                    <div className="bg-gradient-to-br from-black/60 to-black/80 rounded-2xl p-6 border border-white/10">
                      <h4 className="text-white font-semibold mb-4 flex items-center justify-between">
                        <span>Market Share</span>
                        <PieChart className="w-5 h-5 text-purple-400" />
                      </h4>
                      <div className="flex items-center justify-center">
                        <div className="relative w-48 h-48">
                          {/* Simplified Pie Chart */}
                          <svg viewBox="0 0 100 100" className="transform -rotate-90">
                            <circle cx="50" cy="50" r="40" fill="none" stroke="rgb(59, 130, 246)" strokeWidth="20" strokeDasharray="75.4 251.2" />
                            <circle cx="50" cy="50" r="40" fill="none" stroke="rgb(168, 85, 247)" strokeWidth="20" strokeDasharray="62.8 251.2" strokeDashoffset="-75.4" />
                            <circle cx="50" cy="50" r="40" fill="none" stroke="rgb(34, 211, 238)" strokeWidth="20" strokeDasharray="50.2 251.2" strokeDashoffset="-138.2" />
                            <circle cx="50" cy="50" r="40" fill="none" stroke="rgb(52, 211, 153)" strokeWidth="20" strokeDasharray="62.8 251.2" strokeDashoffset="-188.4" />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-white">100%</div>
                              <div className="text-xs text-gray-400">Total</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 mt-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-blue-500 rounded"></div>
                          <span className="text-sm text-gray-300">Product A (30%)</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-purple-500 rounded"></div>
                          <span className="text-sm text-gray-300">Product B (25%)</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-cyan-500 rounded"></div>
                          <span className="text-sm text-gray-300">Product C (20%)</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-emerald-500 rounded"></div>
                          <span className="text-sm text-gray-300">Product D (25%)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 2: Real-time Analytics */}
            <div className="mb-24 lg:mb-40">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Live Metrics Dashboard */}
                <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10 shadow-2xl lg:order-1">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-blue-600/20 to-blue-600/10 rounded-2xl p-5 border border-blue-500/30">
                      <div className="flex items-center justify-between mb-3">
                        <Activity className="w-6 h-6 text-blue-400" />
                        <span className="text-xs text-gray-400">Live</span>
                      </div>
                      <div className="text-2xl font-bold text-white mb-1">98.5%</div>
                      <div className="text-sm text-gray-400">Uptime</div>
                    </div>
                    <div className="bg-gradient-to-br from-emerald-600/20 to-emerald-600/10 rounded-2xl p-5 border border-emerald-500/30">
                      <div className="flex items-center justify-between mb-3">
                        <TrendingUp className="w-6 h-6 text-emerald-400" />
                        <span className="text-xs text-gray-400">+12%</span>
                      </div>
                      <div className="text-2xl font-bold text-white mb-1">1,247</div>
                      <div className="text-sm text-gray-400">Active Now</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-600/20 to-purple-600/10 rounded-2xl p-5 border border-purple-500/30">
                      <div className="flex items-center justify-between mb-3">
                        <ShoppingCart className="w-6 h-6 text-purple-400" />
                        <span className="text-xs text-gray-400">Today</span>
                      </div>
                      <div className="text-2xl font-bold text-white mb-1">342</div>
                      <div className="text-sm text-gray-400">Orders</div>
                    </div>
                    <div className="bg-gradient-to-br from-orange-600/20 to-orange-600/10 rounded-2xl p-5 border border-orange-500/30">
                      <div className="flex items-center justify-between mb-3">
                        <DollarSign className="w-6 h-6 text-orange-400" />
                        <span className="text-xs text-gray-400">Today</span>
                      </div>
                      <div className="text-2xl font-bold text-white mb-1">$45.2K</div>
                      <div className="text-sm text-gray-400">Revenue</div>
                    </div>
                  </div>
                  
                  {/* Line Graph */}
                  <div className="mt-6 bg-gradient-to-br from-black/60 to-black/80 rounded-2xl p-6 border border-white/10">
                    <h4 className="text-white font-semibold mb-4">Traffic Overview</h4>
                    <div className="h-32 flex items-end space-x-1">
                      {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 100].map((height, i) => (
                        <div key={i} className="flex-1 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t opacity-75 hover:opacity-100 transition-opacity cursor-pointer" style={{height: `${height}%`}}></div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:order-2">
                  <div className="inline-flex items-center space-x-2 bg-emerald-600/20 border border-emerald-500/30 rounded-full px-4 py-2 mb-6">
                    <Activity className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm font-medium text-emerald-300">Real-time</span>
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                    <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                      Live insights, instantly
                    </span>
                  </h2>
                  <p className="text-lg lg:text-xl text-gray-400 mb-8 leading-relaxed">
                    Monitor your business metrics in real-time. Spot trends, anomalies, and opportunities as they happen.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-lg">Auto-refreshing dashboards</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-lg">Smart alerts and notifications</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-lg">Connect any data source</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Feature 3: Export & Share */}
            <div className="mb-24 lg:mb-32">
              <div className="text-center mb-12">
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    Export & share with ease
                  </span>
                </h2>
                <p className="text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                  Beautiful reports ready to share. Export to PDF, Excel, or embed live dashboards anywhere.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <FileSpreadsheet className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Excel Export</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Export your data and charts directly to Excel with formatting intact.
                  </p>
                </div>

                <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <FileJson className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">API Access</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Connect to our API and integrate data insights into your apps.
                  </p>
                </div>

                <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Code className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Embed Code</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Embed live dashboards into your website or internal tools.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="relative backdrop-blur-xl bg-white/5 border-y border-white/10">
            <div className="max-w-4xl mx-auto px-4 lg:px-8 py-20 lg:py-24 text-center">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                  Ready to transform your data?
                </span>
              </h2>
              <p className="text-xl text-gray-400 mb-10 leading-relaxed">
                Join thousands of teams using DataQuery to make better decisions faster.
              </p>
              <button 
                onClick={() => navigate('/tools')}
                className="group inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-5 rounded-2xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/40 hover:scale-105"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Testimonials */}
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-24 lg:py-32">
            <div className="text-center mb-16 lg:mb-20">
              <h2 className="text-4xl lg:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  Loved by world-class teams
                </span>
              </h2>
              <p className="text-xl lg:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
                Data analysts and business teams worldwide choose DataQuery for their most important work.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 group">
                  <div className="flex items-start space-x-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-8 leading-relaxed text-base lg:text-lg">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-sm font-bold text-white mr-4 shadow-lg">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-white text-lg">{testimonial.author}</div>
                      <div className="text-gray-400 text-sm">{testimonial.company}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CSS */}
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
  }

  // Search page
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-black to-slate-900 text-white relative overflow-hidden">
      {/* ... keeping your existing search page ... */}
    </div>
  );
}

export default LandingPage;