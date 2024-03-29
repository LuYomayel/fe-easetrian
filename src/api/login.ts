import {IUser} from '../interfaces/API/User';
import {apiUrl} from '../config/global';

export async function fetchUser(
  email: string,
  password: string,
): Promise<IUser | null> {
  try {
    const response = await fetch(`${apiUrl}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password}),
    });
    const data = await response.json();
    console.log('data :', data);
    return data;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}
// Compare this snippet from src/screens/CoachHome.tsx:
