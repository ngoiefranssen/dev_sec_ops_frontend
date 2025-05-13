import config from "@/config";
import { history } from "./history";

/**
 * consomer une api avec les options par défaut
 * @param {string} url - le lien à appeler
 * @param {object} options - autres options comme les headers et le body
 * @returns { Promise }
 */
export default async function fetchApi(url, options = {}) {

    const user = JSON.parse(localStorage.getItem("default-user") || null);

    const headers = { ...options?.headers };

    if (user) {
        headers.authorization = `bearer ${user.token}`
    }

    const response = await fetch(`${config.BASE_URL}/api${url}`, {
        ...options,
        headers
    });

    if (response.status === 401) {

        const data = await response.json();

        localStorage.clear();

        history?.navigate('/login');

        history.toast?.current?.show({
            severity: "error",
            summary: "Erreur",
            detail: data?.message,
            life: 3000,
        })

        return Promise.reject(data);
    }

    if (response.status === 403) {

        const data = await response.json();

        history?.navigate('/forbidden');

        return Promise.reject(data);
    }

    if (!response.ok) {
        return Promise.reject(await response.json());;
    }

    return await response.json();
}