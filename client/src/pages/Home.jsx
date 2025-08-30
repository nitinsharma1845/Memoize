import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { data, useNavigate } from "react-router-dom";
import { getNoteByStatus, getPinnedNotes } from "../utils/noteServices";

const Home = () => {
  useEffect(() => {
    getPinnedNotes()
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => {
        console.log("Pinned note error", err);
      });
  }, []);

  return <div></div>;
};

export default Home;
