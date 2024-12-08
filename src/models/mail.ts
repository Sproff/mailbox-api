import { Schema, model } from "mongoose";

const mailsSchema = new Schema(
  {
    subject: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      required: true,
    },
  },
  {
    collection: "mails",
    timestamps: true,
  },
);

const Mail = model("Mail", mailsSchema);

export default Mail;
