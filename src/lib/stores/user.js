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
    console.log(email, password, fullname, role);
    await account.create(ID.unique(), email, password, fullname);
    await this.login(email, password);
    await account.updatePrefs({ role });
    if (role !== "developer") {
      await account.updatePrefs({ company });
    }

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
