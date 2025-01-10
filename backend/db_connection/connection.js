import mongoose from "mongoose";

export const dbconnection = () => {
  const uri =
    "mongodb+srv://mdizharpasha07:MOm8jmmzUzMlPl2J@cluster0.zfq8f.mongodb.net/?retryWrites=true";
  //   console.log(uri);
  mongoose
    .connect(uri, {
      dbName: "TaskFLowManagement",
    })
    .then(() => console.log("DB Connection Successfull!"))
    .catch((err) => console.log("Failed to Connect", err));
};
