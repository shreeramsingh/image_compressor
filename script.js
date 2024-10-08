const myImage = document.querySelector("#my_image");
const originalImageContainer = document.querySelector("#original_image_container");
const compressedImageContainer = document.querySelector("#compressed_image_container");

myImage.addEventListener("change", (evt)=>{
  const image = evt.target.files[0];

  const reader = new FileReader();
  reader.onload = () =>{
    const newImage = new Image();
    newImage.src = reader.result;
    newImage.onload = () =>{
      const canvas = document.createElement("canvas");
      canvas.height = newImage.height;
      canvas.width = newImage.width;

      const ctx = canvas.getContext('2d');
      newImage.width = 150;
      originalImageContainer.appendChild(newImage);

      ctx.drawImage(newImage, 0, 0);

      const newUrl = canvas.toDataURL('image/jpeg',0.5);

      compressedImageContainer.innerHTML = `<img src="${newUrl}" width="150" onclick="downloadImage(event)">`;
    };

  };
  reader.readAsDataURL(image);
})
const downloadImage = (evt) =>{
  const a = document.createElement('a');
  a.download = 'compressed_image.jpeg';
  a.href = evt.target.src;
  a.target = '_blank';
  a.click();
};