import { FC, useState, FormEvent } from "react";

//import SidebarMenu
import SidebarMenu from '../../../components/SidebarMenu';

//import useNavigate and Link from react-router
import { useNavigate, Link } from 'react-router';

import { useProductCreate } from '../../hooks/product/useProductCreate';

interface ValidationErrors {
    [key: string]: string;
}

const ProductCreate: FC = () => {

    const navigate = useNavigate();

    const [name, setName] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [stock, setStock] = useState<number>(0);
    const [description, setDescription] = useState<string>('');

    const [errors, setErrors] = useState<ValidationErrors>({});

    const { mutate, isPending } = useProductCreate();

    const storeProduct = async (e: FormEvent) => {
        e.preventDefault();

        mutate({
            name,
            price,
            stock,
            description
        }, {
            onSuccess: () => {
                navigate('/admin/products');
            },
            onError: (error: any) => {
                setErrors(error.response.data.errors);
            }
        })
    }

    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                <div className="col-md-3">
                    <SidebarMenu />
                </div>
                <div className="col-md-9">
                    <div className="card border-0 rounded-4 shadow-sm">
                        <div className="card-header">
                            ADD PRODUCT
                        </div>
                        <div className="card-body">
                            <form onSubmit={storeProduct}>

                                <div className="form-group mb-3">
                                    <label className="mb-1 fw-bold">Name</label>
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" placeholder="Name" />
                                    {errors.Name && <div className="alert alert-danger mt-2 rounded-4">{errors.Name}</div>}
                                </div>

                                <div className="form-group mb-3">
                                    <label className="mb-1 fw-bold">Price</label>
                                    <input type="text" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="form-control" placeholder="Price" />
                                    {errors.Price && <div className="alert alert-danger mt-2 rounded-4">{errors.Price}</div>}
                                </div>

                                <div className="form-group mb-3">
                                    <label className="mb-1 fw-bold">Stock</label>
                                    <input type="text" value={stock} onChange={(e) => setStock(Number(e.target.value))} className="form-control"
                                        placeholder="Stock" />
                                    {errors.Stock && <div className="alert alert-danger mt-2 rounded-4">{errors.Stock}</div>}
                                </div>

                                <div className="form-group mb-3">
                                    <label className="mb-1 fw-bold">Description</label>
                                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="form-control"
                                        placeholder="Description" />
                                    {errors.Description && <div className="alert alert-danger mt-2 rounded-4">{errors.Description}</div>}
                                </div>

                                <button type="submit" className="btn btn-md btn-primary rounded-4 shadow-sm border-0" disabled={isPending}>
                                    {isPending ? 'Saving...' : 'Save'}
                                </button>

                                <Link to="/admin/products" className="btn btn-md btn-secondary rounded-4 shadow-sm border-0 ms-2">Cancel</Link>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default ProductCreate
