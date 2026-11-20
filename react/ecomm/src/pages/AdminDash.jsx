import React, { useEffect, useMemo, useState } from "react";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  ChartNoAxesCombined,
  Tags,
  Star,
  Settings,
  Search,
  Bell,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  IndianRupee,
  MoreHorizontal,
  Menu,
  Eye,
  X,
  ExternalLink,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import "../styles/AdminDash.css";
import AddProduct from "../components/AddProduct";
import AddCategory from "../components/AddCategory";
import { clearSession, logout } from "../services/authService"; 
import { useNavigate } from "react-router-dom";

// Default fallback data (Jab tak API connect na ho tab tak ye dikhega)
const defaultDashboardData = {
  stats: {
    revenue: { value: "₹2,45,680", change: "+12.8%", positive: true },
    orders: { value: "1,248", change: "+8.2%", positive: true },
    customers: { value: "892", change: "+5.4%", positive: true },
    productsSold: { value: "3,456", change: "-2.1%", positive: false },
  },
  salesChart: [
    { day: "Mon", sales: 18000 },
    { day: "Tue", sales: 24000 },
    { day: "Wed", sales: 21000 },
    { day: "Thu", sales: 32000 },
    { day: "Fri", sales: 28000 },
    { day: "Sat", sales: 42000 },
    { day: "Sun", sales: 51000 },
  ],
  channels: [
    { name: "Website", percentage: "58%", count: "724 orders" },
    { name: "Mobile App", percentage: "27%", count: "337 orders" },
    { name: "Social Media", percentage: "15%", count: "187 orders" },
  ],
  recentOrders: [
    {
      id: "#ORD-7841",
      customer: "Aarav Sharma",
      date: "16 Nov 2026",
      amount: "₹4,299",
      status: "Delivered",
    },
    {
      id: "#ORD-7840",
      customer: "Priya Verma",
      date: "16 Nov 2026",
      amount: "₹2,150",
      status: "Processing",
    },
    {
      id: "#ORD-7839",
      customer: "Rahul Singh",
      date: "15 Nov 2026",
      amount: "₹6,799",
      status: "Shipped",
    },
    {
      id: "#ORD-7838",
      customer: "Ananya Gupta",
      date: "15 Nov 2026",
      amount: "₹1,499",
      status: "Pending",
    },
  ],
  topProducts: [
    {
      name: "Classic Gold Watch",
      category: "Accessories",
      sold: 128,
      revenue: "₹1,53,600",
      initials: "GW",
    },
    {
      name: "Minimal Leather Bag",
      category: "Fashion",
      sold: 96,
      revenue: "₹1,24,800",
      initials: "LB",
    },
    {
      name: "Wireless Headphones",
      category: "Electronics",
      sold: 84,
      revenue: "₹1,00,800",
      initials: "WH",
    },
  ],
  notifications: [
    "You have 12 orders waiting for review.",
    "Weekly sales report is ready.",
  ],
};

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Products", icon: Package },
  { label: "Orders", icon: ShoppingBag, count: "12" },
  { label: "Customers", icon: Users },
  { label: "Categories", icon: Tags },
  { label: "Analytics", icon: ChartNoAxesCombined },
  { label: "Reviews", icon: Star },
];

function StatCard({
  title,
  value,
  change,
  positive,
  icon: Icon,
  note,
  onMore,
}) {
  return (
    <article className="lx-stat-card">
      <div className="lx-stat-top">
        <span className="lx-stat-icon">
          <Icon size={19} />
        </span>
        <button
          className="lx-icon-button"
          aria-label={`More options for ${title}`}
          onClick={onMore}
        >
          <MoreHorizontal size={19} />
        </button>
      </div>
      <p className="lx-stat-title">{title}</p>
      <div className="lx-stat-value-row">
        <h2>{value}</h2>
        <span
          className={`lx-change ${positive ? "lx-positive" : "lx-negative"}`}
        >
          {positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {change}
        </span>
      </div>
      <p className="lx-stat-note">{note}</p>
    </article>
  );
}

function AdminDash() {
  // 👇 YAHAN APNI API KA BASE URL DAALEIN
  const API_BASE_URL = "http://localhost:8080/api/admin";

  const [activePage, setActivePage] = useState("Dashboard");
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [search, setSearch] = useState("");
  const [period, setPeriod] = useState("This week");
  const [dateRange, setDateRange] = useState("Last 7 days");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [showAllOrders, setShowAllOrders] = useState(false);
  const [toast, setToast] = useState("");
  const navigate=useNavigate();

  // API Data States
  const [dashboardData, setDashboardData] = useState(defaultDashboardData);
  const [loading, setLoading] = useState(false);

  const notify = (message) => {
    setToast(message);
    window.clearTimeout(window.__dashboardToastTimer);
    window.__dashboardToastTimer = window.setTimeout(() => setToast(""), 2600);
  };

  // 👇 API SE REAL DATA FETCH KARNE KA FUNCTION
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${API_BASE_URL}/dashboard?range=${encodeURIComponent(dateRange)}&period=${encodeURIComponent(period)}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              // Agar JWT Token use kar rahe hain to niche wali line uncomment karein:
              // "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
          },
        );

        if (!response.ok) {
          throw new Error("API response was not ok");
        }

        const data = await response.json();

        // API se aane wale data ko state mein set karein
        setDashboardData((prev) => ({
          stats: data.stats || prev.stats,
          salesChart: data.salesChart || prev.salesChart,
          channels: data.channels || prev.channels,
          recentOrders: data.recentOrders || prev.recentOrders,
          topProducts: data.topProducts || prev.topProducts,
          notifications: data.notifications || prev.notifications,
        }));
      } catch (error) {
        console.warn(
          "API connected nahi hai, sample data dikhaya ja raha hai:",
          error.message,
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [dateRange, period]);

  const filteredOrders = useMemo(() => {
    return dashboardData.recentOrders.filter((order) =>
      `${order.id} ${order.customer} ${order.status}`
        .toLowerCase()
        .includes(search.toLowerCase()),
    );
  }, [dashboardData.recentOrders, search]);

  const choosePage = (label) => {
    setActivePage(label);
    setShowMobileNav(false);
  };
  
  const handleLogout = async ()=>{
    setIsLoggingOut(true)
    try{
    await logout();
    clearSession();      
    navigate('/login');
    }
    catch(error){
      console.error("Logout failed:", error);
      alert("Logout Fail . Please try again !");
    }
    finally{
      setIsLoggingOut(false); 
    }

  }

  return (
    <div className="lx-admin-shell">
      <aside className={`lx-sidebar ${showMobileNav ? "lx-sidebar-open" : ""}`}>
        <div className="lx-brand">
          <div className="lx-brand-mark">L</div>
          <div>
            <div className="lx-brand-name">LUXORA</div>
            <span className="lx-brand-sub">ADMIN PANEL</span>
          </div>
          <button
            className="lx-mobile-close lx-icon-button"
            onClick={() => setShowMobileNav(false)}
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        <div className="lx-nav-label">MAIN MENU</div>
        <nav className="lx-nav-list" aria-label="Main navigation">
          {navItems.map(({ label, icon: Icon, count }) => (
            <button
              key={label}
              className={`lx-nav-item ${activePage === label ? "lx-active" : ""}`}
              onClick={() => choosePage(label)}
            >
              <Icon size={17} strokeWidth={1.8} />
              <span>{label}</span>
              {count && <span className="lx-nav-count">{count}</span>}
            </button>
          ))}
        </nav>

        <div className="lx-sidebar-bottom">
          <div className="lx-nav-label">PREFERENCES</div>
          <button
            className={`lx-nav-item ${activePage === "Settings" ? "lx-active" : ""}`}
            onClick={() => choosePage("Settings")}
          >
            <Settings size={17} />
            <span>Settings</span>
          </button>

          <div className="lx-upgrade-card">
            <Star size={17} color="#c9a34a" />
            <strong>Grow your store</strong>
            <p>Explore your store insights and discover new opportunities.</p>
            <button onClick={() => choosePage("Analytics")}>
              View insights
            </button>
          </div>

          <div className="lx-sidebar-footer">
            <div className="lx-avatar">AK</div>
            <div>
              Admin Account
              <small>Super Administrator</small>
            </div>
          </div>
        </div>
      </aside>

      {showMobileNav && (
        <button
          className="lx-mobile-backdrop"
          aria-label="Close navigation"
          onClick={() => setShowMobileNav(false)}
        />
      )}

      <main className="lx-main-area">
        <header className="lx-topbar">
          <div className="lx-breadcrumb">
            <button
              className="lx-mobile-menu lx-icon-button"
              onClick={() => setShowMobileNav(true)}
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
            <span>Pages&nbsp; / &nbsp;</span>
            <strong>{activePage}</strong>
          </div>

          <div className="lx-top-actions">
            <label className="lx-search-box">
              <Search size={15} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search orders..."
                aria-label="Search orders"
              />
            </label>

            <div className="lx-popover-wrap">
              <button
                className="lx-icon-button lx-bell-wrap"
                aria-label="Notifications"
                onClick={() => {
                  setShowNotifications((v) => !v);
                  setShowProfile(false);
                }}
              >
                <Bell size={19} />
                {dashboardData.notifications.length > 0 && (
                  <span className="lx-bell-dot" />
                )}
              </button>
              {showNotifications && (
                <div className="lx-popover-panel">
                  <strong>Notifications</strong>
                  {dashboardData.notifications.map((note, idx) => (
                    <p key={idx}>{note}</p>
                  ))}
                  <button
                    className="lx-text-action"
                    onClick={() => {
                      setShowNotifications(false);
                      notify("Notifications marked as read");
                    }}
                  >
                    Mark all as read
                  </button>
                </div>
              )}
            </div>

            <div className="lx-popover-wrap">
              <button
                className="lx-profile lx-profile-button"
                onClick={() => {
                  setShowProfile((v) => !v);
                  setShowNotifications(false);
                }}
              >
                <div className="lx-avatar">AK</div>
                <span>Admin</span>
                <ChevronDown size={14} />
              </button>
              {showProfile && (
                <div className="lx-popover-panel lx-profile-menu">
                  <strong>Alok Kumar</strong>
                  <small>Super Administrator</small>
                  <button
                    onClick={() => {
                      choosePage("Settings");
                      setShowProfile(false);
                    }}
                  >
                    Account settings
                  </button>
                  <button onClick={handleLogout} disabled={isLoggingOut}>
                    {isLoggingOut ? 'Logging out...' :'Logout' }
                    </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="lx-content">
          {activePage === "Products" ? (
            <AddProduct onBack={() => setActivePage("Dashboard")}/>
          ) : activePage === "Categories" ? (
            <AddCategory onBack={() => setActivePage("Dashboard")}/>
          ) : (
            <>
              <div className="lx-page-heading">
                <div>
                  <p className="lx-eyebrow">
                    OVERVIEW {loading ? "• SYNCING..." : ""}
                  </p>
                  <h1>{activePage}</h1>
                  <p>
                    Welcome back! Here's what's happening with your store today.
                  </p>
                </div>
                <div className="lx-heading-actions">
                  <select
                    className="lx-outline-btn lx-date-select"
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    aria-label="Date range"
                  >
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>This year</option>
                  </select>
                  <button
                    className="lx-gold-btn"
                    onClick={() => window.open("/", "_blank")}
                  >
                    <Eye size={14} /> View store <ExternalLink size={12} />
                  </button>
                </div>
              </div>

              <section className="lx-stats-grid" aria-label="Store statistics">
                <StatCard
                  title="Total Revenue"
                  value={dashboardData.stats.revenue.value}
                  change={dashboardData.stats.revenue.change}
                  positive={dashboardData.stats.revenue.positive}
                  icon={IndianRupee}
                  note={`Compared to ${dateRange.toLowerCase()}`}
                  onMore={() => notify("Revenue details selected")}
                />
                <StatCard
                  title="Total Orders"
                  value={dashboardData.stats.orders.value}
                  change={dashboardData.stats.orders.change}
                  positive={dashboardData.stats.orders.positive}
                  icon={ShoppingBag}
                  note={`Compared to ${dateRange.toLowerCase()}`}
                  onMore={() => choosePage("Orders")}
                />
                <StatCard
                  title="Total Customers"
                  value={dashboardData.stats.customers.value}
                  change={dashboardData.stats.customers.change}
                  positive={dashboardData.stats.customers.positive}
                  icon={Users}
                  note={`Compared to ${dateRange.toLowerCase()}`}
                  onMore={() => choosePage("Customers")}
                />
                <StatCard
                  title="Products Sold"
                  value={dashboardData.stats.productsSold.value}
                  change={dashboardData.stats.productsSold.change}
                  positive={dashboardData.stats.productsSold.positive}
                  icon={Package}
                  note={`Compared to ${dateRange.toLowerCase()}`}
                  onMore={() => choosePage("Products")}
                />
              </section>

              <section className="lx-middle-grid">
                <article className="lx-panel">
                  <div className="lx-panel-heading">
                    <div>
                      <h3>Sales Overview</h3>
                      <p>Revenue performance for {period.toLowerCase()}</p>
                      <div className="lx-chart-total">
                        {dashboardData.stats.revenue.value}
                      </div>
                    </div>
                    <select
                      className="lx-select-small"
                      value={period}
                      onChange={(e) => setPeriod(e.target.value)}
                      aria-label="Sales chart period"
                    >
                      <option>This week</option>
                      <option>This month</option>
                      <option>This year</option>
                    </select>
                  </div>
                  <div className="lx-chart-wrap">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={dashboardData.salesChart}
                        margin={{ top: 8, right: 8, left: -18, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient
                            id="lxGoldFill"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="0%"
                              stopColor="#c9a34a"
                              stopOpacity={0.28}
                            />
                            <stop
                              offset="95%"
                              stopColor="#c9a34a"
                              stopOpacity={0.015}
                            />
                          </linearGradient>
                        </defs>
                        <CartesianGrid
                          stroke="#efeee9"
                          strokeDasharray="3 3"
                          vertical={false}
                        />
                        <XAxis
                          dataKey="day"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "#999", fontSize: 10 }}
                          dy={10}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "#999", fontSize: 9 }}
                          tickFormatter={(v) => `₹${v / 1000}k`}
                        />
                        <Tooltip
                          formatter={(value) => [
                            `₹${Number(value).toLocaleString("en-IN")}`,
                            "Sales",
                          ]}
                        />
                        <Area
                          type="monotone"
                          dataKey="sales"
                          stroke="#b28b36"
                          strokeWidth={2.5}
                          fill="url(#lxGoldFill)"
                          activeDot={{
                            r: 5,
                            fill: "#c9a34a",
                            stroke: "#fff",
                            strokeWidth: 2,
                          }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="lx-chart-period-note">Showing: {period}</p>
                </article>

                <article className="lx-panel">
                  <div className="lx-panel-heading">
                    <div>
                      <h3>Sales by Channel</h3>
                      <p>Where your orders come from</p>
                    </div>
                    <button
                      className="lx-icon-button"
                      aria-label="Channel information"
                      onClick={() => notify("Live channel sales data")}
                    >
                      <MoreHorizontal size={19} />
                    </button>
                  </div>
                  <div className="lx-channel-list">
                    {dashboardData.channels.map((item) => (
                      <div className="lx-channel-row" key={item.name}>
                        <span className="lx-channel-name">{item.name}</span>
                        <strong className="lx-channel-value">
                          {item.percentage}
                        </strong>
                        <div className="lx-progress">
                          <span style={{ width: item.percentage }} />
                        </div>
                        <span className="lx-channel-foot">{item.count}</span>
                      </div>
                    ))}
                  </div>
                </article>
              </section>

              <section className="lx-bottom-grid">
                <article className="lx-panel">
                  <div className="lx-panel-heading">
                    <div>
                      <h3>Recent Orders</h3>
                      <p>Keep track of your latest customer orders</p>
                    </div>
                    <button
                      className="lx-view-all"
                      onClick={() => setShowAllOrders((v) => !v)}
                    >
                      {showAllOrders ? "Show less" : "View all orders"} ↗
                    </button>
                  </div>
                  <div className="lx-table-wrap">
                    <table>
                      <thead>
                        <tr>
                          <th>ORDER ID</th>
                          <th>CUSTOMER</th>
                          <th>DATE</th>
                          <th>AMOUNT</th>
                          <th>STATUS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(showAllOrders
                          ? filteredOrders
                          : filteredOrders.slice(0, 4)
                        ).map((order) => (
                          <tr
                            key={order.id}
                            onClick={() => notify(`Selected order ${order.id}`)}
                            className="lx-clickable-row"
                          >
                            <td>{order.id}</td>
                            <td>{order.customer}</td>
                            <td>{order.date}</td>
                            <td>{order.amount}</td>
                            <td>
                              <span
                                className={`lx-status lx-status-${order.status.toLowerCase()}`}
                              >
                                {order.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                        {filteredOrders.length === 0 && (
                          <tr>
                            <td colSpan="5" className="lx-empty-state">
                              No matching orders found.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </article>

                <article className="lx-panel">
                  <div className="lx-panel-heading">
                    <div>
                      <h3>Top Selling Products</h3>
                      <p>Your best performing products</p>
                    </div>
                    <button
                      className="lx-view-all"
                      onClick={() => choosePage("Products")}
                    >
                      See all ↗
                    </button>
                  </div>
                  <div className="lx-product-list">
                    {dashboardData.topProducts.map((product) => (
                      <button
                        className="lx-product-row lx-product-button"
                        key={product.name}
                        onClick={() => notify(`${product.name} selected`)}
                      >
                        <span className="lx-product-thumb">
                          {product.initials}
                        </span>
                        <span className="lx-product-info">
                          <strong>{product.name}</strong>
                          <small>
                            {product.category} · {product.sold} sold
                          </small>
                        </span>
                        <span className="lx-product-sales">
                          <strong>{product.revenue}</strong>
                          <small>Revenue</small>
                        </span>
                      </button>
                    ))}
                  </div>
                </article>
              </section>
            </>
          )}
          ;
        </div>
      </main>

      {toast && (
        <div className="lx-toast" role="status">
          {toast}
        </div>
      )}
    </div>
  );
}

export default AdminDash;
