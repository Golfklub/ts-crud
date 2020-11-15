import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";

import "./App.css";
import { useFormik } from "formik";
import { create, deleteStaff, edit, getList } from "./services/Firebase";
import { firebaseConfig } from "./constant";

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();

const App = () => {
  const [staffList, setStaffList] = useState<Array<Record<string, any>>>([]);
  const [editingId, setEditingId] = useState<string>("");

  const createForm = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      age: "",
      description: "",
    },
    onSubmit: (values) => {
      create(values.firstName, values.lastName, values.age, values.description)
        .then(() => {
          alert("Create Success!!!");
          getStaffList();
        })
        .catch((error) => alert(`Create Failed!!!, ${error.message}`));
    },
  });

  const editForm = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      age: "",
      description: "",
    },
    onSubmit: (values) => {
      edit(
        editingId,
        values.firstName,
        values.lastName,
        values.age,
        values.description
      )
        .then(() => {
          alert("Edit Success!!!");
          setEditingId("");
          getStaffList();
        })
        .catch((error) => alert(`Create Failed!!!, ${error.message}`));
    },
  });

  const getStaffList = () => {
    getList().then((querySnapshot: any) => {
      setStaffList([]);
      querySnapshot.forEach((doc: any) => {
        setStaffList((staffList) => {
          return [...staffList, { ...doc.data(), id: doc.id }];
        });
      });
    });
  };

  const onDelete = (id: string) => {
    deleteStaff(id)
      .then(() => {
        alert("Delete Success!!");
        getStaffList();
      })
      .catch((error) => alert(`Delete Failed!!!, ${error.message}`));
  };

  const onEditing = (
    id: string,
    firstname: string,
    lastname: string,
    age: string,
    description: string
  ) => {
    setEditingId(id);
    editForm.setValues({
      firstName: firstname,
      lastName: lastname,
      age,
      description,
    });
  };

  useEffect(() => {
    getStaffList();
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <form onSubmit={createForm.handleSubmit}>
          <input
            name="firstName"
            id="firstName"
            required
            onChange={createForm.handleChange}
            value={createForm.values.firstName}
            placeholder="First Name"
          />
          <input
            name="lastName"
            id="lastName"
            required
            onChange={createForm.handleChange}
            value={createForm.values.lastName}
            placeholder="Last Name"
          />
          <input
            name="age"
            id="age"
            type="number"
            required
            onChange={createForm.handleChange}
            value={createForm.values.age}
            placeholder="Age"
          />
          <input
            name="description"
            id="description"
            required
            onChange={createForm.handleChange}
            value={createForm.values.description}
            placeholder="Description"
          />
          <button type="submit">Submit</button>
        </form>
        <div id="list-item">
          {staffList.map((res) => {
            if (editingId === res.id) {
              return (
                <div
                  key={res.id}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <form onSubmit={editForm.handleSubmit}>
                    <span>
                      <input
                        name="firstName"
                        id="firstName"
                        required
                        onChange={editForm.handleChange}
                        value={editForm.values.firstName}
                        placeholder="First Name"
                      />
                      <input
                        name="lastName"
                        id="lastName"
                        required
                        onChange={editForm.handleChange}
                        value={editForm.values.lastName}
                        placeholder="Last Name"
                      />
                      <input
                        name="age"
                        id="age"
                        type="number"
                        required
                        onChange={editForm.handleChange}
                        value={editForm.values.age}
                        placeholder="Age"
                      />
                      <input
                        name="description"
                        id="description"
                        required
                        onChange={editForm.handleChange}
                        value={editForm.values.description}
                        placeholder="Description"
                      />
                    </span>
                    <span>
                      <button type="submit">Edit</button>
                    </span>
                    <span>
                      <button onClick={() => setEditingId("")}>Cancel</button>
                    </span>
                  </form>
                </div>
              );
            }

            return (
              <div
                key={res.id}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <span>
                  name:{res.firstname} {res.lastname} age:{res.age} description:
                  {res.description}
                </span>
                <span>
                  <button
                    onClick={() =>
                      onEditing(
                        res.id,
                        res.firstname,
                        res.lastname,
                        res.age,
                        res.description
                      )
                    }
                  >
                    Edit
                  </button>
                </span>
                <span>
                  <button onClick={() => onDelete(res.id)}>Delete</button>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
