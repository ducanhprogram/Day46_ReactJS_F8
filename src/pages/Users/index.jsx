import { Link } from "react-router-dom";

import config from "@/config";
import { useEffect, useState } from "react";
import userService from "@/services/userService";

/*

Route: /users/:id
Link to: /users/${product.id}

*/

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            try {
                const users = await userService.getAll();
                setUsers(users);
            } catch (e) {
                console.error(e.message);
            }
        };
        fetchAPI();
    }, []);

    return (
        <div>
            <h1>Users Page</h1>
            <ul>
                {users.map((user) => {
                    return (
                        <li key={user.id}>
                            <Link
                                to={`${config.routes.users}/${user.username}`}
                            >
                                {user.firstName}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
export default Users;
