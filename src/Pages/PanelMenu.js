import axios from "axios";
import { useEffect, useState } from "react";
import '../Styles/PanelMenu.css';
import { useNavigate } from "react-router-dom";

export default function PanelMenu() {

    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [name, setName] = useState('');
    const [color, setColor] = useState('');
    const [pixel, setPixel] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [showModalWindow, setShowModalWindow] = useState(false);
    const [productIdEdit, setProductIdEdit] = useState(null);
    const [selectedCategoryEdit, setSelectedCategoryEdit] = useState(null);
    const [imageUrlEdit, setImageUrlEdit] = useState('');
    const [nameEdit, setNameEdit] = useState('');
    const [colorEdit, setColorEdit] = useState('');
    const [pixelEdit, setPixelEdit] = useState('');
    const [descriptionEdit, setDescriptionEdit] = useState('');
    const [quantityEdit, setQuantityEdit] = useState('');
    const [priceEdit, setPriceEdit] = useState('');

    function getToken() {
        return sessionStorage.getItem('token');
    }

    const SelectProducts = () => {
        axios({
            method: 'get',
            url: 'http://bibizan12-001-site1.ctempurl.com/api/Product/SelectProductByCategory',
            headers: {
                'Authorization': 'Bearer ' + getToken(),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            setProducts(response.data);
        }).catch((error) => {
            console.log(error);
        })
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

    const CreateProduct = () => {
        axios({
            method: 'post',
            url: 'http://bibizan12-001-site1.ctempurl.com/api/Product/Create',
            data: {
                "productId": 0,
                "categoryId": selectedCategory.categoryId,
                "image": imageUrl,
                "name": name,
                "color": color,
                "pixel": pixel,
                "description": description,
                "quantity": quantity,
                "price": price
            },
            headers: {
                'Authorization': 'Bearer ' + getToken(),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            alert("Product succsessfully created!");
        }).catch((error) => {
            console.log(error);
        })
    };

    const DeleteProduct = (item) => {
        axios({
            method: 'post',
            url: 'http://bibizan12-001-site1.ctempurl.com/api/Product/Remove',
            data: {
                "productId": item.productId,
                "categoryId": item.categoryId,
                "image": item.image,
                "name": item.name,
                "color": item.color,
                "pixel": item.pixel,
                "description": item.description,
                "quantity": item.quantity,
                "price": item.price
            },
            headers: {
                'Authorization': 'Bearer ' + getToken(),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            alert("Product succsessfully deleted!");
        }).catch((error) => {
            console.log(error);
        })
    };

    const UpdateProduct = () => {
        axios({
            method: 'post',
            url: 'http://bibizan12-001-site1.ctempurl.com/api/Product/Update',
            data: {
                "productId": productIdEdit,
                "categoryId": selectedCategoryEdit.categoryId,
                "image": imageUrlEdit,
                "name": nameEdit,
                "color": colorEdit,
                "pixel": pixelEdit,
                "description": descriptionEdit,
                "quantity": quantityEdit,
                "price": priceEdit
            },
            headers: {
                'Authorization': 'Bearer ' + getToken(),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            alert("Product succsessfully updated!");
        }).catch((error) => {
            console.log(error);
        })
    };

    const handleCategoryChange = (e) => {
        const categoryName = e.target.value;
        const selectedCategory = categories.find((categories) => categories.name === categoryName);
        setSelectedCategory(selectedCategory);
    };

    const handleCategoryChangeEdit = (e) => {
        const categoryName = e.target.value;
        const selectedCategory = categories.find((categories) => categories.name === categoryName);
        setSelectedCategoryEdit(selectedCategory);
    };

    const ShowModalWin = (item) => {
        setShowModalWindow(true);
        setProductIdEdit(item.productId);
        setSelectedCategoryEdit(categories.find((categories) => categories.categoryId === item.categoryId));
        setNameEdit(item.name);
        setImageUrlEdit(item.image);
        setColorEdit(item.color);
        setPixelEdit(item.pixel);
        setDescriptionEdit(item.description);
        setQuantityEdit(item.quantity);
        setPriceEdit(item.price);
    };

    const CloseModalWin = () => {
        setShowModalWindow(false);
    };

    useEffect(() => {
        SelectProducts();
        SelectCategories();
    }, []);

    return (
        <div className="panel-menu">

            <div className="nav-menu">
                <div className="nav-elements">
                    <button type="button" onClick={()=>{navigate("/panelMenu")}}>Products</button>
                    <button type="button" onClick={()=>{navigate("/categoriesMenu")}}>Categories</button>
                    <button type="button" onClick={()=>{navigate("/ordersMenu")}}>Orders</button>
                    <button type="button" onClick={()=>{navigate("/accountsMenu")}}>Accounts</button>
                </div>
            </div>

            <div className="create-card">
                <h2>Create Product</h2>
                <div className="create-card-elements">
                    <label>Product category</label>
                    <select className="select-categories" value={selectedCategory ? selectedCategory.name : ''} onChange={handleCategoryChange}>
                        <option disabled value="">
                            Select category
                        </option>
                        {Array.isArray(categories) && categories.map((category, index) => (
                            <option key={index} value={category.name}>{category.name}</option>
                        ))}
                    </select>
                    <label>Product image</label>
                    <input type="text" placeholder="Enter url image" value={imageUrl} onChange={(e) => { setImageUrl(e.target.value) }} />
                    <label>Product name</label>
                    <input type="text" placeholder="Enter name product" value={name} onChange={(e) => { setName(e.target.value) }} />
                    <label>Product color</label>
                    <input type="text" placeholder="Enter color product" value={color} onChange={(e) => { setColor(e.target.value) }} />
                    <label>Product pixel</label>
                    <input type="number" placeholder="Enter pixel product" value={pixel} onChange={(e) => { setPixel(e.target.value) }} />
                    <label>Product description</label>
                    <input type="text" placeholder="Enter description product" value={description} onChange={(e) => { setDescription(e.target.value) }} />
                    <label>Product quantity</label>
                    <input type="number" placeholder="Enter quantity product" value={quantity} onChange={(e) => { setQuantity(e.target.value) }} />
                    <label>Product price</label>
                    <input type="number" placeholder="Enter price product" value={price} onChange={(e) => { setPrice(e.target.value) }} />
                    <button onClick={() => { CreateProduct() }}>Create</button>
                </div>
            </div>

            <h1>Products</h1>
            <table className="product-table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>ID</th>
                        <th>Category</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Color</th>
                        <th>Pixels</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th colSpan={2}>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={index}>
                            <td><img src={`${product.image}`} /></td>
                            <td>{product.productId}</td>
                            <td>{product.categoryName}</td>
                            <td>{product.name}</td>
                            <td>{product.quantity}</td>
                            <td>{product.color}</td>
                            <td>{product.pixel}</td>
                            <td>{product.price} UAH</td>
                            <td>{product.description}</td>
                            <td><button onClick={() => { ShowModalWin(product) }}>Edit</button></td>
                            <td><button type="button" onClick={() => { DeleteProduct(product) }}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className={showModalWindow ? "modal-overlay" : ""}>
                {showModalWindow && (
                    <div className="modal-win">
                        <h2>Edit product</h2>
                        <div className="modal-win-elements">
                            <label>Product category</label>
                            <select className="select-categories" value={selectedCategoryEdit ? selectedCategoryEdit.name : ''} onChange={handleCategoryChangeEdit}>
                                <option disabled value="">
                                    Select category
                                </option>
                                {Array.isArray(categories) && categories.map((category, index) => (
                                    <option key={index} value={category.name}>{category.name}</option>
                                ))}
                            </select>
                            <label>Product image</label>
                            <input type="text" placeholder="Enter url image" value={imageUrlEdit} onChange={(e) => { setImageUrlEdit(e.target.value) }} />
                            <label>Product name</label>
                            <input type="text" placeholder="Enter name product" value={nameEdit} onChange={(e) => { setNameEdit(e.target.value) }} />
                            <label>Product color</label>
                            <input type="text" placeholder="Enter color product" value={colorEdit} onChange={(e) => { setColorEdit(e.target.value) }} />
                            <label>Product pixel</label>
                            <input type="number" placeholder="Enter pixel product" value={pixelEdit} onChange={(e) => { setPixelEdit(e.target.value) }} />
                            <label>Product description</label>
                            <input type="text" placeholder="Enter description product" value={descriptionEdit} onChange={(e) => { setDescriptionEdit(e.target.value) }} />
                            <label>Product quantity</label>
                            <input type="number" placeholder="Enter quantity product" value={quantityEdit} onChange={(e) => { setQuantityEdit(e.target.value) }} />
                            <label>Product price</label>
                            <input type="number" placeholder="Enter price product" value={priceEdit} onChange={(e) => { setPriceEdit(e.target.value) }} />
                            <button onClick={() => { UpdateProduct() }}>Edit</button>
                            <button onClick={() => { CloseModalWin() }}>Close</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}