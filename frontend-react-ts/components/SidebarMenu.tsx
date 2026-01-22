import { FC, useState } from "react";
import { Link, useLocation } from "react-router";
import { useLogout } from "../src/hooks/auth/useLogout";

const SidebarMenu: FC = () => {
    const logout = useLogout();
    const location = useLocation();

    const [showModal, setShowModal] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    const isMobile = window.innerWidth < 768;

    const handleLogout = () => {
        logout();
        setShowModal(false);
    };

    const MenuItem = ({
        to,
        label,
        icon,
        active,
    }: {
        to: string;
        label: string;
        icon: string;
        active: boolean;
    }) => (
        <Link
            to={to}
            data-bs-dismiss={isMobile ? "offcanvas" : undefined}
            className={`list-group-item list-group-item-action d-flex align-items-center gap-3 ${active ? "active" : ""
                }`}
        >
            <i className={`bi ${icon} fs-5`} />
            {!isCollapsed && <span>{label}</span>}
        </Link>
    );

    const menuContent = (
        <div className="list-group list-group-flush">
            <MenuItem
                to="/admin/dashboard"
                label="Dashboard"
                icon="bi-speedometer2"
                active={location.pathname === "/admin/dashboard"}
            />

            <MenuItem
                to="/admin/users"
                label="Users"
                icon="bi-people"
                active={location.pathname.startsWith("/admin/users")}
            />

            <MenuItem
                to="/admin/products"
                label="Products"
                icon="bi-box"
                active={location.pathname.startsWith("/admin/products")}
            />

            <MenuItem
                to="/admin/transactions"
                label="Transactions"
                icon="bi-receipt"
                active={location.pathname.startsWith("/admin/transactions")}
            />

            <MenuItem
                to="/admin/reports"
                label="Reports"
                icon="bi-bar-chart"
                active={location.pathname.startsWith("/admin/reports")}
            />

            <button
                onClick={() => setShowModal(true)}
                className="list-group-item list-group-item-action d-flex align-items-center gap-3 text-start"
            >
                <i className="bi bi-box-arrow-right fs-5" />
                {!isCollapsed && <b>Logout</b>}
            </button>
        </div>
    );

    return (
        <>
            {/* ================= DESKTOP SIDEBAR ================= */}
            <div className="d-none d-md-block">
                <div
                    className="card border-0 rounded-4 shadow-sm h-100"
                    style={{
                        width: isCollapsed ? "80px" : "260px",
                        transition: "width 0.3s",
                    }}
                >
                    <div className="card-header d-flex justify-content-between align-items-center">
                        {!isCollapsed && <span>MAIN MENU</span>}
                        <button
                            className="btn btn-sm btn-light"
                            onClick={() => setIsCollapsed(!isCollapsed)}
                        >
                            <i
                                className={`bi ${isCollapsed
                                        ? "bi-chevron-right"
                                        : "bi-chevron-left"
                                    }`}
                            />
                        </button>
                    </div>

                    <div className="card-body p-0">{menuContent}</div>
                </div>
            </div>

            {/* ================= MOBILE OFFCANVAS ================= */}
            <div
                className="offcanvas offcanvas-start d-md-none"
                tabIndex={-1}
                id="sidebarMenu"
                style={{ width: "260px" }}
            >
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title">MAIN MENU</h5>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="offcanvas"
                    />
                </div>
                <div className="offcanvas-body p-0">{menuContent}</div>
            </div>

            {/* ================= LOGOUT MODAL ================= */}
            {showModal && (
                <>
                    <div className="modal show d-block">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content rounded-4">
                                <div className="modal-header">
                                    <h5 className="modal-title">
                                        Logout Confirmation
                                    </h5>
                                    <button
                                        className="btn-close"
                                        onClick={() => setShowModal(false)}
                                    />
                                </div>
                                <div className="modal-body text-center">
                                    Are you sure you want to logout?
                                </div>
                                <div className="modal-footer justify-content-center">
                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-backdrop show"></div>
                </>
            )}
        </>
    );
};

export default SidebarMenu;
