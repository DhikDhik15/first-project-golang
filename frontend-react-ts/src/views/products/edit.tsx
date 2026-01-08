import { FC, useState, useEffect, FormEvent } from "react";

import SidebarMenu from "../../../components/SidebarMenu";

import { useNavigate, useParams, Link } from "react-router";

import { useProductById } from "../../hooks/product/useProductById";

import { useProductUpdate } from "../../hooks/product/useProductUpdate";

interface ValidationErrors {
    [key: string]: string;
}

const ProductEdit: FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [name, setName] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [description, setDescription] = useState<string>('');
    const [stock, setStock] = useState<number>(0);

    const [errors, setErrors] = useState<ValidationErrors>({});

    const { data: product } = useProductById(Number(id));

    useEffect(() => {
        if (product) {
            setName(product.name);
            setPrice(product.price);
            setDescription(product.description);
            setStock(product.stock);
        }
    }, [product]);

    const { mutate, isPending } = useProductUpdate();

    const updateProduct = async (e: FormEvent) => {
        e.preventDefault();

        mutate({
            id: Number(id),
            data: {
                name,
                price,
                description,
                stock
            }
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
                            EDIT PRODUCT
                        </div>
                        <div className="card-body">
                            <form onSubmit={updateProduct}>

                                <div className="form-group mb-3">
                                    <label className="mb-1 fw-bold">Name</label>
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" placeholder="Name" />
                                    {errors.name && <div className="alert alert-danger mt-2 rounded-4">{errors.name}</div>}
                                </div>

                                <div className="form-group mb-3">
                                    <label className="mb-1 fw-bold">Price</label>
                                    <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="form-control" placeholder="Price" />
                                    {errors.price && <div className="alert alert-danger mt-2 rounded-4">{errors.price}</div>}
                                </div>

                                <div className="form-group mb-3">
                                    <label className="mb-1 fw-bold">Description</label>
                                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" placeholder="Description"></textarea>
                                    {errors.description && <div className="alert alert-danger mt-2 rounded-4">{errors.description}</div>}
                                </div>

                                <div className="form-group mb-3">
                                    <label className="mb-1 fw-bold">Stock</label>
                                    <input type="number" value={stock} onChange={(e) => setStock(Number(e.target.value))} className="form-control" placeholder="Stock" />
                                    {errors.stock && <div className="alert alert-danger mt-2 rounded-4">{errors.stock}</div>}
                                </div>

                                <button type="submit" className="btn btn-md btn-primary rounded-4 shadow-sm border-0" disabled={isPending}>
                                    {isPending ? 'Updating...' : 'Update'}
                                </button>

                                <Link to="/products" className="btn btn-md btn-secondary rounded-4 shadow-sm border-0 ms-2">Cancel</Link>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductEdit
