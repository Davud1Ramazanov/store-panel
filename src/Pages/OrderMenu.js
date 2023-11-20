import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OrderMenu() {

    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);

    function getToken() {
        return sessionStorage.getItem('token');
    };

    const SelectOrders = () => {
        axios({
            method: 'get',
            url: 'http://bibizan12-001-site1.ctempurl.com/api/Order/SelectAllOrders',
            headers: {
                'Authorization': 'Bearer ' + getToken(),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            setOrders(response.data);
        }).catch((error) => {
            console.log(error);
        })
    };

    const DeleteOrder = (item) => {
        axios({
            method: 'post',
            url: 'http://bibizan12-001-site1.ctempurl.com/api/Order/RemoveByProduct',
            data: {
                "orderId": item.orderId,
                "productId": item.productId,
                "buyer": item.buyer,
                "quantity": item.quantity,
                "total": item.total,
                "dateOrder": item.dateOrder
            },
            headers: {
                'Authorization': 'Bearer ' + getToken(),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            alert("You succsessfully approved!");
        }).catch((error) => {
            console.log(error);
        })
    };

    useEffect(() => {
        SelectOrders();
    }, []);

    return (
        <div className="panel-menu">

            <div className="nav-menu">
                <div className="nav-elements">
                    <button type="button" onClick={() => { navigate("/panelMenu") }}>Products</button>
                    <button type="button" onClick={() => { navigate("/categoriesMenu") }}>Categories</button>
                    <button type="button" onClick={() => { navigate("/ordersMenu") }}>Orders</button>
                    <button type="button" onClick={() => { navigate("/accountsMenu") }}>Accounts</button>
                </div>
            </div>

            <h1>Orders</h1>
            <table className="product-table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>ID</th>
                        <th>Buyer</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Date</th>
                        <th colSpan={2}>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => (
                        <tr key={index}>
                            <td><img src={`${order.image}`} /></td>
                            <td>{order.orderId}</td>
                            <td>{order.buyer}</td>
                            <td>{order.productName}</td>
                            <td>{order.quantity}</td>
                            <td>{order.total} UAH</td>
                            <td>{order.dateOrder}</td>
                            <td><button type="button" onClick={() => { DeleteOrder(order) }}>Approve</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}