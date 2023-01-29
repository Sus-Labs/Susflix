import { ReactNode } from "react";
import Header from "../components/Header";

interface Children {
    children?: ReactNode;
}

export default function Layout({ children }: Children) {
    return (
        <div className="bg-black">
            <Header />
            {children}
        </div>
    );
}
