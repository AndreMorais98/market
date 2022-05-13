async function upload() {
  let user = Moralis.User.current();
  if (!user) {
    user = await Moralis.authenticate();
  }
  imageURL = await uploadImage()
  await uploadMetadata(imageURL)

}

uploadImage = async () => {
  const data = fileInput.files[0]
  const file = new Moralis.File(data.name, data)
  await file.saveIPFS();
  console.log(file.ipfs(), file.hash());
  return file.ipfs();
}

uploadMetadata = async (imageURL) => {
  const name = document.getElementById('metadataName').value;
  const description = document.getElementById('metadataDescription').value;

  const metadata = {
    "name": name,
    "description": description,
    "image": imageURL
  }
  const file = new Moralis.File("file.json", {base64 : btoa(JSON.stringify(metadata))});
  await file.saveIPFS();

  console.log(file.ipfs())
}

document.getElementById("upload").onclick = upload;
