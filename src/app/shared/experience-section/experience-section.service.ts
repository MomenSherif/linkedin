import { Injectable, OnInit } from "@angular/core";
import "firebase/firestore";
import { AngularFirestore } from "@angular/fire/firestore";
import { AuthService } from "src/app/_services/auth.service";
import { ActivatedRoute } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class ExperienceSectionService {
  // userId = "4Fm78GOiEUHnNO8Hr7Yh";
  userId = ""; // just an initial value
  currentOpenUser: boolean = true;

  experienceId: string;
  educationId: string;
  volunteerExpId: string;

  experiences;
  educations;
  volunteerExps;

  constructor(
    private firestore: AngularFirestore,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {

  }

  // Experience CRUD operations
  addExperience(experience, userId) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection("users")
        .doc(userId)
        .collection("experiences")
        .add(experience)
        .then(
          res => {},
          err => reject(err)
        );
    });
  }

  getExperiences(userId) {
    return this.firestore
      .collection("users")
      .doc(userId)
      .collection("experiences")
      .snapshotChanges();
  }

  getExperienceById(id, userId) {
    return this.firestore
      .collection("users")
      .doc(userId)
      .collection("experiences")
      .doc(id)
      .snapshotChanges();
  }

  updateExperience(newData, userId) {
    return this.firestore
      .collection("users")
      .doc(userId)
      .collection("experiences")
      .doc(this.experienceId)
      .set(newData);
  }

  deleteExperience(userId) {
    return this.firestore
      .collection("users")
      .doc(userId)
      .collection("experiences")
      .doc(this.experienceId)
      .delete();
  }

  setExperienceId(experienceId) {
    this.experienceId = experienceId;
  }

  // Education CRUD operations
  addEducation(education, userId) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection("users")
        .doc(userId)
        .collection("educations")
        .add(education)
        .then(
          res => {},
          err => reject(err)
        );
    });
  }

  getEducations(userId) {
    return this.firestore
      .collection("users")
      .doc(userId)
      .collection("educations")
      .snapshotChanges();
  }

  getEducationById(id, userId) {
    return this.firestore
      .collection("users")
      .doc(userId)
      .collection("educations")
      .doc(id)
      .snapshotChanges();
  }

  updateEducation(newData, userId) {
    return this.firestore
      .collection("users")
      .doc(userId)
      .collection("educations")
      .doc(this.educationId)
      .set(newData);
  }

  deleteEducation(userId) {
    return this.firestore
      .collection("users")
      .doc(userId)
      .collection("educations")
      .doc(this.educationId)
      .delete();
  }

  setEducationId(educationId) {
    this.educationId = educationId;
  }

  // Volunteer experience CRUD operations
  addVolunteerExp(volunteerExp, userId) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection("users")
        .doc(userId)
        .collection("volunteerExps")
        .add(volunteerExp)
        .then(
          res => {},
          err => reject(err)
        );
    });
  }

  getVolunteerExps(userId) {
    return this.firestore
      .collection("users")
      .doc(userId)
      .collection("volunteerExps")
      .snapshotChanges();
  }

  getVolunteerExpById(id, userId) {
    return this.firestore
      .collection("users")
      .doc(userId)
      .collection("volunteerExps")
      .doc(id)
      .snapshotChanges();
  }

  updateVolunteerExp(newData, userId) {
    return this.firestore
      .collection("users")
      .doc(userId)
      .collection("volunteerExps")
      .doc(this.volunteerExpId)
      .set(newData);
  }

  deleteVolunteerExp(userId) {
    return this.firestore
      .collection("users")
      .doc(userId)
      .collection("volunteerExps")
      .doc(this.volunteerExpId)
      .delete();
  }

  setVolunteerExpId(volunteerExpId) {
    this.volunteerExpId = volunteerExpId;
  }
}
