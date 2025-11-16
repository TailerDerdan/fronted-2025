import { useContext } from 'react';
import { Background } from '../../../shared/model/background/Background';
import { Color } from '../../../shared/model/color/Color';
import { SelectImageButton } from '../lib/SelectedImageButton';
import styles from './sidebar.module.css';
import { PresActionContext } from '../../../shared/lib/presentationContext';

type PropsSettingsBack = {
	setImageFileBack: (file: File) => void;
	background: Background;
};

export const SettingsBack = (props: PropsSettingsBack) => {
	const { setImageFileBack, background } = props;

	const actions = useContext(PresActionContext);

	let colorOfSlide: Color = Color.WHITE;
	if (typeof background != 'object') {
		colorOfSlide = background;
	}
	return (
		<>
			<div className={styles.fill_back}>
				<input
					type="color"
					value={colorOfSlide}
					onChange={event => {
						const newBack: Background = event.target.value as Color;
						actions?.setBackground(newBack);
						event.stopPropagation();
						event.preventDefault();
					}}
				/>
			</div>
			<div className={styles.image_back}>
				<SelectImageButton setSelectedImageUrlRef={setImageFileBack} />
			</div>
		</>
	);
};
