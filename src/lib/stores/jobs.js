import { reactive } from "vue";
import { databases } from "../appwrite";
import { ID, Query } from "appwrite";

export const JOBS_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_JOBS;
export const JOBS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_JOBS;

export const jobs = reactive({
  current: [],
  async init() {
    const response = await databases.listDocuments(
      JOBS_DATABASE_ID,
      JOBS_COLLECTION_ID,
      [Query.orderDesc("$createdAt")]
    );
    this.current = response.documents;
  },
  async findOne(id) {
    const response = await databases.getDocument(
      JOBS_DATABASE_ID,
      JOBS_COLLECTION_ID,
      id
    );
    return response;
  },
  async add(job) {
    const response = await databases.createDocument(
      JOBS_DATABASE_ID,
      JOBS_COLLECTION_ID,
      ID.unique(),
      job
    );
    this.current = [response, ...this.current];
  },
  async remove(id) {
    await databases.deleteDocument(JOBS_DATABASE_ID, JOBS_COLLECTION_ID, id);
    this.current = this.current.filter((job) => job.$id !== id);
    await this.init();
  },
  async update(id, updatedJob) {
    const response = await databases.updateDocument(
      JOBS_DATABASE_ID,
      JOBS_COLLECTION_ID,
      id,
      updatedJob
    );
    const index = this.current.findIndex((job) => job.$id === id);
    if (index !== -1) {
      this.current[index] = response;
    }
  },
  async getUserJobs(query) {
    return await databases.listDocuments(
      JOBS_DATABASE_ID,
      JOBS_COLLECTION_ID,
      query
    );
  },
});
