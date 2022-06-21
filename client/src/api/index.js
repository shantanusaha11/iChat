import axios from "axios";

export const URL = "https://ichat-server-code.herokuapp.com";

const API = axios.create({ baseURL: URL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("user-info")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("user-info")).token
    }`;
  }
  return req;
});

export const userRegister = async(userData) =>
 await  API.post("/api/auth/register", userData);

export const userLogin = async(userData) => await API.post("/api/auth/login", userData);

export const setAvatar = async(id, userData) =>
 await API.patch(`/api/auth/setAvatar/${id}`, { image: userData });

export const fetchContacts = async(id) => await API.get(`/api/auth/users/${id}`);

export const getMessages = async({from,to}) => await API.post(`/api/message/getmsg`,{from,to});

export const addMessages = async({from,to,message}) => await API.post(`/api/message/addmsg`,{from,to,message});