import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import axios from "@/api";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import UniModal from "../modal/Modal";
const FormPage = () => {
  const [open, setOpen] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleNavigate = (path) => {
    navigate(path);
  };
  const onFinish = (values) => {
    console.log("Success:", values);

    axios
      .post("/admins/sign-in", {
        username: values.username,
        password: values.password,
      })
      .then((res) => {
        if (res.status == 200) {
          message.success(res.data.msg);
        }
        localStorage.setItem("userId", res.data.payload.admin._id);
        dispatch({ type: "saveId", id: res.data.payload.admin._id });

        handleNavigate("/");
        dispatch({ type: "saveToken", token: res.data.payload.token });
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
  };

  const onFinish2 = (values) => {
    console.log(values);
    axios
      .post("/sign-up", values)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };
  const onFinishFailed2 = (errorInfo) => {
    console.log(errorInfo);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#c7f9cc]">
      <Form
        name="signIn"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
        className="min-w-80 max-w-72"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <div className="flex justify-between items-center flex-col">
          <Form.Item className="w-full">
            <Button className="w-full mt-5" type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
          <Form.Item className="flex justify-between items-center">
            <p className="w-full" type="primary">
              Don't have account{" "}
              <a className="underline">
                <UniModal open={open} setOpen={setOpen} title={"Create one!"}>
                  <div className="flex justify-center items-center min-h-screen">
                    <span
                      onClick={() => setOpen((p) => !p)}
                      className="absolute inset-[3%_3%_auto_auto] text-2xl cursor-pointer text-slate-200"
                    >
                      x
                    </span>
                    <Form
                      name="signIn"
                      onFinish={onFinish2}
                      onFinishFailed={onFinishFailed2}
                      autoComplete="off"
                      layout="vertical"
                      className="min-w-96 bg-white p-4"
                    >
                      <Form.Item
                        label="Firstname"
                        name="fname"
                        rules={[
                          {
                            required: true,
                            message: "Please input your firstName!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item label="Lastname" name="lname">
                        <Input />
                      </Form.Item>
                      <Form.Item
                        label="phone"
                        name="phone"
                        rules={[
                          {
                            required: true,
                            message: "Please input your phone!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        label="username"
                        name="username"
                        rules={[
                          {
                            required: true,
                            message: "Please input your password!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        label="password"
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: "Please input your password!",
                          },
                        ]}
                      >
                        <Input.Password />
                      </Form.Item>

                      <div className="flex justify-between items-center flex-col">
                        <Form.Item className="w-full">
                          <Button
                            className="w-full mt-5"
                            type="primary"
                            htmlType="submit"
                          >
                            Login
                          </Button>
                        </Form.Item>
                      </div>
                    </Form>
                  </div>
                </UniModal>
              </a>
            </p>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};
export default FormPage;
