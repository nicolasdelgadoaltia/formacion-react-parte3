import React, { useCallback, useContext, useEffect, useState } from "react";
import { getUserTypes } from "../api";
import FormContext from "../contexts/form";

const UsersTable = () => {
    const [userTypes, setUserTypes] = useState([]);
    const { users, deleteUser } = useContext(FormContext);

    useEffect(() => {
        getUserTypes().then(userTypes => setUserTypes(userTypes));
    },[setUserTypes]);

    const userTypeDescription = useCallback(userType => {
        const selectedUserType = userTypes.find(ut => ut.id === userType);
        return selectedUserType ? selectedUserType.description : "";
    }, [userTypes]);

    const handleDeleteUser = useCallback(index => () => deleteUser(index), [deleteUser]);
    
    return (<div>
        <h3>Users:</h3>
        <br/>
        <table width="100%">
            <thead>
                <tr>
                    <th>Email</th>
                    <th>Name</th>
                    <th>User type</th>
                    <th>Active</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                { users.map(({ email, name, userType, active}, index) => (
                <tr key={index}>
                    <td>{email}</td>
                    <td>{name}</td>
                    <td>{ userTypeDescription(userType) }</td>
                    <td>{active ? "Yes" : "No"}</td>
                    <td><button onClick={handleDeleteUser(index)}>Delete</button></td>
                </tr>
                ))}
            </tbody>
        </table>
</div>);
}

export default UsersTable;