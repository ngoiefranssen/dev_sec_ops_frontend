import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const AppContext = createContext(null);

/**
 *
 * @author aboubakar@mediabox.bi
 * @description Le fournisseur de context pour toute l'application entière
 */
export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('default-user') || null));
    const [locale, setLocale] = useState(() => JSON.parse(localStorage.getItem('default-locale') || JSON.stringify("fr")));
    const [breadCrumbItems, setBreadCrumbItems] = useState([]);
    const [toast, setToast] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();

    /**
     * Action pour gérer la connexion d'un utilisateru
     */
    const handleLogin = async (data) => {
        setUser(data)

        const origin = location.state?.from?.pathname || '/dashboard';

        setTimeout(() => {
            navigate(origin)
        }, 0);

        setToast({
            severity: "success",
            summary: "Success",
            detail: "Utilisateur connecté avec succés",
            life: 3000,
        })
    };

    /**
     * Action pour gérer la déconnexion d'un utilisateru
     */
    const handleLogout = () => {
        setUser(null);
        localStorage.clear();
    };

    useEffect(() => {
        if (user) {
            localStorage.setItem('default-user', JSON.stringify(user));
        }
    }, [handleLogin, user])

    useEffect(() => {
        if (locale) {
            localStorage.setItem('default-locale', JSON.stringify(locale));
        }
    }, [locale])

    const value = {
        user,
        handleLogin,
        handleLogout,

        breadCrumbItems,
        setBreadCrumbItems,
        toast,
        setToast,

        locale,
        setLocale
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}