import { Background } from '../../../shared/model/background/Background';
import { Color } from '../../../shared/model/color/Color';
import { SelectImageButton } from '../lib/SelectedImageButton';
import styles from './sidebar.module.css';

type PropsSettingsBack = {
	setURLBack: (URL: string) => void;
	background: Background;
	onBackgroundChange: (newBackground: Background) => void;
};

export const SettingsBack = (props: PropsSettingsBack) => {
	const { setURLBack, background, onBackgroundChange } = props;

	let colorOfSlide: Color = '#fff';
	if (typeof background != 'object') {
		colorOfSlide = background;
	}

	const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newBack: Background = event.target.value;
		setURLBack(newBack);
	};

	const handleColorCommit = (event: React.FocusEvent<HTMLInputElement>) => {
		const newBack: Background = event.target.value;
		console.log(newBack);
		onBackgroundChange(newBack);
	};

	const handleImageSelectCommit = (selectedImageUrl: string) => {
		setURLBack(selectedImageUrl);
		if (onBackgroundChange) {
			onBackgroundChange(selectedImageUrl as Background);
		}
	};

	return (
		<>
			<div className={styles.fill_back}>
				<input
					type="color"
					value={colorOfSlide}
					onChange={handleColorChange}
					onBlur={handleColorCommit}
				/>
			</div>
			<div className={styles.image_back}>
				<SelectImageButton setSelectedImageUrlRef={handleImageSelectCommit} />
			</div>
		</>
	);
};
