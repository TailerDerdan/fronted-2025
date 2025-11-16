import { useContext, useEffect, useState } from 'react';
import styles from './sidebar.module.css';
import { setFileImage } from '../../../entities/image/lib/image';
import { Background } from '../../../shared/model/background/Background';
import { SettingsBack } from './SettingBack';
import { SettingsObj } from './SettingObj';
import { Image } from '../../../shared/model/image/types';
import { PresActionContext } from '../../../shared/lib/presentationContext';
import { Id } from '../../../shared/model/id/Id';
import { getCurrentSlide } from '../../../entities/presentation/lib/presentation';
import { useAppSelector } from '../../../entities/presentation/model/store';

type SidebarProps = {
	isToggleOfBack: boolean;
};

export const Sidebar = (props: SidebarProps) => {
	const { isToggleOfBack } = props;

	const [imageFile, setImageFile] = useState<File>();
	const [imageFileBack, setImageFileBack] = useState<File>();

	const [objId, setObjId] = useState<Id>('');
	const [selectedImage, setSelectedImage] = useState<Image | null>(null);

	const [classes, setClasses] = useState('');

	const actions = useContext(PresActionContext);

	const { selection, slides } = useAppSelector(state => state);
	const currentSlide = getCurrentSlide(selection.selectedSlides, slides.slideList);

	const isToggle = selection.selectedObj.length > 0 ? true : false;

	useEffect(() => {
		if (isToggle && currentSlide) {
			const obj = currentSlide.objects[selection.selectedObj[0]];
			if (obj && obj.type == 'image') {
				setSelectedImage(obj);
				setObjId(selection.selectedObj[0]);
				// if (obj.src.length > 0 && imageFile && window.URL.createObjectURL(imageFile).length == 0) {
				// 	setImageFile(obj.file);
				// }
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
			actions?.updateImage(objId, setFileImage(imageFile, selectedImage!));
		}
	}, [imageFile]);

	useEffect(() => {
		if (imageFileBack) {
			const newBack: Background = {
				src: window.URL.createObjectURL(imageFileBack),
			};
			actions?.setBackground(newBack);
		}
	}, [imageFileBack]);

	const obj = currentSlide ? currentSlide.objects[selection.selectedObj[0]] : undefined;

	return (
		<div className={classes}>
			{isToggle && <SettingsObj obj={obj} setImageFile={setImageFile} />}
			{isToggleOfBack && currentSlide && (
				<SettingsBack background={currentSlide.background} setImageFileBack={setImageFileBack} />
			)}
		</div>
	);
};
