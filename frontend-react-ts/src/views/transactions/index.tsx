import { FC } from "react";

import SidebarMenu from '../../../components/SidebarMenu';

import { useTransaction, Transaction } from "../../hooks/transaction/useTransaction";

import { formatDateID } from '../../../helpers/date';

import formatRupiah from '../../../helpers/amount';

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
                        </div>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead className="bg-dark text-white">
                                    <tr>
                                        <th scope="col">User</th>
                                        <th scope="col">Product</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Start Date</th>
                                        <th scope="col">End Date</th>
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
                                                <td>{transaction.status}</td>
                                                <td>{formatDateID(transaction.start_date)}</td>
                                                <td>{formatDateID(transaction.end_date)}</td>
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
