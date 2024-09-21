import joi from "joi";

const userRegistrationSchema = joi.object({
  username: joi.string().min(5).max(40).alphanum().required(),
  password: joi.string().min(5).max(40).required(),
});

export async function validateUserRegistration(req, res, next) {
  const { error } = userRegistrationSchema.validate(req.body);

  if (error) {
    res.status(400).json({ message: error.message });
    return;
  }

  next();
}
