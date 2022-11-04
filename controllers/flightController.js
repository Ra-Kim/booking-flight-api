const {Flights} = require('../models/Flight')
const {v4:uuid} = require('uuid')

//get all flights
exports.getFlights = async (req, res) => {
    try{
        const flights = Flights;
        res.status(200).json({
            message: "All Flights",
            flights: flights
        })
    }catch(err){
        res.status(500).json({message: err})
    }
}

//get single flight
exports.getFlight = async (req, res) => {
    try{
        let id = req.params.id;
        const flight = Flights.find((flight) => flight.id === id)

        res.status(200).json({
            message: "Flight found",
            flight
        })
    }catch(err){
        res.status(500).json({message: err.message})
    }
}

//create new flight
exports.bookFlight = async (req, res) => {
    try{
        const {title, time, price, date} = await req.body;
        const newFlight = {
            id: uuid(),
            title,
            time,
            price,
            date
        }
         Flights.push(newFlight)

        res.status(201).json({
             message: "Flight added",
             newFlight,
        })

    }catch(err){
        res.status(500).json({message: err.message})
    }
}

//update/edit flight
exports.editFlight = async (req, res) => {
    try{
        let id = req.params.id
        let flight = Flights.find((flight) => flight.id === id)
        const {title,time,price,date} = await req.body
        flight.title = title
        flight.time = time
        flight.price = price
        flight.date = date

        res.status(200).json({
            message: "Flight updated",
            flight
        })
    }catch(err){
        res.status(500).json({message: err.message})
    }
}

//delete flight
exports.cancelFlight = async (req, res) => {
    try{
        let id = req.params.id
        const flight = Flights.find((flight) => flight.id === id)
        Flights.splice(Flights.indexOf(flight), 1)
        res.status(200).json({
            message: "Flight deleted",
            flight
        })
    }catch(err){
        res.status(500).json({message: err.message})
    }
    
}


