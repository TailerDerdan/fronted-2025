import { useContext } from 'react';
import { createImage } from '../../../entities/image/lib/image';
import { createTextBox } from '../../../entities/text-box/lib/textbox';
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
import { PresActionContext } from '../../../shared/lib/presentationContext';
import { generateId } from '../../../shared/model/id/Id';
import { redo, undo } from '../../../entities/history/history';

export const Toolbar = () => {
	const actions = useContext(PresActionContext);
	return (
		<div className={styles.toolbar}>
			<div className={styles.wrapper_button_icon}>
				<IconButton
					onClick={() => {
						const newId = generateId();
						actions?.addObjOnCurrentSlide(createTextBox(createRect(500, 100, 100, 100)), newId);
						actions?.setSelectedObj(newId);
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
						const newId = generateId();
						actions?.addObjOnCurrentSlide(createImage('', createRect(100, 100, 100, 100)), newId);
						actions?.setSelectedObj(newId);
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
						if (actions?.setPresState) undo(actions?.setPresState);
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
						if (actions?.setPresState) redo(actions?.setPresState);
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
