import { useEffect, useState } from 'react';
import { Slide } from '../../../entities/slide/model/types';
import styles from './sidebar.module.css';
import {
	setBackground,
	updateImage,
	UpdateImageProps,
} from '../../../entities/presentation/lib/presentation';
import { dispatch } from '../../../features/presentation-editor/model/editor';
import { setFileImage } from '../../../entities/image/lib/image';
import { Image } from '../../../entities/image/model/types';
import { Background } from '../../../shared/model/background/Background';
import { SettingsBack } from './SettingBack';
import { SettingsObj } from './SettingObj';

type SidebarProps = {
	currentSlide: Slide;
	isToggleOfBack: boolean;
};

export const Sidebar = (props: SidebarProps) => {
	const { currentSlide, isToggleOfBack } = props;
	const [imageFile, setImageFile] = useState<File>();
	const [imageFileBack, setImageFileBack] = useState<File>();
	const [objId, setObjId] = useState('');
	const [selectedImage, setSelectedImage] = useState<Image | null>(null);
	const [classes, setClasses] = useState('');

	const isToggle = currentSlide.selectedObj.length > 0 ? true : false;

	useEffect(() => {
		if (isToggle) {
			const obj = currentSlide.objects.get(currentSlide.selectedObj[0]);
			if (obj && obj.type == 'image') {
				setSelectedImage(obj);
				setObjId(currentSlide.selectedObj[0]);
				if (obj.src.length > 0 && imageFile && window.URL.createObjectURL(imageFile).length == 0) {
					setImageFile(obj.file);
				}
			}
		}
		if (isToggle || isToggleOfBack) {
			setClasses(`${styles.sidebar} ${styles.sidebar_open}`);
		} else {
			setClasses(`${styles.sidebar}`);
		}
	}, [isToggle, isToggleOfBack]);

	useEffect(() => {
		if (imageFile) {
			const props: UpdateImageProps = {
				idImage: objId,
				newImage: setFileImage(imageFile, selectedImage!),
			};
			dispatch(updateImage, props);
		}
	}, [imageFile]);

	useEffect(() => {
		if (imageFileBack) {
			const newBack: Background = {
				src: window.URL.createObjectURL(imageFileBack),
				file: imageFileBack,
			};
			dispatch(setBackground, newBack);
		}
	}, [imageFileBack]);

	const obj = currentSlide.objects.get(currentSlide.selectedObj[0]);

	return (
		<div className={classes}>
			{isToggle && <SettingsObj obj={obj} setImageFile={setImageFile} />}
			{isToggleOfBack && (
				<SettingsBack background={currentSlide.background} setImageFileBack={setImageFileBack} />
			)}
		</div>
	);
};
