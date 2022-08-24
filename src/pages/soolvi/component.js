import { FaEdit } from 'react-icons/fa';
import { singleTaskHandle } from '../../state/slices/action/SingleTask';

export const EachTask = ({
    date,
    Task,
    taskId,
    dispatch,
    userData,
    setFormData,
    formData,
    setAction,
    setTask,
}) => (
    <div className="flex items-center mt-3 mx-3 w-full bg-white justify-between py-2 px-3 border rounded-md shadow">
        <div className="flex items-center">
            <div className="flex flex-col text-xs ml-2">
                <b>{Task}</b>
                <h5 className="text-blue-700">{date}</h5>
            </div>
        </div>

        <i
            onClick={() =>
                singleTaskHandle(
                    dispatch,
                    userData.results.token,
                    userData.results.company_id,
                    formData,
                    setFormData,
                    taskId,
                    setAction,
                    setTask
                )
            }
        >
            <FaEdit />
        </i>
    </div>
);
