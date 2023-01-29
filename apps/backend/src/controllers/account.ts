import { Request, Response } from "express";

import account from "../services/account";

const account_get = async (req: Request, res: Response) => {};
const account_create = async (req: Request, res: Response) => {
    try {
        const { email, username, password } = req.body;

        const user = await account.get_account_by_email(email);

        if (user) {
            res.status(409).send({
                statusCode: 409,
                message: "Conflict",
                payload: null,
            });

            return;
        }

        const data = await account.create_account({
            username: username,
            email: email,
            password: password,
        });

        res.status(201).send({
            statusCode: 201,
            message: "Created",
            payload: {
                data: data,
            },
        });
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "Internal Server Error",
            payload: error,
        });
    }
};

const account_update = async (req: Request, res: Response) => {
    const { email, username, password } = req.body;
    const user = await account.update_account("id", {
        username: username,
        email: email,
        password: password,
        verified: false,
    });
};

const account_delete = async (req: Request, res: Response) => {};

export default {
    account_get,
    account_create,
    account_update,
    account_delete,
};
