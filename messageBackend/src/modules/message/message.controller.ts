import catchAsync from "../../util/catchAsync";
import messageServices from "./message.service";

const getAllContacts = catchAsync(async(req,res) => {
    const result = await messageServices.getAllContacts(req.user.id)
    res.status(200).json({
        message: "All contacts fetched successfully",
        result
    })
})

const sendMessage = catchAsync(async (req,res) => {
    const sender = req.user.id
    const reciver = req.query.reciverId as string
    const message = req.body.message

    if(!sender || !reciver)
    {
        throw new Error('Missing sender or receiver')
    }

    const result = await messageServices.sendMessage(sender,reciver,message)
    res.status(200).json({
        message: "Message sent successfully",
        result
    })
    
})

const messageController = {
    sendMessage,getAllContacts
}
export default messageController