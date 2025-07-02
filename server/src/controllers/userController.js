import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../prismaClient.js";

export const userRegister = async (req, res) => {
  const { email, password, firstname, lastname } = req.body;
  const hashPassword = await bcrypt.hash(password, 8);

  try {
    // check if email exists
    const emailExists = await prisma.userdata.findUnique({
      where: { email },
    });

    if (emailExists) {
      return res
        .status(400)
        .json({ error: "email already exists try another one" });
    }

    const result = await prisma.userdata.create({
      data: {
        email,
        password: hashPassword,
        firstname,
        lastname,
      },
    });

    // Ensure result is not empty
    if (!result) {
      return res.status(500).json({ error: "Failed to register user" });
    }

    const token = jwt.sign({ id: result.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.json({ message: "registration successful", token });
  } catch (err) {
    console.log("Register Error:", err.message);
    res.status(503).json({ error: err.message });
  }
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.userdata.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).send({ message: "user not found" });
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return res.status(401).send({ message: "Invalid Password" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "12h",
    });

    return res.json({ token });
  } catch (err) {
    console.log(err.message);
    res.status(503).json({ error: err.message });
  }
};

export const userDashboard = async (req, res) => {
  try {
    const user = await prisma.userdata.findUnique({
      where: { id: req.userId },
    });

    if (!user) {
      return res.status(500).json({ error: "user not existed" });
    }
    return res.status(201).json({ user });
  } catch (err) {
    // console.error("Error in /dashboard:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const userBookmarking = async (req, res) => {
  console.log(req.userId);
  console.log(req.body);
  try {
    const bookmark = await prisma.bookmark.create({
      data: {
        userdata_id: req.userId,
        scholarship_id: req.body.bookmark_id,
      },
    });

    console.log(bookmark);
    res.json({ message: "successful", data: bookmark });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
};

export const userBookmarks = async (req, res) => {
  try {
    const bookmarks = await prisma.bookmark.findMany({
      where: {
        userdata_id: req.userId,
      },
      select: {
        scholarship: {
          include: {
            university: {
              include: {
                country: true,
              },
            },
          },
        },
      },
    });

    const formattedBookmarks = bookmarks.map((bookmark) => ({
      country_name: bookmark.scholarship.university.country.name,
      university_name: bookmark.scholarship.university.name,
      scholarship_name: bookmark.scholarship.name,
      degree: bookmark.scholarship.degree,
      eligible: bookmark.scholarship.eligible,
      amount: bookmark.scholarship.amount,
      deadline: bookmark.scholarship.deadline,
      link: bookmark.scholarship.link,
      criteria: bookmark.scholarship.criteria,
      id: bookmark.scholarship.id,
    }));

    res.json(formattedBookmarks);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
};

export const userRemoveBookmark = async (req, res) => {
  try {
    await prisma.bookmark.deleteMany({
      where: {
        userdata_id: req.userId,
        scholarship_id: req.body.bookmark_id,
      },
    });

    res.json({ message: "successfully deleted" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await prisma.userdata.findUnique({
      where: { id: req.userId },
    });

    if (!user) {
      return res.status(500).json({ error: "user not exist" });
    }

    // removing password before sending response
    const { password, ...userWithoutPassword } = user;
    return res.status(201).json({ user: userWithoutPassword });
  } catch (err) {
    return res.status(500).json({ message: "server error" });
  }
};

export const postProfile = async (req, res) => {
  console.log(req.body);
  const {
    age,
    gender,
    category,
    income,
    disability_status,
    current_education_level,
    course_name,
    institution_name,
    cgpa,
    education_stream,
    year_of_study,
    passed_last_exam,
    certificates,
    entrance_exam_scores,
    research_experience,
    portfolio,
    state,
    district,
    residency_status,
  } = req.body;

  try {
    const profile = await prisma.user_profile.create({
      data: {
        user_id: req.userId,
        age: parseInt(age),
        gender,
        category,
        income: parseInt(income),
        disability_status,
        current_education_level,
        course_name,
        institution_name,
        cgpa: parseFloat(cgpa),
        education_stream,
        year_of_study: parseInt(year_of_study),
        passed_last_exam,
        certificates: JSON.stringify(certificates),
        entrance_exam_scores: JSON.stringify(entrance_exam_scores),
        research_experience,
        portfolio,
        state,
        district,
        residency_status,
      },
    });

    return res.status(201).json({
      message: "Profile saved successfully",
      profileId: profile.id,
      profile,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "server error" });
  }
};

export const userProfile = async (req, res) => {
  try {
    const profile = await prisma.user_profile.findFirst({
      where: { user_id: req.userId },
    });

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    return res.status(200).json({ profile });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "server error" });
  }
};
