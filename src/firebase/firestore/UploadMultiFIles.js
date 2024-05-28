import uploadFileToFirebase from "./uploadFile";

export default async function uploadMultipleFilesToFirebase(files) {
  var uplaodedFiles = [];

  for (var i = 0; i < files.length; i++) {
    var url = await uploadFileToFirebase(files[i]);
    if (url) {
      var link = url;
      var name = files[i].name;
      var type = files[i].type;
      var object = {
        link,
        name,
        type,
      };

      uplaodedFiles.push(object);
    } else {
      return null;
    }
  }

  return uplaodedFiles;
}
