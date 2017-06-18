import firebase from 'firebase';
import { parseDisplayName } from '../../../utils';

function upload(updateTerminal, props, name) {
  if (!name) {
    return updateTerminal(['You have to define a filename']);
  }

  updateTerminal(['Please choose file...']);

  const fileUpload = document.createElement('input');
  fileUpload.type = 'file';
  fileUpload.onchange = function() {
    const file = this.files[0];
    const path = `${parseDisplayName(props.user).login}/${name}`;
    const storageRef = firebase.storage().ref();
    const ref = storageRef.child(path);
    const uploadTask = ref.put(file);

    updateTerminal([`Uploading... 0%`]);
    uploadTask.on(
      'state_changed',
      function(snapshot) {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = snapshot.bytesTransferred / snapshot.totalBytes * 100;
        updateTerminal([`Uploading... ${progress}%`], true);
      },
      function() {
        updateTerminal(['Upload failed, sorry!']);
      },
      function() {
        updateTerminal([`Upload done! You can now use "${name}"`]);
      }
    );
  };
  document.body.appendChild(fileUpload);
  fileUpload.click();
}

export default upload;
