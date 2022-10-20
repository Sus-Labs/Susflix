import { Link } from "react-router-dom";
import Layout from "../../layouts/Layout";
import Featured from "../../components/Featured";
import contents from "../../data/content_data";

export default function Home() {
    return (
        <Layout>
            <div>
                <Featured
                    title="Featured"
                    imageSrc="./icon.png"
                    description='Watch our new series "Wide Zuck"!'
                    href="wide_zuck"
                />
                <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                    <div className="flex items-center justify-between space-x-4">
                        <h2 className="text-lg font-medium text-gray-100">Blender Studios</h2>
                    </div>
                    <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
                        {contents.map((content) => (
                            <div key={content.id} className="group relative">
                                <Link to={`/home/watch/${content.content_id}`}>
                                    <div className="aspect-w-4 aspect-h-3 overflow-hidden rounded-lg bg-gray-100">
                                        <img
                                            src={content.imageSrc}
                                            alt={content.name}
                                            className="object-cover object-center"
                                        />
                                        <div className="flex items-end p-4" aria-hidden="true">
                                            <a className="w-full rounded-md bg-gray-100 hover:bg-red-600 py-2 px-4 text-center text-sm font-medium">
                                                Watch
                                            </a>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex items-center justify-between space-x-8 text-base font-medium text-white">
                                        <h3>
                                            <span aria-hidden="true" className="absolute inset-0" />
                                            {content.name}
                                        </h3>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-300">{content.category}</p>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
