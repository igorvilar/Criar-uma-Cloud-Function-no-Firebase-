// const functions = require('firebase-functions');

// const admin = require('firebase-admin');

// admin.initializeApp(functions.config().firebase);

// exports.onTaskCreate = functions
//     .database
//     .ref('tasks/{taskId}')
//     .onCreate((snapshop, context) => {
//         const json = snapshop.val();
//         const key = context.params.taskId;
//         const newObj = {
//             createdAt: context.timestamp
//         };

//         const log = Object.assign({ newObj, json });

//         return admin
//             .database
//             .ref(`/logs/${key}`)
//             .set(log);

//     });

// // // Create and Deploy Your First Cloud Functions
// // // https://firebase.google.com/docs/functions/write-firebase-functions
// //
// // exports.helloWorld = functions.https.onRequest((request, response) => {
// //  response.send("Hello from Firebase!");
// // });

const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// exports.onTaskCreateTemp = functions
//     .database
//     .ref('tasks/{taskId}')
//     .onCreate((snapshot, context) => {

//         const json = snapshot.val();
//         const key = context.params.taskId;
//         const newObj = {
//             createdAt: context.timestamp
//         };

//         const log = Object.assign(newObj, json);

//         return admin
//             .database()
//             .ref(`/logs/${key}`)
//             .set(log);
//     });

exports.onTaskCreate = functions
    .database
    .ref('tasks/{taskId}')
    .onCreate((snapshot, context) => {
        const json = snapshot.val();
        console.log(json);

        const key = context.params.taskId;
        console.log(key);

        const log = Object.assign({ createdAt: context.timestamp }, json);
        console.log(log);

        return admin
            .database()
            .ref(`/logs/${key}`)
            .set(log);
    });

    exports.onTaskDelete = functions
    .database
    .ref('tasks/{taskId}')
    .onDelete((snapshot, context) => {
        const json = snapshot.val();
        console.log(json);

        const key = context.params.taskId;
        console.log(key);

        const log = Object.assign({ deletedAt: context.timestamp }, json);
        console.log(log);

        return admin
            .database()
            .ref(`/logs/${key}`)
            .set(log);
    });


//     Pessoal,
// Durante nossa aula de Firebase, criamos uma Cloud Function que "observa" a criação de qualquer tarefa no nó "tasks/{taskId}" e replica esse objeto no nó "log/*".
// Neste exercício, crie uma Cloud Function que observe ou a escrita, ou a atualização, ou a exclusão, etc. e atualize o log referente a tarefa escrita, alterada ou excluída. 
//Pode adicionar as propriedades alteredAt ou deletedAt, por exemplo.
// Entregar o projeto em um repositório git.