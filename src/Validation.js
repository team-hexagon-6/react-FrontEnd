import Joi from "joi";

const registration = (data) => {
  const reg_schema = Joi.object({
    user_id: user_id_validation_joi_object(),

    user_type: Joi.string().max(10).required()
            .messages({
                "string.empty": "Field should not be empty!",
                "string.max": `Field should have at most {#limit} characters!`,
                "string.required": "Field is required!"
            }),

    password: password_joi_object(),

    re_password: Joi.ref("password"),
  });

  const { error, value } = reg_schema.validate(data, { abortEarly: false });

  return { value, error };
};

const validateupdateprofile = (data) => {
  const UserCompleteRegistrationValidationSchema = Joi.object({
    "First Name": name_validation_joi_object(),
    "Last Name": name_validation_joi_object(),
    NIC: Joi.nic_validation_joi_object(),
    "Contact Number": contact_number_validation_joi_object(),
    Email: email_validation_joi_object(),
    Birthday: birthday_validation_joi_object()
  });
  const { error, value } = UserCompleteRegistrationValidationSchema.validate(
    data,
    { abortEarly: false }
  );
  return { value, error };
};
const addPatient = (data) => {
  const addPatientSchema = Joi.object({
    "Patient ID": patient_id_validation_joi_object(),
    "First Name": name_validation_joi_object(),
    "Last Name": name_validation_joi_object(),
    NIC: nic_validation_joi_object(),
    "Contact Number": contact_number_validation_joi_object(),
    Email: email_validation_joi_object(),
    Birthday: birthday_validation_joi_object(),
    GenderName: gender_validation_joi_object(),
    GenderValue: gender_validation_joi_object(),
  });
  const { error, value } = addPatientSchema.validate(data, {
    abortEarly: false,
  });
  return { value, error };
};

const updatePatientProfile = (data) => {
  const addPatientSchema = Joi.object({
    "First Name": name_validation_joi_object(),
    "Last Name": name_validation_joi_object(),
    NIC: nic_validation_joi_object(),
    "Contact Number": contact_number_validation_joi_object(),
    Email: email_validation_joi_object(),
    Birthday: birthday_validation_joi_object(),
    GenderName: gender_validation_joi_object(),
    GenderValue: gender_validation_joi_object(),
    patient_id: patient_id_validation_joi_object(),
  });
  const { error, value } = addPatientSchema.validate(data, {
    abortEarly: false,
  });
  return { value, error };
};

const new_test = (data) => {
  const reg_schema = Joi.object({
    patient_id: patient_id_validation_joi_object(),
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
    username: user_id_validation_joi_object(),
    password: password_joi_object(),
  });

  const { error, value } = reg_schema.validate(data, { abortEarly: false });

  return { value, error };
};

const adminUpdatePwd = (data) => {
  const admin_update_pwd_schema = Joi.object({
    password: password_joi_object(),

    re_password: Joi.custom((value, helper) => {
      if (value != data.password) {
        return helper.message("Two passwords does not match");
      } 
      return true;
    }),
  });

  const { error, value } = admin_update_pwd_schema.validate(data, {
    abortEarly: true,
  });

  return { value, error };
};

const name_validation_joi_object = () => {
      return Joi.string().required().pattern(new RegExp('^[A-Z][a-z0-9_-]{2,}$'))
            .messages({
                "string.empty": "Field should not be empty!",
                "string.required": "Field is required!",
                "string.pattern.base": "First letter must be a Capital"
            });
}
const nic_validation_joi_object = () => {
      return Joi.string().alphanum().required().pattern(new RegExp('^([0-9]{9}[X|V]|[0-9]{12})$'))
            .messages({
                "string.empty": "Field should not be empty!",
                "string.required": "Field is required!",
                "string.pattern.base": "Invalid format",
                "string.alphanum": "Field should only consist of letters and numbers"
            });
}
const contact_number_validation_joi_object = () => {
      return Joi.string().required().pattern(new RegExp('^(?:7|0|(?:\\+94))[0-9]{9,10}$'))
            .messages({
                "string.empty": "Field should not be empty!",
                "string.required": "Field is required!",
                "string.pattern.base": "Invalid format"
            });
}
const email_validation_joi_object = () => {
      return Joi.string().email({minDomainSegments: 2,tlds: { allow: ["com", "net"]}}).required()
            .messages({
                "string.empty": "Field should not be empty!",
                "string.required": "Field is required!",
                "string.email": "Enter a valid email address!"
            });
}
const birthday_validation_joi_object = () => {
      return Joi.date().format('MM-DD-YYYY').required().max('now').min('01-01-1900')
            .messages({
                "date.format": "Date format should be MM-DD-YYYY",
                "date.required": "Field is required!",
                "date.max": "Date cannot be greater that current date",
                "date.min": "Date should be greater than 01-01-1990"
            });
}

const user_id_validation_joi_object=() => {
  return Joi.string().length(10).required().pattern(new RegExp('^[0-9]{9}[A-Z]$'))
          .messages({
              "string.empty": "ID should not be empty!",
              "string.length": `ID should be exactly {#limit} characters!`,
              "string.required": "ID is required!",
              "string.pattern.base": "ID form invalid... Ex:- 123456789D"
          })
}

const patient_id_validation_joi_object=() => {
  return Joi.string().min(5).max(25).required()
      .messages({
          "string.empty": "Field should not be empty!",
          "string.min": `Field should have at least {#limit} characters!`,
          "string.max": `Field should have at most {#limit} characters!`,
          "string.required": "Field is required!"
      })
}

// const test_id_validation_joi_object=() => {
//   return Joi.string().min(5).max(192).required()
//       .messages({
//           "string.empty": "Field should not be empty!",
//           "string.min": `Field should have at least {#limit} characters!`,
//           "string.max": `Field should have at most {#limit} characters!`,
//           "string.required": "Field is required!"
//       })
// }

const gender_validation_joi_object = () => {
  return Joi.string().required()
      .messages({
          "string.empty": "Field should not be empty!",
          "string.required": "Field is required!"
      });
}
const password_joi_object = () => {

  return Joi.string()
      .required()
      .min(8)
      .max(25)
      .custom(custom_password)
      .messages({
          "string.empty": "Field should not be empty!",
          "string.required": "Field is required!",
          "string.min": `Field should have at least {#limit} characters!`,
          "string.max": `Field should have at most {#limit} characters!`,
      });
}

const custom_password = (value, helper) => {
  if (value.search(/[A-Z]/) < 0) {
      return helper.message("Password must contain at least one uppercase letter")
  } else if (value.search(/[a-z]/) < 0) {
      return helper.message("Password must contain at least one lowercase letter")
  } else if (value.search(/[0-9]/i) < 0) {
      return helper.message("Password must contain at least one number")
  } else if (value.search(/[#?!@$%^&*-]/i) < 0) {
      return helper.message("Password must contain at least one special character")
  } else {
      return true
  }
}

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
