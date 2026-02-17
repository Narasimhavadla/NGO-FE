import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarPlus,
  faTrash,
  faTimes,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

export default function AdminCalendar() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    title: "",
    agenda: "",
    start: "",
    end: "",
  });

  const api = "http://localhost:3000/api/v1/programs";

  /* ================= FETCH PROGRAMS ================= */
  const fetchPrograms = async () => {
    const res = await axios.get(api);

    const formatted = res.data.map((p) => ({
      id: p.id,
      title: p.title,
      agenda: p.agenda,
      start: new Date(p.startDate),
      end: new Date(p.endDate),
    }));

    setEvents(formatted);
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  /* ================= SELECT SLOT (ADD) ================= */
  const handleSelectSlot = ({ start, end }) => {
    setSelectedEvent(null);

    setForm({
      title: "",
      agenda: "",
      start: moment(start).format("YYYY-MM-DDTHH:mm"),
      end: moment(end).format("YYYY-MM-DDTHH:mm"),
    });

    setShowModal(true);
  };

  /* ================= SELECT EVENT (EDIT) ================= */
  const handleSelectEvent = (event) => {
    setSelectedEvent(event);

    setForm({
      title: event.title,
      agenda: event.agenda,
      start: moment(event.start).format("YYYY-MM-DDTHH:mm"),
      end: moment(event.end).format("YYYY-MM-DDTHH:mm"),
    });

    setShowModal(true);
  };

  /* ================= SAVE ================= */
  const handleSave = async () => {
    const payload = {
      title: form.title,
      agenda: form.agenda,
      startDate: new Date(form.start),
      endDate: new Date(form.end),
    };

    if (selectedEvent) {
      await axios.put(`${api}/${selectedEvent.id}`, payload);
    } else {
      await axios.post(api, payload);
    }

    setShowModal(false);
    fetchPrograms();
  };

  /* ================= DELETE ================= */
  const handleDelete = async () => {
    if (!selectedEvent) return;

    if (window.confirm("Delete this program?")) {
      await axios.delete(`${api}/${selectedEvent.id}`);
      setShowModal(false);
      fetchPrograms();
    }
  };

  return (
    <div className="p-6 h-[90vh]">
      {/* HEADER */}
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <FontAwesomeIcon icon={faCalendarPlus} />
        Admin Program Calendar
      </h1>

      {/* CALENDAR */}
      <div style={{ height: "80vh" }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          selectable
          popup
          views={["month", "week", "day", "agenda"]}
          defaultView="month"
          defaultDate={new Date()}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          style={{ height: "100%" }}
        />
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-6 space-y-4">
            {/* HEADER */}
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">
                {selectedEvent ? "Edit Program" : "Add Program"}
              </h2>

              <button onClick={() => setShowModal(false)}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            {/* TITLE */}
            <input
              type="text"
              placeholder="Program Title"
              className="w-full border p-2 rounded"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
            />

            {/* AGENDA */}
            <textarea
              placeholder="Agenda"
              className="w-full border p-2 rounded"
              value={form.agenda}
              onChange={(e) =>
                setForm({ ...form, agenda: e.target.value })
              }
            />

            {/* START DATE */}
            <div>
              <label className="text-sm font-medium">Start</label>
              <input
                type="datetime-local"
                className="w-full border p-2 rounded"
                value={form.start}
                onChange={(e) =>
                  setForm({ ...form, start: e.target.value })
                }
              />
            </div>

            {/* END DATE */}
            <div>
              <label className="text-sm font-medium">End</label>
              <input
                type="datetime-local"
                className="w-full border p-2 rounded"
                value={form.end}
                onChange={(e) =>
                  setForm({ ...form, end: e.target.value })
                }
              />
            </div>

            {/* ACTIONS */}
            <div className="flex justify-between pt-2">
              {selectedEvent && (
                <button
                  onClick={handleDelete}
                  className="bg-red-500 text-white px-4 py-2 rounded flex items-center gap-2"
                >
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </button>
              )}

              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 ml-auto"
              >
                <FontAwesomeIcon icon={faSave} /> Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
