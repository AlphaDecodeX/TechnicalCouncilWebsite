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
  const { name } = req.body;
  clubData.findOne({ name: name }, (err, data) => {
    if (data) {
      res.status(200).send("club already exists");
    } else {
      console.log("club not found, creating club initiated");

      clubData.create(req.body, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).send("data is stored succesfully");
        }
      });
    }
  });
});

// delete the club data by passing ID

app.post("/club/deleteClub", (req, res) => {
  const { name } = req.body;

  clubData.deleteOne({ name: name }, (err, data) => {
    if (err) {
      res.status(200).send("error in deleting the document");
    } else {
      if (data.deletedCount == 0) {
        res.send({ message: "no similar document found to delete" });
      } else {
        res.status(200).send({ message: "document is deleted successfully" });
      }
    }
  });
});

//updating the club data
app.post("/club/updateClub", (req, res) => {
  const { club_ID, section_name } = req.body;

  if (section_name == "name") {
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

  if (section_name == "img") {
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
});
// handling the club event
app.post("/club/updateEvents", (req, res) => {
  const { club_name, data, operation } = req.body;
  if (operation == "upload") {
    console.log("uploading in event initiated");
    clubData.findOne({ name: club_name }, (err, value) => {
      if (value) {
        console.log("club is found");
        const tempValue = value.events.find((event) => event.ID === data.ID);

        if (!tempValue) {
          clubData.findOneAndUpdate(
            { name: club_name },
            {
              $push: {
                events: data,
              },
            },
            (err, value) => {}
          );
          res.send("uploading is succesfully");
        } else {
          res.send("uploade data already exists");
        }
      }
    });
  } else {
    console.log("deleting");
    clubData.findOne({ name: club_name }, (err, value) => {
      if (value) {
        const tempValue = value.events.find((event) => event.ID === data.ID);
        console.log("tempValue is ", tempValue);
        if (tempValue) {
          clubData.findOneAndUpdate(
            { name: club_name },
            {
              $pull: {
                events: tempValue,
              },
            },
            (err, value) => {}
          );
          res.send("deleted sucessfully");
        } else {
          res.send("value does not exist to delete");
        }
      }
    });
  }
});

// uploading data to resources
app.post("/club/updateResources", (req, res) => {
  const { club_name, data, operation } = req.body;
  if (operation == "upload") {
    console.log("uploading in Resource initiated");
    clubData.findOne({ name: club_name }, (err, value) => {
      if (value) {
        console.log("club is found");
        const tempValue = value.resources.find(
          (resource) => resource.ID === data.ID
        );

        if (!tempValue) {
          clubData.findOneAndUpdate(
            { name: club_name },
            {
              $push: {
                resources: data,
              },
            },
            (err, value) => {}
          );
          res.send("uploading is succesfully");
        } else {
          res.send("uploade data already exists");
        }
      }
    });
  } else {
    console.log("deleting");
    clubData.findOne({ name: club_name }, (err, value) => {
      if (value) {
        const tempValue = value.resources.find(
          (resource) => resource.ID === data.ID
        );
        console.log("tempValue is ", tempValue);
        if (tempValue) {
          clubData.findOneAndUpdate(
            { name: club_name },
            {
              $pull: {
                resources: tempValue,
              },
            },
            (err, value) => {}
          );
          res.send("deleted sucessfully");
        } else {
          res.send("value does not exist to delete");
        }
      }
    });
  }
});

//uploading data to members

app.post("/club/updateMembers", (req, res) => {
  const { club_name, data, operation } = req.body;
  if (operation == "upload") {
    console.log("uploading in Members initiated");
    clubData.findOne({ name: club_name }, (err, value) => {
      if (value) {
        console.log("club is found");
        const tempValue = value.members.find((member) => member.ID === data.ID);

        if (!tempValue) {
          clubData.findOneAndUpdate(
            { name: club_name },
            {
              $push: {
                members: data,
              },
            },
            (err, value) => {}
          );
          res.send("uploading is succesfully");
        } else {
          res.send("uploade data already exists");
        }
      }
    });
  } else {
    console.log("deleting");
    clubData.findOne({ name: club_name }, (err, value) => {
      if (value) {
        const tempValue = value.members.find((member) => member.ID === data.ID);
        console.log("tempValue is ", tempValue);
        if (tempValue) {
          clubData.findOneAndUpdate(
            { name: club_name },
            {
              $pull: {
                members: tempValue,
              },
            },
            (err, value) => {}
          );
          res.send("deleted sucessfully");
        } else {
          res.send("value does not exist to delete");
        }
      }
    });
  }
});

//uploading data to project

app.post("/club/updateProjects", (req, res) => {
  const { club_name, data, operation } = req.body;
  if (operation == "upload") {
    console.log("uploading in Members initiated");
    clubData.findOne({ name: club_name }, (err, value) => {
      if (value) {
        console.log("club is found");
        const tempValue = value.projects.find(
          (project) => project.ID === data.ID
        );

        if (!tempValue) {
          clubData.findOneAndUpdate(
            { name: club_name },
            {
              $push: {
                projects: data,
              },
            },
            (err, value) => {}
          );
          res.send("uploading is succesfully");
        } else {
          res.send("uploade data already exists");
        }
      }
    });
  } else {
    console.log("deleting");
    clubData.findOne({ name: club_name }, (err, value) => {
      if (value) {
        const tempValue = value.projects.find(
          (project) => project.ID === data.ID
        );
        console.log("tempValue is ", tempValue);
        if (tempValue) {
          clubData.findOneAndUpdate(
            { name: club_name },
            {
              $pull: {
                projects: tempValue,
              },
            },
            (err, value) => {}
          );
          res.send("deleted sucessfully");
        } else {
          res.send("value does not exist to delete");
        }
      }
    });
  }
});
//

app.post("/club/updateProjectMember", (req, res) => {
  const { club_name, project_ID, member_ID, valueTobeUpdated, updatedValue } =
    req.body;
  clubData.findOneAndUpdate(
    {
      name: club_name,
      projects: { $elemMatch: { ID: project_ID } },
    },
    {
      $set: { "projects.$.ID": valueToUpdate },
    },
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`listening at port ${PORT}`);
});
