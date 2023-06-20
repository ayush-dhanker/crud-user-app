import {
  ADD_USER,
  EDIT_USER_DETAILS,
  REMOVE_ALL,
  REMOVE_USER,
} from "./actionTypes";

const INIT_STATE = {
  users: [
    { name: "User-1", email: "user1@gmail.com", number: 1234567890 },
    { name: "User-2", email: "user2@gmail.com", number: 1212121212 },
    { name: "User-3", email: "user3@gmail.com", number: 9988776655 },
    { name: "User-4", email: "user4@gmail.com", number: 8787878787 },
  ],
  emails: [
    "user1@gmail.com",
    "user2@gmail.com",
    "user3@gmail.com",
    "user4@gmail.com",
  ],
};

const userDetails = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        users: [
          ...state.users,
          {
            name: action.payload.name,
            email: action.payload.email,
            number: action.payload.phone,
          },
        ],
        emails: [...state.emails, action.payload.email],
      };

    case REMOVE_ALL:
      return {
        ...state,
        users: [],
        emails: [],
      };

    case REMOVE_USER:
      return {
        ...state,
        users: state.users.filter(
          (ele) => ele?.email?.toString() !== action?.payload?.toString()
        ),
        emails: state.emails.filter(
          (ele) => ele?.toString() !== action?.payload?.toString()
        ),
      };

    case EDIT_USER_DETAILS:
      return {
        ...state,
        users: state.users.map((ele) =>
          ele?.email?.toString() === action.payload.emailOld?.toString()
            ? {
                name: action.payload.name,
                email: action.payload.email,
                number: action.payload.phone,
              }
            : ele
        ),
        emails: state.emails.map((ele) =>
          ele?.email?.toString() === action.payload.emailOld?.toString()
            ? action.payload.email
            : ele
        ),
      };

    default:
      return state;
  }
};

export default userDetails;
