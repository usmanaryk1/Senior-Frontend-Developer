import { Injectable } from '@angular/core';
// import { AngularFirestore } from '@angular/fire/compat/firestore';
// import { serverTimestamp } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  constructor(

    ) { }
//   post(data: any[]) {
//     return this.db.collection("messages").add({
//       ...data,
//       updatedAt: serverTimestamp(),
//       createdAt: serverTimestamp(),
//     }) 
//   }

//   gets(): Observable<any[]> {
//     return this.db.collection<any>("messages").snapshotChanges().pipe(
//       map((actions) => actions.map((action) => {
//         const data = action.payload.doc.data() as any;
//         const _id = action.payload.doc.id;
//         return { _id, ...data };
//       })));
//   }

//   //ngrx
//   getMessage$(): Observable<any[]> {
//     console.log('ngrx service');
    
//     return this.db.collection<any>("messages").snapshotChanges().pipe(
//       map((actions) => actions.map((action) => {
//         const data = action.payload.doc.data() as any;
//         const _id = action.payload.doc.id;
//         return { _id, ...data };
//       })));
//   }


}
