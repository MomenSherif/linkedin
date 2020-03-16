import { Comment } from "./../_models/comment";
import { Post } from "./../_models/post";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import {
  AngularFirestore,
  AngularFirestoreCollectionGroup,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import "firebase/firestore";

@Injectable({
  providedIn: "root"
})
export class PostService {
  private dbPath = "posts";
  private usersPath = "users";
  private PostCollection: AngularFirestoreCollectionGroup<Post>;
  private UsersCollection: AngularFirestoreCollection<any>;

  items: Observable<Post[]>;

  constructor(private afs: AngularFirestore) {
    this.UsersCollection = this.afs.collection<any>(this.usersPath);
  }

  //select all DONE
  getAllPosts() {
    this.PostCollection = this.afs.collectionGroup<Post>(this.dbPath);
    return this.PostCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Post;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getPostComments(authorId: string, postId: string) {
    return this.afs
      .collection(this.usersPath)
      .doc(authorId)
      .collection(this.dbPath)
      .doc(postId)
      .collection("comments")
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data() as Comment;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }
  //select by id  NOT FINISHED YET
  getPostById() {
    let postid = "UxlWzxzjFSh1S2P4flKG";
    let x;
    this.getAllPosts().subscribe(val => {
      x = val.filter(val => val.id === postid);
      console.log("**", x);
    });
  }

  //add DONE
  addPost(userId: string, post: Post) {
    this.UsersCollection.doc(userId)
      .collection(this.dbPath)
      .add(post);
  }

  //update DONE
  updatePost(authorId: string, postId: string, changes) {
    return this.afs
      .collection(this.usersPath)
      .doc(authorId)
      .collection(this.dbPath)
      .doc(postId)
      .update(changes);
  }

  //delete
  deletePost(authorId: string, postId: string) {
    this.afs
      .collection(this.usersPath)
      .doc(authorId)
      .collection(this.dbPath)
      .doc(postId)
      .delete();
  }
}
