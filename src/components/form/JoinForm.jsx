import { Button, Form, Input } from "antd";

function JoinForm() {
  // js
  // 1. 초기값
  const initialValue = {
    userId: "hong",
    userPass: "1234",
    nickName: "길동",
    email: "a@a.net",
  };
  // 2. 라벨넣기
  // 3. placeholder 넣기
  // 4. 필수값 표현하기
  // 5. 필수값 안내 메시지 표시하기
  // 6. 각 필드의 입력중인 값 알아내기
  const onFieldsChange = (field, allfields) => {
    console.log(field[0].value);
    // console.log(allfields);
  };
  // 7. 확인버튼 클릭시 최종 입력값
  const onFinish = values => {
    console.log(values);
  };

  //jsx
  return (
    <div>
      {/* Ant Design에서 불러옴 */}
      <Form
        style={{ width: 600, margin: "0 auto" }}
        initialValues={initialValue}
        onFieldsChange={(field, allfields) => onFieldsChange(field, allfields)}
        onFinish={values => onFinish(values)}
      >
        <Form.Item
          label="아이디"
          name={"userId"}
          required={true}
          rules={[
            { required: true, message: "아이디는 필수입니다." },
            { min: 4, message: "아이디는 4자 이상입니다." },
            { max: 8, message: "아이디는 최대 8자 입니다." },
          ]}
        >
          <Input placeholder="아이디를 입력하세요." />
        </Form.Item>
        <Form.Item
          label="비밀번호"
          name={"userPass"}
          required={true}
          rules={[
            { required: true, message: "비밀번호는 필수입니다." },
            {
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, // 정규표현식
              message:
                "비밀번호는 최소 8자 이상 이어야하고, 대소문자, 숫자를 포함해야 합니다.",
            },
          ]}
        >
          <Input.Password placeholder="비밀번호를 입력하세요." />
        </Form.Item>
        <Form.Item label="닉네임" name={"nickName"}>
          <Input placeholder="닉네임을 입력하세요." />
        </Form.Item>
        <Form.Item
          label="이메일"
          name={"email"}
          required={true}
          rules={[
            { required: true, message: "이메일은 필수요소입니다." },
            { type: "email", message: "이메일 형식에 맞지않습니다." },
          ]}
        >
          <Input placeholder="이메일을 입력하세요." />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">확인</Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default JoinForm;
