const Trip = require("../schemas/Trip");
const User = require("../schemas/User");
const Expense = require("../schemas/Expense");

//*create Trip
const createTrip = async (req, res) => {
  const {
    image,
    name,
    roundTrip,
    roundTripCost,
    startDate,
    endDate,
    description,
    expenses,
  } = req.body;
  const { id } = req.params;
  try {
    const trip = await Trip.create({
      owner: id,
      image,
      name,
      roundTrip,
      roundTripCost,
      startDate,
      endDate,
      description,
      expenses,
    });

    const user = await User.findByIdAndUpdate(
      id,
      {
        $push: { trips: trip._id },
      },
      { new: true }
    );

    if (!user) {
      await Trip.findByIdAndDelete(trip._id);
      return res.status(404).json({ error: "User not found!" });
    }
    res.status(201).json({ trip, user });
    // console.log(trip);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//* Get only one trip
const getOneTrip = async (req, res) => {
  const { tripId } = req.params;
  try {
    const trip = await Trip.findById(tripId).populate("expenses");

    if (!trip) {
      return res.status(404).json({ error: "Trip not found!" });
    }
    res.status(200).json({ trip });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//* Edit a trip
const editTrip = async (req, res) => {
  const {
    image,
    name,
    roundTrip,
    roundTripCost,
    startDate,
    endDate,
    description,
    expenses,
  } = req.body;
  const { tripId } = req.params;

  try {
    const trip = await Trip.findByIdAndUpdate(
      tripId,
      {
        image,
        name,
        roundTrip,
        roundTripCost,
        startDate,
        endDate,
        description,
        expenses,
      },
      { new: true }
    );

    if (!trip) {
      return res.status(404).json({ error: "Trip not found!" });
    }

    res.status(202).json({ trip, message: "Updated successfully!" });
  } catch (error) {
    re.status(400).json({ error: error.message });
  }
};

//* Delete a trip
const deleteTrip = async (req, res) => {
  const { tripId } = req.params;
  try {
    const trip = await Trip.findByIdAndDelete(tripId);
    if (!trip) {
      return res.status(404).json({ error: "Trip not found!" });
    }
    res.status(202).json({ trip, message: "Deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//* Create trip expense
const createTripExpense = async (req, res) => {
  const { icon, name, date, value, type } = req.body;
  const { id, tripId } = req.params;

  try {
    const expense = await Expense.create({
      owner: id,
      icon,
      name,
      date,
      value,
      type,
    });

    if (expense.type === "trip") {
      const trip = await Trip.findByIdAndUpdate(
        tripId,
        {
          $push: { expenses: expense._id },
        },
        { new: true }
      );
      return res.status(201).json({ expense, trip });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createTrip,
  getOneTrip,
  editTrip,
  deleteTrip,
  createTripExpense,
};
