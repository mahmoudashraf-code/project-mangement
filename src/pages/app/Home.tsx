import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Project } from '@/types/iProject';
import KanbanBoard from '@/components/KanbanBoard';


const TasksChart: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null >(null)

  return (
    <div className="flex h-full bg-gray-100">
      <Sidebar onSelectProject={setSelectedProject} />
      <main className="flex-1 p-6 overflow-auto">
        {selectedProject ? (
          <KanbanBoard project={selectedProject} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-2xl text-gray-500">Select a project to view tasks</p>
          </div>
        )}
        <div className='h-[16rem]'></div>
      </main>
    </div>
  );
};

export default TasksChart;
