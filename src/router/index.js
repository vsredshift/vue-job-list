import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import JobsView from "@/views/JobsView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import JobView from "@/views/JobView.vue";
import AddJobView from "@/views/AddJobView.vue";
import EditJobView from "@/views/EditJobView.vue";
import RegisterView from "@/views/RegisterView.vue";
import LoginView from "@/views/LoginView.vue";
import { account } from "@/lib/appwrite";
import UnauthorizedView from "@/views/UnauthorizedView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/jobs",
      name: "jobs",
      component: JobsView,
    },
    {
      path: "/jobs/add",
      name: "add-job",
      component: AddJobView,
      meta: { requiredAuth: true, allowedRoles: ["employer", "admin"]}
    },
    {
      path: "/jobs/:id",
      name: "job",
      component: JobView,
    },
    {
      path: "/jobs/edit/:id",
      name: "edit-job",
      component: EditJobView,
    },
    {
      path: "/not-authorised",
      name: "unauthorised",
      component: UnauthorizedView,
    },
    {
      path: "/:catchAll(.*)",
      name: "not-found",
      component: NotFoundView,
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiredAuth) {
    try {
      const session = await account.get()
      const userRole = session.prefs.role

      if (to.meta.allowedRoles.includes(userRole)) {
        next()
      } else {
        next("/not-authorised")
      }
    } catch (error) {
      next("/login")
    }
  } else {
    next()
  }
})

export default router;
