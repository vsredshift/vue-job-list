import { reactive } from "vue";
import { databases } from "../appwrite";
import { ID, Query } from "appwrite";

export const JOBS_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_JOBS;
export const COMPANIES_COLLECTION_ID = import.meta.env
  .VITE_APPWRITE_COLLECTION_COMPANIES;

export const companies = reactive({
  current: [],
  async init() {
    const response = await databases.listDocuments(
      JOBS_DATABASE_ID,
      COMPANIES_COLLECTION_ID,
      [Query.orderDesc("$createdAt")]
    );
    this.current = response.documents;
  },
  async findOne(id) {
    const response = await databases.getDocument(
      JOBS_DATABASE_ID,
      COMPANIES_COLLECTION_ID,
      id
    );
    return response;
  },
  async add(company) {
    const response = await databases.createDocument(
      JOBS_DATABASE_ID,
      COMPANIES_COLLECTION_ID,
      ID.unique(),
      company
    );
    this.current = [response, ...this.current];
    console.log(company);
  },
  async remove(id) {
    await databases.deleteDocument(
      JOBS_DATABASE_ID,
      COMPANIES_COLLECTION_ID,
      id
    );
    this.current = this.current.filter((company) => company.$id !== id);
    await this.init();
  },
  async update(id, updatedCompany) {
    const response = await databases.updateDocument(
      JOBS_DATABASE_ID,
      COMPANIES_COLLECTION_ID,
      id,
      updatedCompany
    );
    const index = this.current.findIndex((company) => company.$id === id);
    if (index !== -1) {
      this.current[index] = response;
    }
  },
});
