import { FC } from "react";
import { Link } from "react-router";
import SidebarMenu from "../../../components/SidebarMenu";
import { TbFileExport } from "react-icons/tb";
import { useReport } from "../../hooks/report/useReport";

const ReportsIndex: FC = () => {

    const { data: useReportData } = useReport()
    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                <div className="col-md-3">
                    <SidebarMenu />
                </div>
                <div className="col-md-9">
                    <div className="card border-0 rounded-4 shadow-sm">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <span>REPORTS</span>
                            <Link to="/admin/eksport/reports" className="btn btn-sm btn-success shadow-sm border-0" style={{ display: "flex", alignItems: "center", gap: "5px" }}> <TbFileExport />Export Report</Link>
                        </div>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Rent Product</th>
                                        <th scope="col">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        useReportData?.map((transaction) => (
                                            <tr key={transaction.id}>
                                                <td>{transaction.user.name}</td>
                                                <td>{transaction.product.name}</td>
                                                <td>{transaction.status}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReportsIndex