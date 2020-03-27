import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  const [update, setUpdate] = useState(false);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  useEffect(() => {
    const getData = () => {
      axiosWithAuth()
      .get('api/colors')
      .then(res => {
        console.log("Get response ", res);
        setColorList(res.data);
      })
      .catch(err => {
        console.log("Get error ", err);
      });
    };

    getData();

  }, [update]);

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} update={update} setUpdate={setUpdate} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
