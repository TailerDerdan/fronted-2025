import { useContext, useEffect, useRef, useState } from 'react';
import styles from './sidebar.module.css';
import { setIdImage, setSrcImage } from '../../../entities/image/lib/image';
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

	const [URLBack, setURLBack] = useState<Background>({ src: '#fff', id: '' });

	const [imageFile, setImageFile] = useState<{ URL: string; id: string }>();

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
			actions?.updateImage(objId, setIdImage(imageFile.id, setSrcImage(imageFile.URL, selectedImage!)));
		}
	}, [imageFile]);

	const currentSlideIdRef = useRef<string | null>(null);

	useEffect(() => {
		if (currentSlide) {
			if (selection.selectedSlides[0] !== currentSlideIdRef.current) {
				currentSlideIdRef.current = selection.selectedSlides[0];
				setURLBack(currentSlide.background);
			}
		}
	}, [selection.selectedSlides[0], currentSlide]);

	const handleBackgroundChange = (newBackground: Background) => {
		if (actions?.setBackground && currentSlide && currentSlide.background !== newBackground) {
			actions.setBackground(newBackground);
		}
	};

	const obj = currentSlide ? currentSlide.objects[selection.selectedObj[0]] : undefined;

	return (
		<div className={classes}>
			{isToggle && <SettingsObj obj={obj} setImageURL={setImageFile} />}
			{isToggleOfBack && currentSlide && (
				<SettingsBack
					background={URLBack}
					setURLBack={setURLBack}
					onBackgroundChange={handleBackgroundChange}
				/>
			)}
		</div>
	);
};
