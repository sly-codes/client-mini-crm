import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TasksService } from '../data-access/tasks.service';
import { TaskListResponseDto, TaskStatus } from '../interfaces/tasks.interface';

@Component({
  selector: 'app-tasks-list',
  imports: [RouterLink],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.scss',
})
export class TasksListComponent implements OnInit {
  private tasksService = inject(TasksService);

  public errorMessage: string | null = null;
  public tasksData: TaskListResponseDto | null = null;
  public status?: TaskStatus;
  public statusOptions = Object.values(TaskStatus);

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.tasksService.findAll(1, 10, this.status).subscribe({
      next: (data) => {
        this.tasksData = data;
      },
      error: () => {
        this.errorMessage = 'Récupération des tâches a échoué';
      },
    });
  }

  onDelete(taskId: string) {
    if (!confirm('Supprimer cette tâche ?')) return;

    this.tasksService.remove(taskId).subscribe({
      next: () => {
        this.findAll();
      },
      error: () => {
        this.errorMessage = 'La suppression a échoué';
      },
    });
  }

  onStatusFilter(statusVal: string) {
    this.status = (statusVal as TaskStatus) || undefined;
    this.findAll();
  }
}
