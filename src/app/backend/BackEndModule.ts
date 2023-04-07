import { NgModule } from "@angular/core";
import { environment } from "../../environments/environment";
import { ApplicationContext } from "../frontend/services/applicationContext";
import { AuthService } from "./services/AuthService";
import { FirestoreService } from "./services/FirestoreService";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { getStorage, provideStorage } from "@angular/fire/storage";
import { provideAuth, getAuth } from "@angular/fire/auth";
import { connectFirestoreEmulator, enableIndexedDbPersistence, getFirestore, provideFirestore, } from "@angular/fire/firestore";
import { BoardGameGeekApiCaller } from "./services/boardGameGeekApiCaller";

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
    ],
    declarations: [
    ],
    providers: [
      AuthService,
      FirestoreService,
      BoardGameGeekApiCaller,
      ApplicationContext],
    exports: [
    ]
  })
  export class BackEndModule { }

