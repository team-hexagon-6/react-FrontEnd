import Joi from "joi";


const registration = (data) => {
  const reg_schema = Joi.object({
    user_id: Joi.string().alphanum().min(3).max(30).required(),

    user_type: Joi.string().required(),

    password: Joi.string().pattern(
      new RegExp(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
      )
    ),

    re_password: Joi.ref("password"),
  });

  const { error, value } = reg_schema.validate(data, { abortEarly: false });

  return { value, error };
};

const validateupdateprofile = (data) => {
  const UserCompleteRegistrationValidationSchema = Joi.object({
    "First Name": Joi.string()
      .regex(/^[A-Z][a-z0-9_-]{2,}$/)
      .messages({ "string.pattern.base": "First letter must be a Capital" })
      .min(3)
      .max(15)
      .required(),
    "Last Name": Joi.string()
      .regex(/^[A-Z][a-z0-9_-]{2,}$/)
      .messages({ "string.pattern.base": "First letter must be a Capital" })
      .min(3)
      .max(20)
      .required(),
    NIC: Joi.string()
      .alphanum()
      .regex(/^([0-9]{9}[X|V]|[0-9]{12})$/)
      .messages({
        "string.pattern.base":
          "NIC number must end with V and must have at least 10 characters",
      })
      .min(10)
      .max(20)
      .required(),
    "Contact Number": Joi.string()
      .regex(/^(?:0|(?:\+94))[0-9]{9}$/)
      .messages({
        "string.pattern.base":
          "Contact number must start with 0 or +94 and must have 10 digits",
      })
      .length(10)
      .required(),
    Email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    Birthday: Joi.date()
      .max("01-01-2005")
      .messages({
        "date.max": `Age must be 18+;"Birthday" must be before or equal to "01-01-2005`,
      })
      .required(),
  });
  const { error, value } = UserCompleteRegistrationValidationSchema.validate(
    data,
    { abortEarly: false }
  );
  return { value, error };
};
const addPatient = (data) => {
  const addPatientSchema = Joi.object({
    "First Name": Joi.string()
      .regex(/^[A-Z][a-z0-9_-]{2,}$/)
      .messages({ "string.pattern.base": "First letter must be a Capital" })
      .min(3)
      .max(15)
      .required(),
    "Last Name": Joi.string()
      .regex(/^[A-Z][a-z0-9_-]{2,}$/)
      .messages({ "string.pattern.base": "First letter must be a Capital" })
      .min(3)
      .max(20)
      .required(),
    NIC: Joi.string()
      .alphanum()
      .regex(/^([0-9]{9}[X|V]|[0-9]{12})$/)
      .messages({
        "string.pattern.base":
          "NIC number must end with V and must have at least 10 characters",
      })
      .min(10)
      .max(20)
      .required(),
    "Contact Number": Joi.string()
      .regex(/^(?:0|(?:\+94))[0-9]{9}$/)
      .messages({
        "string.pattern.base":
          "Contact number must start with 0 or +94 and must have 10 digits",
      })
      .length(10)
      .required(),
    Email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    Birthday: Joi.date()
      .max("01-01-2005")
      .messages({
        "date.max": `Age must be 18+;"Birthday" must be before or equal to "01-01-2005`,
      })
      .required(),
    GenderName: Joi.string().required(),
    GenderValue: Joi.string().required()
  });
  const { error, value } = addPatientSchema.validate(data, {
    abortEarly: false,
  });
  return { value, error };
};

const updatePatientProfile=(data)=>{
  const addPatientSchema = Joi.object({
    "First Name": Joi.string()
      .regex(/^[A-Z][a-z0-9_-]{2,}$/)
      .messages({ "string.pattern.base": "First letter must be a Capital" })
      .min(3)
      .max(15)
      .required(),
    "Last Name": Joi.string()
      .regex(/^[A-Z][a-z0-9_-]{2,}$/)
      .messages({ "string.pattern.base": "First letter must be a Capital" })
      .min(3)
      .max(20)
      .required(),
    NIC: Joi.string()
      .alphanum()
      .regex(/^([0-9]{9}[X|V]|[0-9]{12})$/)
      .messages({
        "string.pattern.base":
          "NIC number must end with V and must have at least 10 characters",
      })
      .min(10)
      .max(20)
      .required(),
    "Contact Number": Joi.string()
      .regex(/^(?:0|(?:\+94))[0-9]{9}$/)
      .messages({
        "string.pattern.base":
          "Contact number must start with 0 or +94 and must have 10 digits",
      })
      .length(10)
      .required(),
    Email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    Birthday: Joi.date()
      .max("01-01-2005")
      .messages({
        "date.max": `Age must be 18+;"Birthday" must be before or equal to "01-01-2005`,
      })
      .required(),
    GenderName: Joi.string().required(),
    GenderValue: Joi.string().required(),
  });
  const { error, value } = addPatientSchema.validate(data, {
    abortEarly: false,
  });
  return { value, error };
}

const new_test = (data) => {
  const reg_schema = Joi.object({
    patient_id: Joi.string().alphanum().min(3).max(30).required(),

    test_type: Joi.string().required(),
    date: Joi.string().required(),
  });

  const { error, value } = reg_schema.validate(data, { abortEarly: false });

  return { value, error };
};

// Image validation (Not joi)
const imageValidation = (fileInput) => {
  var filePath = fileInput.value;

  // Allowing file type
  var allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;

  if (!allowedExtensions.exec(filePath)) {
    alert("Invalid file type. Only JPG, JPEG & PNG types are supported.");
    fileInput.value = "";
    return false;
  }

  return true;
};
const login = (data) => {
  const reg_schema = Joi.object({
    username: Joi.string().min(3).max(30).required(),

    password: Joi.string().pattern(
      new RegExp(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
      )
    ),
  });

  const { error, value } = reg_schema.validate(data, { abortEarly: false });

  return { value, error };
};

const adminUpdatePwd = (data) => {
  const admin_update_pwd_schema = Joi.object({
    password: Joi.string().pattern(
      new RegExp(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
      )
    ),

    re_password: Joi.ref("password"),
  });

  const { error, value } = admin_update_pwd_schema.validate(data, {
    abortEarly: false,
  });

  return { value, error };
};

export default {
  registration,
  validateupdateprofile,
  new_test,
  imageValidation,
  login,
  adminUpdatePwd,
  addPatient,
  updatePatientProfile,
};
