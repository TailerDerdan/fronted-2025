import { SlideObj } from '../../../shared/model/objOnSlide';
import { SelectImageButton } from '../lib/SelectedImageButton';
import styles from './sidebar.module.css';

type PropsSettingsObj = {
	obj: SlideObj | undefined;
	setImageURL: (URL: string) => void;
};

export const SettingsObj = (props: PropsSettingsObj) => {
	const { obj, setImageURL } = props;
	if (obj && obj.type == 'image') {
		return (
			<>
				<div className={styles.fill_image}>
					<SelectImageButton setSelectedImageUrlRef={setImageURL} />
				</div>
				<div className={styles.stroke}>
					<input type="color" value={obj.borderColor} />
				</div>
			</>
		);
	}
	return <></>;
};
