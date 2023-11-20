import { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/PanelMenu.css";
import { useNavigate } from "react-router-dom";

export default function CategoryMenu() {

    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [imageUrl, setImageUrl] = useState('');
    const [name, setName] = useState('');
    const [showModalWindow, setShowModalWindow] = useState(false);
    const [categoryIdEdit, setCategoryIdEdit] = useState(null);
    const [imageUrlEdit, setImageUrlEdit] = useState('');
    const [nameEdit, setNameEdit] = useState('');

    function getToken() {
        return sessionStorage.getItem('token');
    };

    const SelectCategories = () => {
        axios({
            method: 'get',
            url: 'http://bibizan12-001-site1.ctempurl.com/api/Category/Select',
            headers: {
                'Authorization': 'Bearer ' + getToken(),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            setCategories(response.data);
        }).catch((error) => {
            console.log(error);
        })
    };


    const CreateCategory = () => {
        axios({
            method: 'post',
            url: 'http://bibizan12-001-site1.ctempurl.com/api/Category/Create',
            data: {
                "categoryId": 0,
                "image": imageUrl,
                "name": name
            },
            headers: {
                'Authorization': 'Bearer ' + getToken(),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            alert("Category succsessfully created!");
        }).catch((error) => {
            console.log(error);
        })
    };

    const UpdateCategory = () => {
        axios({
            method: 'post',
            url: 'http://bibizan12-001-site1.ctempurl.com/api/Category/Update',
            data: {
                "categoryId": categoryIdEdit,
                "image": imageUrlEdit,
                "name": nameEdit
            },
            headers: {
                'Authorization': 'Bearer ' + getToken(),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            alert("Category succsessfully updated!");
        }).catch((error) => {
            console.log(error);
        })
    };

    const DeleteCategory = (item) => {
        axios({
            method: 'post',
            url: 'http://bibizan12-001-site1.ctempurl.com/api/Category/Remove',
            data: {
                "categoryId": item.categoryId,
                "image": item.image,
                "name": item.name
            },
            headers: {
                'Authorization': 'Bearer ' + getToken(),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            alert("Category succsessfully deleted!");
        }).catch((error) => {
            console.log(error);
        })
    };


    const ShowModalWin = (item) => {
        setShowModalWindow(true);
        setCategoryIdEdit(item.categoryId);
        setImageUrlEdit(item.image);
        setNameEdit(item.name);
    };

    const CloseModalWin = () => {
        setShowModalWindow(false);
    };

    useEffect(() => {
        SelectCategories();
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

            <div className="create-card">
                <h2>Create Category</h2>
                <div className="create-card-elements">
                    <label>Category image</label>
                    <input type="text" placeholder="Enter url image" value={imageUrl} onChange={(e) => { setImageUrl(e.target.value) }} />
                    <label>Category name</label>
                    <input type="text" placeholder="Enter name category" value={name} onChange={(e) => { setName(e.target.value) }} />
                    <button onClick={() => { CreateCategory() }}>Create</button>
                </div>
            </div>

            <h1>Categories</h1>
            <table className="product-table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>ID</th>
                        <th>Name</th>
                        <th colSpan={2}>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category, index) => (
                        <tr key={index}>
                            <td><img src={`${category.image}`} /></td>
                            <td>{category.categoryId}</td>
                            <td>{category.name}</td>
                            <td><button onClick={() => { ShowModalWin(category) }}>Edit</button></td>
                            <td><button type="button" onClick={() => { DeleteCategory(category) }}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className={showModalWindow ? "modal-overlay" : ""}>
                {showModalWindow && (
                    <div className="modal-win">
                        <h2>Edit category</h2>
                        <div className="modal-win-elements">
                            <label>Category image</label>
                            <input type="text" placeholder="Enter url image" value={imageUrlEdit} onChange={(e) => { setImageUrlEdit(e.target.value) }} />
                            <label>Category name</label>
                            <input type="text" placeholder="Enter name category" value={nameEdit} onChange={(e) => { setNameEdit(e.target.value) }} />
                            <button onClick={() => { UpdateCategory() }}>Edit</button>
                            <button onClick={() => { CloseModalWin() }}>Close</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}