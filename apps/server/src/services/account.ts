import db from "../utils/db";
import { hashPassword } from "../utils/hash";

const get_account_by_id = async (id: string) => {
    return await db.account.findUnique({
        where: { id: id },
        select: {
            id: true,
            username: true,
            email: true,
            password: false,
            verified: false,
            createdAt: true,
            updatedAt: true,
            profiles: true,
        },
    });
};

const get_account_by_email = async (email: string) => {
    return await db.account.findUnique({
        where: { email: email },
        select: {
            id: true,
            username: true,
            email: true,
            password: false,
            verified: false,
            createdAt: true,
            updatedAt: true,
            profiles: true,
        },
    });
};

interface AccountInterface {
    username: string;
    email: string;
    password: string;
}

const create_account = async (account: AccountInterface) => {
    return await db.account.create({
        data: {
            username: account.username,
            email: account.email,
            password: await hashPassword(account.password as string),
        },
        select: {
            id: true,
            username: true,
            email: true,
            password: false,
            verified: false,
            createdAt: true,
            updatedAt: true,
            profiles: true,
        },
    });
};

const update_account = async (id: string, account: any) => {
    return await db.account.update({
        where: {
            id: id,
        },
        data: {
            username: account.username || undefined,
            email: account.email || undefined,
            password: (await hashPassword(account.password as string)) || undefined,
            verified: account.verified || undefined,
        },
        select: {
            id: true,
            username: true,
            email: true,
            password: false,
            verified: false,
            createdAt: true,
            updatedAt: true,
            profiles: true,
        },
    });
};

const delete_account = async (id: string) => {
    return await db.account.delete({
        where: {
            id: id,
        },
    });
};

export default {
    get_account_by_id,
    get_account_by_email,
    create_account,
    update_account,
    delete_account,
};
