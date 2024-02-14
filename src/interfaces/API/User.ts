export enum EUserType {
  COACH = 'coach',
  CLIENT = 'client',
}

export interface ICoach {
  id: number;
  user: IUser;
  name: string;
  estimatedClients: number;
  //   trainingType: ETrainingType[];
  hasGym: boolean;
  gymLocation: string | null;
  isDeleted: boolean;
}

export interface IClient {
  id: number;
  client: IUser;
  height: number;
  weight: number;
  //   fitnessGoal: EFitnessGoal[];
  //   activityLevel: EActivityLevel;
  birthdate?: Date;
  gender?: string;
  isDeleted: boolean;
}

export interface IUser {
  id: number;
  email: string;
  password: string;
  name: string;
  surname: string;
  userType: EUserType;
  coach: ICoach;
  client: IClient;
  //   reviews: Review[];
  isDeleted: boolean;
  //   clientSubscriptions: ClientSubscription[];
  //   coachSubscriptions: CoachSubscription[];
  //   subscription: Subscription;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface IHttpException {
  message: string;
  status: number;
}
