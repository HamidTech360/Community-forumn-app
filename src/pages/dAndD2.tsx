import React from "react";
import MediaUpload from "@/components/Organisms/MediaUpload";

function dAndD2() {
  return <MediaUpload />;

  // const Changed = (e) => {
  //   let formData = new FormData();
  //   formData.append("file", e.target.files[0], e.target.files[0].name);

  //   console.log("formData:", formData.getAll("file"));
  // };
  // return (
  //   <>
  //     <form>
  //       <input
  //         type="file"
  //         name="file"
  //         onChange={Changed}
  //         // onChange={(e) => document.write(JSON.stringify(e.target.files[0]))}
  //       ></input>
  //       <button type="submit">Submit</button>
  //     </form>
  //   </>
  // );
}

export default dAndD2;
