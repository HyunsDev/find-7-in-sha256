import { sha256 } from "js-sha256";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const MainTextViewerDivver = styled.p`
  font-family: Consolas, "Courier New", Courier,
    monospaceFont family fontFamilyMonospace;
  font-size: 20px;

  span {
    background-color: #e9adad;
    border-radius: 4px;
  }
`;
interface MainTextViewerProps {
  text: string;
}
function MainTextViewer({ text }: MainTextViewerProps) {
  let ele: React.ReactNode[] = [];
  let length = text.split("7").length;
  text.split("7").forEach((e, i) => {
    ele.push(e);
    if (i !== length - 1) ele.push(<span>7</span>);
  });

  return <MainTextViewerDivver>{ele}</MainTextViewerDivver>;
}

const Divver = styled.div`
  width: 800px;
  margin: 0 auto;
  margin-top: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.h1``;

let i = 0;
function App() {
  const [text, setText] = useState("");
  const timer = useRef<NodeJS.Timer>();

  const [max7, setMax7] = useState({
    text: "",
    num7: 0,
  });

  useEffect(() => {
    const func = () => {
      i += 1;
      const sha = sha256("hyuns_" + i);
      setText(sha);

      let results = sha.match(/7/g);
      if (results === null) return;
      if (results.length > max7.num7) {
        console.log(results.length, max7.num7);
        setMax7({
          num7: results.length,
          text: sha,
        });
      }
    };
    timer.current = setInterval(func, 0);

    return () => {
      clearInterval(timer.current);
    };
  }, [max7.num7]);

  return (
    <Divver>
      <Title>Find 7 in SHA256</Title>
      현재 최대 {max7.num7}
      <MainTextViewer text={max7.text} />
      <MainTextViewer text={text} />
    </Divver>
  );
}

export default App;
