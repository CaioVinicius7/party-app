interface IStorageProvider {
	save(file: string, folder: string): Promise<void>;
}

export { IStorageProvider };
