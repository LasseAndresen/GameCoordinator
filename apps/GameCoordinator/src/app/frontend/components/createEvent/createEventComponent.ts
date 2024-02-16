import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
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
  LocationDetails,
  LocationSuggestion,
} from '../../../backend/services/GooglePlacesAPICaller';
import { AddressSearchComponent } from '../addressSearch/addressSearchComponent';
import { MatButtonModule } from '@angular/material/button';
import { Event } from '../../../backend/models/Event';
import { FirestoreService } from '../../../backend/services/FirestoreService';
import { AuthService } from '../../../backend/services/AuthService';
import {ApplicationContext, DialogService} from '@services';
import { GeoPoint } from '@angular/fire/firestore';

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

  @Output()
  public cancelClicked: EventEmitter<void> = new EventEmitter<void>();
  constructor(
    private _fb: FormBuilder,
    private _googlePlaces: GooglePlacesAPICaller,
    private _firestoreService: FirestoreService,
    private _authService: AuthService,
    private _dialogService: DialogService,
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
        position: ['']
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

  public onAddressUpdated(address: LocationDetails): void {
    console.log('Got adress ', address);
    this.eventForm.get('location.address').setValue(address.vicinity);
    this.eventForm.get('location.position').setValue(new GeoPoint(address.position.lat, address.position.long));
  }

  public addGamePollOption(): void {
    (this.eventForm.get('gamesPoll.options') as FormArray).controls.push(
      this._fb.control('', Validators.required)
    );
  }

  public removeGamePollOption(index: number): void {
    (this.eventForm.get('gamesPoll.options') as FormArray).removeAt(index);
  }

  public addParticipant(): void {
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

  public removeParticipant(index: number): void {
    (this.eventForm.get('participants') as FormArray).removeAt(index);
  }

  public addChatMessage(): void {
    (this.eventForm.get('eventChat') as FormArray).push(
      this._fb.group({
        author: ['', Validators.required],
        message: ['', Validators.required],
        timestamp: ['', Validators.required],
      })
    );
  }

  public removeChatMessage(index: number): void {
    (this.eventForm.get('eventChat') as FormArray).removeAt(index);
  }

  public removeEndTime(): void {
    this.showEndtime = false;
    this.eventForm.get('endDate').setValue(null);
    this.eventForm.get('endTime').setValue(null);
  }

  public onSubmit(): void {
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
          position: eventData.location.position
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

  public onCancelClicked(): void {
    this.cancelClicked.emit();
  }
}
