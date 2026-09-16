
import type LoginData from "@/model/LoginData";
import type RegisterData from "../model/RegisterData";
import apiClient from "@/config/ApiClient";
import type LoginResponseData from "@/model/LoginResponceData";
import type User from "@/model/User";


export const registerUser = async (signupData: RegisterData) => {
const response = await apiClient.post("/auth/register", signupData);
return response.data;
};

export const loginUser = async (loginData: LoginData) => {
    const response = await apiClient.post<LoginResponseData>("/auth/login", loginData);
    return response.data;
};

export const logoutUser = async () => {
    const response = await apiClient.post("/auth/logout");
    return response.data;
}

export const getCurrentUser = async(emailId:string | undefined) => {
 const response = await apiClient.get<User>(`/users/email/${emailId}`);
return response.data;
}

export const refreshToken = async() =>{
    const responce = await apiClient.post<LoginResponseData>(`/auth/refresh`);
    return responce.data;
} 
