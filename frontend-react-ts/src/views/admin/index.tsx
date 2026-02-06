//import FC from react
import { FC } from "react";

//import SidebarMenu
import SidebarMenu from "../../../components/SidebarMenu";

//import custom hook useAuthUser
import { useAuthUser } from "../../hooks/auth/useAuthUser";
import { dashboard } from "../../hooks/dashboard";
import DashboardCard from "./card";
import formatRupiah from "../../../helpers/amount";

// Chart
import { BarChart, barElementClasses } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { Graph } from "../../types/dashboard";

const Dashboard: FC = () => {
  // sample data for bar chart
  const colors: string[] = ["#006BD6", "#EC407A"];

  // get user from useAuthUser
  const user = useAuthUser();

  // get dashboard data from useDashboard
  const { data: dashboardData } = dashboard();
  const labels = dashboardData?.graph?.map((g: Graph) => g.name) ?? [];
  const stocks = dashboardData?.graph?.map((g: Graph) => g.stock) ?? [];
  const quantities = dashboardData?.graph?.map((g: Graph) => g.quantity) ?? [];

  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-md-3">
          <SidebarMenu />
        </div>
        <div className="col-md-9">
          <div className="card border-0 rounded-4 shadow-sm mb-4">
            <div className="card-header">DASHBOARD</div>

            <div className="card-body">
              {user ? (
                <p>
                  Selamat datang, <strong>{user.name}</strong>!
                </p>
              ) : (
                <p>Kamu belum login.</p>
              )}

              {/* Dashboard Cards */}
              <div className="row mt-4 bg">
                <DashboardCard
                  title="Total Users"
                  value={dashboardData?.totalUsers ?? 0}
                />
                <DashboardCard
                  title="Total Orders"
                  value={dashboardData?.totalOrders ?? 0}
                />

                <DashboardCard
                  title="Total Revenue"
                  value={formatRupiah(dashboardData?.totalRevenue ?? 0)}
                />
              </div>
            </div>

            {/* Bar Chart */}
            <div className="card-body">
              <div className="card-title mt-4 mb-4 fw-bold">Order Graph</div>

              <div className="mt-4">
                <BarChart
                  skipAnimation={false}
                  series={[
                    {
                      id: "rent",
                      data: quantities,
                      label: "Rent",
                      color: colors[0],
                    },
                    {
                      id: "stock",
                      data: stocks,
                      label: "Stock",
                      color: colors[1],
                    },
                  ]}
                  height={300}
                  xAxis={[{ scaleType: "band", data: labels }]}
                  sx={{
                    // BAR ANIMATION
                    [`.${barElementClasses.root}`]: {
                      fill: "transparent",
                      strokeWidth: 2,

                      transition: `
        transform 800ms cubic-bezier(.4,0,.2,1),
        height 800ms cubic-bezier(.4,0,.2,1)
      `,
                    },

                    // Series colors
                    [`.MuiBarElement-series-rent`]: {
                      stroke: colors[0],
                    },

                    [`.MuiBarElement-series-stock`]: {
                      stroke: colors[1],
                    },

                    // Axis
                    [`.${axisClasses.root}`]: {
                      [`.${axisClasses.tick}, .${axisClasses.line}`]: {
                        stroke: "#006BD6",
                        strokeWidth: 3,
                      },
                      [`.${axisClasses.tickLabel}`]: {
                        fill: "#006BD6",
                      },
                    },

                    // Grid background
                    border: "1px solid rgba(0,0,0,0.1)",
                    backgroundImage: `
      linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
    `,
                    backgroundSize: "35px 35px",
                    backgroundPosition: "20px 20px, 20px 20px",
                    width: "100%",
                  }}
                />
              </div>
            </div>

            {/* Card Footer */}
            <div className="card-footer text-muted text-end">
              Terakhir diperbarui: {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
