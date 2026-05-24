import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { Role } from '../enum/role';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class TaskService {

  constructor(@InjectRepository(Task) private repoTask:Repository<Task>){}

  async create(createTaskDto: CreateTaskDto, userId: number, memberIds: number[]) {
    const task = new Task();
    Object.assign(task, createTaskDto);
    task.user = { id: userId } as User;
    task.members = memberIds.map(id => ({ id } as User));
    return this.repoTask.save(task);
}

  //Obtener todas las teras en la base de datos
  async findAll() : Promise<Task[]>{
    return this.repoTask.find({relations:['users'], select:{ user: {id:true, username:true}}});
  }

  //Obtener todas las teras del usuario logeado o de un usuario especifico
  async findAllUser(user_id: number): Promise<Task[]> {
    // Busca tareas donde el usuario es creador O es miembro
    return this.repoTask
        .createQueryBuilder('task')
        .leftJoinAndSelect('task.user', 'user')
        .leftJoinAndSelect('task.members', 'members')
        .where('user.id = :id', { id: user_id })
        .orWhere('members.id = :id', { id: user_id })
        .getMany();
  }

  //Obtener una tarea por id
  async findOne(id: number) : Promise<Task | null> {
    const task = await this.repoTask.findOne({
      where:{task_id:id},
      relations:['user', 'members'],
      select:{
        user: {id: true, username: true},
        members: { id: true, username: true}
      }
    })
    if(!task) throw new NotFoundException('Tarea no encontrada')
    return task;
  }

  //Modificar los datos de la tarea
  async update(taskId: number, userId:number, role:Role, updateTaskDto: UpdateTaskDto) : Promise<Task | null>{
    //Si el rol del usuario es 'user', se verifica que sea su tarea, si no es, se bloquea el proceso
    await this.verify(taskId, userId, role)
    
    //Si es el dueño o es developer/admin, continua
    await this.repoTask.update(taskId, {...updateTaskDto, updated:true})
    return this.findOne(taskId)
  }

  //Marcar una tarea como completa
  async completeTask(taskId:number, userId:number, role:Role) : Promise<void>{
    //Si el rol del usuario es 'user', se verifica que sea su tarea, si no es, se bloquea el proceso
    await this.verify(taskId, userId, role)

    await this.repoTask.update(taskId, {completed:true})
  }

  async remove(taskId:number, userId:number, role:Role) : Promise<void>{
    //Si el rol del usuario es 'user', se verifica que sea su tarea, si no es, se bloquea el proceso
    await this.verify(taskId, userId, role)

    await this.repoTask.delete(taskId)
  }

  //Esta funcion solamente verifica que el usuario sea dueño de la tarea a modificar/eliminar
  async verify(taskId:number, userId:number, role:Role) : Promise<void>{
    const task = await this.findOne(taskId)
    if(role === 'USER'){ 
      const esDueno= task!.user?.id === userId
      if(!esDueno) throw new ForbiddenException('Solo el dueño o miembros pueden modificar esta tarea')
    }
  }

  async findPublic(): Promise<Task[]> {
      return this.repoTask.find({
          where: { public: true },
          relations: ['user', 'members'],
          select: { user: { id: true, username: true }, members: { id: true, username: true } }
      });
  }

  async joinByCode(code: string, userId: number): Promise<Task> {
      const task = await this.repoTask.findOne({
          where: { code, public: true },
          relations: ['user','members']
      });
      if (!task) throw new NotFoundException('Tarea no encontrada o código inválido');
      
      if (task.user.id === userId)
        throw new ForbiddenException('Ya eres el creador de esta tarea');

      const yaEsMiembro = task.members?.some(m => m.id === userId);
      if (!yaEsMiembro) {
          task.members = [...(task.members ?? []), { id: userId } as any];
          await this.repoTask.save(task);
      }
      return task;
  }
}
