import { Background } from '../../../shared/model/background/Background';
import { Color } from '../../../shared/model/color/Color';
import { SelectImageButton } from '../lib/SelectedImageButton';
import styles from './sidebar.module.css';

type PropsSettingsBack = {
	setURLBack: (newBack: Background) => void;
	background: Background;
	onBackgroundChange: (newBackground: Background) => void;
};

export const SettingsBack = (props: PropsSettingsBack) => {
	const { setURLBack, background, onBackgroundChange } = props;

	let colorOfSlide: Color = '#ffffff';
	if (background.src[0] == '#') {
		colorOfSlide = background.src;
	}

	const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newBack: Background = {
			src: event.target.value,
			id: '',
		};
		console.log(newBack);
		setURLBack(newBack);
	};

	const handleColorCommit = (event: React.FocusEvent<HTMLInputElement>) => {
		const newBack: Background = {
			src: event.target.value,
			id: '',
		};
		console.log(newBack);
		onBackgroundChange(newBack);
	};

	const handleImageSelectCommit = (back: { URL: string; id: string }) => {
		const newBack: Background = {
			src: back.URL,
			id: back.id,
		};
		console.log(newBack);
		setURLBack(newBack);
		onBackgroundChange(newBack);
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
