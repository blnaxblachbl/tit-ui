import { useEffect, useState } from "react";
import styled from "styled-components";

import { MarkDown } from "../../../components";

const Container = styled.div`
  padding: 24px;
  box-sizing: border-box;
  line-height: 24px;
  text-align: justify;
  max-width: 800px;
`;

const FormCustomItem = () => {
  const [children, setChildren] = useState("");

  useEffect(() => {
    fetch(require("./custom-item.md"))
      .then((res) => res.text())
      .then((md) => {
        setChildren(md);
      });
  });

  return (
    <Container>
      <MarkDown children={children} />
    </Container>
  );
};

export default FormCustomItem;
