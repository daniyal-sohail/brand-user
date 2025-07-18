import React from "react";
import {
  Users,
  TrendingUp,
  DollarSign,
  FileText,
  Calendar,
  MessageSquare,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
} from "lucide-react";

// Main Dashboard Component
const Dashboard = () => {
  const stats = [
    {
      title: "Total Clients",
      value: "156",
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "bg-brand-warm-brown",
    },
    {
      title: "Monthly Revenue",
      value: "$48,250",
      change: "+8.2%",
      trend: "up",
      icon: DollarSign,
      color: "bg-brand-beige",
    },
    {
      title: "Active Projects",
      value: "23",
      change: "+5",
      trend: "up",
      icon: FileText,
      color: "bg-brand-soft-beige",
    },
    {
      title: "Content Pieces",
      value: "89",
      change: "+15",
      trend: "up",
      icon: TrendingUp,
      color: "bg-brand-light-beige",
    },
  ];

  const recentActivity = [
    {
      type: "client",
      title: "New client inquiry from Dr. Sarah Johnson",
      time: "2 hours ago",
      icon: Users,
      color: "text-brand-warm-brown",
    },
    {
      type: "project",
      title: "Content calendar approved for Med Spa Elite",
      time: "4 hours ago",
      icon: Calendar,
      color: "text-brand-beige",
    },
    {
      type: "content",
      title: "Blog post published: '5 Trends in Aesthetic Medicine'",
      time: "6 hours ago",
      icon: FileText,
      color: "text-brand-soft-beige",
    },
    {
      type: "message",
      title: "Client message from Dr. Michael Chen",
      time: "8 hours ago",
      icon: MessageSquare,
      color: "text-brand-light-beige",
    },
  ];

  const upcomingTasks = [
    {
      title: "Review content calendar for next week",
      due: "Today, 2:00 PM",
      priority: "high",
      client: "Dermatology Associates",
    },
    {
      title: "Client strategy call with Dr. Wilson",
      due: "Tomorrow, 10:00 AM",
      priority: "medium",
      client: "Wilson Aesthetics",
    },
    {
      title: "Social media content creation",
      due: "Friday, 9:00 AM",
      priority: "low",
      client: "Elite Med Spa",
    },
  ];

  return (
    <div className="space-y-6 bg-transparent">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="heading-primary mb-2">Welcome back, Admin</h1>
          <p className="text-brand-warm-brown font-poppins">
            Here&apos;s what&apos;s happening with your business today.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button className="btn-primary flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Quick Action</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="card p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-brand-warm-brown font-poppins mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-brand-charcoal font-poppins">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-brand-cream" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              {stat.trend === "up" ? (
                <ArrowUpRight className="h-4 w-4 text-green-500" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-red-500" />
              )}
              <span
                className={`text-sm ml-1 ${
                  stat.trend === "up" ? "text-green-500" : "text-red-500"
                }`}
              >
                {stat.change}
              </span>
              <span className="text-sm text-brand-warm-brown ml-2 font-poppins">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="heading-secondary">Recent Activity</h2>
              <button className="text-brand-warm-brown hover:text-brand-charcoal text-sm flex items-center font-poppins">
                View all <ArrowUpRight className="h-4 w-4 ml-1" />
              </button>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-brand-beige transition-colors"
                >
                  <div
                    className={`p-2 rounded-full bg-brand-cream ${activity.color}`}
                  >
                    <activity.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-brand-charcoal text-sm font-poppins">{activity.title}</p>
                    <p className="text-xs text-brand-warm-brown mt-1 font-poppins">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div>
          <div className="card p-6">
            <h2 className="heading-secondary mb-4">Upcoming Tasks</h2>
            <div className="space-y-4">
              {upcomingTasks.map((task, index) => (
                <div
                  key={index}
                  className="border-l-4 border-brand-warm-brown pl-4 py-2"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-brand-charcoal text-sm font-medium font-poppins">
                        {task.title}
                      </p>
                      <p className="text-xs text-brand-warm-brown mt-1 font-poppins">
                        {task.client}
                      </p>
                      <p className="text-xs text-brand-warm-brown mt-1 font-poppins">
                        Due: {task.due}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-poppins ${
                        task.priority === "high"
                          ? "bg-red-100 text-red-800"
                          : task.priority === "medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {task.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="heading-secondary">Performance Overview</h2>
          <div className="flex items-center space-x-2">
            <button className="text-brand-warm-brown hover:text-brand-charcoal text-sm font-poppins">
              Last 7 days
            </button>
            <button className="text-brand-warm-brown hover:text-brand-charcoal text-sm font-poppins">
              Last 30 days
            </button>
          </div>
        </div>
        <div className="h-64 bg-brand-beige rounded-lg flex items-center justify-center">
          <div className="text-center">
            <TrendingUp className="h-12 w-12 text-brand-warm-brown mx-auto mb-4" />
            <p className="text-brand-warm-brown font-poppins">Chart component would go here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

