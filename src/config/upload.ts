/* eslint-disable @typescript-eslint/no-explicit-any */
import crypto from "crypto";
import multer, { Options } from "multer";
import path from "path";

import { AppError } from "@shared/errors/AppError";

const tmpFolder = path.resolve(__dirname, "..", "..", "tmp");

const storage = multer.diskStorage({
	destination: (req: any, file: any, cb: any) => {
		cb(null, tmpFolder);
	},
	filename: (req: any, file: any, cb: any) => {
		crypto.randomBytes(16, (err, hash) => {
			err && cb(err);

			const fileName = `${hash.toString("hex")}-${file.originalname}`;

			cb(null, fileName);
		});
	}
});

const fileFilter = (req: any, file: any, cb: any) => {
	const allowedMimes = ["image/jpeg", "image/jpg", "image/png"];

	allowedMimes.includes(file.mimetype)
		? cb(null, true)
		: cb(new AppError("Invalid file type"));
};

const multerConfig: Options = {
	dest: tmpFolder,
	storage,
	limits: {
		fileSize: 2 * 1024 * 1024 // 2mb
	},
	fileFilter
};

export { tmpFolder, multerConfig };
