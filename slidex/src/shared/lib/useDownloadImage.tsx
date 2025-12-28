import { RefObject, useCallback, useRef, useState } from 'react';
import { createFile, getFileURL } from '../appwrite/storage';

type downloadImageProps = {
	inputRef: RefObject<HTMLInputElement>;
	setSelectedImageUrlRef: (URL: string) => void;
};

//вынести функции saveImageToStorage в отдельный файл
export const useDownloadImage = (props: downloadImageProps) => {
	const { inputRef, setSelectedImageUrlRef } = props;

	const selectedImageUrlRef = useRef<string>();
	const [loading, setLoading] = useState(false);

	const revokeImageUrl = useCallback(() => {
		if (selectedImageUrlRef.current != null) {
			window.URL.revokeObjectURL(selectedImageUrlRef.current);
		}
	}, [selectedImageUrlRef]);

	function openSelectImageModal() {
		if (inputRef.current) {
			setLoading(true);
			inputRef.current.click();
		}
	}

	async function saveImageToStorage(file: File) {
		const response = await createFile({ file: file });
		const result = getFileURL(response.$id);
		console.log(result, 'url - save image');
		return result;
	}

	async function updateSelectedImage() {
		revokeImageUrl();
		if (inputRef.current && inputRef.current.files) {
			const image = inputRef.current.files[0];
			const urlToSave = await saveImageToStorage(image);
			selectedImageUrlRef.current = urlToSave;
			setSelectedImageUrlRef(urlToSave);
		}
		setLoading(false);
	}

	return {
		openSelectImageModal,
		updateSelectedImage,
		loading,
		revokeImageUrl,
	};
};
