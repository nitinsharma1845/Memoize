import React, { useEffect, useState, useRef } from "react";
import { fetchLabels } from "../../../utils/labelsServices";
import { Link } from "react-router-dom";
import { Plus, Tag } from "lucide-react";
import { Input, Loading } from "../../index";
import { useForm } from "react-hook-form";
import { api } from "../../../utils/api";
import toast from "react-hot-toast";

const AsideBar = () => {
  const [labels, setLabels] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const btnRef = useRef();
  const [loading, setLoading] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  useEffect(() => {
    fetchLabels()
      .then(({ data }) => {
        // console.log(data);
        setLabels(data.data.labels);
      })
      .catch((err) => {
        console.log("Get All Label api Error::", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function handleAddLabel() {
    setShowInput((prev) => !prev);
    btnRef.current.style.rotate = "45 deg";
  }

  async function createLabel(data) {
    // console.log(data);
    const id = toast.loading("creating a new label.");
    try {
      const res = await api.post("/label/create", data);
        // console.log("create abel res ::::", res);

      if (res.data?.status) {
        setLabels((prev) => [...prev, res.data?.data]);
        toast.success("Label created..", { id });
      } else {
        toast.error(res?.message || "Failed to create label", { id });
      }

      setShowInput(false);
    } catch (error) {
        console.error("In catch errro", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to create Label",
        { id }
      );
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <Loading />;

  return (
    <aside className="w-2xs fixed z-0 left-0 bg-amber-100 h-screen pt-17 overflow-y-scroll scrollbar-thin scrollbar-thumb-amber-200 scrollbar-track-amber-100">
      <div className="flex items-center justify-between pr-10">
        <h1 className="text-2xl">Labels</h1>
        <Plus
          className={
            showInput
              ? "rotate-45 duration-200 cursor-pointer"
              : "cursor-pointer duration-200"
          }
          onClick={handleAddLabel}
          ref={btnRef}
        />
      </div>

      <div className="mt-2">
        {showInput && (
          <div className="w-[90%] mx-auto">
            <div className="w-full flex items-center gap-2">
              <Input
                type="text"
                placeholder="New Label Name.."
                {...register("name", { required: "Label name is required" })}
              />
              <Plus className="" onClick={handleSubmit(createLabel)} />
            </div>
            {errors.name && (
              <p className="text-xs text-red-700 mt-1">{errors.name.message}</p>
            )}
          </div>
        )}

        {labels.map((label) => (
          <Link
            key={label?._id}
            to={`/label/${label?._id}`}
            className="flex items-center gap-2 hover:bg-amber-200 py-3 pl-1 rounded-r-full duration-300 transition-all ease-in-out my-1"
          >
            <span className="rotate-135">
              <Tag />
            </span>
            {label?.name}
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default AsideBar;
