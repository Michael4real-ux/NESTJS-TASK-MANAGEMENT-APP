import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TaskStatus } from './task-status.enum';

const mockUser = { username: 'Test user' };
const mockTaskRepository = () => ({
  getTasks: jest.fn(),
});

describe('TasksService', () => {
  let tasksService;
  let taskRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TaskRepository, useFactory: mockTaskRepository },
      ],
    }).compile();

    tasksService = await module.get(TasksService);
    taskRepository = await module.get(TaskRepository);
  });

  describe('getTask', () => {
    it('gets all task from the repository', async () => {
      taskRepository.getTasks.mockResolvedValue('someValue');

      expect(taskRepository.getTasks).not.toHaveBeenCalled();
      const filters: GetTaskFilterDto = {
        status: TaskStatus.IN_PROGRESS,
        search: 'Some search query',
      };
      // Call tasksService.getTasks
      const result = await tasksService.getTasks(filters, mockUser);
      // expect taskReposiitory.getTasks to have been called
      expect(taskRepository.getTasks).toHaveBeenCalled();
      expect(result).toEqual('someValue');
    });
  });
});
