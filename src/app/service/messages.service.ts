import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { AngularFirestore } from '@angular/fire/compat/firestore';
// import { serverTimestamp } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class MessagesService {
    private apiUrl = 'http://localhost:5000/messages';
  constructor(
    private http: HttpClient,
    ) {

     }

  gets(): Observable<any[]> {
    return this.http.get(this.apiUrl)
    .pipe(
      map((action) =>{
        console.log("actions gets", action);
        const data = action as any;
        const _id = action;
        return [ ...data ];
      }));
  }

  getMessageById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  post(data: any[]): Observable<any> {
    return this.http.post(this.apiUrl, data) 
  }

   // PUT (update) a message by ID
   updateMessageById(id: string, updatedMessage: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, updatedMessage);
  }

  delete(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

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
