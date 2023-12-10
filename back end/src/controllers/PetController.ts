import { Request, Response } from "express";

async function create(req: Request, res: Response) {
    const {  } = req.body
    res.status(200).json({ message: 'ta tudo certo.'})
}

export {
    create
}