import axios from "@/api";
import { message } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineModeEditOutline } from "react-icons/md";
import UniModal from "../modal/Modal";
import { Button, Form, Input } from "antd";

const Products = ({ data }) => {
  const userId = useSelector((state) => state.userId);
  console.log(userId);

  const [id, setId] = useState();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const deleteProduct = (id) => {
    message.loading("Deleting blog");
    axios
      .delete(`/blogs/${id}`)
      .then((res) => {
        message.destroy();
        message.success("Blog successfully deleted");
        dispatch({ type: "refreshProducts" });
      })

      .catch((error) => {
        if (error.status == 400) {
          message.destroy();
          message.error("Blog created by someone else");
        }
      });
  };
  const onFinish = (values) => {
    axios.put(`/blogs/${id}`, values);
  };
  const updateProduct = (id) => {
    setId(id);
    console.log(id);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  let blogs = data?.map((item, index) => (
    <div
      key={index}
      className="border p-3 hover:bg-black group duration-200 cursor-pointer text-center relative"
    >
      <h2 className="text-2xl group-hover:text-slate-200 duration-200">
        {item.title}
      </h2>
      <p className="text-sm text-slate-700 group-hover:text-slate-400 duration-200">
        {item.desc}
      </p>
      <p className="text-start text-xs text-slate-500 mt-4">
        Created by: {item.userId.fname}
      </p>
      <div
        onClick={() => deleteProduct(item._id)}
        className={`w-6 h-6 rounded-full flex items-center justify-center bg-white hover:bg-slate-200 duration-200 absolute inset-[12%_4%_auto_auto] ${
          userId != item.userId._id ? "hidden" : null
        }`}
      >
        <span className={`text-[1rem]`}>X</span>
      </div>
      <div
        onClick={() => updateProduct(item._id)}
        className={`w-6 h-6 rounded-full flex items-center justify-center bg-slate-100 hover:bg-slate-200 duration-200 absolute inset-[12%_auto_auto_4%] ${
          userId != item.userId._id ? "hidden" : null
        }`}
      >
        <UniModal
          title={<MdOutlineModeEditOutline />}
          open={open}
          setOpen={setOpen}
        >
          <div className="min-h-screen flex items-center justify-center flex-col bg-[#c7f9cc]">
            <h2 className="text-3xl">Edit Blog Data</h2>
            <span
              className="absolute inset-[4%_4%_auto_auto] cursor-pointer"
              onClick={() => setOpen((p) => !p)}
            >
              X
            </span>
            <Form
              name="something"
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
                  EDIT
                </Button>
              </Form.Item>
            </Form>
          </div>
        </UniModal>
      </div>
    </div>
  ));
  return (
    <section className="wrapper grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {blogs ||
        new Array(16).fill().map((item, idx) => (
          <div key={idx} className="grid grid-cols-auto-fit gap-5">
            <div className="bg-gray-200 rounded-lg p-5">
              <div className="h-5 bg-gray-300 rounded-full animate-pulse"></div>
              <div className="h-3 bg-gray-300 rounded-full animate-pulse mt-2"></div>
            </div>
          </div>
        ))}
    </section>
  );
};

export default Products;
