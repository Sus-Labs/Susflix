import argon2 from "argon2";

const hashPassword = async (value: string) => {
    try {
        const hash = await argon2.hash(value);
        return hash;
    } catch (error) {
        return error;
    }
};

const verifyPassword = async (password: string, hash: string) => {
    try {
        const value = await argon2.verify(hash, password);
        return value;
    } catch (error) {
        return error;
    }
};

export { hashPassword, verifyPassword };
