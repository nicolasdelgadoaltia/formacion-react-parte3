import React, { useCallback, useReducer } from "react";
import CreateForm from "./components/createForm";
import UsersTable from "./components/table";
import "./styles.css";

const initialState = {users: [], createFormVisible: false };

const actionTypes = {
  CREATE_USER: "CREATE_USER",
  DELETE_USER: "DELETE_USER",
  SHOW_CREATE_FORM: "SHOW_CREATE_FORM",
}

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.CREATE_USER:
      return { ...state, users: [...state.users, action.payload], createFormVisible: false};
    case actionTypes.DELETE_USER:
      const newUsers = [...state.users];
      newUsers.splice(action.payload, 1);
      return { ...state, users: newUsers };
    case actionTypes.SHOW_CREATE_FORM:
      return { ...state, createFormVisible: true };
    default:
      throw new Error();
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { users, createFormVisible } = state;

  const addUser = useCallback(user => dispatch({type: actionTypes.CREATE_USER, payload: user }), [dispatch]);
  const deleteUser = useCallback(userIndex => dispatch({type: actionTypes.DELETE_USER, payload: userIndex }), [dispatch]);
  const showCreateForm = useCallback(() => dispatch({type: actionTypes.SHOW_CREATE_FORM }), [dispatch]);

  return (
    <div className="App">
      { createFormVisible ? 
        <CreateForm onCreateUser={addUser} /> :
        <>
        { 
          users.length === 0 ?
            <p>There are no users introduced.</p> :
            <UsersTable users={users} onDeleteUser={deleteUser} />
        }<br/><br/>
        <button onClick={showCreateForm}>Add new user</button>
      </> 
    }
    </div>
  );
}
