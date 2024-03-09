import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";
import Tag from "../database/models/tag.model";

// CREATE
export async function createTag(tagData: AddTagParams) {
  try {
    await connectToDatabase();

    const newTag = await Tag.create(tagData);

    return JSON.parse(JSON.stringify(newTag));
  } catch (error) {
    handleError(error);
  }
}

// READ
export async function getTagById(tagId: string) {
  try {
    await connectToDatabase();

    const tag = await Tag.findById(tagId);

    if (!tag) throw new Error("Tag not found");

    return JSON.parse(JSON.stringify(tag));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE
export async function updateTag(tagId: string, tagData: UpdateTagParams) {
  try {
    await connectToDatabase();

    const updatedTag = await Tag.findByIdAndUpdate(tagId, tagData, {
      new: true,
    });

    if (!updatedTag) throw new Error("Tag update failed");

    return JSON.parse(JSON.stringify(updatedTag));
  } catch (error) {
    handleError(error);
  }
}

// DELETE
export async function deleteTag(tagId: string) {
  try {
    await connectToDatabase();

    const deletedTag = await Tag.findByIdAndDelete(tagId);

    return deletedTag ? JSON.parse(JSON.stringify(deletedTag)) : null;
  } catch (error) {
    handleError(error);
  }
}
