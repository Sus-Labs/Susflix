import Link from "components/Link";
import headerData from "data/header";

export default function Header() {
    return (
        <header className="bg-black">
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
                <div className="flex w-full items-center justify-between py-6 lg:border-none">
                    <div className="flex items-center">
                        <Link href="/">
                            <span className="sr-only">{headerData[0].name}</span>
                            <img
                                className="h-14 w-auto"
                                src={headerData[0].imageURL}
                                alt="SusFlix"
                            />
                        </Link>
                    </div>
                    <div className="ml-10 space-x-4">
                        <Link
                            href="/"
                            className="inline-block border rounded-md border-transparent bg-red-600 py-2 px-4 text-base font-medium text-white hover:bg-opacity-75"
                        >
                            Open
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
}
