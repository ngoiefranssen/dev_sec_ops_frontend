import { useApp } from "@/hooks/useApp";
import "../../styles/app/sidebar.css";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { FormattedMessage } from "react-intl";

export default function SideBar() {
  const { setToastAction } = useApp();
  const { handleLogout, user } = useAuth();

  const toggleSubMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.target.classList.toggle("collapse-show");
  };

  const onLogout = (e) => {
    e.stopPropagation();
    e.preventDefault();

    handleLogout();

    setToastAction({
      severity: "success",
      summary: "Success",
      detail: "Utilisateur déconnecté avec succés",
      life: 3000,
    })
  }

  return (
    <aside className="sidebar d-flex flex-column justify-content-between shadow z-1">
      <Link
        to={"/dashboard"}
        className="d-flex align-items-center px-3 py-2 text-decoration-none link-dark"
      >
        <img src={'/vite.svg?url'} alt="" className="logo" />
        <h4 className="mx-2 mb-0">DevSecOps</h4>
      </Link>

      <nav className={`px-2 flex-fill`}>
        <div className="nav-item">
          <a
            onClick={toggleSubMenu}
            className="text-decoration-none rounded d-block"
            data-bs-toggle="collapse"
            href="#administration"
            role="button"
            aria-expanded="false"
            aria-controls="administration"
          >
            <div className="d-flex align-items-center justify-content-between py-2 px-3">
              <div className="d-flex align-items-center justify-content-between">
                <div className="menu-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-database"
                    viewBox="0 0 16 16"
                  >
                    <path d="M4.318 2.687C5.234 2.271 6.536 2 8 2s2.766.27 3.682.687C12.644 3.125 13 3.627 13 4c0 .374-.356.875-1.318 1.313C10.766 5.729 9.464 6 8 6s-2.766-.27-3.682-.687C3.356 4.875 3 4.373 3 4c0-.374.356-.875 1.318-1.313ZM13 5.698V7c0 .374-.356.875-1.318 1.313C10.766 8.729 9.464 9 8 9s-2.766-.27-3.682-.687C3.356 7.875 3 7.373 3 7V5.698c.271.202.58.378.904.525C4.978 6.711 6.427 7 8 7s3.022-.289 4.096-.777A4.92 4.92 0 0 0 13 5.698ZM14 4c0-1.007-.875-1.755-1.904-2.223C11.022 1.289 9.573 1 8 1s-3.022.289-4.096.777C2.875 2.245 2 2.993 2 4v9c0 1.007.875 1.755 1.904 2.223C4.978 15.71 6.427 16 8 16s3.022-.289 4.096-.777C13.125 14.755 14 14.007 14 13V4Zm-1 4.698V10c0 .374-.356.875-1.318 1.313C10.766 11.729 9.464 12 8 12s-2.766-.27-3.682-.687C3.356 10.875 3 10.373 3 10V8.698c.271.202.58.378.904.525C4.978 9.71 6.427 10 8 10s3.022-.289 4.096-.777A4.92 4.92 0 0 0 13 8.698Zm0 3V13c0 .374-.356.875-1.318 1.313C10.766 14.729 9.464 15 8 15s-2.766-.27-3.682-.687C3.356 13.875 3 13.373 3 13v-1.302c.271.202.58.378.904.525C4.978 12.71 6.427 13 8 13s3.022-.289 4.096-.777c.324-.147.633-.323.904-.525Z" />
                  </svg>
                </div>
                <span className="menu-title">Administration</span>
              </div>

              <div className="down_caret">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  fill="currentColor"
                  className="bi bi-chevron-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              </div>
            </div>
          </a>
        </div>

        <div className="sub-menus collapse" id="administration">
          {user.hasPermission('utilisateurs') && <div className="nav-item">
            <NavLink
              to={"utilisateurs"}
              className={({ isActive }) =>
                isActive
                  ? "admin text-decoration-none rounded d-block"
                  : "text-decoration-none rounded d-block"
              }
              href="/utilisateurs"
            >
              <div className="d-flex align-items-center justify-content-between py-2 px-3">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="menu-icon"></div>
                  <span className="menu-title capitalize">{<FormattedMessage id="utilisateur" />}</span>
                </div>
              </div>
            </NavLink>
          </div>}

          {user.hasPermission('profils') && <div className="nav-item">
            <NavLink
              to={"profils"}
              className={({ isActive }) =>
                isActive
                  ? "admin text-decoration-none rounded d-block"
                  : "text-decoration-none rounded d-block"
              }
              href="/profils"
            >
              <div className="d-flex align-items-center justify-content-between py-2 px-3">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="menu-icon"></div>
                  <span className="menu-title">Profils</span>
                </div>
              </div>
            </NavLink>
          </div>}

          {user.hasPermission('roles') && <div className="nav-item">
            <NavLink
              to={"roles"}
              className={({ isActive }) =>
                isActive
                  ? "admin text-decoration-none rounded d-block"
                  : "text-decoration-none rounded d-block"
              }
              href="/roles"
            >
              <div className="d-flex align-items-center justify-content-between py-2 px-3">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="menu-icon"></div>
                  <span className="menu-title">Roles</span>
                </div>
              </div>
            </NavLink>
          </div>}
        </div>
      </nav>

      <div className="aside-footer px-2 py-3">
        <hr />

        <div className="nav-item">
          <a
            className="text-decoration-none rounded d-block"
            data-bs-toggle="collapse"
            href="#rapport"
            role="button"
            aria-expanded="false"
            aria-controls="collapseExample"
            onClick={onLogout}
          >
            <div className="d-flex align-items-center justify-content-between py-2 px-3">
              <div className="d-flex align-items-center justify-content-between">
                <div className="menu-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-box-arrow-left"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"
                    />
                    <path
                      fillRule="evenodd"
                      d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"
                    />
                  </svg>
                </div>
                <span className="menu-title">Déconnexion</span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </aside>
  );
}
