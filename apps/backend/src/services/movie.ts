import db from "../utils/db";

const getMovies = async () => {
    return await db.movie.findMany();
};

const getMovie = async (id: string) => {
    return await db.movie.findUnique({
        where: {
            id: id,
        },
    });
};

export default {getMovie, getMovies}