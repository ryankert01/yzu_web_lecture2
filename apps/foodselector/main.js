var options = {
  valueNames: [
    'name',
    {
      data: ['id']
    },
    {
      attr: 'src',
      name: 'image'
    }
  ]
};

//init list
var userList = new List('users', options);

var myModal3 = new bootstrap.Modal(document.getElementById('staticBackdrop'), {
  keyboard: false
})

userList.add({
  name: 'Instant noodles',
  id: 2,
  image: '../../images/instant-noodles.png',
});

var idField = $('#id-field'),
  nameField = $('#name-field'),
  imgurlField = $('#imgurl-field'),
  addBtn = $('#add-btn'),
  editBtn = $('#edit-btn').hide(),
  removeBtns = $('.remove-item-btn'),
  editBtns = $('.edit-item-btn'),
  selectBtn = $('.select-item-btn'),
  reselectBtn = $('.re-select');

selectBtn.click(() => {
  var selected_item = (Math.floor(Math.random()*14923) % userList.size());
  console.log(selected_item);
  console.log(Math.random());
  console.log(userList.size());
  $("#staticBackdropLabel").text(userList.items[selected_item]._values.name);
  document.querySelector('.modal-body').innerHTML = `<img class="image1" src="${userList.items[selected_item]._values.image}">`;
  myModal3.show();
});



reselectBtn.click(() => {
  myModal3.toggle();
});

// Sets callbacks to the buttons in the list
refreshCallbacks();
addBtn.click(function () {
  userList.add({
    id: Math.floor(Math.random() * 110000),
    name: nameField.val(),
    image: imgurlField.val()
  });
  clearFields();
  refreshCallbacks();
});

editBtn.click(function () {
  var item = userList.get('id', idField.val())[0];
  item.values({
    id: idField.val(),
    name: nameField.val(),
    image: imgurlField.val()
  });
  clearFields();
  editBtn.hide();
  addBtn.show();
});


function refreshCallbacks() {
  // Needed to add new buttons to jQuery-extended object
  removeBtns = $(removeBtns.selector);
  editBtns = $(editBtns.selector);

  removeBtns.click(function () {
    var itemId = $(this).closest('.card').attr('data-id');
    userList.remove('id', itemId);
  });

  editBtns.click(function () {
    var itemId = $(this).closest('.card').attr('data-id');
    var itemValues = userList.get('id', itemId)[0].values();
    idField.val(itemValues.id);
    nameField.val(itemValues.name);
    imgurlField.val(itemValues.image);

    editBtn.show();
    addBtn.hide();
  });
}

function clearFields() {
  nameField.val('');
  imgurlField.val('');
}