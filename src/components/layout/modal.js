import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useState, useRef } from "react";
import { GoDiffAdded } from "react-icons/go";
import { FaPhotoVideo } from "react-icons/fa";
import { App } from "./../user/firebase-config";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import "./modal.css";

const ModalForUpload = (props) => {
  const [modal, setModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const [name, setName] = useState(null);
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
      setName(e.target.files[0].name);
    }
  };
  const submitData = (file) => {
    const storage = getStorage(App);
    // document.getElementsByClassName("models")[0].style.marginTop = "200px";
    // Create the file metadata
    /** @type {any} */
    const metadata = {
      contentType: "image/jpeg",
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
        });
      }
    );
  };
  return (
    <div>
      <GoDiffAdded
        size={"30px"}
        onClick={() => {
          setModal(!modal);
        }}
      />
      <Modal
        className={"models"}
        isOpen={modal}
        toggle={() => {
          setModal(!modal);
        }}
      >
        <ModalHeader
          charCode="Y"
          toggle={() => {
            setModal(!modal);
          }}
        >
          Create new post
        </ModalHeader>
        <ModalBody>
          {!selectedImage && (
            <div>
              {" "}
              <h6>Drag photo and videos here</h6>
              <FaPhotoVideo />
              {/* <button>select from computer</button> */}
              <input type="file" accept="image/*" onChange={imageChange} />
            </div>
          )}

          {selectedImage && (
            <div>
              <button
                onClick={() => {
                  submitData(selectedImage);
                }}
              >
                Next
              </button>
              <div style={styles.preview}>
                <img
                  src={URL.createObjectURL(selectedImage)}
                  style={styles.image}
                  onLoad={() => {
                    URL.revokeObjectURL(selectedImage);
                    // setSelectedImage();
                  }}
                  alt="Thumb"
                />
              </div>

              <input type="text" placeholder="Enter caption" />
            </div>
          )}
        </ModalBody>
      </Modal>
    </div>
  );
};
export default ModalForUpload;
const styles = {
  preview: {
    marginTop: 50,
    display: "flex",
    flexDirection: "column",
  },
  image: { maxWidth: "100%", maxHeight: 320 },
};
