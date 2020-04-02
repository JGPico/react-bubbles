import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors, update, setUpdate }) => {
  // console.log("Colors prop", colors);
  const [editing, setEditing] = useState(false);
  const [adding, setAdding] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setColorToAdd] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const changeIsAdding = () => {
    if (adding === true) {
      setAdding(false);
    } else {
      setAdding(true)
    };
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?

    axiosWithAuth()
    .put(`/api/colors/${colorToEdit.id}`, colorToEdit )
    .then(res => {
      console.log("Update response ", res);
      updateColors(colors);
      console.log("Update Colors after response set", colors);
      setUpdate(!update);
    })
    .catch(err => {
      console.log("Update error ", err);
    });

  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
    .delete(`/api/colors/${color.id}`)
    .then(res => {
      console.log("Delete response ", res);
      updateColors(colors);
      setUpdate(!update);
    })
    .catch(err => {
      console.log("Delete error ", err);
    })
  };

  const addColor = e => {
    e.preventDefault();
    axiosWithAuth()
    .post('/api/colors', colorToAdd)
    .then(res => {
      console.log("Add response ", res);
      setUpdate(!update);
    })
    .catch(err => {
      console.log("Add error ", err);
    });
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div />
      {/* stretch - build another form here to add a color */}
        
        {!adding ? (
          <button onClick={changeIsAdding}>Add new color</button>
        ) : (
          <form onSubmit={addColor}>
          <label>
              color name:
              <input
                onChange={e =>
                  setColorToAdd({ ...colorToAdd, color: e.target.value })
                }
                value={colorToAdd.color}
              />
            </label>
            <label>
              hex code:
              <input onChange={e => setColorToAdd({
                ...colorToAdd,
                code: {hex: e.target.value}
              })}
              value={colorToAdd.code.hex}/>
            </label>
            <button type='submit'>Submit new Color</button>
            <button onClick={changeIsAdding}>Close add form</button>
          </form>
        )}      
        

    </div>
  );
};

export default ColorList;
