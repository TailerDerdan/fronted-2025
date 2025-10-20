import { useCallback, useEffect, useRef, useState } from 'react';
import { TextButton } from '../../../shared/ui/textButton';
import styles from './SelectedImageButton.module.css';

type SelectedImageButtonProps = {
	setSelectedImageUrlRef: (file: File) => void;
};

export function SelectImageButton(props: SelectedImageButtonProps) {
	const { setSelectedImageUrlRef } = props;

	const inputRef = useRef<HTMLInputElement>(null);
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

	function updateSelectedImage() {
		revokeImageUrl();
		if (inputRef.current && inputRef.current.files) {
			const image = inputRef.current.files[0];
			selectedImageUrlRef.current = window.URL.createObjectURL(image);
			setSelectedImageUrlRef(image);
		}
		setLoading(false);
	}

	useEffect(() => revokeImageUrl, [revokeImageUrl]);

	return (
		<div className={styles.selected_image_button}>
			<TextButton onClick={openSelectImageModal} loading={loading} className={''}>
				<span>Выбрать картинку</span>
				<input
					ref={inputRef}
					type="file"
					onChange={updateSelectedImage}
					style={{ display: 'none' }}
				/>
			</TextButton>
		</div>
	);
}
