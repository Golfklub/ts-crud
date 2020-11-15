import firebase from "firebase/app";
import "firebase/database";
import { firestore } from "../App";
import { Staff } from "../models/Staff";

export const getList: () => Promise<
  firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
> = () => {
  return firestore.collection("staff").get();
};

export const create = (
  firstName: string,
  lastName: string,
  age: string,
  description: string
): Promise<firebase.firestore.DocumentReference> => {
  return firestore.collection("staff").add({
    firstname: firstName,
    lastname: lastName,
    age,
    description,
  });
};

export const edit = (
  id: string,
  firstName: string,
  lastName: string,
  age: string,
  description: string
): Promise<void> => {
  return firestore.collection("staff").doc(id).update({
    firstname: firstName,
    lastname: lastName,
    age,
    description,
  });
};

export const deleteStaff = (id: string) => {
  return firestore.collection("staff").doc(id).delete();
};
