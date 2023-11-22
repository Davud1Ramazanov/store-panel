import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/PanelMenu.css";

export default function AccountMenu() {

    const navigate = useNavigate();
    const [accounts, setAccounts] = useState([]);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [showModalWindow, setShowModalWindow] = useState(false);
    const [accountId, setAccountId] = useState(null);
    const [userNameEdit, setUserNameEdit] = useState('');
    const [passwordEdit, setPasswordEdit] = useState('');
    const [emailEdit, setEmailEdit] = useState('');

    function getToken() {
        return sessionStorage.getItem('token');
    }

    const CreateAccount = () => {
        axios({
            method: 'post',
            url: 'http://bibizan12-001-site1.ctempurl.com/api/User/Create',
            data: {
                "userName": userName,
                "password": password,
                "email": email
            },
            headers: {
                'Authorization': 'Bearer ' + getToken(),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((data) => {
            alert("Admin succsessfully created!");
        }).catch((error) => {
            console.log(error);
        });
    };
    
    const UpdateAccount = () => {
        axios({
            method: 'post',
            url: `http://bibizan12-001-site1.ctempurl.com/api/User/Update?id=${accountId}`,
            data: {
                "userName": userNameEdit,
                "password": passwordEdit,
                "email": emailEdit
            },
            headers: {
                'Authorization': 'Bearer ' + getToken(),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            alert("Admin updated created!");
        }).catch((error) => {
            console.log(error);
        })
    };

    const DeleteAccount = (item) => {
        axios({
            method: 'post', 
            url: 'http://bibizan12-001-site1.ctempurl.com/api/User/Delete',
            data: {
                "userName": item.userName,
                "password": item.passwordHash,
                "email": item.email
            },
            headers: {
                'Authorization': 'Bearer ' + getToken(),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            alert("Admin succsessfully deleted!");
        }).catch((error) => {
            console.log(error);
        })
    };
    

    const SelectAccounts = () => {
        axios({
            method: 'get',
            url: 'http://bibizan12-001-site1.ctempurl.com/api/User/Select',
            headers: {
                'Authorization': 'Bearer ' + getToken(),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            setAccounts(response.data);
        }).catch((error) => {
            console.log(error);
        })
    };

    const ShowModalWin = (item) => {
        setShowModalWindow(true);
        setAccountId(item.id);
        setUserNameEdit(item.userName);
        setEmailEdit(item.email);
        setPasswordEdit(item.passwordHash);
    };

    const CloseModalWin = () => {
        setShowModalWindow(false);
    };

    useEffect(() => {
        SelectAccounts();
    });

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
                <h2>Create Administration</h2>
                <div className="create-card-elements">
                    <label>User Name</label>
                    <input type="text" placeholder="Enter user name" value={userName} onChange={(e) => { setUserName(e.target.value) }} />
                    <label>Password</label>
                    <input type="password" placeholder="Enter password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                    <label>Email</label>
                    <input type="email" placeholder="Enter email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    <button onClick={() => { CreateAccount() }}>Create</button>
                </div>
            </div>

            <h1>Users</h1>
            <table className="product-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User Name</th>
                        <th>Email</th>
                        <th colSpan={2}>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {accounts.map((account, index) => (
                        <tr key={index}>
                            <td>{account.id}</td>
                            <td>{account.userName}</td>
                            <td>{account.email}</td>
                            <td><button onClick={() => { ShowModalWin(account) }}>Edit</button></td>
                            <td><button type="button" onClick={() => { DeleteAccount(account) }}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className={showModalWindow ? "modal-overlay" : ""}>
                {showModalWindow && (
                    <div className="modal-win">
                        <div className="modal-win-elements">
                            <h2>Update user</h2>
                            <div className="create-card-elements">
                                <label>User Name</label>
                                <input type="text" placeholder="Enter user name" value={userNameEdit} onChange={(e) => { setUserNameEdit(e.target.value) }} />
                                <label>Email</label>
                                <input type="email" placeholder="Enter email" value={emailEdit} onChange={(e) => { setEmailEdit(e.target.value) }} />
                                <button onClick={() => { UpdateAccount() }}>Update</button>
                                <button onClick={() => { CloseModalWin() }}>Close</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}