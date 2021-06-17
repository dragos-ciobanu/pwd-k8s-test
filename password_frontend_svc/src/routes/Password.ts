import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';
import { paramMissingError } from '@shared/constants';
import {AxiosResponse} from "axios";

const { BAD_REQUEST } = StatusCodes;
const axios = require('axios');

export async function getScore(req: Request, res: Response) {
    const passwordText: string = req.body.password;
    if (!passwordText) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    return await axios.post('http://localhost:3001/api/password/score', {password: passwordText})
        .then((response: AxiosResponse) => {
            res.json(response.data);
        });
}

export async function getIsCommon(req: Request, res: Response) {
    const passwordText: string = req.body.password;
    if (!passwordText) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    return await axios.post('http://localhost:3002/api/password/common', {password: passwordText})
        .then((response: AxiosResponse) => {
            res.json(response.data);
        });
}

export async function getIsReused(req: Request, res: Response) {
    const passwordText: string = req.body.password;
    if (!passwordText) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    return await axios.post('http://localhost:3003/api/password/reuse', {password: passwordText})
        .then((response: AxiosResponse) => {
            res.json(response.data);
        });
}
