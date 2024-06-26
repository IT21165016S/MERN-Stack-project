import { createContext, useReducer } from "react";

export const StudentsContext = createContext();

export const studentsReducer = (state, action) => {
  switch (action.type) {
    case "SET_STUDENTS":
      return {
        students: action.payload,
      };
    case "CREATE_STUDENT":
      return {
        students: [action.payload, ...state.students],
      };
    case "UPDATE_STUDENT":
      const students = state.students.map((student) => {
        if (student._id === action.payload._id) {
          return action.payload;
        }
        return student;
      });
      return {
        students: students,
      };
    case "DELETE_STUDENT":
      return {
        students: state.students.filter((s) => s._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const StudentsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(studentsReducer, {
    students: null,
  });

  return (
    <StudentsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </StudentsContext.Provider>
  );
};
