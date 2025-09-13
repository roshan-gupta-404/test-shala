import { Client, Databases, ID, Query } from "appwrite";
import conf from "../conf";

class Crud {
    client = new Client();
    databases;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client)
    }

    async getSubjects(examCategoryID) {
        try {
            return await this.databases.listDocuments(conf.appwriteDbId, conf.appwriteSUBCollectionId, [Query.equal('examCategoryID', examCategoryID)])
        } catch (error) {
            console.log("Appwrite service :: getSubjects :: error");
            throw error
        }
        // response = document: array of all the subjects, total: number of documents.
    }
    async getExamCategories() {
        try {
            return await this.databases.listDocuments(conf.appwriteDbId, conf.appwriteECCollectionId, [Query.equal('Active', true)])
        } catch (error) {
            console.log("Appwrite service :: ExamCategory :: error");
            throw error
        }
        // response = document: array of all the exam categories, total: number of documents.
    }

    async getTestPapers(subjectID) {
        try {
            return await this.databases.listDocuments(conf.appwriteDbId, conf.appwriteTPCollectionId, [Query.equal('SubjectID', subjectID)])
        } catch (error) {
            console.log("Appwrite service :: getSubjects :: error");
            throw error
        }
        // response = document: array of all the testpapers, total: number of documents.
    }

    async getAnswerSheet(testPaperID) {
        try {
            return await this.databases.listDocuments(conf.appwriteDbId, conf.appwriteAKSCollectionId, [Query.equal('TestPaperID', testPaperID)])
        } catch (error) {
            console.log("Appwrite service :: getAnswerSheet :: error");
            throw error
        }
        // response = document: array of all the answer sheet, total: number of documents.
    }

}

const crud = new Crud();
export default crud;