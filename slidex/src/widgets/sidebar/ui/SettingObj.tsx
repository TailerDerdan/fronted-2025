import { SlideObj } from '../../../entities/slide/model/types';
import { SelectImageButton } from '../lib/SelectedImageButton';
import styles from './sidebar.module.css';

type PropsSettingsObj = {
	obj: SlideObj | undefined;
	setImageFile: (file: File) => void;
};

export const SettingsObj = (props: PropsSettingsObj) => {
	const { obj, setImageFile } = props;
	if (obj && obj.type == 'image') {
		return (
			<>
				<div className={styles.fill_image}>
					<SelectImageButton setSelectedImageUrlRef={setImageFile} />
				</div>
				<div className={styles.stroke}>
					<input type="color" value={obj.borderColor} />
				</div>
			</>
		);
	}
	return <></>;
};
