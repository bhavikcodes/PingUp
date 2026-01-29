import {User} from "../models/user.model.js";
import {Meeting} from "../models/meeting.model.js";
import bcrypt, { hash } from "bcrypt";
import httpStatus from "http-status";
import crypto from "crypto";

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ message: "Username and password are required" });
  }
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "User not found" });
    }
    if (await bcrypt.compare(password, user.password)) {
      let token = crypto.randomBytes(20).toString("hex");
      user.token = token;
      await user.save();
      return res.status(httpStatus.OK).json({ token });
    } else {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: "Wrong password" });
    }
  } catch (error) {
    return res.json({ message: `Server error: ${error.message}` });
  }
};

const register = async (req, res) => {
  const { name, username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(httpStatus.FOUND)
        .json({ message: "Username already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, username, password: hashedPassword });
    await newUser.save();
    return res
      .status(httpStatus.CREATED)
      .json({ message: "User registered successfully" });
  } catch (error) {
    return res.json({ message: `Server error: ${error.message}` });
  }
};
const getUserHistory = async (req, res) => {
    const { token } = req.query;

    if (!token) {
        return res
            .status(httpStatus.BAD_REQUEST)
            .json({ message: "Token is required" });
    }

    try {
        const user = await User.findOne({ token: token });
        if (!user) {
            return res
                .status(httpStatus.UNAUTHORIZED)
                .json({ message: "Invalid token or user not found" });
        }

        const meetings = await Meeting.find({ user_id: user.username }).sort({ date: -1 });
        return res.status(httpStatus.OK).json(meetings);
    } catch (e) {
        console.error("Error fetching user history:", e);
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .json({ message: `Something went wrong: ${e.message}` });
    }
}

const addToHistory = async (req, res) => {
    const { token, meeting_code } = req.body;

    if (!token || !meeting_code) {
        return res
            .status(httpStatus.BAD_REQUEST)
            .json({ message: "Token and meeting code are required" });
    }

    try {
        const user = await User.findOne({ token: token });
        if (!user) {
            return res
                .status(httpStatus.UNAUTHORIZED)
                .json({ message: "Invalid token or user not found" });
        }

        const newMeeting = new Meeting({
            user_id: user.username,
            meetingCode: meeting_code
        });

        await newMeeting.save();

        return res
            .status(httpStatus.CREATED)
            .json({ message: "Added code to history", meetingCode: meeting_code });
    } catch (e) {
        console.error("Error adding to history:", e);
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .json({ message: `Something went wrong: ${e.message}` });
    }
}

export { login, register, getUserHistory, addToHistory };