import { sha256 } from "js-sha256";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const MainTextViewerDivver = styled.p`
  font-family: Consolas, "Courier New", Courier,
    monospaceFont family fontFamilyMonospace;
  font-size: 20px;

  span {
    background-color: #e9adad;
    border-radius: 2px;
  }
`;

const Label = styled.div`
  margin-top: -12px;
  margin-bottom: 20px;
  font-size: 14px;
  color: #979797;
`;
interface MainTextViewerProps {
  text1: string;
  text2: string;
}
function MainTextViewer({ text1, text2 }: MainTextViewerProps) {
  let ele: React.ReactNode[] = [];
  let length = text1.split("7").length;
  text1.split("7").forEach((e, i) => {
    ele.push(e);
    if (i !== length - 1) ele.push(<span>7</span>);
  });

  return (
    <>
      <MainTextViewerDivver>{ele}</MainTextViewerDivver>
      <Label>{text2}</Label>
    </>
  );
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

const P = styled.p`
  font-size: 12px;
  color: #353535;
  margin-top: -20px;
`;

const A = styled.a`
  font-size: 12px;
  color: #2b7ae2;
  margin-top: -12px;
  margin-bottom: 20px;
`;

const ResetBtn = styled.div`
  cursor: pointer;
  background-color: #e6e6e6;
  color: #292929;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
  transition: 100ms;

  &:hover {
    background-color: #eed4d4;
    color: #ff0000;
  }
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
`;

let seed = String(Math.random()) + "_";
let i = 0;
let initText = localStorage.getItem("max7Text") || "";
let init7Num = Number(localStorage.getItem("max7Num")) || 0;
let init7Key = localStorage.getItem("max7Key") || "";

function App() {
  const [text, setText] = useState("");
  const timer = useRef<NodeJS.Timer>();

  const [max7, setMax7] = useState({
    text: initText,
    num7: init7Num,
    key: init7Key,
  });

  const reset = () => {
    setMax7({
      text: "",
      num7: 0,
      key: "",
    });
    localStorage.removeItem("max7Text");
    localStorage.removeItem("max7Num");
    localStorage.removeItem("max7Key");
  };

  useEffect(() => {
    const func = () => {
      i += 1;
      const key = "hyuns_" + seed + i;
      const sha = sha256(key);
      setText(sha);

      let results = sha.match(/7/g);
      if (results === null) return;
      if (results.length > max7.num7) {
        setMax7({
          num7: results.length,
          text: sha,
          key: key,
        });
        console.log(key);
        localStorage.setItem("max7Text", sha);
        localStorage.setItem("max7Key", key);
        localStorage.setItem("max7Num", String(results.length));
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
      <P>
        find7.hyuns.dev{" "}
        <A
          href="https://github.com/HyunsDev/find-7-in-sha256"
          target={"_blank"}
          rel="noreferrer"
        >
          github
        </A>
      </P>

      <Flex>
        현재 최대 {max7.num7}
        <ResetBtn onClick={reset}>리셋</ResetBtn>
      </Flex>

      <MainTextViewer text1={max7.text} text2={max7.key} />
      <MainTextViewer text1={text} text2={"hyuns_" + seed + i} />
    </Divver>
  );
}

export default App;
