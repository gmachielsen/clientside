import { useState, useEffect } from "react";
import Link from "next/link";

const AdminNav = () => {
    const [current, setCurrent] = useState("");

    useEffect(() => {
        process.browser && setCurrent(window.location.pathname);
    }, [process.browser && window.location.pathname]);

    return (
        <div className="nav flex-column nav-pills">
            <Link href="/admin">
                <a className={`nav-link ${current === "/admin" && "active"}`}>AdminDashboard</a>
            </Link>
            <Link href="/admin/category/create">
                <a className={`nav-link ${current === "/admin/category/create" && "active"}`}>Categories</a>
            </Link>
            <Link href="/admin/subcategory/create">
                <a className={`nav-link ${current === "/admin/subcategory/create" && "active"}`}>Subcategories</a>
            </Link>
        </div>
    );
};

export default AdminNav;