import { Injectable } from "@angular/core";
import "firebase/firestore";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root"
})
export class ExperienceSectionService {
  constructor(private firestore: AngularFirestore) {}

  userId = "4Fm78GOiEUHnNO8Hr7Yh";
  experienceId: string;
  educationId: string;
  volunteerExpId: string;

  experiences;
  educations;
  volunteerExps;

  // Experience CRUD operations
  addExperience(experience) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection("users")
        .doc(this.userId)
        .collection("experiences")
        .add(experience)
        .then(
          res => {},
          err => reject(err)
        );
    });
  }

  getExperiences() {
    return this.firestore
      .collection("users")
      .doc(this.userId)
      .collection("experiences")
      .snapshotChanges();
  }

  getExperienceById(id) {
    return this.firestore
      .collection("users")
      .doc(this.userId)
      .collection("experiences")
      .doc(id)
      .snapshotChanges();
  }

  updateExperience(newData) {
    return this.firestore
      .collection("users")
      .doc(this.userId)
      .collection("experiences")
      .doc(this.experienceId)
      .set(newData);
  }

  deleteExperience() {
    return this.firestore
      .collection("users")
      .doc(this.userId)
      .collection("experiences")
      .doc(this.experienceId)
      .delete();
  }

  setExperienceId(experienceId) {
    this.experienceId = experienceId;
  }

  // Education CRUD operations
  addEducation(education) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection("users")
        .doc(this.userId)
        .collection("educations")
        .add(education)
        .then(
          res => {},
          err => reject(err)
        );
    });
  }

  getEducations() {
    return this.firestore
      .collection("users")
      .doc(this.userId)
      .collection("educations")
      .snapshotChanges();
  }

  getEducationById(id) {
    return this.firestore
      .collection("users")
      .doc(this.userId)
      .collection("educations")
      .doc(id)
      .snapshotChanges();
  }

  updateEducation(newData) {
    return this.firestore
      .collection("users")
      .doc(this.userId)
      .collection("educations")
      .doc(this.educationId)
      .set(newData);
  }

  deleteEducation() {
    return this.firestore
      .collection("users")
      .doc(this.userId)
      .collection("educations")
      .doc(this.educationId)
      .delete();
  }

  setEducationId(educationId) {
    this.educationId = educationId;
  }

  // Volunteer experience CRUD operations
  addVolunteerExp(volunteerExp) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection("users")
        .doc(this.userId)
        .collection("volunteerExps")
        .add(volunteerExp)
        .then(
          res => {},
          err => reject(err)
        );
    });
  }

  getVolunteerExps() {
    return this.firestore
      .collection("users")
      .doc(this.userId)
      .collection("volunteerExps")
      .snapshotChanges();
  }

  getVolunteerExpById(id) {
    return this.firestore
      .collection("users")
      .doc(this.userId)
      .collection("volunteerExps")
      .doc(id)
      .snapshotChanges();
  }

  updateVolunteerExp(newData) {
    return this.firestore
      .collection("users")
      .doc(this.userId)
      .collection("volunteerExps")
      .doc(this.volunteerExpId)
      .set(newData);
  }

  deleteVolunteerExp() {
    return this.firestore
      .collection("users")
      .doc(this.userId)
      .collection("volunteerExps")
      .doc(this.volunteerExpId)
      .delete();
  }

  setVolunteerExpId(volunteerExpId) {
    this.volunteerExpId = volunteerExpId;
  }


}
