import { useContext, useEffect, useRef, useState } from 'react';
import styles from '../ui/toolbar.module.css';
import { useDownloadImage } from '../../../shared/lib/useDownloadImage';
import { IconButton } from '../../../shared/ui/iconButton';
import { ImageIcon } from './iconComponent';
import { PresActionContext } from '../../../shared/lib/presentationContext';
import { generateId } from '../../../shared/model/id/Id';
import { createImage } from '../../../entities/image/lib/image';
import { createRect } from '../../../shared/model/geometry/rect/model/types';

export function ImageButton() {
	const [imageFile, setImageFile] = useState<string>();
	const [idImage, setIdImage] = useState<string>('');
	const inputRef = useRef<HTMLInputElement>(null);

	const actions = useContext(PresActionContext);

	const { revokeImageUrl, openSelectImageModal, loading, updateSelectedImage } = useDownloadImage({
		inputRef,
		setSelectedImageUrlRef: setImageFile,
		setIdImage,
	});

	useEffect(() => revokeImageUrl, [revokeImageUrl]);

	useEffect(() => {
		if (imageFile) {
			const newId = generateId();
			actions?.addObjOnCurrentSlide(
				createImage(imageFile, idImage, createRect(100, 100, 100, 100)),
				newId,
			);
			setTimeout(() => {
				actions?.setSelectedObj(newId);
			}, 1000);
		}
	}, [imageFile]);

	return (
		<IconButton onClick={openSelectImageModal} loading={loading} className={''} icon={<ImageIcon />}>
			<p className={styles.text_button_icon}>Медиа</p>
			<input ref={inputRef} type="file" onChange={updateSelectedImage} style={{ display: 'none' }} />
		</IconButton>
	);
}
