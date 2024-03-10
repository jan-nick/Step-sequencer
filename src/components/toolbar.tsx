"use client";

import { useEffect, useState } from "react";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { Play, Square } from "lucide-react";
import { Input } from "./ui/input";
import * as Tone from "tone";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

export default function Toolbar() {
  const synth = new Tone.Synth().toDestination();
  synth.volume.value = -12;

  const [bpm, setBpm] = useState(120);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const steps = useSelector((state: RootState) => state.steps.value);

  const play = () => {
    setIsPlaying(true);
  };

  const stop = () => {
    setIsPlaying(false);
  };

  const changeBpm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Math.max(Number(event.target.value), 1), 999);
    setBpm(value);
  };

  useEffect(() => {
    const activeStep = steps[currentStep].active;
    if (activeStep && Tone.Transport.state === "started") {
      synth.triggerAttackRelease("C4", "16n");
    }
  }, [currentStep]);

  useEffect(() => {
    if (isPlaying) {
      Tone.Transport.cancel();

      Tone.Transport.scheduleRepeat((time) => {
        setCurrentStep((step) => (step < steps.length - 1 ? step + 1 : 0));
      }, "16n");

      Tone.start();

      Tone.Transport.start();
    } else {
      Tone.Transport.stop();
      setCurrentStep(0);
    }
  }, [isPlaying]);

  return (
    <div className="flex justify-between p-2">
      <div className="flex basis-40">
        <div className="items-center basis-16">
          <Input
            value={bpm}
            onChange={(e) => changeBpm(e)}
            type="number"
            id="bpm"
          />
        </div>
      </div>
      <div className="flex gap-2">
        <Button onClick={() => play()} variant="outline" size="icon">
          <Play className="h-[1.2rem] w-[1.2rem] " />
          <span className="sr-only">Play</span>
        </Button>
        <Button onClick={() => stop()} variant="outline" size="icon">
          <Square className="h-[1.2rem] w-[1.2rem] " />
          <span className="sr-only">Stop</span>
        </Button>
      </div>
      <div className="flex justify-end basis-40">
        <ModeToggle></ModeToggle>
      </div>
    </div>
  );
}
