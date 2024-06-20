import { createStore } from "vuex";

export interface Exercise {
    name: string;
    description: string;
    type: "Кардио" | "Силовая" | "Растяжка";
    difficulty: "Легкий" | "Средний" | "Сложный";
    duration?: number;
    repetitions?: number;
}

export interface State {
    exercises: Exercise[];
}

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
