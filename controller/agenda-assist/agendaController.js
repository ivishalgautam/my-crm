const Agenda = require("../../model/AgendaAssist");

// creates a new agenda
async function addAgenda(req, res) {
  try {
    const agendas = await Agenda.find({});
    if (agendas.length === 0) {
      const agenda = new Agenda(req.body);
      await agenda.save();
      res.json(agenda);
    }
    res.json({ message: "Not allowed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// updates agenda
async function updateAgenda(req, res) {
  try {
    const agenda = await Agenda.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!agenda) return res.status(404).json({ error: "Agenda not found!" });
    res.json(agenda);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// updates agenda
async function getAgenda(req, res) {
  try {
    const agenda = await Agenda.findOne();
    if (!agenda) return res.status(404).json({ error: "Agenda not found!" });
    res.json(agenda);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { addAgenda, updateAgenda, getAgenda };
