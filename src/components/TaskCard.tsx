import { Card } from '@/components/ui/card'
import { ChevronDown } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Task } from '@/types/iTask';

interface TaskCardProps {
    task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
    return (
        <Card className="bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
            <div className="p-4 space-y-2">
                {task.label && (
                    <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded ${task.label === 'QUICK WINS'
                            ? 'bg-teal-100 text-teal-700'
                            : 'bg-purple-100 text-purple-700'
                            }`}>
                            {task.label}
                        </span>
                    </div>
                )}

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            className="rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <span className="text-xs text-gray-500">{task.brewId}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        {task.points && (
                            <span className="text-sm text-gray-600">{task.points}</span>
                        )}
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <ChevronDown className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {task.name}
                </p>

                <div className="flex items-center justify-between pt-2">
                    {task.assignee && (
                        <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">
                                {task.assignee[0]}
                            </AvatarFallback>
                        </Avatar>
                    )}
                </div>
            </div>
        </Card>
    )
}

