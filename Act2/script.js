const modalWrapper = document.querySelector('.modal-wrapper');
// modal add
const addModal = document.querySelector('.add-modal');
const addModalForm = document.querySelector('.add-modal .form');

// modal edit
const editModal = document.querySelector('.edit-modal');
const editModalForm = document.querySelector('.edit-modal .form');

const btnAdd = document.querySelector('.btn-add');
const btnFind = document.querySelector('.btn-find');

const tableUsers = document.querySelector('.table-users');

let id;

// Create element and render users
const renderUser = doc => {
  const tr = `
    <tr data-id='${doc.id}'>
      <td>${doc.data().studentNumber}</td>
      <td>${doc.data().firstName}</td>
      <td>${doc.data().lastName}</td>
      <td>${doc.data().section}</td>
      <td>
        <button class="btn btn-edit">Update</button>
        <button id="remove" class="btn btn-delete">Delete</button>
      </td>
    </tr>
  `;
  tableUsers.insertAdjacentHTML('beforeend', tr);

  // Click edit user
  const btnEdit = document.querySelector(`[data-id='${doc.id}'] .btn-edit`);
  btnEdit.addEventListener('click', () => {
    editModal.classList.add('modal-show');

    id = doc.id;
    editModalForm.studentNumber.value = doc.data().studentNumber;
    editModalForm.firstName.value = doc.data().firstName;
    editModalForm.lastName.value = doc.data().lastName;
    editModalForm.section.value = doc.data().section;

  });

  const btnDelete = document.querySelector(`[data-id='${doc.id}'] .btn-delete`);
  btnDelete.addEventListener('click', () => {
    db.collection('users').doc(`${doc.id}`).delete().then(() => {
      console.log('Document succesfully deleted!');
    }).catch(err => {
      console.log('Error removing document', err);
    });
  });

}

btnAdd.addEventListener('click', () => {
  addModal.classList.add('modal-show');

  addModalForm.studentNumber.value = '';
  addModalForm.firstName.value = '';
  addModalForm.lastName.value = '';
  addModalForm.section.value = '';
});

/* btnFind.addEventListener('click', () => {
  var firebaseRef = ref(db, 'users')
  firebaseRef.on("value", function(snapshot){
    snapshot.forEach(function(element){
      document.querySelector('#root').innerHTML = `
      <div>${element.val()}</div>
      `
    });
  })
}); */

/* btnFind.addEventListener('click', () => {
  var ref = ref(db, '/users');
  ref.on('users', (snapshot) => {
    console.log(snapshot.val());
    return snapshot.val();
  }, (errorObject) => {
    console.log('The read failed: ' + errorObject.name);
  }); 
});  */

window.addEventListener('click', e => {
  if(e.target === addModal) {
    addModal.classList.remove('modal-show');
  }
  if(e.target === editModal) {
    editModal.classList.remove('modal-show');
  }
});

db.collection('users').onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {
    if(change.type === 'added') {
      renderUser(change.doc);
    }
    if(change.type === 'removed') {
      let tr = document.querySelector(`[data-id='${change.doc.id}']`);
      let tbody = tr.parentElement;
      tableUsers.removeChild(tbody);
    }
    if(change.type === 'modified') {
      let tr = document.querySelector(`[data-id='${change.doc.id}']`);
      let tbody = tr.parentElement;
      tableUsers.removeChild(tbody);
      renderUser(change.doc);
    }
  })
})

addModalForm.addEventListener('submit', e => {
  e.preventDefault();
  db.collection('users').add({
    studentNumber: addModalForm.studentNumber.value,
    firstName: addModalForm.firstName.value,
    lastName: addModalForm.lastName.value,
    section: addModalForm.section.value,
  });
  modalWrapper.classList.remove('modal-show');
});

editModalForm.addEventListener('submit', e => {
  e.preventDefault();
  db.collection('users').doc(id).update({
    studentNumber: editModalForm.studentNumber.value,
    firstName: editModalForm.firstName.value,
    lastName: editModalForm.lastName.value,
    section: editModalForm.section.value,
  });
  editModal.classList.remove('modal-show');
  
});
