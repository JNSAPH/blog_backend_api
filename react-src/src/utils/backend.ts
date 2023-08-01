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
