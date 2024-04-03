import { redirect } from "react-router-dom";
import { deleteContact } from "../contacts";

const action = async ({ params }) => {
  // throw new Error("oh dang!");
  await deleteContact(params.contactId);
  return redirect("/");
};

export { action };
