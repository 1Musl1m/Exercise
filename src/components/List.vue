<script setup lang="ts">
import { reactive } from "vue";
import { useStore } from "vuex";
import type { State, Exercise } from "../../types/Exercise";

const store = useStore<State>();
const exercises = store.state.exercises;

const newExercise = reactive<Exercise>({
    name: "",
    description: "",
    type: "Кардио",
    difficulty: "Легкий",
    duration: undefined,
    repetitions: undefined,
});

const addNewExercise = () => {
    store.commit("addExercise", { ...newExercise });
    newExercise.name = "";
    newExercise.description = "";
    newExercise.type = "Кардио";
    newExercise.difficulty = "Легкий";
    newExercise.duration = undefined;
    newExercise.repetitions = undefined;
};

const deleteExercise = (exercise: Exercise) => {
    const index = exercises.findIndex(
        (ex: Exercise) => ex.name === exercise.name
    );
    if (index !== -1) {
        exercises.splice(index, 1);
        store.commit("deleteExercise", exercise.name);
    }
};
</script>

<template>
    <div class="container">
        <div class="list">
            <div
                v-for="exercise in exercises"
                :key="exercise.name"
                class="list-item"
            >
                <div class="exercise">
                    <h1>{{ exercise.name }}</h1>
                    <p>Описание: {{ exercise.description }}</p>
                    <p>Тип: {{ exercise.type }}</p>
                    <p>Сложность: {{ exercise.difficulty }}</p>
                    <p>Продолжительность: {{ exercise.duration }} минут</p>
                    <p>Повторения: {{ exercise.repetitions }} подхода</p>
                    <button @click="deleteExercise(exercise)">Удалить</button>
                </div>
            </div>
        </div>
        <form @submit.prevent="addNewExercise" class="form">
            <h1>Добавить упражнение</h1>
            <input
                v-model="newExercise.name"
                placeholder="Название"
                required
                class="form-input-name"
            />
            <input
                v-model="newExercise.description"
                placeholder="Описание упражнения"
                required
                class="form-input-description"
            />
            <h1>Выберите тип</h1>
            <select v-model="newExercise.type" required>
                <option value="Кардио">Кардио</option>
                <option value="Силовая">Силовые</option>
                <option value="Растяжка">Растяжка</option>
            </select>
            <h1>Выберите сложность</h1>
            <select v-model="newExercise.difficulty" required>
                <option value="Легкий">Легкий</option>
                <option value="Средний">Средний</option>
                <option value="Сложный">Сложный</option>
            </select>
            <h1>Длительность</h1>
            <input
                v-model.number="newExercise.duration"
                type="number"
                placeholder="Минуты"
                required
            />
            <input
                v-model.number="newExercise.repetitions"
                type="number"
                placeholder="Повторы"
                required
            />
            <button>Добавить упражнение</button>
        </form>
    </div>
</template>

<style lang="scss" scoped>
.container {
    padding: 20px;
    background: #f9f9f9;
}

.list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.list-item {
    margin-bottom: 20px;
}

.exercise {
    display: flex;
    flex-direction: column;
    width: 300px;
    height: 400px;
    padding: 14px;
    border: 2px solid black;
    border-radius: 10px;
}

.form {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
}

.form-input-name,
.form-input-description,
select,
input[type="number"] {
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

button {
    padding: 10px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
</style>
