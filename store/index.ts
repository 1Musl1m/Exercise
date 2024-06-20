import { createStore } from "vuex";
import type { Exercise, State } from '../types/Exercise'

const loadLocalStorage = (): Exercise[] => {
    const exercises = localStorage.getItem("exercises");
    return exercises ? JSON.parse(exercises) : [];
};

const saveToLocalStorage = (exercises: Exercise[]) => {
    localStorage.setItem("exercises", JSON.stringify(exercises));
};

const store = createStore<State>({
    state: {
        exercises: loadLocalStorage(),
    },
    mutations: {
        addExercise(state: State, exercise: Exercise) {
            state.exercises.push(exercise);
            saveToLocalStorage(state.exercises);
        },
        deleteExercise(state: State, exerciseName: string) {
            state.exercises = state.exercises.filter(
                (exercise) => exercise.name !== exerciseName
            );
            saveToLocalStorage(state.exercises);
        },
    },
});

export default store;
