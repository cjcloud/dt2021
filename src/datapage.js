import React from "react";
import { Button } from "reactstrap";

// import newScrape from "./dreamscrape/getdata";

export default function DataPage() {
  let message = <p>HELLO MESSAGE</p>
  return (
    <div style={{ marginTop: 150 }}>
      {/* <Button color="primary" onClick={() => newScrape()}>
        SCRAPE
      </Button> */}
      <div>{message}</div>
    </div>
  );
}
