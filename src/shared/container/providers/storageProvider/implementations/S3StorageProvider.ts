import mime from "mime";
import { S3 } from "aws-sdk";
import fs from "fs";
import { resolve } from "path";

import { tmpFolder } from "@config/upload";

import { IStorageProvider } from "../IStorageProvider";

class S3StorageProvider implements IStorageProvider {
	private client: S3;

	constructor() {
		this.client = new S3({
			region: process.env.AWS_BUCKET_REGION
		});
	}

	async save(file: string, folder: string): Promise<void> {
		const originalname = resolve(tmpFolder, file);

		const fileContent = await fs.promises.readFile(originalname);

		const fileType = mime.getType(originalname) || undefined;

		await this.client
			.putObject({
				Bucket: `${process.env.BUCKET_NAME}/${folder}`,
				Key: file,
				ACL: "public-read",
				Body: fileContent,
				ContentType: fileType
			})
			.promise();

		await fs.promises.unlink(originalname);
	}

	async delete(file: string, folder: string): Promise<void> {
		await this.client
			.deleteObject({
				Bucket: `${process.env.BUCKET_NAME}/${folder}`,
				Key: file
			})
			.promise();
	}
}

export { S3StorageProvider };
