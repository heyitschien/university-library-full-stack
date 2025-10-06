export type AuthFieldConfig = {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  helper?: string;
  component?: "upload";
};

export const signInFields: AuthFieldConfig[] = [
  {
    name: "email",
    label: "Email",
    placeholder: "you@example.com",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "At least 8 characters",
    type: "password",
  },
];

export const signUpFields: AuthFieldConfig[] = [
  {
    name: "fullName",
    label: "Full name",
    placeholder: "Adrian Hajdin",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "you@example.com",
    type: "email",
  },
  {
    name: "universityId",
    label: "University ID Number",
    placeholder: "eg: 394365762",
    type: "text",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "At least 8 characters",
    type: "password",
  },
  {
    name: "universityCard",
    label: "Upload University ID Card (file upload)",
    placeholder: "Upload a file",
    component: "upload",
    helper: "Accepted formats: JPG, PNG. Max 20MB.",
  },
];
