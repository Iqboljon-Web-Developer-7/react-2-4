import { FaHeart, FaOpencart } from "react-icons/fa";
import { CiMenuBurger } from "react-icons/ci";
import { IoMdExit } from "react-icons/io";
import React from "react";

import websiteLogo from "@/assets/logo.svg";
import { Link } from "react-router-dom";
import UniModal from "@/components/modal/Modal";
import { Button, Form, Input } from "antd";
import axios from "@/api";
import { useDispatch } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const onFinish = (values) => {
    axios.post("/blogs", values).then((res) => {
      dispatch({ type: `refreshProducts` });
    });
    setOpen(false);

    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <header className="flex items-center justify-between wrapper p-4">
      <div className="header__img">
        <Link to={"/"}>
          <img src={websiteLogo} alt="website logo" />
        </Link>
      </div>
      <div className="header__icons flex items-center justify-center gap-4 text-xl">
        <UniModal title={"Create Blog"} open={open} setOpen={setOpen}>
          <div className="min-h-screen flex items-center justify-center bg-[#e1f7e3] relative">
            <span
              className="absolute inset-[4%_4%_auto_auto] cursor-pointer"
              onClick={() => setOpen((p) => !p)}
            >
              X
            </span>
            <Form
              name="createBlog"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              layout="vertical"
              className="min-w-80"
            >
              <Form.Item
                label="Title"
                name="title"
                rules={[
                  {
                    required: true,
                    message: "Please input blog title!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="description"
                name="desc"
                rules={[
                  {
                    required: true,
                    message: "Please input blog description!",
                  },
                ]}
              >
                <Input.TextArea />
              </Form.Item>

              <Form.Item className="w-full">
                <Button
                  className="w-full mt-5"
                  type="primary"
                  htmlType="submit"
                >
                  Create
                </Button>
              </Form.Item>
            </Form>
          </div>
        </UniModal>

        <Link to={"/wishlist"}>
          <FaHeart />
        </Link>
        <Link to={"/card"}>
          <FaOpencart />
        </Link>
        <Link to={"/form"}>
          <p
            className="flex items-center justify-center gap-3 text-2xl"
            onClick={() => localStorage.clear()}
          >
            <IoMdExit className="fill-red-500" />
          </p>
        </Link>
        <CiMenuBurger className="lg:hidden" />
      </div>
    </header>
  );
};

export default Header;
