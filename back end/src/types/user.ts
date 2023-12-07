import { ObjectId } from "mongoose";

interface User {
  _id: ObjectId
  name: string;
  email: string;
  password: string;
  image: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

export {
  User
}