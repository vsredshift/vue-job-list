import { ID } from "appwrite";
import { account } from "@/lib/appwrite";
import { reactive } from "vue";

export const user = reactive({
  current: null,
  async init() {
    try {
      this.current = await account.get();
    } catch (e) {
      this.current = null;
    }
  },
  async register(email, password, fullname, role, company = null) {
    try {
      await account.create(ID.unique(), email, password, fullname);
      await this.login(email, password)
      await account.updatePrefs({ role });
      return account.get();
    } catch (error) {
      console.error("Error registring user", error)
      throw error
    }
  },
  async addCompany(company) {
    const existingPrefs = await account.getPrefs();
    await account.updatePrefs({ ...existingPrefs, company }); 
    await account.get();
  },
  async login(email, password) {
    try {
      await account.createEmailPasswordSession(email, password);
      this.current = await account.get();
    } catch (error) {
      console.error("Error logging in", error)
      throw error
    }
  },
  async logout() {
    await account.deleteSession("current");
    this.current = null;
  },
});
