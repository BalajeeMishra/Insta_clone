import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useState, useRef } from "react";
import { GoDiffAdded } from "react-icons/go";
import { FaPhotoVideo } from "react-icons/fa";
import "./modal.css";
const ModalForUpload = (props) => {
  const [modal, setModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  console.log(selectedImage);
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      console.log(e.target.files[0].name);
      setSelectedImage(e.target.files[0]);
    }
  };
  const changeSize = () => {};
  return (
    <div>
      {/* <Button
        color="danger"
        onClick={() => {
          setModal(!modal);
        }}
      >
        Click Me
      </Button> */}
      <GoDiffAdded
        size={"30px"}
        onClick={() => {
          setModal(!modal);
        }}
      />
      <Modal
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
              <input type="text" placeholder="Enter caption" />
            </div>
          )}

          {selectedImage && (
            <div>
              <button onClick={changeSize}>Next</button>
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
