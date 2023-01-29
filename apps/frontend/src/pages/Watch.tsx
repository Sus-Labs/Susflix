import { useParams } from "react-router-dom";

export default function Watch() {
    let { content_id } = useParams();
    
    const source_url = `${import.meta.env.VITE_STREAM_SERVER_ENDPOINT}/stream?contentId=${content_id}`;

    return (
        <>
            <video width="480" height={360} controls autoPlay>
                <source src={source_url} type="video/mp4" />
            </video>
        </>
    );
}
