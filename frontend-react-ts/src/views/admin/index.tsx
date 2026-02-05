//import FC from react
import { FC } from "react";

//import SidebarMenu
import SidebarMenu from '../../../components/SidebarMenu';

//import custom hook useAuthUser
import { useAuthUser } from '../../hooks/auth/useAuthUser';
import { dashboard } from '../../hooks/dashboard';
import DashboardCard from "./card";
import formatRupiah from "../../../helpers/amount";

const Dashboard: FC = () => {

    // get user from useAuthUser
    const user = useAuthUser();

    // get dashboard data from useDashboard
    const { data: dashboardData } = dashboard();

    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                <div className="col-md-3">
                    <SidebarMenu />
                </div>
                <div className="col-md-9">
                    <div className="card border-0 rounded-4 shadow-sm mb-4">
                        <div className="card-header">
                            DASHBOARD
                        </div>

                        <div className="card-body">
                            {user ? (
                                <p>Selamat datang, <strong>{user.name}</strong>!</p>
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

                        {/* Card Footer */}
                        <div className="card-footer text-muted text-end">
                            Terakhir diperbarui: {new Date().toLocaleDateString()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
