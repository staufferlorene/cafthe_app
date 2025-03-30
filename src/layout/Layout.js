import React from 'react';
import {Outlet} from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Global.css";

function Layout(props) {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
}

export default Layout;