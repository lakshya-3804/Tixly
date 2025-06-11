
import dotenv from 'dotenv';
dotenv.config();

import { app } from './app.js';

// import connectDB from './db/index.js';

// connectDB()
// .then(()=>{
//     app.listen(process.env.PORT,()=>{
//         console.log(`Server is running on port : ${process.env.PORT}`);}
//     )
// })
// .catch(err=>console.error(err));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(process.env.PORT);
    console.log(`Server is running on port : ${PORT}`);
})


