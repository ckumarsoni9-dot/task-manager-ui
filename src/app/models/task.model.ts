export interface Task {
  id: number;
  userId: number;
  title: string;
  description: string;
  status: 'Pending' | 'InProgress' | 'Completed';
  priority: 'Low' | 'Medium' | 'High';
  dueDate?: Date;
  createdAt: Date;
}

export interface CreateTaskDto {
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  dueDate?: Date;
}

export interface UpdateTaskStatusDto {
  status: 'Pending' | 'InProgress' | 'Completed';
}
