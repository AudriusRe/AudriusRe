import Registration from "../models/Registration.js";

export async function getRegistrations(req, res) {
  try {
    const registrations = await Registration.find({}, { __v: 0 });
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

export async function createNewRegistration(req, res) {
  const { name, email, dob } = req.body;
  try {
    const existingRegistration = await Registration.find({
      email: email,
    });
    if (existingRegistration.length > 0) {
      res.status(409).json({ message: "Email adress is already in use!" });
      return;
    }
    const newRegistration = new Registration({
      name,
      email,
      dob,
    });

    await newRegistration.save();

    res.json(newRegistration);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

export async function updateRegistration(req, res) {
  const { id } = req.params;
  const { name, email, dob } = req.body;

  try {
    const registration = await Registration.findById(id);
    if (!registration) {
      res.status(404).json({ message: "Registration does not exist" });
      return;
    }

    registration.name = name;
    registration.email = email;
    registration.dob = dob;

    await registration.save();

    res.json(registration);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

export async function deleteRegistration(req, res) {
  const { id } = req.params;

  try {
    const deletedRegistration = await Registration.findByIdAndDelete(id);

    if (!deletedRegistration) {
      res.status(404).json({ message: "Registration does not exist" });
      return;
    }

    res.json(deletedRegistration);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}
