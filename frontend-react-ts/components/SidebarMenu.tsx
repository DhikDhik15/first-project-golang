//import FC and useState from react
import { FC, useState } from "react";

//import Link and useLocation from react router dom
import { Link, useLocation } from "react-router";

//import custom hook useLogout
import { useLogout } from "../src/hooks/auth/useLogout";

const SidebarMenu: FC = () => {

    //initialize useLogout
    const logout = useLogout();

    //get current location
    const location = useLocation();

    //state for logout modal
    const [showModal, setShowModal] = useState(false);

    const handleLogout = () => {
        logout();
        setShowModal(false);
    }

    return (
        <>
            <div className="card border-0 rounded-4 shadow-sm">
                <div className="card-header">
                    MAIN MENU
                </div>
                <div className="card-body">
                    <div className="list-group">
                        <Link to="/admin/dashboard" className={`list-group-item list-group-item-action ${location.pathname === '/admin/dashboard' ? 'active' : ''}`} style={location.pathname === '/admin/dashboard' ? { backgroundColor: 'gray', borderColor: 'gray' } : {}}>Dashboard</Link>
                        <Link to="/admin/users" className={`list-group-item list-group-item-action ${location.pathname === '/admin/users' ? 'active' : ''}`} style={location.pathname === '/admin/users' ? { backgroundColor: 'gray', borderColor: 'gray' } : {}}>Users</Link>
                        <Link to="/admin/products" className={`list-group-item list-group-item-action ${location.pathname === '/admin/products' ? 'active' : ''}`} style={location.pathname === '/admin/products' ? { backgroundColor: 'gray', borderColor: 'gray' } : {}}>Products</Link>
                        <Link to="/admin/transactions" className={`list-group-item list-group-item-action ${location.pathname === '/admin/transactions' ? 'active' : ''}`} style={location.pathname === '/admin/transactions' ? { backgroundColor: 'gray', borderColor: 'gray' } : {}}>Transactions</Link>
                        <button onClick={() => setShowModal(true)} className="list-group-item list-group-item-action text-start" style={{ cursor: 'pointer', border: 'none', background: 'none', width: '100%' }}><b>Logout</b></button>
                    </div>
                </div>
            </div>

            {/* Logout Confirmation Modal */}
            {showModal && (
                <>
                    <div className="modal show d-block" tabIndex={-1} role="dialog">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content rounded-4 border-0 shadow">
                                <div className="modal-header border-0">
                                    <h5 className="modal-title fw-bold">Logout Confirmation</h5>
                                    <button type="button" className="btn-close" onClick={() => setShowModal(false)} aria-label="Close"></button>
                                </div>
                                <div className="modal-body text-center">
                                    <p className="mb-0 fs-5">Are you sure you want to logout?</p>
                                </div>
                                <div className="modal-footer border-0 justify-content-center">
                                    <button type="button" className="btn btn-secondary rounded-pill px-4" onClick={() => setShowModal(false)}>Cancel</button>
                                    <button type="button" className="btn btn-danger rounded-pill px-4" onClick={handleLogout}>Yes, Logout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-backdrop show"></div>
                </>
            )}
        </>
    )
}

export default SidebarMenu;
