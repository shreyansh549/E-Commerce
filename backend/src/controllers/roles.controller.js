import { addRole, fetchAccessList } from "../services/roles.service.js";
import { throwError } from "../utils/throwError.js";

export const accessRoles = async (req, res, next) => {
  try {
    const { email } = req.body || {};
    if(!email){
      throwError("Provide email Id",400)
    }
    const fetchedAccessList = await fetchAccessList(email);

    return res.status(200).json({
      message: "Access list fetched succesfully",
      success: true,
      data: fetchedAccessList,
    });
  } catch (error) {
    next(error);
  }
};

export const provideRole = async (req, res, next) => {
  try {
    const { email, role } = req.body || {};
    const addedRoles = await addRole(email, role);

    return res.status(201).json({
      message: "Role added succesfully",
      success: true,
      data: addedRoles,
    });
  } catch (error) {
    next(error);
  }
};
