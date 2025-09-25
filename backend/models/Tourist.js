import mongoose from 'mongoose';

const EmergencyContactSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
});

const TouristSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  touristId: { type: String },
  nationality: { type: String },
  dateOfBirth: { type: String },
  fatherName: { type: String },
  motherName: { type: String },
  isTrackingEnabled: { type: Boolean, default: false },
  location: {
    lat: { type: Number },
    lng: { type: Number },
    timestamp: { type: Number },
  },
  emergencyContacts: [EmergencyContactSchema],
}, {
  timestamps: true,
});

// Method to hide password from frontend responses
TouristSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
}

const Tourist = mongoose.model('Tourist', TouristSchema);

export default Tourist;