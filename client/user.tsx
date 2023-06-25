import React, { useState, useEffect } from "react"
import ReactDom from "react-dom/client"
import { trpc } from "./index"

const App = () => {
    const [users,setUsers] = useState([])

    useEffect(() => {
        fetchData()
    },[])

    const fetchData= async () => {
        const UserList = await trpc.userList.query()
        setUsers(UserList)
    }

    return(
        <div>
            <table>
                <thead>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                </thead>
                <tbody>
                    {users.map((user) =>(
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

ReactDom.createRoot(document.getElementById("app") as HTMLElement).render(<App/>)