import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';
import { paramMissingError } from '@shared/constants';
import {AxiosResponse} from "axios";

const { BAD_REQUEST } = StatusCodes;
const axios = require('axios');

const scoreServiceUrl = process.env.SCORE_SERVICE_PORT || "http://localhost:3001";
const commonServiceUrl = process.env.COMMON_SERVICE_PORT || "http://localhost:3002";
const reuseServiceUrl = process.env.REUSE_SERVICE_PORT || "http://localhost:3003";


export async function getScore(req: Request, res: Response) {
    const passwordText: string = req.body.password;
    if (!passwordText) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    return await axios.post(`${scoreServiceUrl}/api/password/score`, {password: passwordText})
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
    return await axios.post(`${commonServiceUrl}/api/password/common`, {password: passwordText})
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
    return await axios.post(`${reuseServiceUrl}/api/password/reuse`, {password: passwordText})
        .then((response: AxiosResponse) => {
            res.json(response.data);
        });
}
