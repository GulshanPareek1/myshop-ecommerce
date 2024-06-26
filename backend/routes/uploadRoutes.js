const path = require("path");
const express = require("express");
const multer = require("multer");
const router = express.Router();

const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, "uploads/");
	},
	filename(req, file, cb) {
		cb(
			null,
			`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
		);
	},
});

function fileFilter(req, file, cb) {
	const filetypes = /jpe?g|png|webp/;
	const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

	const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
	const mimetype = mimetypes.test(file.mimetype);

	if (extname && mimetype) {
		cb(null, true);
	} else {
		cb(new Error("Images only!"), false);
	}
}

const upload = multer({
	storage,
});

router.post("/", upload.single("image"), (req, res) => {
	res.send({
		message: "Image Uploaded",
		image: `/${req.file.path}`,
	});
});

module.exports = router;
