import { Input, Row, Col, Button, Radio } from "antd";
import { SwapOutlined } from "@ant-design/icons";
import axios from "axios";
import { useState } from "react";

import { Header } from "./header";

const { TextArea } = Input;

const TEST = "test";
const RUSSIAN = "Russian";
const ENGLISH = "English";

const mappingLanguage = {
  [RUSSIAN]: "rus",
  [ENGLISH]: "eng",
};

function App() {
  const [initialText, setInitialText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [fromLanguage, setFromLanguage] = useState(RUSSIAN);
  const [toLanguage, setToLanguage] = useState(ENGLISH);
  const [currentModel, setCurrentModel] = useState("common");

  const getTranslatedText = () => {
    console.log(mappingLanguage[fromLanguage]);
    axios
      .get("http://localhost:6000/api/translate", {
        params: {
          text: initialText,
          fromLanguage: mappingLanguage[fromLanguage],
          toLanguage: mappingLanguage[toLanguage],
          model: currentModel,
        },
      })
      .then((response) => {
        setTranslatedText(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const changeLanguage = () => {
    const tmp = fromLanguage;
    setFromLanguage(toLanguage);
    setToLanguage(tmp);
  };

  return (
    <>
      <Row style={{ padding: 10, marginLeft: 305 }}>
        <Header />
      </Row>
      <Row justify="center">
        <Col span={7} style={{ marginRight: 47 }}>
          <Input value={fromLanguage} />
        </Col>
        <Col>
          <Button
            shape="circle"
            icon={<SwapOutlined />}
            onClick={changeLanguage}
          />
        </Col>
        <Col span={7} style={{ marginLeft: 47 }}>
          <Input value={toLanguage} />
        </Col>
      </Row>
      <Row style={{ padding: 10 }} justify="center">
        <Col span={8} style={{ padding: 10 }}>
          <TextArea
            autoSize={{ minRows: 5, maxRows: 5 }}
            onChange={(e) => {
              setInitialText(e.target.value);
            }}
          />
        </Col>
        <Col span={8} style={{ padding: 10 }}>
          <TextArea
            autoSize={{ minRows: 5, maxRows: 5 }}
            value={translatedText}
          />
        </Col>
      </Row>
      <Row justify="center">
        <Button type="primary" onClick={getTranslatedText}>
          Translate
        </Button>
      </Row>
      <Row justify="center" style={{ padding: 50 }}>
        <Radio.Group
          onChange={(e) => {
            setCurrentModel(e.target.value);
          }}
          defaultValue={currentModel}
        >
          <Radio.Button value="common">Common model</Radio.Button>
          <Radio.Button value="dostoevsky">Dostoevsky model</Radio.Button>
        </Radio.Group>
      </Row>
    </>
  );
}

export default App;
