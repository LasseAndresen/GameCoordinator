import { NgModule } from "@angular/core";
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule, AngularFireDatabase } from "@angular/fire/database";
import { AngularFireAuthModule, AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { environment } from "../../environments/environment";
import { ApplicationContext } from "../frontend/services/applicationContext";
import { AuthService } from "./services/AuthService";
import { FirestoreService } from "./services/FirestoreService";

@NgModule({
    imports: [
      AngularFireDatabaseModule,
      AngularFireAuthModule,
      AngularFirestoreModule,
      AngularFireModule.initializeApp(environment.firebase),
    ],
    declarations: [
    ],
    providers: [
      AuthService,
      FirestoreService,
      AngularFireAuth,
      AngularFireDatabase,
      ApplicationContext],
    exports: [
    ]
  })
  export class BackEndModule { }
