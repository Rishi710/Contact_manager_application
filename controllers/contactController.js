const asyncHandler = require("express-async-handler");
const Contact = require ("../model/contactModel");
//@description  Get all contact
//@route GET /api/contact
//@access public

const getContacts = asyncHandler(async (req,res) => {
    const contacts = await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts);
});

//@description Create New contact
//@route POST /api/contact
//@access public

const createContact = asyncHandler(async (req,res) => {
    console.log("The request body is: ", req.body);
    const {name, email, phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error ("All Fields are mandatory");
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id,
    });
    res.status(201).json(contact);
});

//@description  Get contact
//@route GET /api/contacts/:id
//@access public

const getContact = asyncHandler(async (req,res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error ("Contact not found");
    }
    res.status(200).json(contact);
});

//@description update contact
//@route PUT /api/contacts/:id
//@access public

const updateContact= asyncHandler(async (req,res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error ("Contact not Found");
    }

    if(contact.user_id.toString()!==req.user.id){
        res.status (403);
        throw new Error("User do not have permission to update other user contacts");
    }

    const updateContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    res.send(updateContact);
});

//@description delete contact
//@route DELETE /api/contacts/:id
//@access public

const deleteContact= asyncHandler(async (req,res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error ("Contact not Found");
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have permission to update other user contacts");
    }
    await Contact.deleteOne({_id: req.params.id});
    res.status(200).json(contact);
});

module.exports ={
    getContacts,
    createContact, 
    getContact,
    updateContact, 
    deleteContact, 
};