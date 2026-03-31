import './AdminDashboard.css'
import {  useNavigate } from 'react-router-dom';
function AdminDashboard() {
    const navigate = useNavigate();
    return (
        <div className="admin-board">
            <h2 className="admin-title">Admin dashboard</h2>
            <div className="button-container">
                <button className='admin-btn' onClick={() => navigate("admin/add-product")}>Add restaraunt</button>
                <button className='admin-btn view-btn' onClick={() => navigate("admin/view-product")}>View restaraunt</button>
            </div>

        </div>
    )
}

export default AdminDashboard;