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
  async register(email, password, fullname, role) {
    // await account.create(ID.unique(), email, password, fullname, { role });
    // await this.login(email, password);
    console.log(email, password, fullname, role)
  },
  async login(email, password) {
    await account.createEmailPasswordSession(email, password);
    window.location.href = "/"; // Redirect to home page
  },
  async logout() {
    await account.deleteSession("current");
    this.current = null;
  },
});
