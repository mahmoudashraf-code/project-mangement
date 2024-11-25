export interface Task {
    id: string;
    name: string;
    status: 'To Do' | 'In Progress' | 'Done';
    projectId: string;
    brewId: string;
    label?: 'QUICK WINS' | 'FY23 LAUNCH PLAN';
    assignee?: string;
    points?: number;
}