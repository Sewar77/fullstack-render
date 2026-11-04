import { findUserByEmail } from "../model/auth.Model.js";
import {
    deletUserById,
    getAllUsers,
    getUserById,
    updateUser,
    updateUserStatus,
} from "../model/user.Model.js";

export const getAllUsersController = async (req, res) => {
    try {
        const users = await getAllUsers();
        if (users.length === 1) {
            // one user might be the admin.
            return res.status(200).json({ message: "no users yet" });
        }
        return res.status(200).json({ message: "gets uers", users });
    } catch (error) {
        console.log("error", error);
        return res.status(500).json({ message: "internal server error" });
    }
};
export const getUserByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await getUserById(id);
        if (!user) {
            return res.status(404).json({ message: "not found" });
        }
        return res.status(200).json({ message: "gets uer", user });
    } catch (error) {
        console.log("error", error);
        return res.status(500).json({ message: "internal server error" });
    }
};

export const deletUserByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await deletUserById(id);
        if (!user) {
            return res
                .status(400)
                .json({ message: "something went wrong whilte deleteing the user. " });
        }
        return res.status(200).json({ message: "deleted user" });
    } catch (error) {
        console.log("error", error);
        return res.status(500).json({ message: "internal server error" });
    }
};

export const updateUserController = async (req, res) => {
    try {
        const { fname, lname, email, avatar } = req.body;
        const { id } = req.user;
        // Only check email if user sent one
        if (email) {
            const userWithEmail = await findUserByEmail(email);
            if (userWithEmail && userWithEmail.id !== id) {
                return res.status(400).json({
                    message: "Email already exists!",
                });
            }
        }
        const updatedUser = await updateUser({
            id,
            fname,
            lname,
            email,
            avatar,
        });
        if (!updatedUser) {
            return res.status(400).json({
                message: "Something went wrong while updating the user",
            });
        }

        return res.status(200).json({
            message: "User updated successfully",
            user: updatedUser,
        });

    } catch (error) {
        console.log("error", error);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

export const updateUserStatusController = async (req, res) => {
    try {
        const { newStatus } = req.body
        const { id } = req.params

        const updatedUser = await updateUserStatus(id, newStatus)
        if (!updatedUser) {
            return res
                .status(400)
                .json({ message: "something went wrong whilte updated the user status. " });
        }
        return res.status(200).json({ message: "updated user", user: updatedUser });
    } catch (error) {

        console.log("error", error);
        return res.status(500).json({ message: "internal server error" });

    }
}