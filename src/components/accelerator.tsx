import React, { useState, useEffect } from "react";
import {
  PlayHihatSound,
  PlaySnareSound,
  PlayCrashSound,
  LoopBSound,
  StopLoopB,
  PlayHoneSound,
  LoopASound,
  StopLoopA,
} from "../function/soundCtl";

const Accelerator: React.FC = () => {
  // const [accelerationHistory, setAccelerationHistory] = useState<number[]>([]);
  // const [accelerationIncludingGravityHistory, setAccelerationIncludingGravityHistory] = useState<
  //   number[]
  // >([]);
  const [accGraX, setAccGraX] = useState<number>(0);

  const [isMeasuring, setIsMeasuring] = useState<boolean>(false);

  const [playPoint, setPlayPoint] = useState<number>(0);
  const [selectSound, setSelectSound] = useState<string>("");
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const [loopA, setLoopA] = useState<boolean>(false);
  const [loopB, setLoopB] = useState<boolean>(false);

  const deviceMotionRequest = async () => {
    if (
      typeof DeviceMotionEvent !== "undefined" &&
      typeof (DeviceMotionEvent as any).requestPermission === "function"
    ) {
      const state = await (DeviceMotionEvent as any).requestPermission();
      if (state === "granted") {
        window.addEventListener("devicemotion", handleMotionEvent);
        setIsMeasuring(true);
      } else {
        alert("動作と方向へのアクセスを許可してください");
      }
    } else {
      window.addEventListener("devicemotion", handleMotionEvent);
      setIsMeasuring(true);
    }
  };

  const handleMotionEvent = (event: DeviceMotionEvent) => {
    if (!event.accelerationIncludingGravity) {
      alert("event.accelerationIncludingGravity is null");
      return;
    }
    if (
      !event.accelerationIncludingGravity.x ||
      !event.accelerationIncludingGravity.y ||
      !event.accelerationIncludingGravity.z
    ) {
      alert("event.acceleration is null");
      return;
    }

    // 新しい加速度の値を配列に追加
    // setAccelerationHistory((prev) => {
    //   const newHistory = [...prev, event.acceleration?.x ?? 0];
    //   return newHistory.length <= 50 ? newHistory : newHistory.slice(1);
    // });
    // setAccelerationIncludingGravityHistory((prev) => {
    //   const newHistory = [...prev, event.accelerationIncludingGravity?.x ?? 0];
    //   return newHistory.length <= 50 ? newHistory : newHistory.slice(1);
    // });

    setAccGraX(event.accelerationIncludingGravity.x);
  };

  useEffect(() => {
    return () => {
      window.removeEventListener("devicemotion", handleMotionEvent);
    };
  }, []);

  const stopMotion = () => {
    window.removeEventListener("devicemotion", handleMotionEvent);
    setIsMeasuring(false);
  };

  useEffect(() => {
    const checkAndPlay = () => {
      if (accGraX > playPoint && !isPlay) {
        selectSound === "crash"
          ? PlayCrashSound()
          : selectSound === "hihat"
          ? PlayHihatSound()
          : selectSound === "snare"
          ? PlaySnareSound()
          : selectSound === "hone"
          ? PlayHoneSound()
          : console.log("no sound");
        setIsPlay(true);

        setTimeout(() => {
          setIsPlay(false);
        }, 100);
      }
    };
    checkAndPlay();
  }, [accGraX, isPlay, playPoint, selectSound]);

  const loopAONOFF = () => {
    if (!loopA) {
      setLoopA(true);
      setLoopB(false);
    } else {
      setLoopA(false);
    }
  };

  const loopBONOFF = () => {
    if (!loopB) {
      setLoopB(true);
      setLoopA(false);
    } else {
      setLoopB(false);
    }
  };

  useEffect(() => {
    if (loopA) {
      LoopASound();
    } else {
      StopLoopA();
    }

    if (loopB) {
      LoopBSound();
    } else {
      StopLoopB();
    }
  }, [loopA, loopB]);

  return (
    <div>
      <button onClick={isMeasuring ? stopMotion : deviceMotionRequest}>
        {isMeasuring ? "STOP" : "IOSの場合はタップ"}
      </button>

      <h2>accelerationGravity</h2>
      <p>{accGraX}</p>

      <input
        type="range"
        min="15"
        max="30"
        value={playPoint}
        onChange={(e) => setPlayPoint(Number(e.target.value))}
      />
      <h3>playpoint</h3>
      <p>{playPoint}</p>
      <h3>Select Sound</h3>
      <button onClick={() => setSelectSound("hihat")}>Hihat</button>
      <button onClick={() => setSelectSound("snare")}>Snare</button>
      <button onClick={() => setSelectSound("crash")}>Crash</button>
      <button onClick={() => setSelectSound("hone")}>Hone</button>
      <h3>Play loop sound</h3>
      <button onClick={() => loopAONOFF()}>{loopA ? "Stop" : "LoopA Start"}</button>
      <button onClick={() => loopBONOFF()}>{loopB ? "Stop" : "LoopB Start"}</button>
    </div>
  );
};

export default Accelerator;
