import catchAsync from "../../util/catchAsync";

import messageServices from "./message.service";

const getAllContacts = catchAsync(async(req,res) => {
    const result = await messageServices.getAllContacts(req.user.id)
    res.status(200).json({
        message: "All contacts fetched successfully",
        result
    })
})

const viewAllMessageByContactId= catchAsync(async(req, res)=>{
    const contactId =  
})

const sendMessage = catchAsync(async (req,res) => {
    const sender = req.user.id
    const contactId = req.query.contactId as string
    const message = req.body.message

    if(!sender || !contactId)
    {
        throw new Error('Missing sender or receiver')
    }

    const result = await messageServices.sendMessage(sender,contactId,message)
    res.status(200).json({
        message: "Message sent successfully",
        result
    })
    
})

const messageController = {
    sendMessage,getAllContacts
}
export default messageController