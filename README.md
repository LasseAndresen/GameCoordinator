## Getting started

```
git clone https://github.com/LasseAndresen/GameCoordinator.git

npm install
npm install -g @angular/cli
npm install -g firebase-tools
npm install --save firebase @angular/fire -f
npm install firebase @angular/fire --save

ng serve

localhost:4200
```

I recommend VS Code as editor. Recommended extensions:

![Recommended extensions](./src/assets/images/VSCodeExtensions.PNG?raw=true)

Firebase project:
https://console.firebase.google.com/u/0/project/waitr-55a5a/overview

Trello:
https://trello.com/b/IlPgZXe4/boardgame-development

## Frontend documentation

src/app/assets contains hard coded images and icons that are shown anywhere in the app.

src/app/frontEnd contains 7 main folders:

#### /coreLayout

Has the main containers such as the top bar, side bar and page container.

#### /pages

Contains the various pages that can be navigated to from the sidebar.

#### /dialogs

Contains dialogs opened throughout the app.

#### /services

Various front end injectible service classes available app wide.

#### /styles

All globally relevant style files such as global css classes and themes.

#### /UI

Reusable UI components.

#### /utilities

Various utility classes.

## Backend documentation

### Database entities

Database entity classes are contained in src/app/backEnd/models.
Each file should include an entity class implementing the DataBaseEntity interface and a factory class implementing the DataBaseEntityFactory interface.
When querying the database, a factory is provided to the query method in FireStoreService, so that all data conversions are handled automatically and streamlined.

The classes implementing the DataBaseEntity interface can have methods such as toDatabaseObject for every entry it has in the database. For instance, you might want to store the BoardGame entity in multiple locations for ease of querying, but the information you want to store might differ. Having a toDataBaseObject method for each case will make this easy to control.

### Querying data

All query methods should be contained in FirestoreService. Each query should have its own method that calls into the generic private methods. For more advanced queries, a new file should handle those that calls into FirestoreService.

Four main generic query methods exist: queryCollection, queryCollectionWithListener, querySingleDocument and querySingleDocumentWithListener. The queryCollection and querySingleDocument methods get a snapshot of the data and should be used to query data that rarely updates.
The 'WithListener' query methods return an observable object that will update real time when the collection or document updates in the database.

### Updating and inserting data

Work in progress

### Maintaining denormalized data

With NoSQL, denormalized data is encouraged. Instead of relying on the client to update the data everywhere everytime something changes in one place, this is done and maintained with Firestore Functions. These are created and deployed in a seperate repository. This playlist gives a good intro to firebase functions https://www.youtube.com/playlist?list=PL4cUxeGkcC9i_aLkr62adUTJi53y7OjOf (You can ignore the UI vidoes if you want to speed it up).
