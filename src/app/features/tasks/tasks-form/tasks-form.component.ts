import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ContactsService } from '../../contacts/data-access/contacts.service';
import { ContactListResponseDto } from '../../contacts/interfaces/contacts.interface';
import { OpportunitiesService } from '../../opportunities/data-access/opportunities.service';
import { OpportunityListResponseDto } from '../../opportunities/interfaces/opportunities.interface';
import { TasksService } from '../data-access/tasks.service';
import {
  CreateTaskDto,
  TaskResponseDto,
  TaskStatus,
  UpdateTaskDto,
} from '../interfaces/tasks.interface';

@Component({
  selector: 'app-tasks-form',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './tasks-form.component.html',
  styleUrl: './tasks-form.component.scss',
})
export class TasksFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private contactService = inject(ContactsService);
  private opportunityService = inject(OpportunitiesService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private tasksService = inject(TasksService);

  public contactsList: ContactListResponseDto | null = null;
  public opportunityList: OpportunityListResponseDto | null = null;
  public taskId: string | null = null;
  public tasksData: TaskResponseDto | null = null;
  public statusOptions = Object.values(TaskStatus);

  form = this.fb.group({
    title: ['', [Validators.required]],
    description: [''],
    status: ['', [Validators.required]],
    contactId: [''],
    opportunityId: [''],
  });

  ngOnInit(): void {
    this.getAllContacts();
    this.getAllOpportunity();

    this.taskId = this.route.snapshot.paramMap.get('id');

    if (this.taskId) {
      this.tasksService.findOne(this.taskId).subscribe({
        next: (data) => {
          this.form.patchValue(data);
        },
        error: (err) => console.log(err),
      });
    }
  }

  getAllContacts() {
    this.contactService.findAll(1, 100).subscribe({
      next: (data) => {
        this.contactsList = data;
      },
      error: (err) => console.log(err),
    });
  }

  getAllOpportunity() {
    this.opportunityService.findAll(1, 100).subscribe({
      next: (data) => {
        this.opportunityList = data;
      },
      error: (err) => console.log(err),
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    const data = this.form.value;

    if (this.taskId) {
      this.tasksService.update(this.taskId, data as UpdateTaskDto).subscribe({
        next: () => {
          this.router.navigate(['/tasks']);
        },
        error: (err) => console.log(err),
      });
    } else {
      this.tasksService.create(data as CreateTaskDto).subscribe({
        next: () => {
          this.router.navigate(['/tasks']);
        },
        error: (err) => console.log(err),
      });
    }
  }
}
