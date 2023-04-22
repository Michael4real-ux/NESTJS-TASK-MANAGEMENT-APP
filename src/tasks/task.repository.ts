import { DataSource, Repository } from 'typeorm';
import { Task } from './task.entity';
import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';

// Custom respository since @EntityRepository is deprecated
@Injectable()
export class TaskRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.DONE;
    await task.save();
    return task;
  }

  /**
   * Add a basic where clause to the query and return the first result.
   */
  //   async firstWhere(
  //     column: string,
  //     value: string | number,
  //     operator = '=',
  //   ): Promise<Task | undefined> {
  //     return await this.createQueryBuilder()
  //       .where(`Team.${column} ${operator} :value`, { value: value })
  //       .getOne();
  //   }
}
