const express = require("express");
const router = express.Router();
const Student = require("../models/Student.js");

// POST - Create a new student
router.post("/", async (req, res) => {
    try {
        const student = new Student(req.body);

        await student.save();
        res.status(201).json({
            message: "Student created successfully",
            student: student
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error creating student",
            error: error.message
        });
    }
});


// GET - Read all students
router.get("/", async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json({
            message: "Students retrieved successfully",
            students: students
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error retrieving students",
            error: error.message
        });
    }
});
router.put("/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!student) {
            return res.status(404).send("Student not found");
        }

        res.status(200).send("Student updated successfully");
    } catch (err) {
        res.status(500).send("Error updating student");
    }
});

// DELETE - Delete a student
router.delete("/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(
            req.params.id
        );

        if (!student) {
            return res.status(404).send("Student not found");
        }

        res.status(200).send("Student deleted successfully");
    } catch (err) {
        res.status(500).send("Error deleting student");
    }
});
module.exports = router;

