import List from "../model/list-schema.js";

// getting all the saved lists from the database
export const getSavedLists = async (req, res) => {
  try {
    const lists = await List.find({ userId: req.user._id });
    if (!lists)
      return res
        .status(400)
        .json({ success: false, message: "No lists found" });
    return res.status(200).json({ success: true, lists });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// saving a list to the database
export const saveList = async (req, res) => {
  try {
    const { codeName, codeImage } = req.body;

    // checking if the codeName and codeImage are provided or not

    if (!codeName || !codeImage)
      return res.status(400).json({
        success: false,
        message: "CodeName and CodeImage are required",
      });

    // checking if the codeName already exists or not

    const existingList = await List.findOne({ codeName });
    if (existingList)
      return res
        .status(400)
        .json({ success: false, message: "CodeName already exists" });

    // save the list

    const list = new List({
      userId: req.user._id,
      codeName,
      codeImage,
    });

    await list.save();

    return res.status(201).json({ success: true, message: "List saved" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// remving a saved list from the database
export const removeList = async (req, res) => {
  try {
    // a valid id is required to delete the list
    const id = req.params.id;

    // first find the list based on the id and the username to see if the list exists or not or the user is authorized to delete the list

    const list = await List.findOne({ _id: id, userId: req.user._id });

    // if the list does not exist or the user is not authorized to delete the list then return an error message

    if (!list)
      return res
        .status(400)
        .json({ success: false, message: "List not found" });

    // if the list exists then delete the list

    // await list.remove();
    await List.deleteOne({ _id: id, userId: req.user._id });

    return res.status(200).json({ success: true, message: "List deleted" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// updating the list is similar to saving the list
export const updateList = async (req, res) => {
  try {
    // a valid id is required to update the list
    const id = req.params.id;

    // first find the list based on the id and the username to see if the list exists or not or the user is authorized to update the list

    const list = await List.findOne({ _id: id, userId: req.user._id });

    // if the list does not exist or the user is not authorized to update the list then return an error message

    if (!list)
      return res
        .status(400)
        .json({ success: false, message: "List not found" });

    // if the list exists then update the list

    const { codeName } = req.body;
    console.log("printing codeName", codeName);
    

    // checking if the codeName and codeImage are provided or not

    if (!codeName)
      return res.status(400).json({
        success: false,
        message: "CodeName  are required",
      });

    // checking if the codeName already exists or not

    const existingList = await List.findOne({ codeName });
    if (existingList)
      return res
        .status(400)
        .json({ success: false, message: "CodeName already exists" });

    list.codeName = codeName;

    await list.save();

    return res.status(200).json({ success: true, message: "List updated" });
  } catch (error) {
    console.log(error);
    
    return res.status(500).json({ success: false, message: error.message });
  }
};
