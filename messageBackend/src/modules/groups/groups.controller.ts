
import catchAsync from "../../util/catchAsync";
import groupServices from "./groups.service";


const createGroup = catchAsync(async (req, res) => {
    const userId = req.user.id
    const payload = req.body
    const result = await groupServices.createGroup(userId, payload)

    res.status(200).json({
        message: "group created successfully",
        data: result
    })
})



const addMemberTOTheGroup=catchAsync(async(req,res)=>{
    const userId = req.user.id as string
    const friendIds= req.body.friendIds
    const contactId=req.query.groupId as string

    if(!userId || !friendIds || !contactId)
    {
        throw Error("userId or friendIs or contactId is missing")
    }


    const result = await groupServices.addMemberTOTheGroup(userId,friendIds,contactId)

    res.status(200).json({
        message:"member is added to the group",
        data:result
    })

})

const groupController = {
    createGroup, addMemberTOTheGroup
}

export default groupController