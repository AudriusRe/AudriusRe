import joi from "joi";
import joiDate from "@joi/date";

const extendedJoi = joi.extend(joiDate);

const registrationSchema = joi.object({
  name: extendedJoi.string().min(5).max(40).required(),
  dob: extendedJoi.date().max("now").format(`YYYY-MM-DD`).required(),
  email: extendedJoi
    .string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "lt", "ua"] },
    })
    .required(),
});

export async function validateRegistrationBody(req, res, next) {
  const { error } = registrationSchema.validate(req.body);

  if (error) {
    res.status(400).json({ message: error.message });
    return;
  }

  next();
}
