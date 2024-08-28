import { useEffect, useState } from "react";
import * as productService from "../service/ProductService";
import * as categoryService from "../service/CategoryService";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import moment from "moment/moment";
import {toast} from "react-toastify";

function ProductList() {
    const [products, setProduct] = useState([]);
    const [categorys, setCategory] = useState([]);
    const [name, setName] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        getAllStudentList(name, selectedCategory);
    }, [name, selectedCategory]);

    const getAllStudentList = async (name, category) => {
        const products = await productService.getAllProduct(name, category);
        setProduct(products);
        if (products.length === 0) {
            toast.info("Không có sản phẩm nào phù hợp với tìm kiếm của bạn.");
        }
        const categoryData = await categoryService.getAllCategory();
        setCategory(categoryData);
    }

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    };

    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center">
                <a href="/" className="title">
                    <h1>Quản lý sản phẩm</h1>
                </a>
                <Link className="btn btn-success" to="/create">Thêm mới</Link>
            </div>
            <p className="mt-4"><strong>Tìm kiếm sản phẩm theo tên : </strong></p>
            <input className="w-25 form-control" value={name} placeholder="Nhập tên sản phẩm cần tìm kiếm"
                   onChange={(e) => setName(e.target.value)} />

            <div className="mt-4">
                <p><strong>Tìm kiếm sản phẩm theo thể loại : </strong></p>
                <div className="mb-3">
                    <select
                        id="category"
                        className="form-control w-50"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="">Chọn thể loại</option>
                        {categorys.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <table className="table table-success table-striped">
                <thead>
                <tr>
                    <th>STT</th>
                    <th>Mã sản phẩm</th>
                    <th>Tên sản phẩm</th>
                    <th>Thể loại</th>
                    <th>Số lượng</th>
                    <th>Giá</th>
                    <th>Ngày nhập</th>
                </tr>
                </thead>
                <tbody>
                {products.map((product, index) => {
                    const ProductCategory = Number(product.category);
                    const category = categorys.find(cate => cate.id === ProductCategory);

                    return (
                        <tr key={product.id}>
                            <td>{index + 1}</td>
                            <td>{product.code}</td>
                            <td>{product.name}</td>
                            <td>{category ? category.name : 'Không xác định'}</td>
                            <td>{product.quantity}</td>
                            <td>{formatCurrency(product.price)}</td>
                            <td>{moment(product.input, 'YYYY-MM-DD').format('DD-MM-YYYY')}</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
}

export default ProductList;
