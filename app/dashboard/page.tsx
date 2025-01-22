"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
import { Users, Globe, Monitor, MapPin, MousePointer } from "lucide-react";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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
  const [templateData, setTemplateData] = useState<TemplateResponse | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/log-fingerprint");
      const apiData: ApiResponse = await response.json();
      setData(apiData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/track");
      const apiData: TemplateResponse = await response.json();
      setTemplateData(apiData);
    };

    fetchData();
  }, []);

  const pieChartData = {
    labels: data ? Object.keys(data.browserData) : [],
    datasets: [
      {
        data: data ? Object.values(data.browserData) : [],
        backgroundColor: [
          "#3498db",
          "#2ecc71",
          "#e74c3c",
          "#f1c40f",
          "#9b59b6",
          "#1abc9c",
        ],
        borderWidth: 1,
      },
    ],
  };

  const countryChartData = {
    labels: data ? Object.keys(data.countryData) : [],
    datasets: [
      {
        label: "Visitors by Country",
        data: data ? Object.values(data.countryData) : [],
        backgroundColor: "#3498db",
      },
    ],
  };

  const buttonClickData = {
    labels: templateData ? Object.keys(templateData.buttonClickCounts) : [],
    datasets: [
      {
        label: "Button Clicks",
        data: templateData ? Object.values(templateData.buttonClickCounts) : [],
        backgroundColor: "#e74c3c",
      },
    ],
  };

  const formatDate = (seconds: number) => {
    return new Date(seconds * 1000).toLocaleDateString();
  };

  if (!data || !templateData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Loading dashboard data...</p>
      </div>
    );
  }

  const totalClicks = Object.values(templateData.buttonClickCounts).reduce(
    (sum, count) => sum + count,
    0
  );

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold mb-8">Analytics Dashboard</h1>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Visitors
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.fingerprints.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Unique Users</CardTitle>
            <Monitor className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.uniqueUsers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Browsers</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Object.keys(data.browserData).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Countries</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Object.keys(data.countryData).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
            <MousePointer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalClicks}</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Browser Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <Doughnut
                data={pieChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Visitors by Country</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <Bar
                data={countryChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Button Click Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <Bar
                data={buttonClickData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Visitors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Browser</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Location</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.fingerprints.slice(0, 10).map((fingerprint) => (
                  <TableRow key={fingerprint.id}>
                    <TableCell>
                      {formatDate(fingerprint.createdAt.seconds)}
                    </TableCell>
                    <TableCell>{fingerprint.browserName}</TableCell>
                    <TableCell>{fingerprint.ipAddress}</TableCell>
                    <TableCell>
                      {fingerprint.region}, {fingerprint.country}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
