import localforage from 'localforage';

var fileInput = document.getElementById('fileInput');
var fileDisplayArea = document.getElementById('fileDisplayArea');
var downloadButton = document.getElementById('download');

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

//toDo store image in DB
var store = localforage.createInstance({
  name: "nameHere"
});

var otherStore = localforage.createInstance({
  name: "images"
});

fileInput.addEventListener('change', function (e) {

  console.log(fileInput.value);

  var file = fileInput.files[0];
  var imageType = /image.*/;

  if (file.type.match(imageType)) {
    var reader = new FileReader();

    reader.onload = function (e) {
      fileDisplayArea.innerHTML = "";

      // Create a new image.
      var img = new Image();
      // Set the img src property using the data URL.
      img.width = 200;
      img.src = reader.result;

      // Add the image to the page.
      fileDisplayArea.appendChild(img);

      const renderedHtml = document.getElementById('renderedHtml');


      fetch('http://localhost:8080').then(async res => {

        const generatedHtml = await res.text();
        renderedHtml.contentDocument.body.innerHTML =  generatedHtml;
        localforage.setItem('image', generatedHtml, (e) => console.log('image stored in indexedDB'));
      })
    }

    reader.readAsDataURL(file);
  } else {
    fileDisplayArea.innerHTML = "File not supported!";
  }


});

downloadButton.addEventListener('click', function (e) {

  localforage.getItem('image', function (err, value) {
    download('wireframe.html', value);
  });

})
