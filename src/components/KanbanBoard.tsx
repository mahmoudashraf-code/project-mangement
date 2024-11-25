import { DragDropContext, Droppable, Draggable, DropResult} from '@hello-pangea/dnd'
import useTasks from '../hooks/useTasks'
import { Project } from '@/types/iProject';
import { Task } from '@/types/iTask';
import TaskCard from './TaskCard';
import AddTaskForm from './AddTaskForm';

interface ColumnData {
    title: string;
}

const columns: Record<Task['status'], ColumnData> = {
    'To Do': { title: 'TO DO' },
    'In Progress': { title: 'IN PROGRESS' },
    'Done': { title: 'DONE' }
}

interface KanbanBoardProps {
    project: Project;
}

export default function KanbanBoard({ project }: KanbanBoardProps) {
    const { tasks, addTask, updateTaskStatus } = useTasks(project.id)

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return

        const { source, destination, draggableId } = result
        if (source.droppableId !== destination.droppableId) {
            updateTaskStatus(draggableId, destination.droppableId as Task['status'])
        }
    }

    return (
        <div className="h-full">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {project.name}
                </h2>
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {Object.entries(columns).map(([status, { title }]) => (
                        <div key={status} className="bg-gray-50 dark:bg-gray-900 rounded-lg">
                            <div className="p-4">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                        {title}
                                    </h3>
                                </div>

                                <Droppable droppableId={status}>
                                    {(provided) => (
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            className="space-y-3 min-h-[30px]"
                                        >
                                            {tasks
                                                .filter((task) => task.status === status)
                                                .map((task, index) => (
                                                    <Draggable
                                                        key={task.id}
                                                        draggableId={task.id}
                                                        index={index}
                                                    >
                                                        {(provided) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                            >
                                                                <TaskCard task={task} />
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>

                                <div className="mt-3">
                                    <AddTaskForm
                                        onAddTask={(name) => addTask(name, status as Task['status'])}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </DragDropContext>
        </div>
    )
}
