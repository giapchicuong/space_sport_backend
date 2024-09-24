import express from "express";
import authController from "../controller/auth_controller";
import userController from "../controller/user_controller";
import groupsController from "../controller/groups_controller";
import categoriesController from "../controller/categories_controller";
import suppliersController from "../controller/suppliers_controller";
import productsController from "../controller/products_controller";
import rolesController from "../controller/roles_controller";
import ordersController from "../controller/orders_controller";
import JwtAction from "../middleware/jwt_action";

const router = express.Router();

const initApiRoutes = (app) => {

    router.all("*", JwtAction.checkUserJwt);

    // Auth
    router.post("/register", authController.registerController);
    router.post("/login", authController.loginController);
    router.post("/logout", authController.logoutController);

    // Users
    router.get("/users/read", userController.readFunc);
    router.post("/users/create", userController.createFunc);
    router.put("/users/update", userController.updateFunc);
    router.get("/account", userController.getUserAccount);

    // Groups
    router.get("/groups/read", groupsController.readFunc);
    router.post("/groups/create", groupsController.createFunc);
    router.delete("/groups/delete", groupsController.deleteFunc);
    router.put("/groups/update", groupsController.updateFunc);

    // Categories
    router.get("/categories/read", categoriesController.readFunc);
    router.post("/categories/create", categoriesController.createFunc);
    router.delete("/categories/delete", categoriesController.deleteFunc);
    router.put("/categories/update", categoriesController.updateFunc);

    // Suppliers
    router.get("/suppliers/read", suppliersController.readFunc);
    router.post("/suppliers/create", suppliersController.createFunc);
    router.delete("/suppliers/delete", suppliersController.deleteFunc);
    router.put("/suppliers/update", suppliersController.updateFunc);


    // Products
    router.get("/products/read", productsController.readFunc);
    router.post("/products/create", productsController.createFunc);
    router.delete("/products/delete", productsController.deleteFunc);
    router.put("/products/update", productsController.updateFunc);

    // Roles
    router.get("/roles/read", rolesController.readFunc);
    router.post("/roles/create", rolesController.createFunc);
    router.delete("/roles/delete", rolesController.deleteFunc);
    router.put("/roles/update", rolesController.updateFunc);

    // Orders
    router.get("/orders/read", ordersController.readFunc);
    router.post("/orders/create", ordersController.createFunc);
    router.delete("/orders/delete", ordersController.deleteFunc);
    router.put("/orders/update", ordersController.updateFunc);

    return app.use("/api/v1/", router);
};

export default initApiRoutes;