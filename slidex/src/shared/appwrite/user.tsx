import { ID, Models } from 'appwrite';
import { createContext, useContext, useEffect, useState } from 'react';
import { account } from './appwrite';
import { useNavigate } from 'react-router-dom';

type UserContextType = {
	current: Models.User | null;
	login: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	register: (email: string, password: string) => Promise<void>;
};

const UserContext = createContext<UserContextType>({
	current: null,
	login: async () => {
		throw new Error('UserContext not initialized');
	},
	logout: async () => {
		throw new Error('UserContext not initialized');
	},
	register: async () => {
		throw new Error('UserContext not initialized');
	},
});

export function useUser() {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error('useUser must be used within a UserProvider');
	}
	return context;
}

type UserProviderProps = {
	children: React.ReactNode;
};

export function UserProvider({ children }: UserProviderProps) {
	const [user, setUser] = useState<Models.User | null>(null);

	const navigate = useNavigate();

	async function getCurrentUser() {
		try {
			const userData = await account.get();
			setUser(userData);
			return userData;
		} catch (error) {
			console.warn('no session', error);
			setUser(null);
			return null;
		}
	}

	async function login(email: string, password: string) {
		try {
			try {
				await account.deleteSession({
					sessionId: 'current',
				});
			} catch (error) {
				console.warn('not sessions');
			}
			await account.createEmailPasswordSession({
				email,
				password,
			});
			const userData = await account.get();
			setUser(userData);
			console.log(userData);
			navigate('/list', { replace: true });
		} catch (error) {
			console.error('login', error);
		}
	}

	async function logout() {
		try {
			await account.deleteSession({
				sessionId: 'current',
			});
			setUser(null);
			navigate('/', { replace: true });
		} catch (error) {
			console.error('logout', error);
		}
	}

	async function register(email: string, password: string): Promise<void> {
		await account.create({
			userId: ID.unique(),
			email,
			password,
		});
		await login(email, password);
	}

	useEffect(() => {
		getCurrentUser();
	}, []);

	const contextValue: UserContextType = {
		current: user,
		login,
		logout,
		register,
	};

	return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
}
