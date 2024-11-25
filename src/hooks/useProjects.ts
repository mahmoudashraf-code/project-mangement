import { Project } from '@/types/iProject';
import useLocalStorage from 'use-local-storage';

export default function useProjects() {
    const [projects, setProjects] = useLocalStorage<Project[]>("projects", []);

    const addProject = (project: Project) => {
        const newProject = { ...project, id: Date.now().toString() }
        setProjects([...projects, newProject])
    }

    return { projects, addProject }
}

