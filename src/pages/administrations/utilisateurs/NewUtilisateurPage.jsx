import { InputText } from "primereact/inputtext";
import Loading from "@/components/app/Loading";
import { Button } from "primereact/button";
import fetchApi from "@/helpers/fetchApi";
import { Dropdown } from "primereact/dropdown";
import { useEffect, useState } from "react";
import { utilisateurs_routes_items } from "@/routes/administrations/utilisateurs_routes";
import { useApp } from "@/hooks/useApp";
import { FileUpload } from "primereact/fileupload";
import { useNavigate } from "react-router-dom";
import { MultiSelect } from "primereact/multiselect";

export default function NewUtilisateurPage() {
    const navigate = useNavigate();
    const { setBreadCrumbAction, setToastAction } = useApp()

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [visiblePassowrd, setVisiblePassowrd] = useState(false);
    const [visibleConfirmPassowrd, setVisibleConfirmPassowrd] = useState(false);

    const [profils, setProfils] = useState([])

    const initialValues = {
        USERNAME: "",
        EMAIL: "",
        PASSWORD: "",
        CONFIRM_PASSWORD: "",
        NOM: "",
        PRENOM: "",
        TELEPHONE1: "",
        TELEPHONE2: "",
        PROFIL_PICTURE: null,
        ADRESSE: "",
        PROFILS: []
    }

    const [data, setData] = useState(initialValues)

    const [errors, setErrors] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            setIsSubmitting(true);

            const formData = new FormData();

            for (let key in data) {
                if (key === 'PROFILS') {
                    formData.append(`PROFILS`, JSON.stringify(data[key]))
                } else {

                    formData.append(key, data[key]);
                }
            }

            const response = await fetchApi('/utilisateurs', {
                method: 'POST',
                body: formData,
            });

            setToastAction({
                severity: "success",
                summary: "Success",
                detail: response.message,
                life: 3000,
            })

            setErrors(null);

            navigate('/utilisateurs');

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

    const fetchProfils = async () => {
        try {
            const res = await fetchApi('/profils');
            setProfils(res.data.rows)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        document.title = utilisateurs_routes_items.new_utilisateur.name;

        setBreadCrumbAction([utilisateurs_routes_items.utilisateurs, utilisateurs_routes_items.new_utilisateur])

        fetchProfils();

        return () => {
            setBreadCrumbAction([]);
        };

    }, [])

    return (
        <>
            <div className="px-4 py-3 main_content bg-white has_footer">
                <div className="">
                    <h1 className="mb-3">Nouvel utilisateur</h1>
                    <hr className="w-100" />
                </div>
                <form className="form w-75 mt-5" onSubmit={handleSubmit}>
                    <div className="form-group col-sm">
                        <div className="row">
                            <div className="col-md-4">
                                <label htmlFor="NOM" className="label mb-1">Nom</label>
                            </div>

                            <div className="col-sm">
                                <InputText autoFocus type="text" placeholder="Ecrire votre nom" id="NOM" name="NOM" value={data.NOM} onChange={e => setData(d => ({ ...d, NOM: e.target.value }))} className={`w-100 is-invalid ${errors?.NOM ? 'p-invalid' : ''}`} />

                                {errors?.NOM && <div
                                    className="invalid-feedback"
                                    style={{ minHeight: 0, display: "block" }}
                                >
                                    {errors?.NOM}
                                </div>}
                            </div>
                        </div>
                    </div>

                    <div className="form-group col-sm mt-4">
                        <div className="row">
                            <div className="col-md-4">
                                <label htmlFor="PRENOM" className="label mb-1">Prénom</label>
                            </div>
                            <div className="col-sm">
                                <InputText type="text" placeholder="Ecrire votre prenom" id="PRENOM" name="PRENOM" value={data.PRENOM} onChange={e => setData(d => ({ ...d, PRENOM: e.target.value }))} className={`w-100 is-invalid ${errors?.PRENOM ? 'p-invalid' : ''}`} />
                                {errors?.PRENOM && <div
                                    className="invalid-feedback"
                                    style={{ minHeight: 0, display: "block" }}
                                >
                                    {errors?.PRENOM}
                                </div>}
                            </div>
                        </div>
                    </div>

                    <div className="form-group col-sm mt-4">
                        <div className="row">
                            <div className="col-md-4">
                                <label htmlFor="EMAIL" className="label mb-1">Email</label>
                            </div>
                            <div className="col-sm">
                                <InputText type="text" placeholder="Ecrire votre email" id="EMAIL" name="EMAIL" value={data.EMAIL} onChange={e => setData(d => ({ ...d, EMAIL: e.target.value }))} className={`w-100 is-invalid ${errors?.EMAIL ? 'p-invalid' : ''}`} />
                                {errors?.EMAIL && <div
                                    className="invalid-feedback"
                                    style={{ minHeight: 0, display: "block" }}
                                >
                                    {errors?.EMAIL}
                                </div>}
                            </div>
                        </div>
                    </div>

                    <div className="form-group col-sm mt-4">
                        <div className="row">
                            <div className="col-md-4">
                                <label htmlFor="USERNAME" className="label mb-1">Nom d'utilisateur</label>
                            </div>

                            <div className="col-sm">
                                <InputText type="text" placeholder="Ecrire votre nom d'utilisateur" id="USERNAME" name="USERNAME" value={data.USERNAME} onChange={e => setData(d => ({ ...d, USERNAME: e.target.value }))} className={`w-100 is-invalid ${errors?.USERNAME ? 'p-invalid' : ''}`} />

                                {errors?.USERNAME && <div
                                    className="invalid-feedback"
                                    style={{ minHeight: 0, display: "block" }}
                                >
                                    {errors?.USERNAME}
                                </div>}
                            </div>
                        </div>
                    </div>

                    <div className="form-group col-sm mt-4">
                        <div className="row">
                            <div className="col-md-4">
                                <label htmlFor="TELEPHONE1" className="label mb-1">Tél 1</label>
                            </div>
                            <div className="col-sm">
                                <InputText type="text" placeholder="Ecrire votre numéro tél" id="TELEPHONE1" name="TELEPHONE1" value={data.TELEPHONE1} onChange={e => setData(d => ({ ...d, TELEPHONE1: e.target.value }))} className={`w-100 is-invalid ${errors?.TELEPHONE1 ? 'p-invalid' : ''}`} />
                                {errors?.TELEPHONE1 && <div
                                    className="invalid-feedback"
                                    style={{ minHeight: 0, display: "block" }}
                                >
                                    {errors?.TELEPHONE1}
                                </div>}
                            </div>
                        </div>
                    </div>

                    <div className="form-group col-sm mt-4">
                        <div className="row">
                            <div className="col-md-4">
                                <label htmlFor="TELEPHONE2" className="label mb-1">Tél 2</label>
                            </div>
                            <div className="col-sm">
                                <InputText type="text" placeholder="Ecrire votre numéro tél" id="TELEPHONE2" name="TELEPHONE2" value={data.TELEPHONE2} onChange={e => setData(d => ({ ...d, TELEPHONE2: e.target.value }))} className={`w-100 is-invalid ${errors?.TELEPHONE2 ? 'p-invalid' : ''}`} />
                                {errors?.TELEPHONE2 && <div
                                    className="invalid-feedback"
                                    style={{ minHeight: 0, display: "block" }}
                                >
                                    {errors?.TELEPHONE2}
                                </div>}
                            </div>
                        </div>
                    </div>

                    <div className="form-group col-sm mt-4">
                        <div className="row">
                            <div className="col-md-4">
                                <label htmlFor="ADRESSE" className="label mb-1">Addresse</label>
                            </div>
                            <div className="col-sm">
                                <InputText type="text" placeholder="Ecrire votre addresse" id="ADRESSE" name="ADRESSE" value={data.ADRESSE} onChange={e => setData(d => ({ ...d, ADRESSE: e.target.value }))} className={`w-100 is-invalid ${errors?.ADRESSE ? 'p-invalid' : ''}`} />
                                {errors?.ADRESSE && <div
                                    className="invalid-feedback"
                                    style={{ minHeight: 0, display: "block" }}
                                >
                                    {errors?.ADRESSE}
                                </div>}
                            </div>
                        </div>
                    </div>

                    <div className="form-group col-sm mt-4">
                        <div className="row">
                            <div className="col-md-4">
                                <label htmlFor="PROFIL_PICTURE" className="label mb-1">Profile photo</label>
                            </div>
                            <div className="col-sm">
                                <FileUpload
                                    style={{ borderRadius: 0 }}
                                    chooseLabel={`choisir l'image`}
                                    cancelLabel={`Enlever`}
                                    name="signature"
                                    uploadOptions={{
                                        style: { display: "none" },
                                    }}
                                    className="p-invalid"
                                    accept="image/*"
                                    maxFileSize={200000}
                                    invalidFileSizeMessageDetail={`L'image est volumineuse`}
                                    emptyTemplate={
                                        <p className="m-0">{`Glisser-déposer`}</p>
                                    }
                                    onSelect={async (e) => {
                                        const file = e.files[0];
                                        setData(d => ({ ...d, "PROFIL_PICTURE": file }))
                                    }}
                                    onClear={() => {
                                        setData(d => ({ ...d, "PROFIL_PICTURE": null }))
                                    }}
                                />

                                {errors?.PROFIL_PICTURE && <div
                                    className="invalid-feedback"
                                    style={{ minHeight: 0, display: "block" }}
                                >
                                    {errors?.PROFIL_PICTURE}
                                </div>}
                            </div>
                        </div>
                    </div>

                    <div className="form-group col-sm mt-4 relative">
                        <div className="row">
                            <div className="col-md-4">
                                <label htmlFor="PASSWORD" className="label mb-1">Ecrire le mot de passe</label>
                            </div>

                            <div className="col-sm">
                                <InputText
                                    placeholder="Entrer le mot de passe"
                                    type={visiblePassowrd ? "text" : "password"}
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
                    </div>

                    <div className="form-group col-sm mt-4 relative">
                        <div className="row">
                            <div className="col-md-4">
                                <label htmlFor="CONFIRM_PASSWORD" className="label mb-1">Confirmer le mot de passe</label>
                            </div>

                            <div className="col-sm">
                                <InputText
                                    placeholder="Confirmer le mot de passe"
                                    type={visibleConfirmPassowrd ? "text" : "password"}
                                    id="CONFIRM_PASSWORD"
                                    name="CONFIRM_PASSWORD"
                                    value={data.CONFIRM_PASSWORD}
                                    onChange={e => setData(data => ({ ...data, CONFIRM_PASSWORD: e.target.value }))}
                                    className={`w-100 is-invalid ${errors?.CONFIRM_PASSWORD ? "p-invalid" : ""}`}

                                />

                                <span
                                    className="p-input-icon-right absolute"
                                    style={{ top: "25px", right: "20px" }}
                                >
                                    {!visibleConfirmPassowrd ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            className="bi bi-eye cursor-pointer"
                                            viewBox="0 0 16 16"
                                            onClick={() => setVisibleConfirmPassowrd((b) => !b)}
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
                                            onClick={() => setVisibleConfirmPassowrd((b) => !b)}
                                        >
                                            <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                                            <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                                            <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                                        </svg>
                                    )}
                                </span>

                                {errors?.CONFIRM_PASSWORD && <div
                                    className="invalid-feedback"
                                    style={{ minHeight: 0, display: "block" }}
                                >
                                    {errors?.CONFIRM_PASSWORD}
                                </div>}
                            </div>
                        </div>
                    </div>

                    <div className="form-group my-4">
                        <div className="row">
                            <div className="col-md-4">
                                <label htmlFor="Profils" className="label mb-1">Profils</label>
                            </div>

                            <div className="col-sm">
                                <MultiSelect value={data.PROFILS}
                                    onChange={(e) => setData(d => ({ ...d, PROFILS: e.value }))}
                                    options={profils} optionLabel="PROFIL_NOM" display="chip"
                                    placeholder="Selecionner les profils"
                                    maxSelectedLabels={3}
                                    className="w-full"
                                    style={{ borderRadius: 0 }}
                                />
                            </div>
                        </div>
                    </div>

                    <div style={{ position: 'absolute', bottom: 0, right: 0 }} className="w-100 d-flex justify-content-end shadow-4 pb-3 pr-5 bg-white">
                        <Button label="Reinitialiser" type="reset" outlined className="mt-3" size="small" onClick={e => {
                            e.preventDefault()
                            setData(initialValues)
                            setErrors(null)
                        }} />

                        <Button label="Envoyer" type="submit" className="mt-3 ml-3" size="small" disabled={isSubmitting} loading={isSubmitting} />
                    </div>
                </form>
            </div>
        </>
    )
}