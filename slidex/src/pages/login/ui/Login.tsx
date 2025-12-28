import { useState } from 'react';
import { useUser } from '../../../shared/appwrite/user';
import styles from './Login.module.css';

export function Login() {
	const user = useUser();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	return (
		<section className={styles.auth_wrapper}>
			<h1 className={styles.name_slideMaker}>SlideX</h1>
			<div className={styles.auth_form}>
				<input
					type="email"
					placeholder="email"
					value={email}
					onChange={event => {
						setEmail(event.target.value);
					}}
					className={styles.auth_input}
				/>
				<input
					type="password"
					placeholder="password"
					value={password}
					onChange={event => {
						setPassword(event.target.value);
					}}
					className={styles.auth_input}
				/>
				<div className={styles.buttons}>
					<button
						className={`${styles.auth_button} ${styles.login_button}`}
						type="button"
						onClick={() => {
							user.login(email, password);
						}}
					>
						Login
					</button>
					<button
						className={`${styles.auth_button} ${styles.register_button}`}
						type="button"
						onClick={() => {
							user.register(email, password);
						}}
					>
						Register
					</button>
				</div>
			</div>
		</section>
	);
}
