interface Props {
    imageSrc: string;
    title: string;
    description: string;
    href: string;
}

import { Link } from "react-router-dom";

export default function Featured({ imageSrc, title, description, href }: Props) {
    return (
        <>
            <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl">
                <div className="relative overflow-hidden rounded-lg lg:h-96 border">
                    <div className="absolute inset-0">
                        <img
                            src={imageSrc}
                            alt={title}
                            className="h-full w-full object-cover object-center"
                        />
                    </div>
                    <div aria-hidden="true" className="relative h-96 w-full lg:hidden" />
                    <div aria-hidden="true" className="relative h-32 w-full lg:hidden" />
                    <div className="absolute inset-x-0 bottom-0 rounded-bl-lg rounded-br-lg bg-black bg-opacity-80 p-8 backdrop-blur backdrop-filter sm:flex sm:items-center sm:justify-between lg:inset-y-0 lg:inset-x-auto lg:w-96 lg:flex-col lg:items-start lg:rounded-tl-lg lg:rounded-br-none">
                        <div>
                            <h2 className="text-6xl font-bold text-white">{title}</h2>
                            <br />
                            <p className="mt-1 text-base text-gray-300">{description}</p>
                        </div>
                        <Link
                            to={`/watch/${href}`}
                            className="mt-6 flex flex-shrink-0 items-center justify-center rounded-md border border-white border-opacity-25 bg-white bg-opacity-0 py-3 px-4 text-base font-medium text-white hover:bg-opacity-10 sm:mt-0 sm:ml-8 lg:ml-0 lg:w-full"
                        >
                            Start Watching
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
