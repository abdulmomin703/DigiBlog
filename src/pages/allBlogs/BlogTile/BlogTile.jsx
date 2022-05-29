import React, { useState } from "react";
import { Link } from "react-router-dom";
import BlogImageBaseUrl from "../../../shared/util/blogImageBaseURL";
import { confirmAlert } from "react-confirm-alert"; // Import
import { useHistory } from "react-router-dom";
import { getWeb3 } from "../../../shared/util/getweb3";
import DigiBlog from "../../../abis/DigiBlog.json";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUser } from "../../../shared/redux/reducers/userSlice";
import { toastMessage } from "../../../shared/components/common/toast";
import { DeleteBlog } from "../../../shared/services/uploadProfilePic";

import "./style.css";

export default function BlogTile(item, key, showButtons) {
  const val = item;
  console.log(val);
  const user = useSelector((state) => state.root.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [submitting, setSubmitting] = useState(false);
  const deletePressHandler = () => {
    confirmAlert({
      message: "Are you sure you want to Delete this Blog?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            setSubmitting(true);
            let web3 = await getWeb3(null);
            if (!web3) {
              setSubmitting(false);
            } else if (web3) {
              const walletaddress = item.walletaddress;
              const networkId = await web3?.eth.net.getId();
              const networkData = DigiBlog.networks[networkId];
              if (networkData) {
                const abi = DigiBlog.abi;
                const address = networkData.address;
                const contract = new web3.eth.Contract(abi, address);
                try {
                  await contract.methods
                    .deleteBlog(item.id)
                    .send({ from: String(walletaddress) })
                    .then(async () => {
                      let info = {};
                      info["firstname"] = user?.user?.firstname;
                      info["lastname"] = user?.user?.lastname;
                      info["username"] = user?.user?.username;
                      info["avatar"] = user?.user?.avatar;
                      let val = parseInt(user?.user?.blogs);
                      val -= 1;
                      info["blogs"] = val.toString();
                      info["bio"] = user?.user?.bio;
                      info["walletaddress"] = user?.user?.walletaddress;
                      let resp = {
                        isLoggedIn: true,
                        user: info,
                      };
                      dispatch(setUser(resp));
                      history.push(`/home/${user?.user?.walletaddress}`);
                      setSubmitting(false);
                      toastMessage("Blog Deleted Successfully", "success");
                      let obj = { image: item.image };
                      await DeleteBlog(obj).then((res) => {
                        console.log(res);
                      });
                    });
                } catch (e) {
                  console.log(e);
                }
              }
            }
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  return (
    <div className="p-2 d-flex flex-column flex-md-row align-items-center border">
      <div className="recent-activity-col">
        <img
          src={`${BlogImageBaseUrl}${val.image}`}
          className="img-thumbnail recent-activity-img"
        ></img>
      </div>
      <div className="px-2 width-set">
        <p className="h4">{val.title}</p>
        <p className="h6 text-muted">By {val.name}</p>
        <p>{val.body}</p>
        {item.showButtons && (
          <>
            <div>
              <Link
                className="btn btn-primary w-25"
                to={`/home/${val.id}/edit`}
              >
                Edit Blog
              </Link>
            </div>
            <button
              type="submit"
              className="btn btn-danger w-25 my-1"
              onClick={deletePressHandler}
            >
              {submitting ? (
                <Spinner animation="grow" size="sm" />
              ) : (
                <p className="mb-0">Delete</p>
              )}
            </button>
          </>
        )}

        <div>
          <div className="text-muted">
            <small>{val.date}</small>
          </div>
        </div>
      </div>
    </div>
  );
}
