const express = require("express");
const router = express.Router();

const {
	authUser,
	registerUser,
	logoutUser,
	getUserProfile,
	getUsers,
	getUserById,
	updateUserProfile,
	deleteUser,
	updateUser,
} = require("../controllers/userController");
const { protect, admin } = require("../middleware/authMiddleware");

router.route("/").get(protect, admin, getUsers).post(registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router
	.route("/profile")
	.get(protect, getUserProfile)
	.put(protect, updateUserProfile);
router
	.route("/:id")
	.get(protect, admin, getUserById)
	.put(protect, admin, updateUser)
	.delete(protect, admin, deleteUser);

module.exports = router;
