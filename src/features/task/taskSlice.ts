import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState, AppThunk } from "../../app/store";

// stateの型
interface TaskState {
	// taskが何個あるのか管理
	idCount: number;
	// storeに保存するtask一覧
	tasks: { id: number; title: string; completed: boolean }[];
	// taskのtitleを編集する際にどのtaskが選択されているか
	selectedTask: { id: number; title: string; completed: boolean };
	// Modalを開くか閉じるかのフラグ
	isModalOpen: boolean;
}

const initialState: TaskState = {
	idCount: 1,
	tasks: [{ id: 1, title: "Task A", completed: false }],
	selectedTask: { id: 0, title: "", completed: false },
	isModalOpen: false,
};

export const taskSlice = createSlice({
	name: "task",
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		//taskの作成
		createTask: (state, action) => {
			state.idCount++;
			const newTask = {
				id: state.idCount,
				title: action.payload,
				completed: false,
			};
			state.tasks = [newTask, ...state.tasks];
		},
		// taskの編集
		editTask: (state, action) => {
			// state.taskの中から指定したtaskを抜き出す
			const task = state.tasks.find((t) => t.id === action.payload.id);
			if (task) {
				//抜き出したtaskのタイトルを置き換える
				task.title = action.payload.title;
			}
		},
		//どのタスクを選択しているか管理
		selectTask: (state, action) => {
			state.selectedTask = action.payload;
		},
		// Modalを開くか閉じるかのフラグ管理
		handleModalOpen: (state, action) => {
			state.isModalOpen = action.payload;
		},
		// Task完了・未完了のチェックを変更
		completeTask: (state, action) => {
			// state.taskの中から指定したtaskを抜き出す
			const task = state.tasks.find((t) => t.id === action.payload.id);
			if (task) {
				//抜き出したtaskのCompletedを反転させる
				task.completed = !task.completed;
			}
		},
		// taskの削除
		deleteTask: (state, action) => {
			//指定したtask以外で新しくstate.tasksの配列を作成しなおしている
			state.tasks = state.tasks.filter((t) => t.id !== action.payload.id);
		},
	},
});

export const {
	createTask,
	editTask,
	selectTask,
	handleModalOpen,
	completeTask,
	deleteTask,
} = taskSlice.actions;

export const selectTasks = (state: RootState): TaskState["tasks"] =>
	state.task.tasks;

export const selectIsModalOpen = (state: RootState): TaskState["isModalOpen"] =>
	state.task.isModalOpen;

export const selectSelectedTask = (
	state: RootState
): TaskState["selectedTask"] => state.task.selectedTask;

export default taskSlice.reducer;
