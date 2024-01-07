import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { InvitationStatus } from '../../../backend/models/Event';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AbstractFormControlFromFormPipe } from './abstractFormControlFromFormPipe';
import MapQuestClient from '../../../backend/services/MapQuestService';
import GooglePlacesAPICaller, {
  LocationSuggestion,
} from '../../../backend/services/GooglePlacesAPICaller';
import { AddressSearchComponent } from '../addressSearch/addressSearchComponent';
import { MatButtonModule } from '@angular/material/button';
import { Event } from '../../../backend/models/Event';
import { FirestoreService } from '../../../backend/services/FirestoreService';
import { AuthService } from '../../../backend/services/AuthService';

@Component({
  templateUrl: './createEventComponent.html',
  selector: 'create-event',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AbstractFormControlFromFormPipe,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AddressSearchComponent,
    MatButtonModule,
  ],
})
export class CreateEventComponent {
  public InvitationStatus = InvitationStatus;
  public eventForm: FormGroup;
  public showEndtime = false;

  constructor(
    private _fb: FormBuilder,
    private _googlePlaces: GooglePlacesAPICaller,
    private _firestoreService: FirestoreService,
    private _authService: AuthService
  ) {}

  async ngOnInit(): Promise<void> {
    const user = this._authService.user.value;
    this.eventForm = this._fb.group({
      guid: [''],
      groupID: [''], // Required?
      authorID: [user.uid, Validators.required],
      authorName: [user.displayName, Validators.required],
      title: ['', Validators.required],
      description: [''],
      startDate: ['', Validators.required],
      startTime: ['', Validators.required],
      endDate: [''],
      endTime: [''],
      location: this._fb.group({
        description: [''],
        address: [''],
      }),
      gamesPoll: this._fb.group({
        options: this._fb.array([]),
        votes: this._fb.group({}),
      }),
      participants: this._fb.array([
        this._fb.group({
          user: this._fb.group({
            firstName: [''],
            lastName: [''],
          }),
          invitedStatus: [''],
        }),
      ]),
      eventChat: this._fb.array([]),
    });
  }

  onAddressUpdated(address: string) {
    this.eventForm.get('location.address').setValue(address);
  }

  addGamePollOption(): void {
    (this.eventForm.get('gamesPoll.options') as FormArray).controls.push(
      this._fb.control('', Validators.required)
    );
  }

  removeGamePollOption(index: number): void {
    (this.eventForm.get('gamesPoll.options') as FormArray).removeAt(index);
  }

  addParticipant(): void {
    const participants = this.eventForm.get('participants') as FormArray;
    participants.push(
      this._fb.group({
        user: this._fb.group({
          firstName: this._fb.control('', Validators.required),
          lastName: this._fb.control('', Validators.required),
        }),
        invitedStatus: this._fb.control(InvitationStatus.invited),
      })
    );
  }

  removeParticipant(index: number): void {
    (this.eventForm.get('participants') as FormArray).removeAt(index);
  }

  addChatMessage(): void {
    (this.eventForm.get('eventChat') as FormArray).push(
      this._fb.group({
        author: ['', Validators.required],
        message: ['', Validators.required],
        timestamp: ['', Validators.required],
      })
    );
  }

  removeChatMessage(index: number): void {
    (this.eventForm.get('eventChat') as FormArray).removeAt(index);
  }

  removeEndTime() {
    this.showEndtime = false;
    this.eventForm.get('endDate').setValue(null);
    this.eventForm.get('endTime').setValue(null);
  }

  onSubmit() {
    console.log('Form ', this.eventForm);
    if (this.eventForm.valid) {
      const eventData = this.eventForm.getRawValue();
      const newEvent: Event = {
        guid: eventData.guid,
        groupID: eventData.groupID,
        authorID: eventData.authorID,
        authorName: eventData.authorName,
        timestamp: eventData.timestamp,
        title: eventData.title,
        description: eventData.description,
        startTime: eventData.startTime,
        endTime: eventData.endTime,
        location: {
          description: eventData.location.description,
          address: eventData.location.address,
        },
        participants: [
          {
            user: {
              guid: this._authService.user.value.uid,
              name: this._authService.user.value.displayName,
            },
            invitedStatus: InvitationStatus.accepted,
          },
        ],
      };
      this._firestoreService.addEvent(newEvent);
    }
  }
}
