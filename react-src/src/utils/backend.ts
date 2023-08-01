import { backendIP } from "../config/backendConfig";

export const sendLoginRequest = async (username: string, password: string) => {
    console.log("Sending login request");
    
    const response = await fetch(`${backendIP}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    });   

    return response.json();
}


export const getAllUsers = async () => {
    // get JWT from local storage
    const token = localStorage.getItem("user");   

    const response = await fetch(`${backendIP}/userMgmt/getUsers`, { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`
        }
    });

    return response.json();    
}

export const deleteUser = async (username: string) => {
    const token = localStorage.getItem("user");

    const response = await fetch(`${backendIP}/userMgmt/deleteUser`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ "username": username })
    });

    return response.json();
}

export const createUser = async (username: string, password: string) => {
    const token = localStorage.getItem("user");

    const response = await fetch(`${backendIP}/userMgmt/createUser`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ "username": username, "password": password })
    });

    console.log(response);
    

    return response.json();
}


export const createPost = async (title: string, content: string) => {
    const token = localStorage.getItem("user");

    const response = await fetch(`${backendIP}/postMgmt/createPost`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`,
            "title": title
        },
        body: JSON.stringify({ "content": content })
    });

    return response.json();
}