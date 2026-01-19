import { FC, FormEvent, useState } from "react";

import SidebarMenu from '../../../components/SidebarMenu';

import { useUsers } from "../../hooks/user/useUsers";
import { useProduct } from "../../hooks/product/useProduct";
import { useTransactionCreate } from "../../hooks/transaction/useTransactionCreate";
import { useNavigate } from "react-router";

const TransactionsCreate: FC = () => {
    const { data: users } = useUsers();
    const { data: products } = useProduct();
    const { mutate } = useTransactionCreate();

    const navigate = useNavigate();
    const [errors, setErrors] = useState<any>({});

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        mutate({
            user_id: Number(userId),
            product_id: selectedProduct?.id,
            quantity: quantity,
            price: selectedProduct?.price,
            total: (selectedProduct?.price || 0) * quantity,
            status: "pending",
            start_date: new Date(startDate).toISOString(),
            end_date: new Date(endDate).toISOString()
        }, {
            onSuccess: () => {
                navigate('/admin/transactions');
            },
            onError: (error: any) => {
                setErrors(error.response.data.errors);
            }
        })
    }

    const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const productId = Number(e.target.value); // ⬅️ WAJIB number
        const product = products?.find(
            (p: any) => p.id === productId
        );

        setSelectedProduct(product);
    };

    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [quantity, setQuantity] = useState<number>(0);
    const [userId, setUserId] = useState<string>("");
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [status, setStatus] = useState<string>("");
    const endDateValue = new Date(endDate).getTime();
    const startDateValue = new Date(startDate).getTime();
    const dateDiff = endDateValue - startDateValue;
    const total = (selectedProduct?.price || 0) * quantity * (dateDiff / (1000 * 60 * 60 * 24)) + 15000;

    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                <div className="col-md-3">
                    <SidebarMenu />
                </div>
                <div className="col-md-9">
                    <div className="card border-0 rounded-4 shadow-sm">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <span>CREATE TRANSACTION</span>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="user" className="form-label">User</label>
                                    <select
                                        className="form-select"
                                        aria-label="Default select example"
                                        value={userId}
                                        onChange={(e) => setUserId(e.target.value)}
                                    >
                                        <option value="">Choose...</option>
                                        {users?.map((user: any) => (
                                            <option key={user.id} value={user.id}>{user.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Product</label>
                                    <select className="form-select" onChange={handleProductChange}>
                                        <option value="">Choose...</option>
                                        {products?.map((product: any) => (
                                            <option key={product.id} value={product.id}>
                                                {product.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Quantity</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={quantity}
                                        onChange={(e) => setQuantity(Number(e.target.value))}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Price</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={selectedProduct?.price || ""}
                                        readOnly
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="start_date" className="form-label">Start Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="start_date"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="end_date" className="form-label">End Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="end_date"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="status" className="form-label">
                                        Status
                                    </label>
                                    <input type="text" className="form-control" value={"pending"} readOnly />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Total</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={total || ""}
                                        readOnly
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TransactionsCreate
