import catchAsync from "../../util/catchAsync";
import groupServices from "./groups.service";

const createGroup = catchAsync(async (req, res) => {
    const userId = req.user.id
    const payload = req.body
    const result = await groupServices.createGroup(userId, payload)

    res.status(200).json({
        message: "grouyp created successfully",
        data: result
    })
})

const groupController = {
    createGroup
}

export default groupController