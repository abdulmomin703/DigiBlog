import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Avatar } from "../../../../assets";
import EditProfileModal from "../editProfile";
import AvatarBaseURL from "../../../util/avatarBaseURL";

function ProfileModal({ openModal, HideModal }) {
  const CloseModal = () => {
    HideModal();
  };
  const [isOpen, setIsOpen] = useState(false);
  const openModal2 = () => {
    HideModal();
    setIsOpen(true);
  };
  const closeModal2 = () => {
    setIsOpen(false);
  };
  const user = useSelector((state) => state.root.user);

  return (
    <>
      <Modal
        size="lg"
        backdrop="static"
        show={openModal}
        onHide={HideModal}
        centered
      >
        <button
          type="button"
          className="close custom-modal-close"
          onClick={CloseModal}
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <div className="p-3">
          <div className="d-flex justify-content-center">
            <div className="steezdesigns-content">
              <div className="container">
                <div className="steezdesigns-flex">
                  <div className="steezdesigns-img-text-col">
                    <div className="steezdesigns-profile-img">
                      <img
                        load="lazy"
                        src={
                          user?.user?.avatar != ""
                            ? `${AvatarBaseURL}${user?.user?.avatar}`
                            : `${Avatar}`
                        }
                        alt="steez-design-edit"
                      />
                    </div>
                    <div className="steezdesigns-profile-text">
                      <h3>
                        {user?.user?.firstname} {user?.user?.lastname}
                      </h3>
                      <h6>@{user?.user?.username}</h6>
                      <p>{user?.user?.bio}</p>
                    </div>
                  </div>
                  <div className="steezdesigns-followers-col">
                    <ul>
                      <li>
                        <h4>{user?.user?.blogs}</h4>
                        <h5>Blogs</h5>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <Button className="custom-edit-btn" onClick={openModal2}>
              Edit Profile
            </Button>
          </div>
        </div>
      </Modal>
      <EditProfileModal openModal={isOpen} HideModal={closeModal2} />
    </>
  );
}

export default ProfileModal;
