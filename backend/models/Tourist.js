import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const TouristSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    touristId: { type: String },
    nationality: { type: String },
    dateOfBirth: { type: String },
    fatherName: { type: String },
    motherName: { type: String },
    location: {
        lat: { type: Number },
        lng: { type: Number },
        timestamp: { type: Number },
    },
}, { timestamps: true });

// Hash password before saving
TouristSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to compare passwords
TouristSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const Tourist = mongoose.model('Tourist', TouristSchema);

export default Tourist;
