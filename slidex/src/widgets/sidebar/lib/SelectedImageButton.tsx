import { useEffect, useRef } from 'react';
import { TextButton } from '../../../shared/ui/textButton';
import styles from './SelectedImageButton.module.css';
import { useDownloadImage } from '../../../shared/lib/useDownloadImage';

type SelectedImageButtonProps = {
	setSelectedImageUrlRef: (URL: string) => void;
};

export function SelectImageButton(props: SelectedImageButtonProps) {
	const { setSelectedImageUrlRef } = props;
	const inputRef = useRef<HTMLInputElement>(null);

	const { revokeImageUrl, openSelectImageModal, loading, updateSelectedImage } = useDownloadImage({
		inputRef,
		setSelectedImageUrlRef,
	});

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
