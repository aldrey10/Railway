
const { response } = require('express');
const Event = require('../models/Event')


const getEvents = async(request, resp = response) => {

    const events = await Event.find().populate('user', 'name');
    return resp.status(201).json({
        ok:true,
        events
    })
}

const createEvent = async(request, resp = response) => {

    const event = new Event(request.body);

    try {

        event.user = request.uid;

        await event.save()

        return resp.status(201).json({
            ok:true,
            event: event
        })
    } catch (error) {
        console.log(error)
        resp.status(500).json({
            ok:false,
            msg:'Make contact with admin'
        })
    }

    
}

const updateEvent = async(request, resp = response) => {


    const idEvent = request.params.id;
    const uid = request.uid;

    try {

        const event = await Event.findById(idEvent);

        if(!event){
            return resp.status(404).json({
                ok:false,
                msg: 'Event does not exist with this id'
            })
        }

        if(event.user.toString() !== uid){
            return resp.status(401).json({
                ok:false,
                msg: 'You are not allowed to edit this event'
            })
        }

        const newEvent = {
            ...request.body,
            user: uid
        }

        const updatedEvent = await Event.findByIdAndUpdate(idEvent, newEvent, {new: true});


        return resp.status(201).json({
            ok:true,
            event: updatedEvent
        })
    } catch (error) {
        console.log(error)
        return resp.status(500).json({
            ok:false,
            msg: 'Make contact with admin'
        })
    }



    
}

const deleteEvent = async(request, resp = response) => {



    const idEvent = request.params.id;
    const uid = request.uid;

    try {

        const event = await Event.findById(idEvent);

        if(!event){
            return resp.status(404).json({
                ok:false,
                msg: 'Event does not exist with this id'
            })
        }

        if(event.user.toString() !== uid){
            return resp.status(401).json({
                ok:false,
                msg: 'You are not allowed to delete this event'
            })
        }

        await Event.findByIdAndDelete(idEvent);


        return resp.status(201).json({
            ok:true,
        })
    } catch (error) {
        console.log(error)
        return resp.status(500).json({
            ok:false,
            msg: 'Make contact with admin'
        })
    }
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}
