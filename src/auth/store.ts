import type LoginData from "@/model/LoginData";
import type User from "@/model/User";
import { loginUser, logoutUser } from "@/services/AuthServices";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const LOCAL_KEY = "app_state";

type AuthState = {
    accessToken: string | null;
    user: User | null;
    authState: boolean;
    authLoading: boolean;

    login: (loginData: LoginData) => Promise<void>;

    logout: (options?: { silent?: boolean }) => Promise<void>;

    checkLogin: () => boolean;

    changeLocalLoginData: (
        accessToken: string,
        user: User,
        authState: boolean
    ) => void;
};

const useAuth = create<AuthState>()(
    persist(
        (set, get) => ({
            accessToken: null,
            user: null,
            authState: false,
            authLoading: false,

            login: async (loginData: LoginData) => {
                console.log("started login...");

                set({
                    authLoading: true,
                });

                try {
                    const loginResponseData = await loginUser(loginData);

                    console.log(loginResponseData);

                    set({
                        accessToken: loginResponseData.accessToken,
                        user: loginResponseData.user,
                        authState: true,
                        authLoading: false,
                    });
                } catch (error) {
                    set({
                        authLoading: false,
                    });

                    throw error;
                }
            },

            logout: async ({ silent = false } = {}) => {
                try {
                    await logoutUser();

                    set({
                        accessToken: null,
                        user: null,
                        authState: false,
                    });
                } catch (error) {
                    if (!silent) {
                        throw error;
                    }
                } finally {
                    set({
                        authLoading: false,
                    });
                }
            },

            checkLogin: () => {
                return !!(
                    get().accessToken &&
                    get().authState
                );
            },

            changeLocalLoginData: (
                accessToken,
                user,
                authState,
               
            ) => {
                set({
                    accessToken,
                    user,
                    authState,
                    
                });
            },
        }),

        {
            name: LOCAL_KEY,
        }
    )
);

export default useAuth;