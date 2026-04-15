import express from "express";
import {
  createSectionItem,
  deleteSectionItem,
  getSectionItems,
  updateSectionItem,
} from "../controllers/sectionController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/:section").get(getSectionItems).post(protect, createSectionItem);
router.route("/item/:id").put(protect, updateSectionItem).delete(protect, deleteSectionItem);

export default router;