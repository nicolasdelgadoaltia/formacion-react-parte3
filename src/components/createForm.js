import React, { useEffect, useState } from "react";
import { getUserTypes } from "../api";

const completeForm = (email, name, userType) => email !== "" && name !== "" && userType !== null;

const CreateForm = ({ onCreateUser }) => {
    const [userTypes, setUserTypes] = useState([]);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [userType, setUserType] = useState(null);
    const [active, setActive] = useState(false);

    const createUserButtonActive = completeForm(email,name, userType);

    useEffect(() => {
        getUserTypes().then(userTypes => setUserTypes(userTypes));
    },[setUserTypes]);

    return (<div>
        <h3>Crear usuario:</h3>
        <label>
            Email:<br/>
            <input type="text" value={email} onChange={event => setEmail(event.target.value)} />
        </label><br/><br/>
        <label>
            Name:<br/>
            <input type="text" value={name} onChange={event => setName(event.target.value)} />
        </label><br/><br/>
        <label>
            User type:<br/>
            <select onChange={event => setUserType(parseInt(event.target.value, 10))}>
                { !userType && <option>Select type</option> }
                { userTypes.map(({ id, description}) => (
                    <option key={id} value={id}>{description}</option>
                ))}
            </select>
        </label><br/><br/>
        <label>
            Active:
            <input type="checkbox" value={active} onChange={event => setActive(event.target.value)} />
        </label><br/><br/><br/>
        <button
            style={{ opacity: createUserButtonActive ? 1 : 0.3 }}
            disabled={!createUserButtonActive}
            onClick={() => onCreateUser({ email, name, active, userType })}
        >
            Create user
        </button>
</div>);
}

export default CreateForm;