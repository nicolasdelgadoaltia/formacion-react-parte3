import React, { useCallback, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { getUserTypes } from "../api";
import FormContext from "../contexts/form";

const StyledInput = styled("input")`
  border: 1px solid ${({ value }) => (value !== "" ? "green" : "red")};
`;
const StyledSelect = styled("select")`
  border: 1px solid ${({ value }) => (value !== "" ? "green" : "red")};
`;
const completeForm = (email, name, userType) =>
  email !== "" && name !== "" && userType !== "";

const CreateForm = () => {
  const [userTypes, setUserTypes] = useState([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [userType, setUserType] = useState("");
  const [active, setActive] = useState(false);
  const { addUser } = useContext(FormContext);

  const createButtonClickHandler = useCallback(
    () => addUser({ email, name, active, userType }),
    [addUser, email, name, active, userType]
  );

  const createUserButtonActive = completeForm(email, name, userType);

  useEffect(() => {
    getUserTypes().then((userTypes) => setUserTypes(userTypes));
  }, [setUserTypes]);

  return (
    <div>
      <h3>Crear usuario:</h3>
      <label>
        Email:
        <br />
        <StyledInput
          type="text"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>
      <br />
      <br />
      <label>
        Name:
        <br />
        <StyledInput
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </label>
      <br />
      <br />
      <label>
        User type:
        <br />
        <StyledSelect
          onChange={(event) => setUserType(parseInt(event.target.value, 10))}
          value={userType}
        >
          {!userType && <option>Select type</option>}
          {userTypes.map(({ id, description }) => (
            <option key={id} value={id}>
              {description}
            </option>
          ))}
        </StyledSelect>
      </label>
      <br />
      <br />
      <label>
        Active:
        <input
          type="checkbox"
          value={active}
          onChange={(event) => setActive(event.target.value)}
        />
      </label>
      <br />
      <br />
      <br />
      <button
        style={{ opacity: createUserButtonActive ? 1 : 0.3 }}
        disabled={!createUserButtonActive}
        onClick={createButtonClickHandler}
      >
        Create user
      </button>
    </div>
  );
};

export default CreateForm;
