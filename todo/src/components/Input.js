import React from "react";

export default function Input(props) {
  return (
    <div style={{marginRight: 15}}>
      <input style={styles.inputStyle} {...props} />
    </div>
  );
}

const styles = {
  inputStyle: {
    border: "1px solid #BDBDBD",
    width: "100%",
    padding: 8,
    borderRadius: 5,
  },
};
