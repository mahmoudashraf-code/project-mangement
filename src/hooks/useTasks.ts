import { Task } from '@/types/iTask';
import { useEffect } from 'react';
import useLocalStorage from 'use-local-storage';

export default function useTasks(projectId: string) {
    const [tasks, setTasks] = useLocalStorage<Task[]>(`tasks_${projectId}`, []);

    useEffect(() => {
        const fetchTasks = () => {
            const storedTasks = JSON.parse(localStorage.getItem(`tasks_${projectId}`) || "[]");
            setTasks(storedTasks); 
        };
        fetchTasks();
    }, [projectId])

    const addTask = (name: string, status: Task['status']) => {
        const newTask: Task = {
            id: Date.now().toString(),
            brewId: `BREW-${Math.floor(Math.random() * 100)}`,
            name,
            status,
            projectId,
            label: Math.random() > 0.5 ? 'QUICK WINS' : 'FY23 LAUNCH PLAN',
            points: Math.floor(Math.random() * 10) + 1
        }
        setTasks([...tasks, newTask])
    }

    const updateTaskStatus = (taskId: string, newStatus: Task['status']) => {
        const updatedTasks = tasks.map((task) =>
            task.id === taskId ? { ...task, status: newStatus } : task
        )
        setTasks(updatedTasks)
    }

    return { tasks, addTask, updateTaskStatus }
}

