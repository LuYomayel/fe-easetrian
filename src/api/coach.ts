import {IClient} from '../interfaces/API/User';
import {apiUrl} from '../config/global';
import {IWorkout} from '../interfaces/API/Workout';

export async function fetchCoachClients(
  coachId: string,
): Promise<IClient[] | null> {
  try {
    const response = await fetch(`${apiUrl}/subscription/coach/${coachId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching coach clients:', error);
    return null;
  }
}

export async function fetchClientPlans(
  clientId: string,
): Promise<IWorkout[] | null> {
  try {
    const response = await fetch(`${apiUrl}/workout/clientId/${clientId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching client plans:', error);
    return null;
  }
}
