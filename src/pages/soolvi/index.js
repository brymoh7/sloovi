import React, { useEffect, useState } from 'react';
import { DatePicker, Loader } from 'rsuite';
import InputGroup from '../../components/elements/Input/InputGroup';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { LoginHandle } from '../../state/slices/action/Login.js';
import { deleteTaskHandle } from '../../state/slices/action/Delete';
import {
    addNewTaskHandle,
    convertTosec,
} from '../../state/slices/action/newTask';
import { allTaskHandle } from '../../state/slices/action/AllTasks';
import { EachTask } from './component';
import { updateTaskHandle } from '../../state/slices/action/Update';
//
//

const Soolvi = () => {
    const dispatch = useDispatch();
    const [action, setAction] = useState();
    const [newTask, setTask] = useState(false);
    const [allTask, setAllTask] = useState([]);
    const [formData, setFormData] = useState({
        task_msg: '',
        task_time: '',
        task_date: '',
        assigned_user: '',
    });

    const { userData, status } = useSelector(
        (state) => state.reducer.loginReducer
    );
    const getTasks = useSelector((state) => state.reducer.allTasks);
    const singleTask = useSelector((state) => state.reducer.singleTask);

    //
    let date = new Date();
    const save = () => {
        const info = {
            token: userData.results.token,
            companyID: userData.results.company_id,
            body: {
                ...formData,
                task_date: formData.task_date,
                task_time: convertTosec(formData.task_time),
                is_completed: 1,
                time_zone: date.getTime(),
            },
        };
        addNewTaskHandle(dispatch, info);
    };

    const update = () => {
        console.log(formData);
        const { task_id, ...otherData } = formData;
        const info = {
            token: userData.results.token,
            taskID: formData.task_id,
            companyID: userData.results.company_id,
            body: {
                ...otherData,
                task_date: formData.task_date,
                task_time: convertTosec(formData.task_time),
                is_completed: 1,
                time_zone: date.getTime(),
            },
        };
        updateTaskHandle(dispatch, info);
    };

    let newValue = {};
    function updateValue(newVal, variable) {
        variable === 'task_msg' && (newValue = { task_msg: newVal });
        variable === 'task_date' && (newValue = { task_date: newVal });
        variable === 'task_time' && (newValue = { task_time: newVal });
        variable === 'assigned_user' && (newValue = { assigned_user: newVal });
        setFormData({
            ...formData,
            ...newValue,
        });
    }
    //
    useEffect(() => {
        if (status !== 'FULFILLED') {
            LoginHandle(dispatch, setAllTask);
        } else {
            allTaskHandle(
                dispatch,
                userData.results.token,
                userData.results.company_id,
                setAllTask
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="flex flex-col md:flex-row items-center h-[100%] mb-8">
            <div className="flex flex-col items-center w-[380px] mt-10 px-4">
                <div className="w-full bg-slate-100 mx-4 px-6 py-8 rounded-lg border">
                    <div className="flex h-8 justify-between pl-4 rounded items-center   border mb-5">
                        <h5>Tasks</h5>
                        <i
                            onClick={() => setTask(!newTask)}
                            className="h-full flex items-center justify-center w-8 border-l bg-slatw-200 text-slate-500"
                        >
                            <FaPlus />
                        </i>
                    </div>
                    <div className={newTask ? 'block' : 'hidden'}>
                        <div className="px-2 w-full">
                            <h5 className="text-xs font-bold pb-0.5 px-0.5">
                                Task Description
                            </h5>
                            <InputGroup
                                placeholder=" "
                                value={formData.task_msg}
                                data={[]}
                                onChange={(e) =>
                                    updateValue(e.target.value, 'task_msg')
                                }
                            />
                        </div>
                        <div className="flex items-center">
                            <div className="px-2 w-1/2 mt-2">
                                <h5 className="text-xs font-bold pb-0.5 px-0.5">
                                    Date
                                </h5>
                                <input
                                    type="date"
                                    name="date"
                                    className="w-full p-1.5 border rounded-md"
                                    onChange={(e) =>
                                        updateValue(e.target.value, 'task_date')
                                    }
                                />
                            </div>
                            <div className="px-2 w-1/2 mt-2">
                                <h5 className="text-xs font-bold pb-0.5 px-0.5">
                                    Time
                                </h5>
                                <DatePicker
                                    label="fdf"
                                    format="HH:mm"
                                    ranges={[]}
                                    style={{ width: 260 }}
                                    onChange={(e) =>
                                        updateValue(e, 'task_time')
                                    }
                                />
                            </div>
                        </div>
                        <div className="px-2 w-full my-5">
                            <div className=" w-full">
                                <h5 className="text-xs font-bold pb-0.5 px-0.5">
                                    Assign User
                                </h5>
                                <InputGroup
                                    placeholder=" "
                                    value={formData.assigned_user}
                                    onChange={(e) =>
                                        updateValue(
                                            e.target.value,
                                            'assigned_user'
                                        )
                                    }
                                />
                            </div>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                            <i
                                className="cursor-pointer"
                                onClick={() =>
                                    deleteTaskHandle(
                                        dispatch,
                                        userData.results.token,
                                        userData.results.company_id,
                                        formData.task_id
                                    )
                                }
                            >
                                {action === 'edit' && <FaTrash />}
                            </i>
                            <div>
                                <button
                                    onClick={
                                        (() => setTask(!newTask),
                                        () => setAction('new'))
                                    }
                                    className="h-8 w-24 mr-2 rounded shadow-sm hover:bg-slate-200 text-black text-md"
                                >
                                    Cancel
                                </button>
                                {action === 'edit' ? (
                                    <button
                                        onClick={update}
                                        className="h-8 w-20 mr-2 rounded shadow-sm bg-green-600 text-white text-md"
                                    >
                                        Update
                                    </button>
                                ) : (
                                    <button
                                        onClick={save}
                                        className="h-8 w-20 mr-2 rounded shadow-sm bg-green-600 text-white text-md"
                                    >
                                        Save
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {allTask.length > 0 &&
                    allTask.map((res, index) => {
                        return (
                            <EachTask
                                key={index}
                                date={res.task_date}
                                Task={res.task_msg}
                                taskId={res.id}
                                dispatch={dispatch}
                                userData={userData}
                                setFormData={setFormData}
                                formData={formData}
                                setAction={setAction}
                                setTask={setTask}
                            />
                        );
                    })}
                {getTasks.status === 'PENDING' && (
                    <div className="relative h-28 my-3 bg-slate-700 border w-full">
                        <Loader
                            backdrop
                            speed="fast"
                            content="loading tasks..."
                            vertical
                        />
                    </div>
                )}
                {status === 'PENDING' && (
                    <Loader
                        backdrop
                        speed="fast"
                        content="logging in..."
                        vertical
                    />
                )}
                {singleTask.status === 'PENDING' && (
                    <Loader
                        backdrop
                        speed="fast"
                        content="Loading a task in..."
                        vertical
                    />
                )}
            </div>
        </div>
    );
};

export default Soolvi;
