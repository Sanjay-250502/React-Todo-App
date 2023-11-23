import { useState } from "react";

function Card() {
  const initialTodos = [
    {
      Name: "Office Task-1",
      Description: "This is the description of Task-1",
      status: "Not Completed",
    },
    {
      Name: "Office Task-2",
      Description: "This is the description of Task-2",
      status: "Completed",
    },
    {
      Name: "Office Task-3",
      Description: "This is the description of Task-3",
      status: "Not Completed",
    }
  ];

  const [todos, setTodos] = useState(initialTodos);
  const [newTodo, setNewTodo] = useState({
    Name: "",
    Description: "",
    status: "Not Completed",
  });

  const [editIndex, setEditIndex] = useState(null);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(null);

  const [filteredTodos, setFilteredTodos] = useState(todos);

  const handleAddTodo = () => {
    if (newTodo.Name && newTodo.Description) {
      if (editIndex !== null) {
        updateTodo();
      } else {
        addTodo();
      }
    }
  };

  const addTodo = () => {
    setTodos([...todos, newTodo]);
    setNewTodo({
      Name: "",
      Description: "",
      status: "Not Completed",
    });
    setFilteredTodos([...todos, newTodo]);
  };

  const updateTodo = () => {
    const updatedTodos = [...todos];
    // eslint-disable-next-line no-self-assign
    newTodo.status = newTodo.status;
    updatedTodos[editIndex] = newTodo;
    setTodos(updatedTodos);
    setEditIndex(null);
    setNewTodo({
      Name: "",
      Description: "",
      status: "Not Completed",
    });
    setFilteredTodos(updatedTodos);
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
    setFilteredTodos(updatedTodos);
  };

  const handleEditTodo = (index) => {
    setEditIndex(index);
    setNewTodo({
      ...todos[index],
    });
  };

  const handleStatusDropdownToggle = (index) => {
    setStatusDropdownOpen(statusDropdownOpen === index ? null : index);
  };

  const handleStatusChange = (index, newStatus) => {
    const updatedTodos = [...todos];
    updatedTodos[index].status = newStatus;
    setTodos(updatedTodos);
    setStatusDropdownOpen(null);
  };

  const handleStatusFilterChange = (filterStatus) => {
    if (filterStatus === "All") {
      setFilteredTodos(todos);
    } else {
      const filtered = todos.filter((todo) => todo.status === filterStatus);
      setFilteredTodos(filtered);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-green-800 mb-6">My Todo</h1>
      <div className="flex justify-center gap-3">
        <input
          type="text"
          placeholder="Todo Name"
          className="input input-bordered input-success text-black w-80 bg-white"
          value={newTodo.Name}
          onChange={(e) => setNewTodo({ ...newTodo, Name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Todo Description"
          className="input input-bordered input-success text-black w-80 bg-white"
          value={newTodo.Description}
          onChange={(e) =>
            setNewTodo({ ...newTodo, Description: e.target.value })
          }
        />
        <button
          className="btn btn-accent bg-green-500 text-white"
          onClick={handleAddTodo}
        >
          {editIndex !== null ? "Update" : "Add Todo"}
        </button>
      </div>
      <div className="flex items-center justify-between px-20 w-full m-5">
        <h1 className="text-2xl font-semibold text-red-800">My Todos</h1>
        <div className="ml-auto">
          <label className="mr-2 text-black">Status Filter:</label>
          <select
            className="select select-accent bg-yellow-200 text-black"
            onChange={(e) => {
              const filterStatus = e.target.value;
              handleStatusFilterChange(filterStatus);
            }}
          >
            <option className="text-black" value="All">
              All
            </option>
            <option className="text-black" value="Completed">
              Completed
            </option>
            <option className="text-black" value="Not Completed">
              Not Completed
            </option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {filteredTodos.map((detail, idx) => (
          <div key={idx} className={`card w-96 shadow-lg bg-green-300`}>
            <div className="card-body">
              <h2 className="card-title text-red-600">Name: {detail.Name}</h2>
              <p className="text-green-600">
                Description: {detail.Description}
              </p>
              <div className="card-actions justify-end">
                <label className={`mt-3 text-black`}>Status:</label>
                {editIndex === idx ? (
                  <select
                    className="select w-40 text-black"
                    style={{
                      backgroundColor:
                        newTodo.status === "Completed" ? "green" : "red",
                    }}
                    value={newTodo.status}
                    onChange={(e) =>
                      setNewTodo({ ...newTodo, status: e.target.value })
                    }
                  >
                    <option className="bg-red text-black" value="Not Completed">
                      Not Completed
                    </option>
                    <option className="bg-green text-white" value="Completed">
                      Completed
                    </option>
                  </select>
                ) : (
                  <div
                    onClick={() => handleStatusDropdownToggle(idx)}
                    className={`select w-40 text-black grid place-items-center ${
                      statusDropdownOpen === idx ? "open" : ""
                    }`}
                    style={{
                      backgroundColor:
                        detail.status === "Completed" ? "green" : "red",
                    }}
                  >
                    {statusDropdownOpen === idx ? (
                      <div>
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStatusChange(idx, "Not Completed");
                          }}
                          className="bg-red text-black cursor-pointer"
                        >
                          Not Completed
                        </div>
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStatusChange(idx, "Completed");
                          }}
                          className="bg-green text-white cursor-pointer"
                        >
                          Completed
                        </div>
                      </div>
                    ) : (
                      <div className="text-white cursor-pointer">
                        {detail.status === "Not Completed"
                          ? "Not Completed"
                          : "Completed"}
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="card-actions justify-end">
                {editIndex === idx ? (
                  <button
                    className="btn btn-info bg-green-600 text-white"
                    onClick={handleAddTodo}
                  >
                    Update
                  </button>
                ) : (
                  <button
                    className="btn btn-info bg-green-600 text-white"
                    onClick={() => handleEditTodo(idx)}
                  >
                    Edit
                  </button>
                )}
                <button
                  className="btn btn-error bg-red-600 text-white"
                  onClick={() => handleDeleteTodo(idx)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Card;
