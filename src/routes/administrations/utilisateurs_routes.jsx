import { Route } from "react-router-dom";
import UtilisateursListPage from "../../pages/administrations/utilisateurs/UtilisateurListPage";
import NewUtilisateurPage from "../../pages/administrations/utilisateurs/NewUtilisateurPage";
import { ProtectedRoute } from "../ProtectedRouter";
import EditUtilisateurPage from "@/pages/administrations/utilisateurs/EditUtilisateurPage";

export const utilisateurs_routes_items = {
  utilisateurs: {
    path: "utilisateurs",
    name: "Utilisateurs",
    component: UtilisateursListPage,
  },

  new_utilisateur: {
    path: "utilisateurs/new",
    name: "Nouvel utilisateur",
    component: NewUtilisateurPage,
  },

  edit_utilisateur: {
    path: "utilisateurs/edit/:ID_utilisateur",
    name: "Modifier utilisateur",
    component: EditUtilisateurPage,
  }

};

let utilisateurs_routes = [];

for (let key in utilisateurs_routes_items) {

  const route = utilisateurs_routes_items[key];

  utilisateurs_routes.push(
    <Route path={route.path} element={<ProtectedRoute><route.component /></ProtectedRoute>} key={route.path} />
  );
}

export default utilisateurs_routes;
