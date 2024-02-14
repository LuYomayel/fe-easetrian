export interface Exercise {
  id: number;
  name: string;
  exerciseDetails?: ExerciseDetails;
}

export interface ExerciseDetails {
  repetitions: string;
  sets: string;
  weight: string;
  time: string;
  restInterval: string;
  tempo: string;
  notes: string;
  difficulty: string;
  duration: string;
  distance: string;
}
