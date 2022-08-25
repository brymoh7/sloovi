import { createSlice } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'

const initialState = []


const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {

        addTask: {
            reducer(state, action) {
                state.push(action.payload)
            },
            prepare: (value) => {
                return {
                    payload: {
                        id: nanoid(),
                        ...value,
                    }
                }
            }
        },

        removeTask: {
            reducer(state, action) {
                const { id } = action.payload
                return state.filter(task => task.id !== id)
            }
        },

        updateTask: {

            reducer(state, action) {
                const { assigned, id, description, date, time } = action.payload;
                const taskExist = state.find(task => task.id === id)
                if (taskExist) {
                    taskExist.description = description;
                    taskExist.date = date;
                    taskExist.time = time;
                    taskExist.assigned = assigned;
                }
            }
        },


    }
})

export const { addTask, removeTask, updateTask } = taskSlice.actions
export default taskSlice.reducer