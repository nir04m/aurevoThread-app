import mongoose from "mongoose";
import bycrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    cartItems: [
        {
            quantity: {
                type: Number,
                default: 1
            },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
        },
    ],
    role: {
        type: String,
        enum: ['customer', 'admin'],
        default: 'customer',
    }
}, { timestamps: true });

//pre-save hook to hash password before saving to the database
userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) return next();
    try {
        const salt = await bycrypt.genSalt(10);
        this.password = await bycrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.comparePassword = async function (password) {
    return await bycrypt.compare(password, this.password);
}

const User = mongoose.model("User", userSchema);

export default User;