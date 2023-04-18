import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { InvitationStatus } from "../../../backend/models/Event";
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from "@angular/material/core";
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators, } from "@angular/forms";
import { AbstractFormControlFromFormPipe } from "./abstractFormControlFromFormPipe";

@Component({
  templateUrl: './createEventComponent.html',
  selector: 'create-event',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AbstractFormControlFromFormPipe,
            MatInputModule, MatDatepickerModule, MatNativeDateModule,]
})
export class CreateEventComponent{
  public InvitationStatus = InvitationStatus;
  eventForm: FormGroup;

  constructor(private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.eventForm = this._fb.group({
      guid: ['', Validators.required],
      groupID: ['', Validators.required],
      authorID: ['', Validators.required],
      authorName: ['', Validators.required],
      timestamp: ['', Validators.required],
      editTimestamp: [''],
      title: ['', Validators.required],
      description: [''],
      startDate: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: [''],
      location: this._fb.group({
        name: [''],
        description: [''],
        address: ['']
      }),
      gamesPoll: this._fb.group({
        options: this._fb.array([]),
        votes: this._fb.group({})
      }),
      participants: this._fb.array([
        this._fb.group({
          user: this._fb.group({
            firstName: [''],
            lastName: ['']
          }),
          invitedStatus: ['']
        })
      ]),
      eventChat: this._fb.array([])
    });
  }

  addGamePollOption(): void {
    (this.eventForm.get('gamesPoll.options') as FormArray).controls.push(this._fb.control('', Validators.required));
  }

  removeGamePollOption(index: number): void {
    (this.eventForm.get('gamesPoll.options') as FormArray).removeAt(index);
  }

  addParticipant(): void {
    const participants = this.eventForm.get('participants') as FormArray;
    participants.push(this._fb.group({
      user: this._fb.group({
        firstName: this._fb.control('', Validators.required),
        lastName: this._fb.control('', Validators.required),
      }),
      invitedStatus: this._fb.control(InvitationStatus.invited)
    }));
  }

  removeParticipant(index: number): void {
    (this.eventForm.get('participants') as FormArray).removeAt(index);
  }

  addChatMessage(): void {
    (this.eventForm.get('eventChat') as FormArray).push(this._fb.group({
      author: ['', Validators.required],
      message: ['', Validators.required],
      timestamp: ['', Validators.required]
    }));
  }

  removeChatMessage(index: number): void {
    (this.eventForm.get('eventChat') as FormArray).removeAt(index);
  }

  onSubmit() {
    if (this.eventForm.valid) {
      const eventData: Event = this.eventForm.getRawValue();
      // pass eventData to a service or store for saving
    }
  }
}
