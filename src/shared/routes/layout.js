import React, { useEffect } from "react";

function Layout(props) {
  useEffect(() => {
    ChangeTitle(props?.name);
  });
  const ChangeTitle = (string) => {
    document.title = ` ${string} | DigiBlog `;
  };

  return (
    <div style={{ minHeight: "calc(100vh - 400px)" }}>
      {" "}
      <props.component {...props} />
    </div>
  );
}

export default Layout;
