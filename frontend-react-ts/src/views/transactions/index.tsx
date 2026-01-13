import { FC, useState } from "react";

import SidebarMenu from '../../../components/SidebarMenu';

import { useTransaction, Transaction } from "../../hooks/transaction/useTransaction";
import { useTransactionUpdate } from "../../hooks/transaction/useTransactionUpdate";

import { formatDateID } from '../../../helpers/date';

import formatRupiah from '../../../helpers/amount';
import { Link } from "react-router";

import { FaCheck, FaClock, FaPaperPlane } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import { LuClock3, LuFilePlus } from "react-icons/lu";

const TransactionsIndex: FC = () => {

    // state for process modal
    const [showModal, setShowModal] = useState(false);
    const [transactionId, setTransactionId] = useState<number | null>(null);

    // state for cancel modal
    const [showCancelModal, setShowCancelModal] = useState(false);

    // hook useTransaction
    const { data: transactions, refetch } = useTransaction();

    // hook useTransactionUpdate
    const { mutate: updateTransaction, isPending } = useTransactionUpdate();

    const handleProcess = (id: number) => {
        setTransactionId(id);
        setShowModal(true);
    };

    const handleCancel = (id: number) => {
        setTransactionId(id);
        setShowCancelModal(true);
    };

    const confirmProcess = () => {
        if (transactionId) {
            updateTransaction({ id: transactionId, status: 'success' }, {
                onSuccess: () => {
                    refetch();
                    setShowModal(false);
                    setTransactionId(null);
                }
            });
        }
    };

    const confirmCancel = () => {
        if (transactionId) {
            updateTransaction({ id: transactionId, status: 'failed' }, {
                onSuccess: () => {
                    refetch();
                    setShowCancelModal(false);
                    setTransactionId(null);
                }
            });
        }
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
                            <span>TRANSACTIONS</span>
                            <Link to="/admin/transactions/create" className="btn btn-sm btn-success shadow-sm border-0" style={{ display: "flex", alignItems: "center", gap: "5px" }}><LuFilePlus /> Add Transaction</Link>
                        </div>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead className="bg-dark text-white">
                                    <tr>
                                        <th scope="col">User</th>
                                        <th scope="col">Product</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Payment</th>
                                        <th scope="col">Start Date</th>
                                        <th scope="col">End Date</th>
                                        <th scope="col">Status</th>
                                        <th scope="col" style={{ width: "5%" }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        transactions?.map((transaction: Transaction) => (
                                            <tr key={transaction.id}>
                                                <td>{transaction.user.name}</td>
                                                <td>{transaction.product.name}</td>
                                                <td>{transaction.quantity}</td>
                                                <td>{formatRupiah(transaction.price)}</td>
                                                <td>
                                                    {transaction.status === 'pending' ? (
                                                        <>
                                                            <LuClock3 /> {transaction.status}
                                                        </>
                                                    ) : (
                                                        <>
                                                            <FaCheck /> {transaction.status}
                                                        </>
                                                    )}
                                                </td>
                                                <td>{formatDateID(transaction.start_date)}</td>
                                                <td>{formatDateID(transaction.end_date)}</td>
                                                <td className="text-center">
                                                    {transaction.status === 'pending' ? (
                                                        <FaClock className="text-warning" />
                                                    ) : (
                                                        <FaCheck className="text-success" />
                                                    )}
                                                </td>
                                                <td>
                                                    <button onClick={() => handleProcess(transaction.id)} title="Process" className="btn p-0 border-0 bg-transparent" style={{ marginRight: "5px" }} ><FaPaperPlane className="text-primary" /></button>
                                                    <button onClick={() => handleCancel(transaction.id)} title="Cancel" className="btn p-0 border-0 bg-transparent" style={{ marginRight: "5px" }} ><ImCancelCircle className="text-danger" /></button>
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

            {/* Process Order Modal */}
            {showModal && (
                <>
                    <div className="modal show d-block" tabIndex={-1} role="dialog">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content rounded-4 border-0 shadow">
                                <div className="modal-header border-0">
                                    <h5 className="modal-title fw-bold">Process Order</h5>
                                    <button type="button" className="btn-close" onClick={() => setShowModal(false)} aria-label="Close"></button>
                                </div>
                                <div className="modal-body text-center">
                                    <p className="mb-0 fs-5">Are you sure want to process this order?</p>
                                </div>
                                <div className="modal-footer border-0 justify-content-center">
                                    <button type="button" className="btn btn-secondary rounded-pill px-4" onClick={() => setShowModal(false)}>Cancel</button>
                                    <button type="button" className="btn btn-primary rounded-pill px-4" onClick={confirmProcess} disabled={isPending}>
                                        {isPending ? 'Processing...' : 'Yes, Process'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-backdrop show"></div>
                </>
            )}

            {/* Cancel Order Modal */}
            {showCancelModal && (
                <>
                    <div className="modal show d-block" tabIndex={-1} role="dialog">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content rounded-4 border-0 shadow">
                                <div className="modal-header border-0">
                                    <h5 className="modal-title fw-bold">Cancel Order</h5>
                                    <button type="button" className="btn-close" onClick={() => setShowCancelModal(false)} aria-label="Close"></button>
                                </div>
                                <div className="modal-body text-center">
                                    <p className="mb-0 fs-5">Are you sure want to cancel this order?</p>
                                </div>
                                <div className="modal-footer border-0 justify-content-center">
                                    <button type="button" className="btn btn-secondary rounded-pill px-4" onClick={() => setShowCancelModal(false)}>Close</button>
                                    <button type="button" className="btn btn-danger rounded-pill px-4" onClick={confirmCancel} disabled={isPending}>
                                        {isPending ? 'Cancelling...' : 'Yes, Cancel'}
                                    </button>
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

export default TransactionsIndex
