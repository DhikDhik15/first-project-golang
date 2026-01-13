//import FC from react
import { FC, useState } from "react";

//import SidebarMenu
import SidebarMenu from '../../../../components/SidebarMenu';

//import Link from react-route
import { Link } from "react-router";

//import custom hook useUsers and interface User
import { useUsers, User } from "../../../hooks/user/useUsers";
import { BiDetail } from "react-icons/bi";
import { PiNotePencilDuotone } from "react-icons/pi";
import { LuUserRoundPlus } from "react-icons/lu";

const UsersIndex: FC = () => {

    // get users from useUsers
    const { data: users, isLoading, isError, error } = useUsers();

    // modal state
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const handleShowDetail = (user: User) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedUser(null);
    };

    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                <div className="col-md-3">
                    <SidebarMenu />
                </div>
                <div className="col-md-9">
                    <div className="card border-0 rounded-4 shadow-sm">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <span>USERS</span>
                            <Link to="/admin/users/create" className="btn btn-sm btn-success shadow-sm border-0" style={{ display: "flex", alignItems: "center", gap: "5px" }}><LuUserRoundPlus /> ADD USER</Link>
                        </div>
                        <div className="card-body">

                            {/* Loading State */}
                            {isLoading && (
                                <div className="alert alert-info text-center">Loading...</div>
                            )}

                            {/* Error State */}
                            {isError && (
                                <div className="alert alert-danger text-center">
                                    Error: {error.message}
                                </div>
                            )}

                            <table className="table table-bordered">
                                <thead className="bg-dark text-white">
                                    <tr>
                                        <th scope="col">Full Name</th>
                                        <th scope="col">Email Address</th>
                                        <th scope="col">Address</th>
                                        <th scope="col" style={{ width: "10%" }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        users?.map((user: User) => (
                                            <tr key={user.id}>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>{user.address ? user.address : "-"}</td>
                                                <td className="text-center">
                                                    <div className="d-flex justify-content-center gap-2">
                                                        <Link to={`/admin/users/edit/${user.id}`}><PiNotePencilDuotone className="text-warning" size={20} /></Link>
                                                        <button onClick={() => handleShowDetail(user)} className="btn p-0 border-0 bg-transparent"><BiDetail className="text-primary" size={20} /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <>
                    <div className="modal show d-block" tabIndex={-1} role="dialog">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content rounded-4 border-0 shadow">
                                <div className="modal-header border-0">
                                    <h5 className="modal-title fw-bold">User Details</h5>
                                    <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    {selectedUser && (
                                        <div className="p-2">
                                            <div className="mb-3">
                                                <label className="fw-bold text-muted small">FULL NAME</label>
                                                <div className="fs-5">{selectedUser.name}</div>
                                            </div>
                                            <div className="mb-3">
                                                <label className="fw-bold text-muted small">EMAIL ADDRESS</label>
                                                <div className="fs-5">{selectedUser.email}</div>
                                            </div>
                                            <div className="mb-3">
                                                <label className="fw-bold text-muted small">ADDRESS</label>
                                                <div className="fs-5">{selectedUser.address || "-"}</div>
                                            </div>
                                            <div className="mb-3">
                                                <label className="fw-bold text-muted small">PHONE NUMBER</label>
                                                <div className="fs-5">{selectedUser.phone || "-"}</div>
                                            </div>
                                            <div className="mb-3">
                                                <label className="fw-bold text-muted small d-block">ROLE</label>
                                                <div className="badge bg-primary fs-6">{selectedUser.role}</div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="modal-footer border-0">
                                    <button type="button" className="btn btn-secondary px-4" onClick={handleCloseModal}>Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-backdrop show"></div>
                </>
            )}
        </div>
    )
}

export default UsersIndex
