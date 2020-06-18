const { GcsFileUpload } = require("gcs-file-upload");
const requireLogin = require("../middlewares/requireLogin");
const path = require("path");
const keys = require("../config/keys");
const fs = require("fs");

//upload logic
const uploadImage = (file) => {
  const myBucket = new GcsFileUpload(
    {
      keyFilename:
        process.env.NODE_ENV === "production"
          ? process.env.GCS_KEY
          : path.join(__dirname, "../emailcamp-271520-a4d8e6860dcc.json"),
      projectId: "emailcamp-271520",
    },
    "images_emailcamp"
  );

  const fileMetaData = {
    originalname: `${Math.round(Math.random() * 10000)}.${file.originalname}`,
    buffer: file.buffer,
  };

  myBucket.uploadFile(fileMetaData).then((data) => {});
  return `https://storage.googleapis.com/images_emailcamp/${fileMetaData.originalname}`;
};

//upload post route
module.exports = (app) => {
  app.post("/api/uploadImg", requireLogin, async (req, res) => {
    console.log(req.file);

    const myFile = req.file;
    const imageUrl = await uploadImage(myFile); //url burada

    if (imageUrl) {
      req.user.pictureUrl = imageUrl;
      const user = await req.user.save();

      res.status(200).send(user);
    } else {
      res.status(500).json({ err: "Resim yüklenirken bir hata oluştu" });
    }
  });
};
