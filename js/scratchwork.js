addForm.addEventListener('input', verifyFormData);

function verifyFormData() {

  var verifyMin = document.getElementById('newMin');
  // var verifyMax = document.getElementById('newMax');
  // var verifyAvg = document.getElementById('newAvg');

  if (!verifyMin.checkValidity()) {
    alert('retry');
  }


  // var newMin = parseInt(event.target.newMin.value);
  // var newMax = parseInt(event.target.newMax.value);
  // var newAvg = parseFloat(event.target.newAvg.value);

  // if (!newMin === true || !newMax === true || !newAvg === true) {

  // }
}


