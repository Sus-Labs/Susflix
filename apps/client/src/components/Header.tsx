import { Link } from "react-router-dom";

const navigation = [
    { name: "Movies", href: "/home/movies" },
    { name: "TV Shows", href: "/home/shows" },
];

interface LinkInterface {
    name: string;
    href: string;
}

export default function Header() {
    return (
        <header>
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
                <div className="flex w-full items-center justify-between py-6 lg:border-none">
                    <div className="flex items-center">
                        <Link to="/home">
                            <span className="sr-only">Susflix</span>
                            <img className="h-14 w-auto" src={"/icon.png"} alt="SusFlix" />
                        </Link>
                        <div className="ml-10 hidden space-x-8 lg:block">
                            {navigation.map((link: LinkInterface) => (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    className="text-base font-medium text-white hover:text-red-600"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="ml-10 space-x-4">
                        <Link
                            to="/account"
                            className="inline-block border rounded-md border-transparent bg-red-600 py-2 px-4 text-base font-medium text-white hover:bg-opacity-75"
                        >
                            Account
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
}
