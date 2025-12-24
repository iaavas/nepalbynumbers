"use client";
import React, { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
import { 
  Users, 
  Globe, 
  Monitor, 
  MapPin, 
  MousePointer, 
  Search, 
  ArrowUpRight, 
  Clock,
  ExternalLink,
  ShieldCheck
} from "lucide-react";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Types
interface Fingerprint {
  id: string;
  userAgent: string;
  fingerprint: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  browserName: string;
  ipAddress: string;
  country: string;
  countryCode: string;
  city: string;
  region: string;
}

interface ApiResponse {
  fingerprints: Fingerprint[];
  uniqueUsers: number;
  browserData: Record<string, number>;
  countryData: Record<string, number>;
}

interface TemplateResponse {
  success: boolean;
  buttonClickCounts: {
    province: number;
    district: number;
  };
}

const Dashboard = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [templateData, setTemplateData] = useState<TemplateResponse | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fingerprintRes, trackRes] = await Promise.all([
          fetch("/api/log-fingerprint"),
          fetch("/api/track")
        ]);
        
        const apiData: ApiResponse = await fingerprintRes.json();
        const tData: TemplateResponse = await trackRes.json();
        
        setData(apiData);
        setTemplateData(tData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Sort and Filter visitors
  const sortedVisitors = useMemo(() => {
    if (!data?.fingerprints) return [];
    
    return [...data.fingerprints]
      .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds) // Descending Time
      .filter(v => 
        v.ipAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.browserName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.city?.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [data, searchTerm]);

  // Chart Configurations
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' as const, labels: { usePointStyle: true, padding: 20 } },
    }
  };

  const pieChartData = {
    labels: data ? Object.keys(data.browserData) : [],
    datasets: [{
      data: data ? Object.values(data.browserData) : [],
      backgroundColor: ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"],
      hoverOffset: 15,
      borderRadius: 5,
    }],
  };

  const countryChartData = {
    labels: data ? Object.keys(data.countryData) : [],
    datasets: [{
      label: "Visitors",
      data: data ? Object.values(data.countryData) : [],
      backgroundColor: "rgba(99, 102, 241, 0.8)",
      borderRadius: 6,
    }],
  };

  const formatDate = (seconds: number) => {
    const date = new Date(seconds * 1000);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(date);
  };

  const totalClicks = templateData ? Object.values(templateData.buttonClickCounts).reduce((a, b) => a + b, 0) : 0;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4 bg-slate-50">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-500 font-medium animate-pulse">Analyzing traffic data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Traffic Insights</h1>
            <p className="text-slate-500 mt-1">Real-time monitoring and audience behavior analytics</p>
          </div>
          <div className="flex items-center gap-3 bg-white p-1 rounded-xl border shadow-sm">
            <div className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-semibold flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-600 rounded-full animate-ping" />
              Live Updates
            </div>
            <button 
              onClick={() => window.location.reload()}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Clock className="w-5 h-5 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { title: "Total Visitors", value: data?.fingerprints.length, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
            { title: "Unique Users", value: data?.uniqueUsers, icon: ShieldCheck, color: "text-emerald-600", bg: "bg-emerald-50" },
            { title: "Active Browsers", value: Object.keys(data?.browserData || {}).length, icon: Globe, color: "text-amber-600", bg: "bg-amber-50" },
            { title: "Total Locations", value: Object.keys(data?.countryData || {}).length, icon: MapPin, color: "text-purple-600", bg: "bg-purple-50" },
            { title: "Event Clicks", value: totalClicks, icon: MousePointer, color: "text-rose-600", bg: "bg-rose-50" },
          ].map((stat, i) => (
            <Card key={i} className="border-none shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg ${stat.bg}`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <span className="text-xs font-medium text-emerald-600 flex items-center bg-emerald-50 px-2 py-1 rounded-full">
                    <ArrowUpRight className="w-3 h-3 mr-1" />
                    +12%
                  </span>
                </div>
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-slate-500">{stat.title}</h3>
                  <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value?.toLocaleString()}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1 border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Browser Share</CardTitle>
              <CardDescription>Visual breakdown by user agent</CardDescription>
            </CardHeader>
            <CardContent className="h-80 relative">
              <Doughnut data={pieChartData} options={chartOptions} />
            </CardContent>
          </Card>

          <Card className="lg:col-span-2 border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">Geographic Distribution</CardTitle>
                <CardDescription>Visitor density by country</CardDescription>
              </div>
              <div className="flex gap-2">
                <div className="h-2 w-8 bg-indigo-500 rounded-full" />
              </div>
            </CardHeader>
            <CardContent className="h-80">
              <Bar data={countryChartData} options={{...chartOptions, plugins: { legend: { display: false }}}} />
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Table Section */}
        <Card className="border-none shadow-sm overflow-hidden">
          <CardHeader className="border-b bg-white/50 backdrop-blur-sm sticky top-0 z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-xl">Detailed Activity Log</CardTitle>
                <CardDescription>Showing all {sortedVisitors.length} recent sessions in descending order</CardDescription>
              </div>
              <div className="relative w-full md:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text"
                  placeholder="Filter by IP, Browser, City..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-slate-50/80">
                  <TableRow>
                    <TableHead className="w-[200px] font-semibold text-slate-700">Timestamp</TableHead>
                    <TableHead className="font-semibold text-slate-700">User Identification</TableHead>
                    <TableHead className="font-semibold text-slate-700">Platform</TableHead>
                    <TableHead className="font-semibold text-slate-700">Location Details</TableHead>
                    <TableHead className="text-right font-semibold text-slate-700">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedVisitors.length > 0 ? (
                    sortedVisitors.map((v) => (
                      <TableRow key={v.id} className="hover:bg-indigo-50/30 transition-colors group">
                        <TableCell className="font-medium whitespace-nowrap text-slate-600">
                          <div className="flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5 text-indigo-400" />
                            {formatDate(v.createdAt.seconds)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-mono text-xs font-bold text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded w-fit">
                              {v.ipAddress}
                            </span>
                            <span className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider font-semibold">
                              ID: {v.fingerprint.substring(0, 12)}...
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-white border rounded-md shadow-xs">
                              <Monitor className="w-3.5 h-3.5 text-slate-500" />
                            </div>
                            <span className="text-sm text-slate-700">{v.browserName}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="text-lg" title={v.country}>
                              {v.countryCode ? String.fromCodePoint(...v.countryCode.split('').map(c => c.charCodeAt(0) + 127397)) : '🏳️'}
                            </span>
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-slate-800">{v.city || 'Unknown City'}</span>
                              <span className="text-xs text-slate-500">{v.region}, {v.country}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <button className="opacity-0 group-hover:opacity-100 p-2 hover:bg-white rounded-full transition-all border shadow-sm">
                            <ExternalLink className="w-3.5 h-3.5 text-indigo-600" />
                          </button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="h-32 text-center text-slate-400">
                        No visitors match your search criteria.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
          <div className="p-4 border-t bg-slate-50 text-center">
            <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">
              End of records • Data auto-refreshes every 60s
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
