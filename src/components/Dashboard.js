import React, { useState, useMemo } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import { useSelector, useDispatch } from 'react-redux'
import { addTask, updateTask, removeTask } from '../features/task/taskSlice'
import { nanoid } from 'nanoid'


export const Dashboard = () => {

    const dispatch = useDispatch()
    const tasks = useSelector(state => state.task)

    const [addingDisplay, setAddingDisplay] = useState(false);
    const [editingDisplay, setEditingDisplay] = useState(false)

    const [todos, setTodos] = useState({

    });

    const taskLength = useMemo(()=>{
        return tasks.length
    }, [tasks])

    const [newUpdate, setNewUpdate] = useState({});

    const setUpdate = (id) => {
        setTodos(tasks.find(task => task.id == id))
    }

    const onChange = (e) => {
        setTodos({ ...todos, [e.target.name]: e.target.value });
    }

    const onNewChange = (e) => {
        setNewUpdate({ ...newUpdate, [e.target.name]: e.target.value });
    }

    const deleteTask = () => {
        if(window.confirm('Are you sure you want to delete this task?') == true){
            dispatch(removeTask({'id':newUpdate.id}));
            setEditingDisplay(false);
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(addTask(todos));
        setTodos({...todos, description: [''], date: [''], time: [''], assigned: ['']});
        setAddingDisplay(false)
        console.log(tasks)
    }

    const onUpdateSubmit = (e) => {
        e.preventDefault();
        console.log(newUpdate)
        dispatch(updateTask(newUpdate))
        setEditingDisplay(false);

    }

    const editClick = (id) =>{
        setNewUpdate(tasks.find(task => task.id == id))
        setEditingDisplay(true);
        //console.log(newUpdate)
    }

    var taskUpdate;

    function UpdateTask() {

        return (
            <>
                <div style={editingDisplay ? { backgroundColor: '#edf7fc', display: 'block' } : {display: 'none'}} className='p-3'>
                    <form onSubmit={onUpdateSubmit}>
                        <div class="form-group">
                            <label htmlFor="description">Task Description</label>
                            <div className="input-group mb-3">
                                <input type="text" name="description" defaultValue={newUpdate.description} onChange={onNewChange} className="form-control" placeholder="Follow up" aria-label="Recipient's username" aria-describedby="Task description" required />
                                <div className="input-group-append">
                                    <button className="btn btn-outline-secondary bl-0" type="button"><i class="fa-solid fa-list-check"></i></button>
                                </div>
                            </div>
                        </div>

                        <input type='hidden' value={newUpdate.id} id='tid' />

                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="date">Date</label>
                                <input type="date" name="date" defaultValue={newUpdate.date} onChange={onNewChange} className="form-control" id="date" placeholder="Email" required />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="time">Time</label>
                                <input type="time" name="time" defaultValue={newUpdate.time} onChange={onNewChange} className="form-control" id="time" placeholder="Time" req />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="assigned user">Assign User</label>
                            <select className="form-control" defaultValue={newUpdate.assigned} name="assigned" onChange={onNewChange} id="assignedUser">
                                <option value='Muhammad Mashood'>Muhammad Mashhood</option>
                                <option value="Tolu Buraimoh">Tolu Buraimoh</option>
                                <option value="Tolu Buraimoh">Tolu Buraimoh</option>
                                <option value="Kevin Debruyne">Kevin Debruyne</option>
                            </select>
                        </div>

                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <div style={{cursor: 'pointer'}} onClick={()=>deleteTask()}>
                            <i class="fa-solid fa-trash-can"></i>
                            </div>

                            <div style={{ textAlign: 'right' }}>
                            <button className='btn btn-sec' onClick={(e)=>{
                            e.preventDefault();
                            setEditingDisplay(false)}}> Cancel </button> <input type="submit" className='btn primary-btn' value="Save"/>
                        </div>
                        </div>
                        
                    </form>
                </div>
            </>
        )
    };

    const tasksList = tasks.map(task => {
        return (
            <>
                <div key={task.id} className='p-2 mb-1' style={(taskLength > 0) ? { display: 'flex', border: '1px solid #eeeeee', justifyContent: 'space-between' } : {display: 'none'}}>
                    <div className='d-flex'>
                        <div style={{width: '40px', height: 'auto'}} className='mr-1'>
                            
                        </div>

                        <div style={{fontSize: '12px'}}>
                        <strong>{task.description}</strong><br />
                        <span style={{ color: 'red' }}>{task.date}</span>
                        </div>
                    </div>

                    <div>
                        <button className='btn mr-1' onClick={()=>editClick(task.id)}><i class="fas fa-pencil"></i></button>
                        <button className='btn mr-1'><i class="fas fa-bell"></i></button>
                        <button className='btn mr-1'><i class="fas fa-check"></i></button>
                    </div>

                </div>
            </>
        )
    })

    const newTask = (
        <div style={addingDisplay ? { backgroundColor: '#edf7fc', display: 'block' } : {display: 'none'}} className='p-3'>
                        <form onSubmit={onSubmit}>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Task Description</label>
                                <div className="input-group mb-3">
                                    <input type="text" name="description"  value={todos.description} onChange={onChange} className="form-control" placeholder="Follow up" aria-label="Recipient's username" aria-describedby="" required />
                                    <div className="input-group-append">
                                        <button className="btn btn-outline-secondary bl-0" type="button"><i class="fa-solid fa-list-check"></i></button>
                                    </div>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label for="inputEmail4">Date</label>
                                    <input type="date" name="date" onChange={onChange} value={todos.date} className="form-control" id="date" placeholder="Email" required />
                                </div>
                                <div className="form-group col-md-6">
                                    <label for="inputPassword4">Time</label>
                                    <input type="time" name="time" onChange={onChange} value={todos.time} className="form-control" id="time" placeholder="Time" req />
                                </div>
                            </div>

                            <div className="form-group">
                                <label for="exampleFormControlSelect2">Assign User</label>
                                <select className="form-control" name="assigned" onChange={onChange} id="ssigned">
                                    <option default value='Muhammad Mashhood'>Muhammad Mashhood</option>
                                    <option value="Tolu Buraimoh">Tolu Buraimoh</option>
                                    <option value="Kevin Debruyne">Kevin Debruyne</option>
                                </select>
                            </div>

                            <div style={{ textAlign: 'right' }}>
                                <button className='btn btn-sec' onClick={(e)=>{e.preventDefault(); setAddingDisplay(false)}}> Cancel </button> <button type="submit" className='btn primary-btn'>Save</button>
                            </div>
                        </form>
                    </div>
    )

    return (
        <>
            <Header />
            <Sidebar />
            <div className='content'>

                <div style={{ width: '400px', fontSize: '12px' }}>

                    {tasksList}

                    <div className="input-group">
                        <input type="text" className="form-control task-head" placeholder={`TASKS ${tasks.length}`} aria-label="Recipient's username" aria-describedby="basic-addon2" disabled />
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary task-head-btn" onClick={()=>setAddingDisplay(true)}><strong>+</strong></button>
                        </div>
                    </div>

                    {/* Begin Task creator */}
                    

                    {newTask}

                    {UpdateTask()}
                </div>

               
            </div>
        </>
    )
}


