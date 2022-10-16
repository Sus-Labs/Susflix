import Link from "components/Link";

export default function Hero() {
    return (
        <div className="bg-black">
            <main>
                <div>
                    <div className="relative">
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-black" />
                        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                            <div>
                                <div className="absolute inset-0">
                                    <img
                                        className="h-full w-full object-cover"
                                        src="/static/sussy-bg.jpg"
                                        alt="SusFlix Originals"
                                    />
                                    <div className="absolute inset-0 bg-gray-50 mix-blend-multiply" />
                                </div>
                                <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                                    <h1 className="text-center text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                                        <span className="block text-gray-100">
                                            Unlimited movies, TV
                                        </span>
                                        <span className="block text-gray-200">
                                            shows, and more.
                                        </span>
                                    </h1>
                                    <p className="mx-auto mt-6 max-w-lg text-center text-xl text-white sm:max-w-3xl">
                                        Watch anywhere. Cancel anytime.
                                    </p>
                                    <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
                                        <Link
                                            href="/signup"
                                            className="inline-block border rounded-md border-transparent bg-red-700 py-2 px-4 text-base font-medium text-white hover:bg-opacity-80"
                                        >
                                            Get Started
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
