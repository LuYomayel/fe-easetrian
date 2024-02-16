import {IWorkout} from './Workout';

export interface IExercise {
  id: number;
  name: string;
  exerciseDetails?: IExerciseDetails;
}

export interface IExerciseDetails {
  repetitions?: string;
  sets?: string;
  weight?: string;
  time?: string;
  restInterval?: string;
  tempo?: string;
  notes?: string;
  difficulty?: string;
  duration?: string;
  distance?: string;
}

export interface IExerciseInstance {
  id: number;
  exercise: IExercise;
  group: IExerciseGroup;
  repetitions?: number;
  sets?: number;
  time?: number;
  weight?: number;
  restInterval?: number;
  tempo?: string;
  notes?: string;
  difuculty?: string;
  duration?: number;
  distance?: number;
}

export interface IExerciseGroup {
  id: number;
  workout: IWorkout;
  exercises: IExerciseInstance[];
  set: number;
  rest: number;
}
