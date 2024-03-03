import { NextFunction, Request, Response } from "express";
import * as multer from "multer";

export default class FileUpload {
    private fieldName: string;
    private storage: multer.StorageEngine;
    private uploadFile: multer.Multer;

    constructor(fieldName: string) {
        this.fieldName = fieldName;
        this.storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, "src/upload/");
            },
            filename: (req, file, cb) => {
                const unixSuffix = Date.now();
                cb(null, file.fieldname + "-" + unixSuffix + ".png");
            }
        });
        this.uploadFile = multer({
            storage: this.storage,
            limits: {
                fileSize: Infinity
            }
        });
    }

    public handleUpload(req: Request, res: Response, next: NextFunction) {
        this.uploadFile.single(this.fieldName)(req, res, (error: any) => {
            if (error) return res.status(400).json({ error });
            next();
        });
    }
}
