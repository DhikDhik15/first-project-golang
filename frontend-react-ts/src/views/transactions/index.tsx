import { FC, useState } from "react";

import SidebarMenu from '../../../components/SidebarMenu';

import { useTransaction } from "../../hooks/transaction/useTransaction";
import { useTransactionProcess } from "../../hooks/transaction/useTransactionProcess";
import { useTransactionCancel } from "../../hooks/transaction/useTransactionCancel";
import { formatDateID } from '../../../helpers/date';

import formatRupiah from '../../../helpers/amount';
import { Link } from "react-router";

import { FaCheck, FaPaperPlane } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import { LuClock3, LuFilePlus } from "react-icons/lu";
import { useQueryClient } from "@tanstack/react-query";

import { Transaction } from "../../types/transactions";

const TransactionsIndex: FC = () => {

    // state for process modal
    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const [isPending, setIsPending] = useState(false);

    // state for cancel modal
    const [showCancelModal, setShowCancelModal] = useState(false);

    const [page, setPage] = useState(1);
    const [search] = useState('');
    const [sort] = useState('id');
    const [order] = useState<'asc' | 'desc'>('desc');

    // hook useTransaction
    const { data: transactions } = useTransaction({
        page,
        search,
        sort,
        order,
    });

    // hook useTransactionProcess
    const { mutate: updateTransaction } = useTransactionProcess();
    const { mutate: cancelTransaction } = useTransactionCancel();

    const queryClient = useQueryClient();

    const handleProcess = (id: number) => {
        setSelectedId(id);
        setShowModal(true);
    };

    const handleCancel = (id: number) => {
        setSelectedId(id);
        setShowCancelModal(true);
    };

    const confirmProcess = async () => {
        if (selectedId === null) return;

        setIsPending(false);
        updateTransaction({ id: selectedId }, {
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ['transactions'],
                });
                setShowModal(false);
            }
        });
    };


    const confirmCancel = async () => {
        if (selectedId === null) return;

        setIsPending(false);

        cancelTransaction({ id: selectedId }, {
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ['transactions'],
                });
                setShowCancelModal(false);
            }
        });
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
                                        <th scope="col" style={{ width: "20%" }}>User</th>
                                        <th scope="col">Product</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Payment</th>
                                        <th scope="col">Start Date</th>
                                        <th scope="col">End Date</th>
                                        <th scope="col">Rent Status</th>
                                        <th scope="col" style={{ width: "5%" }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        transactions?.data?.length ? (
                                            transactions?.data?.map((transaction: Transaction) => (
                                                <tr key={transaction.id}>
                                                    <td>{transaction.user.name}</td>
                                                    <td>{transaction.product.name}</td>
                                                    <td>{transaction.quantity}</td>
                                                    <td>{formatRupiah(transaction.price)}</td>
                                                    <td>
                                                        {
                                                            transaction.status === 'pending' ? (
                                                                <>
                                                                    <LuClock3 className="text-warning" /> {transaction.status}
                                                                </>
                                                            ) : transaction.status === 'paid' ? (
                                                                <>
                                                                    <FaCheck className="text-success" /> {transaction.status}
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <ImCancelCircle className="text-danger" /> {transaction.status}
                                                                </>
                                                            )
                                                        }
                                                    </td>
                                                    <td>{formatDateID(transaction.start_date)}</td>
                                                    <td>{formatDateID(transaction.end_date)}</td>
                                                    <td>{transaction.is_return ? 'Returned' : 'Not Returned'}</td>
                                                    <td>
                                                        {transaction.status !== 'paid' && (
                                                            <>
                                                                <button
                                                                    onClick={() => handleProcess(transaction.id)}
                                                                    title="Process"
                                                                    className="btn p-0 border-0 bg-transparent"
                                                                    style={{ marginRight: "5px" }}
                                                                >
                                                                    <FaPaperPlane className="text-primary" />
                                                                </button>

                                                                <button
                                                                    onClick={() => handleCancel(transaction.id)}
                                                                    title="Cancel"
                                                                    className="btn p-0 border-0 bg-transparent"
                                                                    style={{ marginRight: "5px" }}
                                                                >
                                                                    <ImCancelCircle className="text-danger" />
                                                                </button>
                                                            </>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={9} className="text-center">
                                                    No data available
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                                <div className="w-100 d-flex align-items-center justify-content-between mt-3">
                                    <button
                                        className="btn btn-sm btn-secondary"
                                        disabled={page === 1}
                                        onClick={() => setPage((p) => p - 1)}
                                        style={{ minWidth: 70 }}
                                    >
                                        Prev
                                    </button>
                                    <span className="mx-2"></span>

                                    <span className="text-nowrap fw-medium">
                                        Page {page} of {transactions?.total_page}
                                    </span>
                                    <span className="mx-2"></span>

                                    <button
                                        className="btn btn-sm btn-secondary"
                                        disabled={page === transactions?.total_page}
                                        onClick={() => setPage((p) => p + 1)}
                                        style={{ minWidth: 70 }}
                                    >
                                        Next
                                    </button>
                                </div>

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
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={() => setShowModal(false)}
                                        aria-label="Close"
                                    />
                                </div>

                                <div className="modal-body text-center">
                                    <p className="mb-0 fs-5">
                                        Are you sure want to process this order?
                                    </p>
                                </div>

                                <div className="modal-footer border-0 justify-content-center">
                                    <button
                                        type="button"
                                        className="btn btn-secondary rounded-pill px-4"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-primary rounded-pill px-4"
                                        onClick={confirmProcess}
                                        disabled={isPending}
                                    >
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
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={() => setShowCancelModal(false)}
                                        aria-label="Close"
                                    />
                                </div>

                                <div className="modal-body text-center">
                                    <p className="mb-0 fs-5">
                                        Are you sure want to cancel this order?
                                    </p>
                                </div>

                                <div className="modal-footer border-0 justify-content-center">
                                    <button
                                        type="button"
                                        className="btn btn-secondary rounded-pill px-4"
                                        onClick={() => setShowCancelModal(false)}
                                    >
                                        Close
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-danger rounded-pill px-4"
                                        onClick={confirmCancel}
                                        disabled={isPending}
                                    >
                                        {isPending ? 'Cancelling...' : 'Yes, Cancel'}
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="modal-backdrop show"></div>
                </>
            )}
        </div >
    )
}

export default TransactionsIndex
