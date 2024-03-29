import {apiUrl} from '../config/global';

export async function fetchBodyParts(): Promise<any[] | null> {
  try {
    const response = await fetch(`${apiUrl}/exercise/body-area`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching body parts:', error);
    return null;
  }
}

export async function fetchNewExercise(body: string): Promise<any | null> {
  try {
    const response = await fetch(`${apiUrl}/exercise`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating exercise:', error);
    return null;
  }
}

export async function fetchNewPlan(body: string): Promise<any | null> {
  try {
    const response = await fetch(`${apiUrl}/workout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating plan:', error);
    return null;
  }
}
