import { NgModule } from '@angular/core';
import { environment } from '../../environments/environment';
import { ApplicationContext } from '../frontend/services/applicationContext';
import { AuthService } from './services/AuthService';
import { FirestoreService } from './services/FirestoreService';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { HttpClientModule } from '@angular/common/http';
import { provideAuth, getAuth } from '@angular/fire/auth';
import {
  connectFirestoreEmulator,
  enableIndexedDbPersistence,
  getFirestore,
  provideFirestore,
} from '@angular/fire/firestore';
import { BoardGameGeekApiCaller } from './services/boardGameGeekApiCaller';
import MapQuestClient from './services/MapQuestService';
import GooglePlacesAPICaller from './services/GooglePlacesAPICaller';

@NgModule({
  imports: [
    provideAuth(() => getAuth()),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => {
      const firestore = getFirestore();
      // connectFirestoreEmulator(firestore, 'localhost', 8080);
      enableIndexedDbPersistence(firestore);
      return firestore;
    }),
    provideStorage(() => getStorage()),
    HttpClientModule,
  ],
  declarations: [],
  providers: [
    AuthService,
    FirestoreService,
    BoardGameGeekApiCaller,
    MapQuestClient,
    GooglePlacesAPICaller,
    ApplicationContext,
  ],
  exports: [],
})
export class BackEndModule {}
