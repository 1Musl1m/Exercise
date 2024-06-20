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