"use client";

import { TrendingUp, Users, DollarSign, MousePointer, Package, Target } from "lucide-react";

interface DashboardStatsProps {
  stats?: {
    totalClicks: number;
    totalSales: number;
    totalCommission: number;
    conversionRate: number;
  };
}

export default function DashboardStats({ stats }: DashboardStatsProps) {
  const defaultStats = {
    totalClicks: 1245,
    totalSales: 42,
    totalCommission: 1549.50,
    conversionRate: 3.4,
  };

  const data = stats || defaultStats;

  const statsCards = [
    {
      title: "Total Clicks",
      value: data.totalClicks.toLocaleString(),
      icon: <MousePointer className="h-5 w-5" />,
      change: "+12.5%",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Total Sales",
      value: data.totalSales,
      icon: <Package className="h-5 w-5" />,
      change: "+8.2%",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Total Commission",
      value: `$${data.totalCommission.toFixed(2)}`,
      icon: <DollarSign className="h-5 w-5" />,
      change: "+15.7%",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Conversion Rate",
      value: `${data.conversionRate.toFixed(1)}%`,
      icon: <Target className="h-5 w-5" />,
      change: "+2.5%",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Active Campaigns",
      value: "8",
      icon: <TrendingUp className="h-5 w-5" />,
      change: "+3",
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: "Total Affiliates",
      value: "1,234",
      icon: <Users className="h-5 w-5" />,
      change: "+45",
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {statsCards.map((stat, index) => (
        <div
          key={index}
          className={`${stat.bgColor} rounded-xl p-4 border hover:shadow-md transition-shadow`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.color} text-white`}>
              {stat.icon}
            </div>
            <span className="text-xs font-medium px-2 py-1 bg-white rounded-full border">
              {stat.change}
            </span>
          </div>
          <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
          <p className="text-sm text-gray-600">{stat.title}</p>
        </div>
      ))}
    </div>
  );
}