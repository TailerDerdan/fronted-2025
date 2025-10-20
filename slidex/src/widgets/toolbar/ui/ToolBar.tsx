import { createImage } from '../../../entities/image/lib/image';
import { addObjOnCurrentSlide } from '../../../entities/presentation/lib/presentation';
import { createTextBox } from '../../../entities/text-box/lib/textbox';
import { dispatch } from '../../../features/presentation-editor/model/editor';
import { createRect } from '../../../shared/model/geometry/rect/model/types';
import { IconButton } from '../../../shared/ui/iconButton';
import {
	FileExportIcon,
	FileImportIcon,
	ImageIcon,
	RedoIcon,
	TextIcon,
	UndoIcon,
} from '../lib/iconComponent';
import styles from './toolbar.module.css';

export const Toolbar = () => {
	return (
		<div className={styles.toolbar}>
			<div className={styles.wrapper_button_icon}>
				<IconButton
					onClick={() => {
						dispatch(addObjOnCurrentSlide, createTextBox(createRect(500, 100, 100, 100)));
					}}
					className="icon_toolbar"
					icon={<TextIcon />}
				>
					<p className={styles.text_button_icon}>Текст</p>
				</IconButton>
			</div>
			<div className={styles.wrapper_button_icon}>
				<IconButton
					onClick={() => {
						dispatch(addObjOnCurrentSlide, createImage('', createRect(100, 100, 100, 100)));
					}}
					className="icon_toolbar"
					icon={<ImageIcon />}
				>
					<p className={styles.text_button_icon}>Медиа</p>
				</IconButton>
			</div>
			<div className={styles.wrapper_button_icon}>
				<IconButton
					onClick={() => {
						console.log('import file');
					}}
					className="icon_toolbar"
					icon={<FileImportIcon />}
				>
					<p className={styles.text_button_icon}>Импорт</p>
				</IconButton>
			</div>
			<div className={styles.wrapper_button_icon}>
				<IconButton
					onClick={() => {
						console.log('export file');
					}}
					className="icon_toolbar"
					icon={<FileExportIcon />}
				>
					<p className={styles.text_button_icon}>Экспорт</p>
				</IconButton>
			</div>
			<div className={styles.wrapper_button_icon}>
				<IconButton
					onClick={() => {
						console.log('undo');
					}}
					className="icon_toolbar"
					icon={<UndoIcon />}
				>
					<p className={styles.text_button_icon}>Назад</p>
				</IconButton>
			</div>
			<div className={styles.wrapper_button_icon}>
				<IconButton
					onClick={() => {
						console.log('redo');
					}}
					className="icon_toolbar"
					icon={<RedoIcon />}
				>
					<p className={styles.text_button_icon}>Вперед</p>
				</IconButton>
			</div>
		</div>
	);
};
