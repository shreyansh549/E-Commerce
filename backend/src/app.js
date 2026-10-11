import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { authMiddleWare } from "./middlewares/auth.middleware.js";
import productRoutes from "./routes/product.routes.js";
import adminProductRoutes from "./routes/product.admin.routes.js"
import categoryRoutes from "./routes/category.routes.js";
import adminCateogoryRoutes from "./routes/category.admin.routes.js";
import rolesRoutes from "./routes/roles.routes.js";
import inventoryRoutes from "./routes/inventory.routes.js"
import adminInventoryRoutes from "./routes/inventory.admin.routes.js"
import cartRoutes from "./routes/cart.routes.js"

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use(authMiddleWare);

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running",
  });
});

//products
app.use("/api/v1/products", productRoutes);
app.use("/api/admin/v1/products", adminProductRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/admin/categories", adminCateogoryRoutes);
app.use("/api/v1/roles", rolesRoutes);
app.use("/api/v1/inventory", inventoryRoutes);
app.use("/api/v1/admin/inventory", adminInventoryRoutes);
app.use("/api/v1/cart",cartRoutes)

//at last error middle ware
app.use(errorMiddleware);

export default app;
