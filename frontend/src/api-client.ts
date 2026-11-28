// import type { RegisterFromData } from "./pages/Register";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// export const registerApi = async (formData: RegisterFromData) => {
//   const response = await fetch(`${API_BASE_URL}/api/users/register`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     credentials:'include',
//     body: JSON.stringify(formData),
//   });

//   const data = await response.json();
//   if (!response.ok) {
//     throw new Error(data.message);
//   }
// };
