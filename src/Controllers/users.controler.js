import { AsyncHandler } from "../Utils/AsyncHandler.js";
import { ApiError } from "../Utils/ApiError.js"
import { User } from "../Models/user.model.js"
import { uploadOnCloudinary } from "../Utils/Cloudinary.js"
import { ApiResponse } from "../Utils/ApiResponse.js"

const registerUser = AsyncHandler(async (req, res) => {
    // get the data from frontend
    const { fullName, email, username, password } = req.body
    console.log("email:", email);
    console.log("password:", password);
    // vallidate the data 
    if (
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }
    // check user exists or not 
    const existedUser = User.findOne({
        $or: [{ username }, { email }]
    })


    if (existedUser[0]) throw new ApiError(400, "user already exists")

    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.coverImage[0]?.path

    if (!avatarLocalPath) throw new ApiError(400, "Avatar file is required")

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) throw new ApiError(400, "Avatar file is required")

    const user = await User.create({
        fullName,
        username: username.toLowerCase(),
        password,
        avatar: avatar.url,
        coverImage: coverImage?.url,
        email
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if (!createdUser) throw new ApiError(500, "something went wrong while registering user")

    return res.status(201).json(
        new ApiResponse(200, createdUser, "user created successfully")
    )


})

export { registerUser }