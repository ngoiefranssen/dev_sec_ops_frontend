import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

export const useAuth = () => {
    const app = useContext(AppContext);

    return {
        user: {
            data: app.user,
            hasPermission: (role) => {
                if (!role) return false;

                const roles = app.user?.PROFILS.map(profil => [...profil.ROLES]).flat();

                return Boolean(roles?.find(r => r.ROLE_NOM === role))
            }
        },
        handleLogin: app.handleLogin,
        handleLogout: app.handleLogout
    }
};