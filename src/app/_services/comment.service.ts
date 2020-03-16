import { Comment } from "./../_models/comment";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import {
  AngularFirestore,
  AngularFirestoreCollectionGroup,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import "firebase/firestore";

@Injectable({
  providedIn: "root"
})
export class CommentService {
  private dbPath = "comments";
  private usersPath = "users";
  private postPath = "posts";
  private CommentCollection: AngularFirestoreCollectionGroup<Comment>;
  private UsersCollection: AngularFirestoreCollection<any>;

  constructor(private afs: AngularFirestore) {
    this.UsersCollection = this.afs.collection(this.usersPath);
  }

  getAllComments() {
    this.CommentCollection = this.afs.collectionGroup<Comment>(this.dbPath);
    return this.CommentCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Comment;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  addComment(userId: string, postId: string, comment) {
    this.UsersCollection.doc(userId)
      .collection(this.postPath)
      .doc(postId)
      .collection(this.dbPath)
      .add(comment);
  }

  updateComment(authorId: string, postId: string, commentId: string, changes) {
    return this.afs
      .collection(this.usersPath)
      .doc(authorId)
      .collection(this.postPath)
      .doc(postId)
      .collection(this.dbPath)
      .doc(commentId)
      .update(changes);
  }

  deletePost(authorId: string, postId: string, commentId: string) {
    this.afs
      .collection(this.usersPath)
      .doc(authorId)
      .collection(this.postPath)
      .doc(postId)
      .collection(this.dbPath)
      .doc(commentId)
      .delete();
  }
}
