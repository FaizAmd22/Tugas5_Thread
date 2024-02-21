import { NextFunction, Request, Response } from "express";
import * as multer from "multer";

export default class FileUpload {
    private fieldName: string;

    constructor(filedName: string) {
        this.fieldName = filedName
    }

    private storage = multer.diskStorage({
        destination: (req, res, cb) => {
            cb(null, "src/upload/")
        },

        filename: (req, file, cb) => {
            const unixSuffix = Date.now();
            cb(null, file.fieldname + "-" + unixSuffix + ".png");
        }
    })

    private uploadFile = multer({ storage: this.storage})

    public handleUpload(req: Request, res: Response, next: NextFunction) {
        this.uploadFile.single(this.fieldName) (req, res, (error: any) => {
            if(error) return res.status(400).json({error})

            // if (!req.file) {
            //     req.file.filename = null
            // }
            // res.locals.filename = req.file.filename
            next()
        })
    }
}