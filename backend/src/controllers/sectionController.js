import SectionItem, { MANAGED_SECTIONS } from "../models/SectionItem.js";

const isValidSection = (section) => MANAGED_SECTIONS.includes(section);

export const getSectionItems = async (req, res) => {
  const { section } = req.params;

  if (!isValidSection(section)) {
    return res.status(400).json({ message: "Invalid section" });
  }

  try {
    const items = await SectionItem.find({ section }).sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createSectionItem = async (req, res) => {
  const { section } = req.params;

  if (!isValidSection(section)) {
    return res.status(400).json({ message: "Invalid section" });
  }

  const { title, subtitle, description, link, image, startDate, endDate } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  try {
    const item = await SectionItem.create({
      section,
      title,
      subtitle,
      description,
      link,
      image,
      startDate,
      endDate,
    });

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSectionItem = async (req, res) => {
  const { id } = req.params;

  try {
    const item = await SectionItem.findById(id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    const { title, subtitle, description, link, image, startDate, endDate } = req.body;

    item.title = title ?? item.title;
    item.subtitle = subtitle ?? item.subtitle;
    item.description = description ?? item.description;
    item.link = link ?? item.link;
    item.image = image ?? item.image;
    item.startDate = startDate ?? item.startDate;
    item.endDate = endDate ?? item.endDate;

    const updated = await item.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteSectionItem = async (req, res) => {
  const { id } = req.params;

  try {
    const item = await SectionItem.findById(id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    await item.deleteOne();
    res.json({ message: "Item removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};