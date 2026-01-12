import { FC } from "react";

import SidebarMenu from '../../../components/SidebarMenu';

import { useTransaction, Transaction } from "../../hooks/transaction/useTransaction";

import { formatDateID } from '../../../helpers/date';

import formatRupiah from '../../../helpers/amount';
import { Link } from "react-router";

import { FaCheck, FaClock } from "react-icons/fa";
import { GiReturnArrow } from "react-icons/gi";
import { TfiReload } from "react-icons/tfi";

const TransactionsIndex: FC = () => {
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
                            <Link to="/admin/transactions/create" className="btn btn-sm btn-success rounded-4 shadow-sm border-0">Add Transaction</Link>
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
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        useTransaction().data?.map((transaction: Transaction) => (
                                            <tr key={transaction.id}>
                                                <td>{transaction.user.name}</td>
                                                <td>{transaction.product.name}</td>
                                                <td>{transaction.quantity}</td>
                                                <td>{formatRupiah(transaction.price)}</td>
                                                <td>
                                                    {transaction.status === 'pending' ? (
                                                        <>
                                                            <Link to={`/admin/transactions/process/${transaction.id}`}><TfiReload /></Link> {transaction.status}
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
                                                    <Link to={`/admin/transactions/${transaction.id}`} className="btn btn-sm btn-primary rounded-4 shadow-sm border-0"><GiReturnArrow /> Process</Link>
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
        </div>
    )
}

export default TransactionsIndex
