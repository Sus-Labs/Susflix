import argon2 from "argon2";

const hashPassword = async (value: string) => {
    const hash = await argon2.hash(value);
    return hash;
};

const verifyPassword = async (password: string, hash: string) => {
    const value = await argon2.verify(hash, password);
    return value;
};

export { hashPassword, verifyPassword };
