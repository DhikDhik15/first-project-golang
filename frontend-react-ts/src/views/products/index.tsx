//import FC from react
import { FC } from "react";

//import SidebarMenu
import SidebarMenu from '../../../components/SidebarMenu';

import { useProduct, Product } from '../../hooks/product/useProduct';

import { Link } from 'react-router';

import formatRupiah from '../../../helpers/amount';
import { useProductDelete } from "../../hooks/product/useProductDelete";
import { useQueryClient } from "@tanstack/react-query";

const ProductsIndex: FC = () => {

    //initialize useQueryClient
    const queryClient = useQueryClient();

    const { mutate, isPending } = useProductDelete();

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
                            <Link to="/admin/products/create" className="btn btn-sm btn-success rounded-4 shadow-sm border-0">ADD PRODUCT</Link>
                        </div>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead className="bg-dark text-white">
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Stock</th>
                                        <th scope="col">Description</th>
                                        <th scope="col" style={{ width: "20%" }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        useProduct().data?.map((product: Product) => (
                                            <tr key={product.id}>
                                                <td>{product.name}</td>
                                                <td>{formatRupiah(product.price)}</td>
                                                <td>{product.stock}</td>
                                                <td>{product.description}</td>
                                                <td className="text-center">
                                                    <Link to={`/admin/products/update/${product.id}`} className="btn btn-sm btn-primary rounded-4 shadow-sm border-0 me-2">UPDATE</Link>
                                                    <button onClick={() => deleteProduct(product.id)} disabled={isPending} className="btn btn-sm btn-danger rounded-4 shadow-sm border-0">
                                                        {isPending ? 'DELETING...' : 'DELETE'}
                                                    </button>
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

export default ProductsIndex
