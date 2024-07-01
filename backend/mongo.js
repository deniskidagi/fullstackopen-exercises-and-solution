const mongoose = require('mongoose');

if(process.argv.length<3){
    console.log("give password as length of argument");
    process.exit(1);
}

const password = process.argv[2];

const url = 
`mongodb+srv://deniskidagi:${password}@cluster0.drfyf1y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false);

mongoose.connect(url);