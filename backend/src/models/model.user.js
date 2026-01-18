import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Provide a name"],
      trim: true,
      maxlength: [50, "Name cannot be more than 50 characters"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please provide an email"],
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "password please"],
      minlength: [6, "not more than 6 characters"],
      select: false,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    avatar: {
      type: String,
      default: "https://api.dicebear.com/7.x/avataaars/svg?seed=default",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function(){
  if (!this.isModified("password")) {
    return;
}
  const salt = await bcrypt.genSalt(10);
  this.password =await bcrypt.hash(this.password, salt);
});


userSchema.methods.comparePassword=async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword,this.password);
}

const User=mongoose.model('User',userSchema)

export default User;


