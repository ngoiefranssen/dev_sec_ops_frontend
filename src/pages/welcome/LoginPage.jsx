import React, { useEffect, useState } from "react";

import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";

import { Button } from "primereact/button";

import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import fetchApi from "@/helpers/fetchApi";
import { useApp } from "@/hooks/useApp";

const LoginPage = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [visiblePassowrd, setVisiblePassowrd] = useState(false);
    const { user, handleLogin } = useAuth();
    const { setToastAction } = useApp();

    const initialValues = {
        EMAIL: "",
        PASSWORD: "",
    };

    const [data, setData] = useState(initialValues);
    const [errors, setErrors] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            setIsSubmitting(true);

            const response = await fetchApi('/login', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            await handleLogin(response.data);

            setToastAction({
                severity: "success",
                summary: "Success",
                detail: response.message,
                life: 3000,
            })

            setErrors(null);


        } catch (response) {
            if (response.httpStatus === 422) {
                setErrors(response.errors);
            }

            setToastAction({
                severity: "error",
                summary: "Erreur",
                detail: response.message,
                life: 3000,
            })
        } finally {
            setIsSubmitting(false);

        }
    };

    useEffect(() => {
        document.title = 'WildLeaf Souche - Login';
    }, [])

    if (user.data) {
        return <Navigate replace to={'/dashboard'} />
    }

    return (
        <div className="p-3 w-full login">
            <div className="row">
                <div className="col-md-10 login-area mx-auto">
                    <div className="row">
                        <div className="col-md-6 login-left d-flex align-items-center justify-content-center">

                            <div className="w-100 text-center">
                                <Link to="/">
                                    <img
                                        src={'/vite.svg'}
                                        alt="Logo"
                                        style={{ height: "160px", width: "160px" }}
                                    />
                                </Link>
                            </div>

                        </div>
                        <div className="col-md-6 login-right">
                            <Card className="m-0 py-0 login-form-area">
                                <div className="p-d-flex p-flex-column mt-1">
                                    <div className="w-100 d-flex justify-content-center">
                                        <label className="text-center">
                                            <h4>Connexion</h4>
                                            <small>Veuillez s'il vous plaît entrer votre <br /> nom d'utilisateur et votre mot de passe.</small>
                                        </label>
                                    </div>
                                </div>

                                <div className="w-100 d-flex align-items-center justify-content-center bg-white">
                                    <form
                                        action=""
                                        method="POST"
                                        className="form w-75"
                                        onSubmit={handleSubmit}
                                    >
                                        <div className="form-group w-100">
                                            <label htmlFor="NOM_UTILISATEUR" className="label mb-1">
                                                Email
                                            </label>

                                            <div className="col-sm">
                                                <InputText
                                                    type="email"
                                                    id="NOM_UTILISATEUR"
                                                    name="EMAIL"
                                                    value={data.EMAIL}
                                                    style={{ borderRadius: "0px" }}
                                                    onChange={e => setData(data => ({ ...data, EMAIL: e.target.value }))}
                                                    className={`w-100 is-invalid ${errors?.EMAIL ? "p-invalid" : ""}`}
                                                />
                                                {errors?.EMAIL && <div
                                                    className="invalid-feedback"
                                                    style={{ minHeight: 0, display: "block" }}
                                                >
                                                    {errors?.EMAIL}
                                                </div>}
                                            </div>
                                        </div>

                                        <div className="form-group w-100 mt-3">
                                            <label htmlFor="PASSWORD" className="label mb-1">
                                                Mot de passe
                                            </label>

                                            <div className="col-sm relative">
                                                <InputText
                                                    required
                                                    type={visiblePassowrd ? "text" : "password"}
                                                    style={{ borderRadius: "0px", width: "100%" }}
                                                    id="PASSWORD"
                                                    name="PASSWORD"
                                                    value={data.PASSWORD}
                                                    onChange={e => setData(data => ({ ...data, PASSWORD: e.target.value }))}
                                                    className={`w-100 is-invalid ${errors?.PASSWORD ? "p-invalid" : ""}`}

                                                />

                                                <span
                                                    className="p-input-icon-right absolute"
                                                    style={{ top: "25px", right: "20px" }}
                                                >
                                                    {!visiblePassowrd ? (
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="16"
                                                            height="16"
                                                            fill="currentColor"
                                                            className="bi bi-eye cursor-pointer"
                                                            viewBox="0 0 16 16"
                                                            onClick={() => setVisiblePassowrd((b) => !b)}
                                                        >
                                                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                                        </svg>
                                                    ) : (
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="16"
                                                            height="16"
                                                            fill="currentColor"
                                                            className="bi bi-eye-slash cursor-pointer"
                                                            viewBox="0 0 16 16"
                                                            onClick={() => setVisiblePassowrd((b) => !b)}
                                                        >
                                                            <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                                                            <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                                                            <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                                                        </svg>
                                                    )}
                                                </span>

                                                {errors?.PASSWORD && <div
                                                    className="invalid-feedback"
                                                    style={{ minHeight: 0, display: "block" }}
                                                >
                                                    {errors?.PASSWORD}
                                                </div>}
                                            </div>
                                        </div>

                                        <center>
                                            <Button
                                                label="Se connecter"
                                                icon="pi pi-sign-in"
                                                type="submit"
                                                className="center mt-4"
                                                size="small"
                                                loading={isSubmitting}
                                            />
                                        </center>
                                    </form>
                                </div>
                            </Card>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;