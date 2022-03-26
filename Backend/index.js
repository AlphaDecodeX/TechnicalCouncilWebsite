import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import bodyParser from "body-parser";
import User from "./model/Userdb.js";
import clubData from "./model/ClubDatadb.js";
const app = express();
const PORT = process.env.PORT || 5000;
const url = process.env.mongodb_URL;

//middleware
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json());
app.use(cors({ credentials: true, origin: true })); // Use this after the variable declaration

//connecting to the database and checking the connection

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database is connected");
  })
  .catch((e) => {
    console.log(e);
  });

//defining the endpoints
app.post("/club/postClubData", (req, res) => {
  const { ID } = req.body;
  clubData.findOne({ ID: ID }, (err, data) => {
    if (data) {
      console.log("data found");
    } else {
      clubData.create(req.body, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          console.log("data is stored succesfully", data);
        }
      });
    }
  });
});

// delete the club data by passing ID

app.post("/club/deleteClub", (req, res) => {
  const { ID } = req.body;
  console.log(ID);
  clubData.deleteOne({ ID: ID }, (err, data) => {
    if (err) {
      console.log("error in deleting the document");
    } else {
      console.log("document is deleted successfully");
    }
  });
});

//updating the club data
app.post("/club/updateClub", (req, res) => {
  const { club_ID, section_ID } = req.body;

  if (section_ID == "name") {
    const { updated_name } = req.body;
    clubData.findOneAndUpdate(
      { ID: club_ID },
      { name: updated_name },
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          console.log("name is updated");
        }
      }
    );
  }

  if (section_ID == "img") {
    const { updated_imgURL } = req.body;
    clubData.findOneAndUpdate(
      { ID: ID },
      { img: updated_imgURL },
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Image is updated", data);
        }
      }
    );
  }
  if (section_ID == "projects") {
    const { project_ID } = req.body;
  } else {
  }
});

app.post("/club/uploadDataToEvent", (req, res) => {
  const { club_ID, uploadeData } = req.body;
  console.log(club_ID, uploadeData);
  clubData.findOne({ ID: club_ID }, (err, value) => {
    if (value) {
      console.log("dfsdf", value.events);
      const tempValue = value.events.find(
        (event) => event.ID === uploadeData.ID
      );

      if (!tempValue) {
        clubData.findOneAndUpdate(
          { ID: club_ID },
          {
            $push: {
              events: uploadeData,
            },
          },
          (err, value) => {
            if (value) console.log(value);
          }
        );
        console.log("uploaded is succesfully");
      } else {
        console.log("uploade data already exists");
      }
    }
  });
});

// uploading data to resources
app.post("/club/uploadDataToResources", (req, res) => {
  const { club_ID, uploadeData } = req.body;
  clubData.findOne({ ID: club_ID }, (err, value) => {
    if (value) {
      const tempValue = value.resources.find(
        (resource) => resource.ID === uploadeData.ID
      );

      if (!tempValue) {
        clubData.findOneAndUpdate(
          { ID: club_ID },
          {
            $push: {
              resources: uploadeData,
            },
          },
          (err, value) => {
            if (value) console.log(value);
          }
        );
        console.log("uploaded is succesfully");
      } else {
        console.log("uploade data already exists");
      }
    }
  });
});

//uploading data to members

app.post("/club/uploadDataToMembers", (req, res) => {
  const { club_ID, uploadeData } = req.body;
  clubData.findOne({ ID: club_ID }, (err, value) => {
    if (value) {
      const tempValue = value.members.find(
        (member) => member.ID === uploadeData.ID
      );

      if (!tempValue) {
        clubData.findOneAndUpdate(
          { ID: club_ID },
          {
            $push: {
              members: uploadeData,
            },
          },
          (err, value) => {
            if (value) console.log(value);
          }
        );
        console.log("uploaded is succesfully");
      } else {
        console.log("uploade data already exists");
      }
    }
  });
});

//uploading data to project

app.post("/club/uploadDataToProject", (req, res) => {
  const { club_ID, uploadeData } = req.body;
  clubData.findOne({ ID: club_ID }, (err, value) => {
    if (value) {
      const tempValue = value.events.find(
        (project) => project.ID === uploadeData.ID
      );

      if (!tempValue) {
        clubData.findOneAndUpdate(
          { ID: club_ID },
          {
            $push: {
              projects: uploadeData,
            },
          },
          (err, value) => {
            if (value) console.log(value);
          }
        );
        console.log("uploaded is succesfully");
      } else {
        console.log("uploade data already exists");
      }
    }
  });
});
//
app.listen(PORT, () => {
  console.log(`listening at port ${PORT}`);
});
