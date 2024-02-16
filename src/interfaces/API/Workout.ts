import {ICoach} from './User';
import {IExerciseGroup} from './Exercise';
import {IUser} from './User';
export interface IWorkout {
  id: number;
  subscription?: ISubscription;
  coach: ICoach;
  planName: string;
  dayOfWeek?: string;
  date?: Date;
  startTime?: string;
  endTime?: string;
  notes?: string;
  status?: string;
  groups: IExerciseGroup[];
}

export interface ISubscription {
  id: number;
  user: IUser;
  workouts: IWorkout[];
  //   mealPlans: MealPlan[];
  //   schedules: Schedule[];
  //   payments: Payment[];
  isDeleted: boolean;
}

export interface AssignWorkoutDto {
  planName: string;
  dayOfWeek?: string;
  date?: Date;
  workoutId: number;
  coachId: number;
}
