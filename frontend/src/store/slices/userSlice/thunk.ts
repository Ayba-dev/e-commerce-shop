// import {createAsyncThunk} from "@reduxjs/toolkit";
// import {BASE_URL} from "../../../constants/constants.ts";
// import {getCookie} from "../../../utils/getCookies.ts";
//
//
//
// export const checkAuth = createAsyncThunk(
//     'auth/checkAuth',
//     async (_ , {rejectWithValue}) => {
//
//         const token = getCookie('accessToken')
//
//         if (!token) {
//             return rejectWithValue('Not authenticated');
//         }
//         try {
//           const  response =  await fetch(`${BASE_URL}/auth/profile`,{
//               method: 'GET',
//               headers: {
//                   'Content-Type': 'application/json',
//                   'Authorization': `Bearer ${token}`,
//               },
//               credentials: 'include',
//           })
//             if (!response.ok)  {
//                 rejectWithValue("Not logged in")
//             }
//             const data = response.json()
//
//             return data
//
//         }catch(error) {
//             return rejectWithValue(error.message);
//         }
//
//     }
// )