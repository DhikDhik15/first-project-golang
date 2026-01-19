//import FC from react
import { FC, useState } from "react";

//import SidebarMenu
import SidebarMenu from '../../../components/SidebarMenu';

import { useProduct } from '../../hooks/product/useProduct';

import { Link } from 'react-router';

import formatRupiah from '../../../helpers/amount';
import { useProductDelete } from "../../hooks/product/useProductDelete";
import { useQueryClient } from "@tanstack/react-query";
import { FaCartPlus } from "react-icons/fa6";
import { PiNotePencilDuotone } from "react-icons/pi";
import { BiTrash } from "react-icons/bi";
import { Product } from "../../types/products";

const ProductsIndex: FC = () => {

    //initialize useQueryClient
    const queryClient = useQueryClient();

    const { mutate, isPending } = useProductDelete();

    const [page, setPage] = useState(1)
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState('id')
    const [order, setOrder] = useState<'asc' | 'desc'>('desc')

    const { data: products } = useProduct({
        page,
        search,
        sort,
        order,
    });

    //handle delete user
    const deleteProduct = (id: number) => {
        if (confirm("Are you sure you want to delete this user?")) {

            //call useUserDelete
            mutate(id, {
                onSuccess: () => {
                    //refetch data
                    queryClient.invalidateQueries({ queryKey: ['products'] });
                }
            });
        }
    }
    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                <div className="col-md-3">
                    <SidebarMenu />
                </div>
                <div className="col-md-9">
                    <div className="card border-0 rounded-4 shadow-sm">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <span>PRODUCTS</span>
                            <Link to="/admin/products/create" className="btn btn-sm btn-success shadow-sm border-0" style={{ display: "flex", alignItems: "center", gap: "5px" }}><FaCartPlus /> ADD PRODUCT</Link>
                        </div>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead className="bg-dark text-white">
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Stock</th>
                                        <th scope="col">Description</th>
                                        <th scope="col" style={{ width: "10%" }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        products?.data?.length ? (
                                            products?.data?.map((product: Product) => (
                                                <tr key={product.id}>
                                                    <td>{product.name}</td>
                                                    <td>{formatRupiah(product.price)}</td>
                                                    <td>{product.stock}</td>
                                                    <td>{product.description}</td>
                                                    <td className="text-center">
                                                        <Link to={`/admin/products/update/${product.id}`}><PiNotePencilDuotone className="text-warning" size={20} /></Link>
                                                        <button onClick={() => deleteProduct(product.id)} disabled={isPending} className="btn btn-sm"><BiTrash className="text-danger" size={20} /></button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={5} className="text-center">
                                                    No products found
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                                <div className="w-100 d-flex justify-content-start gap-2 mt-3">
                                    <button
                                        className="btn btn-sm btn-secondary"
                                        disabled={page === 1}
                                        onClick={() => setPage((p) => p - 1)}
                                    >
                                        Prev
                                    </button>

                                    <span className="align-self-center">
                                        Page {products?.page} of {products?.total_page}
                                    </span>

                                    <button
                                        className="btn btn-sm btn-secondary"
                                        disabled={page === products?.total_page}
                                        onClick={() => setPage((p) => p + 1)}
                                    >
                                        Next
                                    </button>
                                </div>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductsIndex
