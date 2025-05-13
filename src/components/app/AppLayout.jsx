import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";

export const AppLayout = () => {
    return <div className="d-flex" style={{width: '100%'}}>
        <SideBar />

        <div className="w-100" style={{ overflow: 'auto' }}>
            <Header />

            <Outlet />
        </div>
    </div>;
}