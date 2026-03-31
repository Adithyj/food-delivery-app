import { useState } from 'react';
import AdminDashboard from './AdminDashboard'

function AdminUsers(){

    const [users, setUsers] = useState([{
        name:"Adithya", phone:8088406720, email:"adithyaj086@gmail.com"
    }])
    return(

        <><AdminDashboard/>
        <div className='user-container'>
            <div className='user-table'>

                <table>
                    <thead>
                        <tr>
                        <th>Name</th>
                        <th>phone</th>
                        <th>Email</th>
                    </tr>
                    </thead>
                    <tbody>
                        
                    </tbody>
                    

                </table>
            </div>

        </div>
        </>
    )

}

export default AdminUsers;