// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: 'AIzaSyBhCpZ6M9QsQHHDKpfHiQVJS2FWxgjy5NE',
    authDomain: 'crud-78f70.firebaseapp.com',
    projectId: 'crud-78f70'
});

var db = firebase.firestore();

//guardar
function save() {
    // agregar documentoo
    var name = document.getElementById('name').value;
    var lastname = document.getElementById('lastname').value
    var date = document.getElementById('date').value

    db.collection("users").add({
        first: name,
        last: lastname,
        born: date
    })
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
            document.getElementById('name').value = ""
            document.getElementById('lastname').value = ""
            document.getElementById('date').value = ""

        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });

}

//listar
db.collection("users").onSnapshot((querySnapshot) => {
    var tabla = document.getElementById('tabla')
    tabla.innerHTML='',
    querySnapshot.forEach((doc) => {
        tabla.innerHTML += ` 
            <tr>
                <td>${doc.id}</td>
                <td>${doc.data().first}</td>
                <td>${doc.data().last}</td>
                <td>${doc.data().born}</td>  
                 <td> <button  class="btn btn-info" onclick="edit('${doc.id}','${doc.data().first}','${doc.data().last}','${doc.data().born}')"> edit</button></td>                  
                 <td> <button class="btn btn-danger" onclick="eliminar('${doc.id}')"> delete</button></td>       
            </tr>
            
            `
    });
});


function eliminar(id){
    db.collection("users").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}



function edit(id,first, last, born) {
    document.getElementById('name').value= first
    document.getElementById('lastname').value= last
    document.getElementById('date').value= born

    var boton = document.querySelector('#boton');
     boton.innerHTML="editar"

    boton.onclick = function(){
        var washingtonRef = db.collection("users").doc(id);
        // Set the "capital" field of the city 'DC'

        var name = document.getElementById('name').value;
        var last = document.getElementById('lastname').value;
        var date = document.getElementById('date').value;

        return washingtonRef.update({
            first: name,
            last: last,
            born: date
        })
        .then(function() {
            console.log("Document successfully updated!");
            boton.innerHTML = 'Guardar';
            document.getElementById('name').value = '';
            document.getElementById('lastname').value = '';
            document.getElementById('date').value = '';
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    }

}






