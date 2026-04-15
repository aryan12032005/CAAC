import mongoose from "mongoose";

export const MANAGED_SECTIONS = [
  "books",
  "events",
  "projects",
  "publications",
  "collaborations",
  "fdp-workshops",
  "research-grants",
];

const sectionItemSchema = mongoose.Schema(
  {
    section: {
      type: String,
      required: true,
      enum: MANAGED_SECTIONS,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    subtitle: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    link: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    startDate: {
      type: String,
      trim: true,
    },
    endDate: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const SectionItem = mongoose.model("SectionItem", sectionItemSchema);

export default SectionItem;