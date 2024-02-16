import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import 'intl-pluralrules';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      gymRegistration: 'Gym Registration',
      userRegistration: 'User Registration',
      coachRegistration: 'Coach Registration',
      welcomeBack: 'Welcome Back!',
      logIn: 'EaseTrain',
      gymManagment: 'Gym Managment',
      clientManagment: 'Client Managment',
      home: 'Home',
      dashboard: 'Dashboard',
      students: 'Students',
      schedule: 'Schedule',
      exercises: 'Exercises',
      manageStudents: 'Manage Students',
      createTrainingPlan: 'Create Training Plan',
      createExercise: 'Create Exercise',
      exerciseLibrary: 'Exercise Library',
      addExercise: 'Add Exercise',
      savePlan: 'Save Plan',
      planName: 'Plan Name',
      exerciseList: 'Exercise List',
      exerciseDetails: 'Exercise Details',
      repetitions: 'Repetitions',
      sets: 'Sets',
      weight: 'Weight',
      time: 'Time',
      restInterval: 'Rest Interval',
      tempo: 'Tempo',
      distance: 'Distance',
      duration: 'Duration',
      notes: 'Notes',
      difficulty: 'Difficulty',
      submit: 'Submit',
      planList: 'Plan List',
      editPlan: 'Edit Plan',
      deletePlan: 'Delete Plan',
      assignPlan: 'Assign Plan',
      editingTrainingPlan: 'Editing Training Plan',
      assignTrainingPlan: 'Assign Training Plan',
      clientPlanList: 'Client Plan List',
    },
  },
  es: {
    translation: {
      gymRegistration: 'Registro de Gimnasio',
      userRegistration: 'Registro de Usuario',
      coachRegistration: 'Registro de Entrenador',
      welcomeBack: 'Bienvenido de nuevo!',
      logIn: 'EaseTrain',
      gymManagment: 'Administración de Gimnasio',
      clientManagment: 'Administración de Clientes',
      home: 'Inicio',
      dashboard: 'Tablero',
      students: 'Estudiantes',
      schedule: 'Horario',
      exercises: 'Ejercicios',
      manageStudents: 'Administrar Estudiantes',
      createTrainingPlan: 'Crear Plan de Entrenamiento',
      createExercise: 'Crear Ejercicio',
      exerciseLibrary: 'Biblioteca de Ejercicios',
      addExercise: 'Agregar Ejercicio',
      savePlan: 'Guardar Plan',
      planName: 'Nombre del Plan',
      exerciseList: 'Lista de Ejercicios',
      exerciseDetails: 'Detalles del Ejercicio',
      repetitions: 'Repeticiones',
      sets: 'Series',
      weight: 'Peso',
      time: 'Tiempo',
      restInterval: 'Intervalo de Descanso',
      tempo: 'Tempo',
      distance: 'Distancia',
      duration: 'Duración',
      notes: 'Notas',
      difficulty: 'Dificultad',
      submit: 'Enviar',
      planList: 'Lista de Planes',
      editPlan: 'Editar Plan',
      deletePlan: 'Eliminar Plan',
      assignPlan: 'Asignar Plan',
      editingTrainingPlan: 'Editando Plan de Entrenamiento',
      assignTrainingPlan: 'Asignar Plan de Entrenamiento',
      clientPlanList: 'Lista de Planes de Cliente',
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
