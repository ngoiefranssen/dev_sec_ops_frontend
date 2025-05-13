import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import fetchApi from "@/helpers/fetchApi";
import { useEffect, useState } from "react";
import { auth_routes_items } from "@/routes/auth_routes";
import { useApp } from "@/hooks/useApp";
import { FileUpload } from "primereact/fileupload";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { MultiSelect } from "primereact/multiselect";

export default function EditProfilPage() {
    const navigate = useNavigate();
    const { setBreadCrumbAction, setToastAction } = useApp()
    const { state } = useLocation()

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [profils, setProfils] = useState([])

    const initialValues = {
        USERNAME: "",
        EMAIL: "",
        NOM: "",
        PRENOM: "",
        TELEPHONE1: "",
        TELEPHONE2: "",
        PROFIL_PICTURE: null,
        ADRESSE: "",
    }

    const [data, setData] = useState(initialValues)

    const [errors, setErrors] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            setIsSubmitting(true);

            const formData = new FormData();

            for (let key in data) {
                formData.append(key, data[key]);

            }

            await fetchApi(`/utilisateurs/${state?.ID_utilisateur}`, {
                method: 'PUT',
                body: formData,
            });

            setToastAction({
                severity: "success",
                summary: "Success",
                detail: "Profil modifié avec succès",
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

    const fetchCurrentUtilisateur = async () => {
        try {
            const res = await fetchApi(`/utilisateurs/${state?.ID_utilisateur}`);
            setData(d => ({ ...d, ...res.data }))
        } catch (error) {
            console.log(error)
        }
    }

    const fetchProfils = async () => {
        try {
            const res = await fetchApi('/profils');
            setProfils(res.data.rows)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        document.title = auth_routes_items.profil.name;

        setBreadCrumbAction([auth_routes_items.profil])

        fetchCurrentUtilisateur();
        fetchProfils();

        return () => {
            setBreadCrumbAction([]);
        };

    }, [])

    return (
        <>
            <div className="px-4 py-3 main_content bg-white has_footer">
                <div className="">
                    <h1 className="mb-3">Modifier le profil</h1>
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

                    <div className="form-group col-sm my-4">
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