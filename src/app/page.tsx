"use client";
import Toolbar from "@/components/toolbar";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";
import { useDispatch } from "react-redux";
import { toggleStep } from "@/features/steps/stepsSlice";
import { Slider } from "@/components/ui/slider";

export default function Home() {
  const steps = useSelector((state: RootState) => state.steps.value);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <Toolbar></Toolbar>
      <main className="flex flex-col p-2">
        <div className="relative h-4">
          <div className="absolute w-px top-0 bottom-0 dark:bg-neutral-500"></div>
        </div>
        <div className="flex">
          {steps.map((step, index) => {
            return (
              <div
                key={index}
                className="basis-full	bg-neutral-100 dark:bg-neutral-900 border-solid border-s dark:border-neutral-800">
                <small className="w-full text-sm leading-none">
                  {step.position}
                </small>
              </div>
            );
          })}
        </div>
        <div className="flex">
          {steps.map((step, index) => {
            return (
              <div
                onClick={() => dispatch(toggleStep({ index }))}
                onDragEnter={() => dispatch(toggleStep({ index }))}
                key={index}
                className={`${
                  step.active
                    ? "bg-violet-300 dark:bg-violet-900"
                    : "bg-neutral-50 dark:bg-neutral-800"
                } h-8 basis-full border-solid border-s dark:border-neutral-700`}></div>
            );
          })}
        </div>
        <div className="py-4 w-64">
          <Slider></Slider>
          <div className="py-2">Frequency</div>
        </div>
      </main>
    </>
  );
}
